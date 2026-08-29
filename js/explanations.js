/**
 * explanations.js
 * ===============
 * Dual-Framing Explanation & Retention Action Engine for Churn Risk Advisor.
 *
 * Provides:
 * 1. Plain-language CSM summaries quoting real usage metrics and ticket quotes.
 * 2. Deterministic audit trails with raw vectors, rules fired, and empirical benchmarks.
 * 3. Specific retention playbooks (6 Urgent playbooks, 3 Watch check-ins).
 * 4. Context-aware personalized email drafts with 1-click copy capability.
 */

// Historical Validation Benchmarks
export const TIER_VALIDATION_NOTES = {
  URGENT: "Tier validated by historical data: 80.7% churn rate (n=135 accounts).",
  WATCH: "Tier validated by historical data: 19.1% churn rate (n=157 accounts).",
  NONE: "Tier validated by historical data: 15.4% churn rate (n=208 accounts)."
};

export const URGENT_CLOSING_VARIATIONS = [
  "This drop in engagement combined with a critical support complaint historically precedes account cancellation.",
  "Severe product friction in an inactive account is our strongest historical indicator of imminent churn.",
  "Without proactive CSM outreach, accounts displaying this negative ticket pattern rarely recover.",
  "When disengaged users encounter blocking issues like this, historical churn probability spikes significantly.",
  "Both behavioral usage and support sentiment have aligned negatively, placing this account in our highest-risk tier."
];

// Semantic Category Mapping for 18 Empirical Templates
export const TICKET_CATEGORIES = {
  // Negative
  "I'm very frustrated with the downtime. This is unacceptable.": "Downtime Frustration",
  "I've been waiting for support for 3 days. I'm cancelling.": "Support Delay / Cancellation Threat",
  "The app crashes every time I try to upload a CSV.": "Software Stability / CSV Upload Bug",
  "The UI is too confusing. I can't find the export button.": "UX / Usability Friction",
  "Your API documentation is outdated and full of errors.": "Technical Documentation / Developer Blocker",
  "Why did my subscription price increase without notice?": "Pricing / Commercial Dispute",
  // Neutral
  "How do I change my password?": "Account Security & Access",
  "I need to update my billing address.": "Billing Administration",
  "Is there a tutorial for the new dashboard feature?": "Feature Enablement & Onboarding",
  "When will the maintenance window end?": "Infrastructure Maintenance Inquiry",
  "Can I add more seats to my current plan?": "Account Expansion & Seats",
  "Just checking if my payment went through.": "Payment Verification",
  // Positive
  "Customer support was super helpful yesterday. Thanks!": "Customer Service Praise",
  "This tool has saved my team so much time.": "Productivity Value Realization",
  "The integration with Slack works perfectly.": "Workflow Integration Adoption",
  "I love the new analytics feature! Great job.": "Feature Delight",
  "Smooth experience so far, no complaints.": "General Satisfaction",
  "Just upgraded to the Pro plan, excited to use it.": "Expansion & Upgrade Enthusiasm"
};

/**
 * Standard compact MD5 implementation for 100% hash parity with Python hashlib.md5
 */
function md5(string) {
  function rotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function addUnsigned(lX, lY) {
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  }
  function F(x, y, z) { return (x & y) | (~x & z); }
  function G(x, y, z) { return (x & z) | (y & ~z); }
  function H(x, y, z) { return x ^ y ^ z; }
  function I(x, y, z) { return y ^ (x | ~z); }

  function FF(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function GG(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function HH(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function II(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str) {
    let lWordCount;
    const lMessageLength = str.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    const lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  function wordToHex(lValue) {
    let wordToHexValue = "", wordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = "0" + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  }

  const x = convertToWordArray(string);
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);

    a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);

    a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);

    a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

/**
 * Generates concrete drafted retention action tailored to the customer's severity tier.
 */
export function generateRetentionAction(scoredCustomer) {
  const tier = scoredCustomer.severity_tier || "NONE";
  const rawSignals = scoredCustomer.raw_signal_values || {};
  const ticket = String(rawSignals.Last_Support_Ticket || scoredCustomer.Last_Support_Ticket || "").trim();
  const ticketLower = ticket.toLowerCase();

  if (tier === "URGENT") {
    if (ticketLower.includes("downtime")) {
      return "Schedule an urgent technical review call regarding recent downtime, review SLA uptime credits, and share infrastructure roadmap.";
    } else if (ticketLower.includes("cancelling") || ticketLower.includes("3 days")) {
      return "Initiate immediate executive outreach from CSM Lead to apologize for the support delay, resolve the blocker, and establish a direct escalation channel.";
    } else if (ticketLower.includes("crashes") || ticketLower.includes("upload a csv")) {
      return "Coordinate an engineer-assisted working session to inspect their CSV file format, patch the upload issue, and verify successful data ingestion.";
    } else if (ticketLower.includes("confusing") || ticketLower.includes("export button")) {
      return "Book a 15-minute 1-on-1 walkthrough to demonstrate export workflows and navigation shortcuts, and share a customized quick-start guide.";
    } else if (ticketLower.includes("api documentation")) {
      return "Connect customer with Developer Relations / Solutions Engineering for updated API docs, working code samples, and implementation support.";
    } else if (ticketLower.includes("price increase") || ticketLower.includes("subscription price")) {
      return "Arrange a commercial alignment call to clarify billing adjustments, review plan options, and offer a grandfathered renewal rate or discount.";
    } else {
      return `Schedule an urgent priority outreach call to directly address their recent complaint: '${ticket}'.`;
    }
  } else if (tier === "WATCH") {
    if (ticketLower.includes("tutorial") || ticketLower.includes("dashboard")) {
      return "Send curated dashboard tutorial video and best-practice guide, and offer an optional 10-minute feature walkthrough.";
    } else if (ticketLower.includes("seats")) {
      return "Follow up on seat addition request with onboarding assistance for new team members.";
    } else {
      return "Send a proactive check-in email confirming their recent inquiry was resolved, and share workflow tips to help deepen weekly product usage.";
    }
  } else {
    return "No action needed";
  }
}

/**
 * Generates a context-aware retention email draft.
 */
export function generateRetentionEmail(scoredCustomer) {
  const tier = scoredCustomer.severity_tier || "NONE";
  const rawSignals = scoredCustomer.raw_signal_values || {};
  const fullName = String(scoredCustomer.Name || "there").trim();
  const firstName = fullName.split(" ")[0] || "there";
  const ticket = String(rawSignals.Last_Support_Ticket || scoredCustomer.Last_Support_Ticket || "").trim();
  const ticketLower = ticket.toLowerCase();

  if (tier === "URGENT") {
    if (ticketLower.includes("downtime")) {
      return `Subject: Important update regarding recent platform availability

Hi ${firstName},

I'm reaching out directly from our Customer Success team. I noticed your recent ticket regarding downtime, and I want to sincerely apologize for the disruption this caused to your workflow.

Reliability is our top priority. I'd like to schedule a brief 10-minute sync to review our root-cause analysis, discuss our infrastructure safeguards, and apply the appropriate SLA uptime credits to your account.

Are you available for a quick call this week?

Best regards,
Your Customer Success Team`;
    } else if (ticketLower.includes("cancelling") || ticketLower.includes("3 days")) {
      return `Subject: Urgent follow-up regarding your support ticket

Hi ${firstName},

I saw your recent message regarding the 3-day support delay. Waiting this long for assistance is unacceptable, and I am truly sorry for the frustration this has caused.

I have taken personal ownership of your ticket and escalated it directly to our technical lead. I'd love to connect with you today to ensure this is completely resolved and discuss how we can make this right.

Please let me know a time that works best, or feel free to reply directly here.

Best regards,
Your Customer Success Team`;
    } else if (ticketLower.includes("crashes") || ticketLower.includes("upload a csv")) {
      return `Subject: Dedicated engineering assistance for your CSV upload

Hi ${firstName},

I noticed you ran into an issue where the app crashed during a CSV upload. I want to make sure your data ingestion runs smoothly without blocking your daily work.

I'd like to set up a quick 15-minute screen share with one of our solutions engineers to inspect the file structure and deploy a fix immediately.

Would tomorrow morning or afternoon work better for a quick working session?

Best regards,
Your Customer Success Team`;
    } else if (ticketLower.includes("confusing") || ticketLower.includes("export button")) {
      return `Subject: Quick guide & 1-on-1 walkthrough for export workflows

Hi ${firstName},

I saw your note regarding difficulty locating the export button in our new interface. We want to ensure your daily workflows feel seamless and intuitive.

I've attached a 1-page quick-reference guide highlighting all export paths. I'd also be happy to hop on a 10-minute video walkthrough to answer any questions and show you navigation shortcuts.

Let me know if you'd like to sync this week!

Best regards,
Your Customer Success Team`;
    } else if (ticketLower.includes("api documentation")) {
      return `Subject: Updated API documentation & developer support

Hi ${firstName},

Thank you for your feedback regarding our API documentation. We have recently rolled out updated reference endpoints, code snippets, and a complete Postman collection.

I'd be glad to share these resources and connect you with our developer relations engineer to help unblock your implementation.

Would you be open to a quick technical sync this week?

Best regards,
Your Customer Success Team`;
    } else if (ticketLower.includes("price increase") || ticketLower.includes("subscription price")) {
      return `Subject: Reviewing your subscription plan & pricing options

Hi ${firstName},

I'm reaching out regarding your inquiry about recent subscription pricing adjustments. I want to make sure you have complete clarity on your account terms and options.

I'd love to schedule a brief commercial alignment call to review your current utilization and explore grandfathered renewal options tailored to your team's budget.

Let me know what day works best for a quick conversation.

Best regards,
Your Customer Success Team`;
    } else {
      return `Subject: Priority follow-up on your account feedback

Hi ${firstName},

I'm checking in regarding your recent feedback: '${ticket}'. We want to make sure you're getting maximum value from our platform and that any blockers are resolved immediately.

Could we schedule a quick 10-minute check-in call this week to ensure everything is running smoothly?

Best regards,
Your Customer Success Team`;
    }
  } else if (tier === "WATCH") {
    if (ticketLower.includes("tutorial") || ticketLower.includes("dashboard")) {
      return `Subject: New dashboard tutorial & workflow tips

Hi ${firstName},

I saw your recent question regarding our new dashboard features. We've put together a concise 3-minute video tutorial and best-practice cheat sheet to help your team get the most out of it.

Feel free to check it out, and let me know if you'd like a quick live walkthrough!

Best regards,
Your Customer Success Team`;
    } else if (ticketLower.includes("seats")) {
      return `Subject: Adding team members & onboarding assistance

Hi ${firstName},

I noticed your inquiry about adding more seats to your plan. We're excited to see your team expanding!

I'd be happy to assist with the provisioning and provide an onboarding enablement session for your new team members.

Let me know if you'd like to coordinate this week.

Best regards,
Your Customer Success Team`;
    } else {
      return `Subject: Checking in on your recent support inquiry

Hi ${firstName},

I wanted to follow up and make sure your recent question was resolved to your satisfaction.

If there's anything else you or your team need assistance with, please don't hesitate to reach out. We're always here to help!

Best regards,
Your Customer Success Team`;
    }
  } else {
    return "No outreach draft required. Account is healthy with strong engagement and positive sentiment.";
  }
}

/**
 * Enriches a scored customer with plain-language explanations, audit trail, playbook, and email draft.
 */
export function generateExplanation(scoredCustomer) {
  const result = { ...scoredCustomer };
  const tier = result.severity_tier || "NONE";
  const engLevel = result.engagement_level || "moderate";
  const sentLevel = result.sentiment_level || "neutral";
  const rawSignals = result.raw_signal_values || {};

  const loginFreq = String(
    rawSignals.Login_Frequency || result.Login_Frequency || ""
  ).trim();

  const dailyMins = rawSignals.Daily_Usage_Mins !== undefined
    ? rawSignals.Daily_Usage_Mins
    : (result.Daily_Usage_Mins !== undefined ? result.Daily_Usage_Mins : 0);

  const ticketText = String(
    rawSignals.Last_Support_Ticket || result.Last_Support_Ticket || ""
  ).trim();

  const minsNum = parseFloat(dailyMins) || 0;
  const minsStr = minsNum % 1 !== 0 ? minsNum.toFixed(1) : String(Math.round(minsNum));

  // 1. Plain-language CSM Explanation
  let csmExplanation = "";
  if (tier === "URGENT") {
    const custIdStr = String(result.Customer_ID || result.customer_id || "");
    const hashHex = md5(custIdStr);
    // Take first 8 chars of hex for integer modulo to prevent JS 64-bit float precision loss
    const hashInt = parseInt(hashHex.substring(0, 8), 16);
    const varIdx = hashInt % URGENT_CLOSING_VARIATIONS.length;
    const closingSentence = URGENT_CLOSING_VARIATIONS[varIdx];

    csmExplanation = `Logs in ${loginFreq.toLowerCase()} with ~${minsStr} min/day and their most recent ticket was: '${ticketText}'. ${closingSentence}`;
  } else if (tier === "WATCH") {
    if (loginFreq.toLowerCase() === "daily") {
      csmExplanation = `Logs in daily, but only ~${minsStr} min/day — lower than typical engaged usage. Last ticket was routine: '${ticketText}'. Worth a check-in, not urgent.`;
    } else if (loginFreq.toLowerCase() === "weekly") {
      csmExplanation = `Logs in weekly with ~${minsStr} min/day — moderate usage with routine support activity: '${ticketText}'. Worth a check-in, not urgent.`;
    } else {
      csmExplanation = `Moderate usage (logs in ${loginFreq.toLowerCase()} with ~${minsStr} min/day), and last ticket was routine: '${ticketText}'. Worth a check-in, not urgent.`;
    }
  } else {
    // NONE
    if (engLevel === "strong") {
      csmExplanation = `Engaged (logs in ${loginFreq.toLowerCase()} with ~${minsStr} min/day) and no concerning signals. Last ticket: '${ticketText}'.`;
    } else if (engLevel === "weak") {
      csmExplanation = `Low usage (logs in ${loginFreq.toLowerCase()} with ~${minsStr} min/day) but support ticket was routine with low historical churn: '${ticketText}'.`;
    } else {
      csmExplanation = `Stable usage (logs in ${loginFreq.toLowerCase()} with ~${minsStr} min/day) and no negative friction reported. Last ticket: '${ticketText}'.`;
    }
  }

  // 2. Structured Audit Trail
  const matchedCategory = TICKET_CATEGORIES[ticketText] || "Routine Support Inquiry";
  let ruleFired = "";
  if (engLevel === "weak" && sentLevel === "negative") {
    ruleFired = "weak engagement AND negative sentiment -> URGENT";
  } else if (engLevel === "moderate" && sentLevel === "neutral") {
    ruleFired = "moderate engagement AND neutral sentiment -> WATCH";
  } else {
    ruleFired = `baseline combination (${engLevel} engagement, ${sentLevel} sentiment) -> NONE`;
  }

  const tierValidationNote = TIER_VALIDATION_NOTES[tier] || "Tier evaluated using deterministic 3-tier corroboration rules.";

  const auditExplanation = {
    engagement_raw: {
      login_frequency: loginFreq,
      daily_usage_mins: minsNum,
      engagement_level: engLevel
    },
    sentiment_raw: {
      ticket_text: ticketText,
      matched_category: matchedCategory,
      sentiment_level: sentLevel
    },
    rule_fired: ruleFired,
    tier_validation_note: tierValidationNote
  };

  // 3. Playbook & Email Draft
  const retentionAction = generateRetentionAction(result);
  const emailDraft = generateRetentionEmail(result);

  result.csm_explanation = csmExplanation;
  result.audit_explanation = auditExplanation;
  result.retention_action = retentionAction;
  result.email_draft = emailDraft;

  return result;
}

/**
 * Applies explanations to an array of customer records.
 */
export function applyExplanations(records) {
  return records.map(r => generateExplanation(r));
}
