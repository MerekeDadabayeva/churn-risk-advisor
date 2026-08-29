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
 */
export function computeSentimentSignal(ticketText) {
  if (!ticketText) {
    return "unknown";
  }
  const text = String(ticketText).trim();

  if (NEGATIVE_TEMPLATES.has(text)) {
    return "negative";
  }
  if (NEUTRAL_TEMPLATES.has(text)) {
    return "neutral";
  }
  if (POSITIVE_TEMPLATES.has(text)) {
    return "positive";
  }

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

  const engagement = computeEngagementSignal(loginFreq, dailyMins);
  const sentiment = computeSentimentSignal(ticket);
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
