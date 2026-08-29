"""
severity_scoring.py
===================
Churn Risk Severity Scoring Module for SaaS Customer Success Managers.

This module assesses customer churn risk using a 2-signal corroboration framework:
1. Signal 1 (Engagement): Combines `Login_Frequency` and `Daily_Usage_Mins` into a single
   engagement dimension to prevent double-counting identical behavioral usage.
2. Signal 2 (Ticket Sentiment): Categorizes `Last_Support_Ticket` text into negative,
   neutral, or positive sentiment based on empirical support interaction patterns.

The 3-Tier Corroboration Framework:
-------------------------------------
- URGENT: Both signals align negatively (`engagement == "weak"` AND `sentiment == "negative"`).
  Extreme churn probability (80.7%); requires immediate CSM crisis intervention.
- WATCH: The ambiguous middle ground (`engagement == "moderate"` AND `sentiment == "neutral"`).
  Accounts with intermediate engagement exhibiting a 19.1% churn rate.
- NONE: Everything else (`weak + neutral/positive/unknown`, `strong + neutral/positive/unknown`, `moderate + positive/unknown`).
  Empirically represents the baseline / low-risk account population (15.4% aggregate churn).

Note:
-----
The `Churn` column is strictly excluded from scoring logic to prevent target leakage.
`Account_Age_Days` is excluded because it does not meaningfully correlate with churn.
"""

import logging
from typing import Any, Dict, List, Optional, Union

# Set up logging for unknown templates and diagnostics
logger = logging.getLogger(__name__)
if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)

# =============================================================================
# 18 EMPIRICALLY CONFIRMED SUPPORT TICKET TEMPLATES
# =============================================================================

NEGATIVE_TEMPLATES = {
    # Downtime frustration
    "I'm very frustrated with the downtime. This is unacceptable.",
    # Direct cancellation intent
    "I've been waiting for support for 3 days. I'm cancelling.",
    # Software stability / blocking bugs
    "The app crashes every time I try to upload a CSV.",
    # Usability & UX friction
    "The UI is too confusing. I can't find the export button.",
    # Technical documentation blocker
    "Your API documentation is outdated and full of errors.",
    # Commercial / pricing dispute
    "Why did my subscription price increase without notice?",
}

NEUTRAL_TEMPLATES = {
    # Standard account operations
    "How do I change my password?",
    # Administrative updates
    "I need to update my billing address.",
    # Feature onboarding & enablement
    "Is there a tutorial for the new dashboard feature?",
    # Operational inquiry
    "When will the maintenance window end?",
    # Account expansion / seat management
    "Can I add more seats to my current plan?",
    # Routine financial inquiry
    "Just checking if my payment went through.",
}

POSITIVE_TEMPLATES = {
    # Customer service appreciation
    "Customer support was super helpful yesterday. Thanks!",
    # Core value realization / productivity gain
    "This tool has saved my team so much time.",
    # Successful workflow adoption / integrations
    "The integration with Slack works perfectly.",
    # Specific feature love
    "I love the new analytics feature! Great job.",
    # General satisfaction
    "Smooth experience so far, no complaints.",
    # Tier expansion enthusiasm
    "Just upgraded to the Pro plan, excited to use it.",
}

# =============================================================================
# FREE-TEXT FALLBACK LEXICON (for real tickets that are not one of the 18)
# Matched as case-insensitive substrings. Mirrors js/scoring.js.
# =============================================================================

NEGATIVE_KEYWORDS = [
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
    "last straw", "not renewing", "won't renew", "will not renew",
]

POSITIVE_KEYWORDS = [
    "thank", "thanks", "appreciate", "love it", "love the", "love this",
    "great job", "great work", "works great", "awesome", "excellent", "fantastic",
    "brilliant", "perfect", "works perfectly", "super helpful", "very helpful",
    "really helpful", "so helpful", "life saver", "lifesaver", "saved us",
    "saved my team", "time saver", "huge time", "smooth", "seamless",
    "easy to use", "intuitive", "impressed", "happy with", "very happy",
    "really happy", "excited", "delighted", "highly recommend", "would recommend",
    "keep it up", "no complaints", "no issues", "big fan",
]

NEUTRAL_CUES = [
    "how do i", "how can i", "how to", "where do i", "where is", "when will",
    "is there a", "can i", "could you", "would it be possible", "need to update",
    "want to change", "change my", "update my", "reset my", "add more seats",
    "add seats", "upgrade my plan", "checking if", "just checking",
    "quick question", "question about", "tutorial", "documentation", "onboarding",
    "invoice", "receipt", "confirm my", "verify",
]

_SENTIMENT_ALIASES = {
    "negative": "negative", "neg": "negative", "bad": "negative", "detractor": "negative", "-1": "negative",
    "positive": "positive", "pos": "positive", "good": "positive", "promoter": "positive", "1": "positive",
    "neutral": "neutral", "neu": "neutral", "passive": "neutral", "0": "neutral",
}


def normalize_sentiment_field(value: Optional[Any]) -> Optional[str]:
    """Normalizes a pre-scored sentiment column value, or returns None if unrecognized."""
    if value is None:
        return None
    return _SENTIMENT_ALIASES.get(str(value).strip().lower())


# =============================================================================
# SIGNAL COMPUTATION FUNCTIONS
# =============================================================================

def compute_engagement_signal(login_frequency: str, daily_usage_mins: float) -> str:
    """
    Computes Signal 1: Engagement Level from Login_Frequency and Daily_Usage_Mins.

    Reasoning:
    ----------
    Login frequency and session duration are co-dependent facets of product adoption.
    A customer who rarely logs in or spends negligible time (<20 min) is disengaged
    and vulnerable to churn. Conversely, daily active users with sustained
    deep usage (>=35 min) exhibit sticky behavior.

    Rules:
    ------
    - "weak": Login_Frequency == "Rarely" OR Daily_Usage_Mins < 20
    - "strong": Login_Frequency == "Daily" AND Daily_Usage_Mins >= 35
    - "moderate": All intermediate usage patterns (e.g., Weekly logins with 20-34 min,
      Weekly with >=35 min, or Daily logins with 20-34 min).

    Parameters:
    -----------
    login_frequency : str
        Categorical frequency ("Daily", "Weekly", "Rarely").
    daily_usage_mins : float or int
        Average minutes spent in the product per day.

    Returns:
    --------
    str: "weak", "moderate", or "strong".
    """
    freq = str(login_frequency).strip()
    try:
        mins = float(daily_usage_mins)
    except (ValueError, TypeError):
        mins = 0.0

    # Rule 1: Weak engagement if logging in rarely or sub-threshold usage (<20 min)
    if freq.lower() == "rarely" or mins < 20.0:
        return "weak"

    # Rule 2: Strong engagement requires daily presence and deep usage (>=35 min)
    if freq.lower() == "daily" and mins >= 35.0:
        return "strong"

    # Rule 3: Intermediate engagement (Weekly with >=20 min, Daily with 20-34.9 min)
    return "moderate"


def compute_sentiment_signal(ticket_text: str, explicit_sentiment: Optional[Any] = None) -> str:
    """
    Computes Signal 2: Ticket Sentiment from Last_Support_Ticket text.

    Resolution order:
    -----------------
    0. An explicit pre-scored sentiment column value, if provided.
    1. Exact match against the 18 known template strings (keeps demo-set parity exact).
    2. Free-text lexicon scan for real uploaded tickets. Churn risk is asymmetric,
       so a tie between negative and positive hits resolves to "negative".

    Returns:
    --------
    str: "negative", "neutral", "positive", or "unknown".
    """
    explicit = normalize_sentiment_field(explicit_sentiment)
    if explicit:
        return explicit

    if ticket_text is None:
        return "unknown"

    text = str(ticket_text).strip()
    if not text:
        return "unknown"

    # 1. Exact template match
    if text in NEGATIVE_TEMPLATES:
        return "negative"
    if text in NEUTRAL_TEMPLATES:
        return "neutral"
    if text in POSITIVE_TEMPLATES:
        return "positive"

    # 2. Free-text lexicon fallback
    lower = text.lower()
    neg = sum(1 for kw in NEGATIVE_KEYWORDS if kw in lower)
    pos = sum(1 for kw in POSITIVE_KEYWORDS if kw in lower)

    if neg > 0 and neg >= pos:
        return "negative"
    if pos > 0:
        return "positive"
    if any(cue in lower for cue in NEUTRAL_CUES):
        return "neutral"

    logger.warning(
        f"Ticket text did not match any template or lexicon cue: '{text}'. Classifying as 'unknown'."
    )
    return "unknown"


def determine_severity_tier(engagement_level: str, sentiment_level: str) -> str:
    """
    Combines the two independent signals into an actionable 3-tier Severity Tier.

    3-Tier Corroboration Framework Logic:
    --------------------------------------
    - URGENT: Both signals align negatively (`engagement == "weak"` AND `sentiment == "negative"`).
      Multi-signal alignment yielding the highest churn rate (80.7%).
    - WATCH: The ambiguous middle ground (`engagement == "moderate"` AND `sentiment == "neutral"`).
      Represents intermediate accounts exhibiting a 19.1% churn rate.
    - NONE: Everything else (`weak + neutral/positive/unknown`, `strong + neutral/positive/unknown`, `moderate + positive/unknown`).
      Represents baseline/low-risk accounts (15.4% aggregate churn rate).

    Parameters:
    -----------
    engagement_level : str ("weak", "moderate", "strong")
    sentiment_level : str ("negative", "neutral", "positive", "unknown")

    Returns:
    --------
    str: "URGENT", "WATCH", or "NONE".
    """
    eng = str(engagement_level).lower()
    sent = str(sentiment_level).lower()

    # 1. URGENT: Weak engagement corroborated by negative sentiment (80.7% churn)
    if eng == "weak" and sent == "negative":
        return "URGENT"

    # 2. WATCH: Moderate engagement with neutral sentiment (19.1% churn, middle ground)
    if eng == "moderate" and sent == "neutral":
        return "WATCH"

    # 3. NONE: Everything else (empirically at or below baseline churn, 15.4% churn)
    return "NONE"


# =============================================================================
# PUBLIC SCORING APIS
# =============================================================================

def score_customer(row: Union[Dict[str, Any], Any]) -> Dict[str, Any]:
    """
    Computes churn risk severity for a single customer record.

    Parameters:
    -----------
    row : dict-like
        Dictionary or row object containing customer columns:
        - Customer_ID (or customer_id)
        - Name (or name)
        - Login_Frequency (or login_frequency)
        - Daily_Usage_Mins (or daily_usage_mins)
        - Last_Support_Ticket (or last_support_ticket)

    Returns:
    --------
    dict:
        {
            "customer_id": str,
            "name": str,
            "engagement_level": "weak" | "moderate" | "strong",
            "sentiment_level": "negative" | "neutral" | "positive" | "unknown",
            "severity_tier": "URGENT" | "WATCH" | "NONE",
            "raw_signal_values": {
                "Login_Frequency": str,
                "Daily_Usage_Mins": float,
                "Last_Support_Ticket": str
            }
        }
    """
    if not isinstance(row, dict):
        row_dict = dict(row)
    else:
        row_dict = row

    cust_id = row_dict.get("Customer_ID") or row_dict.get("customer_id") or ""
    name = row_dict.get("Name") or row_dict.get("name") or ""
    login_freq = row_dict.get("Login_Frequency") or row_dict.get("login_frequency") or ""
    daily_mins = (
        row_dict.get("Daily_Usage_Mins")
        if "Daily_Usage_Mins" in row_dict
        else row_dict.get("daily_usage_mins", 0)
    )
    ticket = row_dict.get("Last_Support_Ticket") or row_dict.get("last_support_ticket") or ""
    explicit_sentiment = (
        row_dict.get("Sentiment")
        or row_dict.get("sentiment")
        or row_dict.get("Ticket_Sentiment")
        or row_dict.get("ticket_sentiment")
    )

    # Compute Signal 1 & Signal 2
    engagement = compute_engagement_signal(login_freq, daily_mins)
    sentiment = compute_sentiment_signal(ticket, explicit_sentiment)

    # Compute Severity Tier
    severity = determine_severity_tier(engagement, sentiment)

    return {
        "customer_id": str(cust_id),
        "name": str(name),
        "engagement_level": engagement,
        "sentiment_level": sentiment,
        "severity_tier": severity,
        "raw_signal_values": {
            "Login_Frequency": login_freq,
            "Daily_Usage_Mins": daily_mins,
            "Last_Support_Ticket": ticket,
        },
    }


def score_dataframe(df: Any) -> Any:
    """
    Applies customer churn severity scoring across an entire DataFrame or collection.

    If pandas is available and `df` is a DataFrame, returns a new DataFrame with scored columns.
    Otherwise, returns a list of scored customer dictionaries.
    """
    try:
        import pandas as pd
        is_df = isinstance(df, pd.DataFrame)
    except ImportError:
        pd = None
        is_df = False

    if is_df:
        records = df.to_dict(orient="records")
        scored_records = [score_customer(r) for r in records]

        result_rows = []
        for orig, scored in zip(records, scored_records):
            row_data = {
                "Customer_ID": scored["customer_id"],
                "Name": scored["name"],
                "engagement_level": scored["engagement_level"],
                "sentiment_level": scored["sentiment_level"],
                "severity_tier": scored["severity_tier"],
                "Login_Frequency": scored["raw_signal_values"]["Login_Frequency"],
                "Daily_Usage_Mins": scored["raw_signal_values"]["Daily_Usage_Mins"],
                "Last_Support_Ticket": scored["raw_signal_values"]["Last_Support_Ticket"],
            }
            for k, v in orig.items():
                if k not in row_data:
                    row_data[k] = v
            result_rows.append(row_data)

        return pd.DataFrame(result_rows)
    else:
        return [score_customer(r) for r in df]
