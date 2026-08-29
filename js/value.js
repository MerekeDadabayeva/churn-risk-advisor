/**
 * value.js
 * ========
 * Resolves an "account value" weight for each record so the triage queue can rank
 * by revenue-at-risk (churn probability x account value), not just severity tier.
 *
 * A tiny 2-seat account and your largest customer both scoring URGENT should not
 * get the same place in the queue. This module finds the best available value
 * signal in the loaded data and degrades gracefully when there is none.
 */

// Numeric columns usable directly as account value, best first. `unit` labels the
// figure; `prefix` is prepended when formatting (e.g. "$").
const NUMERIC_VALUE_COLUMNS = [
  { keys: ["ARR", "arr", "Annual_Revenue", "annual_revenue", "annual_value"], unit: "ARR", prefix: "$" },
  { keys: ["MRR", "mrr", "Monthly_Revenue", "monthly_revenue"], unit: "MRR", prefix: "$" },
  { keys: ["Contract_Value", "contract_value", "ACV", "acv", "TCV", "tcv"], unit: "contract value", prefix: "$" },
  { keys: ["Account_Value", "account_value", "LTV", "ltv", "lifetime_value"], unit: "account value", prefix: "$" },
  { keys: ["Seats", "seats", "Licenses", "licenses", "Seat_Count", "seat_count", "Users", "users"], unit: "seats", prefix: "" }
];

// Text plan/tier columns -> relative weight.
const PLAN_COLUMNS = ["Plan", "plan", "Plan_Tier", "plan_tier", "Tier", "tier", "Subscription", "subscription", "Plan_Name", "plan_name"];
const PLAN_WEIGHTS = [
  { match: ["enterprise", "ent", "platinum", "scale"], weight: 5 },
  { match: ["business", "premium", "gold", "advanced"], weight: 4 },
  { match: ["pro", "professional", "growth", "plus"], weight: 3 },
  { match: ["team", "standard", "silver", "starter", "basic"], weight: 2 },
  { match: ["free", "trial", "individual", "hobby"], weight: 1 }
];

function firstPresentKey(record, keys) {
  return keys.find(k => {
    const v = record[k];
    return v !== undefined && v !== null && String(v).trim() !== "";
  });
}

function toNumber(v) {
  if (typeof v === "number") return v;
  const n = parseFloat(String(v).replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

/**
 * Inspects a dataset and returns the value model to use for the whole session:
 *   { mode: 'numeric'|'plan'|'tenure'|'flat', key?, unit, prefix, label, estimated }
 */
export function resolveValueModel(records) {
  if (!records || !records.length) {
    return { mode: "flat", unit: "risk weight", prefix: "", label: "no data loaded", estimated: true };
  }
  const sample = records[0];

  for (const col of NUMERIC_VALUE_COLUMNS) {
    const key = firstPresentKey(sample, col.keys);
    if (key && records.some(r => toNumber(r[key]) > 0)) {
      return {
        mode: "numeric", key, unit: col.unit, prefix: col.prefix,
        label: `${col.unit} column "${key}"`, estimated: false
      };
    }
  }

  const planKey = PLAN_COLUMNS.find(k => sample[k] !== undefined && String(sample[k] ?? "").trim() !== "");
  if (planKey) {
    return {
      mode: "plan", key: planKey, unit: "plan weight", prefix: "",
      label: `plan tier column "${planKey}"`, estimated: true
    };
  }

  const hasTenure = sample.Account_Age_Days !== undefined || sample.account_age_days !== undefined;
  if (hasTenure) {
    return {
      mode: "tenure", unit: "risk weight", prefix: "",
      label: "estimated from account tenure — no value/plan column found", estimated: true
    };
  }

  return {
    mode: "flat", unit: "risk weight", prefix: "",
    label: "no value, plan, or tenure column — accounts weighted equally", estimated: true
  };
}

function planWeight(value) {
  const s = String(value || "").toLowerCase();
  for (const p of PLAN_WEIGHTS) {
    if (p.match.some(m => s.includes(m))) return p.weight;
  }
  return 2; // recognised column, unrecognised value -> mid weight
}

/** Absolute account value for one record, in the model's unit. */
export function accountValue(record, model) {
  switch (model.mode) {
    case "numeric": {
      const v = toNumber(record[model.key]);
      return Number.isFinite(v) && v > 0 ? v : 0;
    }
    case "plan":
      return planWeight(record[model.key]);
    case "tenure": {
      const days = toNumber(record.Account_Age_Days ?? record.account_age_days) || 0;
      // 1.0x at brand-new, saturating at 3.0x around the 2-year mark.
      return 1 + Math.min(Math.max(days, 0) / 365, 2);
    }
    default:
      return 1;
  }
}

function money(n, model) {
  return `${model.prefix}${Math.round(n).toLocaleString()}`;
}

/** Compact chip for the account's raw value, e.g. "$42,000 ARR" / "25 seats" / "2.4x weight". */
export function formatValue(value, model) {
  if (model.mode === "numeric") return `${money(value, model)} ${model.unit}`;
  if (model.mode === "plan") return `plan weight ${value}`;
  return `${value.toFixed(1)}x weight`;
}

/** Chip for expected value at risk = value x churn probability (0-1). */
export function formatAtRisk(value, prob, model) {
  const atRisk = value * (prob || 0);
  if (model.mode === "numeric") return `~${money(atRisk, model)} ${model.unit} at risk`;
  return `${atRisk.toFixed(2)} weighted risk`;
}

/**
 * Portfolio headline for a set of records.
 * Money models get an interpretable "$X at risk"; weight-only models get null
 * (the count of accounts is shown by the caller instead).
 */
export function formatPortfolioAtRisk(records, model) {
  if (model.mode !== "numeric") return null;
  const total = records.reduce((sum, r) => sum + (r.value_at_risk || 0), 0);
  return `~${money(total, model)} ${model.unit} at risk`;
}
