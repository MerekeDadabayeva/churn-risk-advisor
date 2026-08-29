/**
 * scoring.js
 * ==========
 * Client-Side Deterministic 2-Signal Corroboration Engine for Churn Risk Advisor.
 *
 * Provides exact 100% functional parity with severity_scoring.py.
 * Zero target leakage: 'Churn' is never used in scoring.
 */

// 18 Empirically Confirmed Support Ticket Templates
export const NEGATIVE_TEMPLATES = new Set([
  "I'm very frustrated with the downtime. This is unacceptable.",
  "I've been waiting for support for 3 days. I'm cancelling.",
  "The app crashes every time I try to upload a CSV.",
  "The UI is too confusing. I can't find the export button.",
  "Your API documentation is outdated and full of errors.",
  "Why did my subscription price increase without notice?"
]);

export const NEUTRAL_TEMPLATES = new Set([
  "How do I change my password?",
  "I need to update my billing address.",
  "Is there a tutorial for the new dashboard feature?",
  "When will the maintenance window end?",
  "Can I add more seats to my current plan?",
  "Just checking if my payment went through."
]);

export const POSITIVE_TEMPLATES = new Set([
  "Customer support was super helpful yesterday. Thanks!",
  "This tool has saved my team so much time.",
  "The integration with Slack works perfectly.",
  "I love the new analytics feature! Great job.",
  "Smooth experience so far, no complaints.",
  "Just upgraded to the Pro plan, excited to use it."
]);

// -----------------------------------------------------------------------------
// Free-text fallback lexicon — used when a ticket is NOT one of the 18 templates
// (i.e. real uploaded data). Phrases are matched as case-insensitive substrings.
// -----------------------------------------------------------------------------
export const NEGATIVE_KEYWORDS = [
  "cancel", "canceling", "cancelling", "cancellation", "refund", "terminate",
  "downgrade", "churn", "unacceptable", "frustrat", "angry", "furious", "upset",
  "disappointed", "unhappy", "not happy", "broken", "crash", "bug", "glitch",
  "error", "fails", "failing", "failure", "not working", "doesn't work",
  "does not work", "won't work", "can't log in", "cannot log in", "locked out",
  "downtime", "outage", "down again", "keeps going down", "slow", "laggy",
  "unusable", "useless", "worthless", "overcharge", "overcharged",
  "double charged", "charged twice", "billing issue", "billing problem",
  "price increase", "wrong price", "no response", "no reply", "still waiting",
  "been waiting", "waiting for", "ignored", "escalate", "escalation",
  "complaint", "complain", "lawyer", "legal", "competitor", "switching to",
  "moving to", "moving away", "leaving", "worst", "terrible", "awful",
  "horrible", "ridiculous", "disaster", "regret", "misled", "scam", "fed up",
  "last straw", "not renewing", "won't renew", "will not renew"
];

export const POSITIVE_KEYWORDS = [
  "thank", "thanks", "appreciate", "love it", "love the", "love this",
  "great job", "great work", "works great", "awesome", "excellent", "fantastic",
  "brilliant", "perfect", "works perfectly", "super helpful", "very helpful",
  "really helpful", "so helpful", "life saver", "lifesaver", "saved us",
  "saved my team", "time saver", "huge time", "smooth", "seamless",
  "easy to use", "intuitive", "impressed", "happy with", "very happy",
  "really happy", "excited", "delighted", "highly recommend", "would recommend",
  "keep it up", "no complaints", "no issues", "big fan"
];

export const NEUTRAL_CUES = [
  "how do i", "how can i", "how to", "where do i", "where is", "when will",
  "is there a", "can i", "could you", "would it be possible", "need to update",
  "want to change", "change my", "update my", "reset my", "add more seats",
  "add seats", "upgrade my plan", "checking if", "just checking",
  "quick question", "question about", "tutorial", "documentation", "onboarding",
  "invoice", "receipt", "confirm my", "verify"
];

const SENTIMENT_ALIASES = {
  negative: "negative", neg: "negative", bad: "negative", detractor: "negative", "-1": "negative",
  positive: "positive", pos: "positive", good: "positive", promoter: "positive", "1": "positive",
  neutral: "neutral", neu: "neutral", passive: "neutral", "0": "neutral"
};

/** Normalizes a pre-scored sentiment column value, or returns null if unrecognized. */
export function normalizeSentimentField(value) {
  if (value === undefined || value === null) return null;
  return SENTIMENT_ALIASES[String(value).trim().toLowerCase()] || null;
}

/**
 * Computes Signal 1 (Engagement) from Login_Frequency and Daily_Usage_Mins.
 * - 'weak': Login_Frequency == 'Rarely' OR Daily_Usage_Mins < 20
 * - 'strong': Login_Frequency == 'Daily' AND Daily_Usage_Mins >= 35
 * - 'moderate': All intermediate patterns
 */
export function computeEngagementSignal(loginFrequency, dailyUsageMins) {
  const freq = String(loginFrequency || "").trim().toLowerCase();
  const mins = parseFloat(dailyUsageMins) || 0.0;

  if (freq === "rarely" || mins < 20.0) {
    return "weak";
  }

  if (freq === "daily" && mins >= 35.0) {
    return "strong";
  }

  return "moderate";
}

/**
 * Computes Signal 2 (Sentiment) from Last_Support_Ticket text.
 * Returns 'negative', 'neutral', 'positive', or 'unknown'.
 *
 * Resolution order:
 *   0. An explicit pre-scored sentiment column, if the row has one.
 *   1. Exact match against the 18 known templates (keeps demo-set parity exact).
 *   2. Free-text lexicon scan for real uploaded tickets. Churn risk is asymmetric,
 *      so a tie between negative and positive hits resolves to 'negative'.
 */
export function computeSentimentSignal(ticketText, explicitSentiment) {
  const explicit = normalizeSentimentField(explicitSentiment);
  if (explicit) return explicit;

  if (!ticketText) return "unknown";
  const text = String(ticketText).trim();
  if (!text) return "unknown";

  // 1. Exact template match
  if (NEGATIVE_TEMPLATES.has(text)) return "negative";
  if (NEUTRAL_TEMPLATES.has(text)) return "neutral";
  if (POSITIVE_TEMPLATES.has(text)) return "positive";

  // 2. Free-text lexicon fallback
  const lower = text.toLowerCase();
  const count = (list) => list.reduce((n, kw) => (lower.includes(kw) ? n + 1 : n), 0);
  const neg = count(NEGATIVE_KEYWORDS);
  const pos = count(POSITIVE_KEYWORDS);

  if (neg > 0 && neg >= pos) return "negative";
  if (pos > 0) return "positive";
  if (count(NEUTRAL_CUES) > 0) return "neutral";
  return "unknown";
}

/**
 * Combines engagement and sentiment into deterministic 3-tier severity:
 * - URGENT: weak engagement + negative sentiment (80.7% historical churn)
 * - WATCH: moderate engagement + neutral sentiment (19.1% historical churn)
 * - NONE: all other combinations (15.4% baseline churn)
 */
export function determineSeverityTier(engagementLevel, sentimentLevel) {
  const eng = String(engagementLevel || "").toLowerCase();
  const sent = String(sentimentLevel || "").toLowerCase();

  if (eng === "weak" && sent === "negative") {
    return "URGENT";
  }

  if (eng === "moderate" && sent === "neutral") {
    return "WATCH";
  }

  return "NONE";
}

/**
 * Scores a single customer row object.
 */
export function scoreCustomer(row) {
  const custId = row.Customer_ID || row.customer_id || "";
  const name = row.Name || row.name || "";
  const email = row.Email || row.email || "";
  const loginFreq = row.Login_Frequency || row.login_frequency || "";
  const dailyMins = row.Daily_Usage_Mins !== undefined
    ? row.Daily_Usage_Mins
    : (row.daily_usage_mins !== undefined ? row.daily_usage_mins : 0);
  const ticket = row.Last_Support_Ticket || row.last_support_ticket || "";
  const churn = row.Churn !== undefined ? row.Churn : (row.churn !== undefined ? row.churn : null);
  const explicitSentiment = row.Sentiment ?? row.sentiment ?? row.Ticket_Sentiment ?? row.ticket_sentiment ?? null;

  const engagement = computeEngagementSignal(loginFreq, dailyMins);
  const sentiment = computeSentimentSignal(ticket, explicitSentiment);
  const severity = determineSeverityTier(engagement, sentiment);

  return {
    Customer_ID: String(custId),
    Name: String(name),
    Email: String(email),
    Login_Frequency: String(loginFreq),
    Daily_Usage_Mins: parseFloat(dailyMins) || 0,
    Last_Support_Ticket: String(ticket),
    Churn: churn !== null ? parseInt(churn, 10) : null,
    engagement_level: engagement,
    sentiment_level: sentiment,
    severity_tier: severity,
    raw_signal_values: {
      Login_Frequency: String(loginFreq),
      Daily_Usage_Mins: parseFloat(dailyMins) || 0,
      Last_Support_Ticket: String(ticket)
    }
  };
}

/**
 * Scores an array of customer records.
 */
export function scoreDataset(records) {
  return records.map(record => scoreCustomer(record));
}
