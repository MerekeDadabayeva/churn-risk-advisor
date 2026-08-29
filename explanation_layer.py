"""
explanation_layer.py
====================
Dual-Framing Explanation & Retention Action Layer for SaaS Churn Risk Scoring.

This module provides two complementary framings of the SAME underlying reasoning
from severity_scoring.py:
1. `csm_explanation` (str): Plain-language, actionable evidence summaries for Customer
   Success Managers (CSMs), LLM-generated using claude-sonnet-4-6 with strict constraints:
   referencing actual login frequency, daily minutes, and verbatim ticket quotes, with
   ZERO invented percentages or probabilities.
2. `audit_explanation` (dict): Structured diagnostic breakdown containing raw inputs,
   exact rule fired, matched ticket theme, hardcoded historical validation benchmarks,
   and explanation_source ('llm' vs 'template_fallback').
3. `retention_action` (str): Concrete, tier-tailored action suggestions (LLM-generated
   for URGENT/WATCH accounts, and 'No action needed' for NONE).

Strict Architectural Boundaries:
- severity_scoring.py is NEVER modified. Scoring remains 100% deterministic and rule-based.
- The LLM receives verified facts as input and NEVER determines the severity tier.
- 100% reliable fallback to deterministic templates on any API error, timeout, or missing key.
- Response caching to avoid redundant API calls during triage and demo rehearsals.
"""

import hashlib
import json
import logging
import os
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

# Set up logger
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
# CONFIGURATION & CONSTANTS
# =============================================================================

MODEL_NAME = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-4-6")
LLM_TIMEOUT_SECONDS = 8.0
CACHE_FILE_PATH = Path(__file__).parent / ".llm_cache.json"

# Historical validation benchmarks (hardcoded empirical constants)
TIER_VALIDATION_NOTES = {
    "URGENT": "Tier validated by historical data: 80.7% churn rate (n=135 accounts).",
    "WATCH": "Tier validated by historical data: 19.1% churn rate (n=157 accounts).",
    "NONE": "Tier validated by historical data: 15.4% churn rate (n=208 accounts).",
}

# 5 closing sentence variations for template fallback
URGENT_CLOSING_VARIATIONS = [
    "This drop in engagement combined with a critical support complaint historically precedes account cancellation.",
    "Severe product friction in an inactive account is our strongest historical indicator of imminent churn.",
    "Without proactive CSM outreach, accounts displaying this negative ticket pattern rarely recover.",
    "When disengaged users encounter blocking issues like this, historical churn probability spikes significantly.",
    "Both behavioral usage and support sentiment have aligned negatively, placing this account in our highest-risk tier.",
]

# Ticket template semantic category mapping
TICKET_CATEGORIES = {
    # Negative
    "I'm very frustrated with the downtime. This is unacceptable.": "Downtime Frustration",
    "I've been waiting for support for 3 days. I'm cancelling.": "Support Delay / Cancellation Threat",
    "The app crashes every time I try to upload a CSV.": "Software Stability / CSV Upload Bug",
    "The UI is too confusing. I can't find the export button.": "UX / Usability Friction",
    "Your API documentation is outdated and full of errors.": "Technical Documentation / Developer Blocker",
    "Why did my subscription price increase without notice?": "Pricing / Commercial Dispute",
    # Neutral
    "How do I change my password?": "Account Security & Access",
    "I need to update my billing address.": "Billing Administration",
    "Is there a tutorial for the new dashboard feature?": "Feature Enablement & Onboarding",
    "When will the maintenance window end?": "Infrastructure Maintenance Inquiry",
    "Can I add more seats to my current plan?": "Account Expansion & Seats",
    "Just checking if my payment went through.": "Payment Verification",
    # Positive
    "Customer support was super helpful yesterday. Thanks!": "Customer Service Praise",
    "This tool has saved my team so much time.": "Productivity Value Realization",
    "The integration with Slack works perfectly.": "Workflow Integration Adoption",
    "I love the new analytics feature! Great job.": "Feature Delight",
    "Smooth experience so far, no complaints.": "General Satisfaction",
    "Just upgraded to the Pro plan, excited to use it.": "Expansion & Upgrade Enthusiasm",
}


# =============================================================================
# ENVIRONMENT & SECRETS HELPER
# =============================================================================

def _load_env_credentials() -> None:
    """
    Lightweight loader for .env or Streamlit secrets to retrieve ANTHROPIC_API_KEY
    without requiring third-party dependencies.
    """
    if "ANTHROPIC_API_KEY" in os.environ and os.environ["ANTHROPIC_API_KEY"].strip():
        return

    # Check .env in current and parent directory
    search_paths = [
        Path(__file__).parent / ".env",
        Path.cwd() / ".env",
        Path(__file__).parent / ".streamlit" / "secrets.toml",
    ]

    for p in search_paths:
        if p.exists():
            try:
                with open(p, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#"):
                            continue
                        if line.startswith("ANTHROPIC_API_KEY") and "=" in line:
                            _, val = line.split("=", 1)
                            clean_val = val.strip().strip("'\"")
                            if clean_val:
                                os.environ["ANTHROPIC_API_KEY"] = clean_val
                                return
            except Exception as e:
                logger.debug(f"Failed to read credentials from {p}: {e}")


# Load on initial import
_load_env_credentials()


# =============================================================================
# RESPONSE CACHE MANAGEMENT
# =============================================================================

_MEMORY_CACHE: Dict[str, Dict[str, str]] = {}


def _load_cache() -> None:
    """Loads cached LLM responses from local JSON file into memory."""
    global _MEMORY_CACHE
    if CACHE_FILE_PATH.exists():
        try:
            with open(CACHE_FILE_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, dict):
                    _MEMORY_CACHE = data
        except Exception as e:
            logger.warning(f"Could not load LLM cache from {CACHE_FILE_PATH}: {e}")
            _MEMORY_CACHE = {}


def _save_cache() -> None:
    """Persists memory cache to local JSON file."""
    try:
        with open(CACHE_FILE_PATH, "w", encoding="utf-8") as f:
            json.dump(_MEMORY_CACHE, f, indent=2)
    except Exception as e:
        logger.warning(f"Could not save LLM cache to {CACHE_FILE_PATH}: {e}")


# Initialize cache on import
_load_cache()


def get_cache_stats() -> Dict[str, int]:
    """Returns the count of cached LLM responses."""
    return {"cached_accounts": len(_MEMORY_CACHE)}


def clear_cache() -> None:
    """Clears both memory and disk cache (useful for testing)."""
    global _MEMORY_CACHE
    _MEMORY_CACHE = {}
    if CACHE_FILE_PATH.exists():
        try:
            CACHE_FILE_PATH.unlink()
        except Exception:
            pass


# =============================================================================
# TEMPLATE FALLBACK FUNCTIONS (PRESERVED LOGIC)
# =============================================================================

def generate_retention_action_fallback(scored_customer: Dict[str, Any]) -> str:
    """
    Template-based retention action generator (used as reliable fallback).
    """
    tier = scored_customer.get("severity_tier", "NONE")
    raw_signals = scored_customer.get("raw_signal_values")
    if not isinstance(raw_signals, dict):
        raw_signals = {}

    ticket = str(
        raw_signals.get("Last_Support_Ticket")
        or raw_signals.get("last_support_ticket")
        or scored_customer.get("Last_Support_Ticket")
        or scored_customer.get("last_support_ticket")
        or ""
    ).strip()

    if tier == "URGENT":
        ticket_lower = ticket.lower()
        if "downtime" in ticket_lower:
            return (
                "Schedule an urgent technical review call regarding recent downtime, "
                "review SLA uptime credits, and share infrastructure roadmap."
            )
        elif "cancelling" in ticket_lower or "3 days" in ticket_lower:
            return (
                "Initiate immediate executive outreach from CSM Lead to apologize for the support delay, "
                "resolve the blocker, and establish a direct escalation channel."
            )
        elif "crashes" in ticket_lower or "upload a csv" in ticket_lower:
            return (
                "Coordinate an engineer-assisted working session to inspect their CSV file format, "
                "patch the upload issue, and verify successful data ingestion."
            )
        elif "confusing" in ticket_lower or "export button" in ticket_lower:
            return (
                "Book a 15-minute 1-on-1 walkthrough to demonstrate export workflows and navigation shortcuts, "
                "and share a customized quick-start guide."
            )
        elif "api documentation" in ticket_lower:
            return (
                "Connect customer with Developer Relations / Solutions Engineering for updated API docs, "
                "working code samples, and implementation support."
            )
        elif "price increase" in ticket_lower or "subscription price" in ticket_lower:
            return (
                "Arrange a commercial alignment call to clarify billing adjustments, "
                "review plan options, and offer a grandfathered renewal rate or discount."
            )
        else:
            return (
                f"Schedule an urgent priority outreach call to directly address their recent complaint: '{ticket}'."
            )

    elif tier == "WATCH":
        ticket_lower = ticket.lower()
        if "tutorial" in ticket_lower or "dashboard" in ticket_lower:
            return (
                "Send curated dashboard tutorial video and best-practice guide, "
                "and offer an optional 10-minute feature walkthrough."
            )
        elif "seats" in ticket_lower:
            return (
                "Follow up on seat addition request with onboarding assistance for new team members."
            )
        else:
            return (
                "Send a proactive check-in email confirming their recent inquiry was resolved, "
                "and share workflow tips to help deepen weekly product usage."
            )

    else:  # NONE
        return "No action needed"


def generate_explanation_fallback(scored_customer: Dict[str, Any]) -> Dict[str, Any]:
    """
    Template-based explanation generator (used as reliable fallback).
    """
    result = dict(scored_customer)

    tier = result.get("severity_tier", "NONE")
    eng_level = result.get("engagement_level", "moderate")
    sent_level = result.get("sentiment_level", "neutral")
    raw_signals = result.get("raw_signal_values")
    if not isinstance(raw_signals, dict):
        raw_signals = {}

    login_freq = str(
        raw_signals.get("Login_Frequency")
        or raw_signals.get("login_frequency")
        or result.get("Login_Frequency")
        or result.get("login_frequency")
        or ""
    ).strip()

    if "Daily_Usage_Mins" in raw_signals:
        daily_mins = raw_signals["Daily_Usage_Mins"]
    elif "daily_usage_mins" in raw_signals:
        daily_mins = raw_signals["daily_usage_mins"]
    elif "Daily_Usage_Mins" in result:
        daily_mins = result["Daily_Usage_Mins"]
    else:
        daily_mins = result.get("daily_usage_mins", 0)

    ticket_text = str(
        raw_signals.get("Last_Support_Ticket")
        or raw_signals.get("last_support_ticket")
        or result.get("Last_Support_Ticket")
        or result.get("last_support_ticket")
        or ""
    ).strip()

    try:
        mins_val = float(daily_mins)
        mins_str = f"{mins_val:.1f}" if mins_val % 1 != 0 else f"{int(mins_val)}"
    except (ValueError, TypeError):
        mins_str = str(daily_mins)

    # 1. CSM Explanation
    if tier == "URGENT":
        cust_id_str = str(result.get("customer_id") or result.get("Customer_ID") or "")
        var_idx = int(hashlib.md5(cust_id_str.encode("utf-8")).hexdigest(), 16) % len(URGENT_CLOSING_VARIATIONS)
        closing_sentence = URGENT_CLOSING_VARIATIONS[var_idx]

        csm_explanation = (
            f"Logs in {login_freq.lower()} with ~{mins_str} min/day and their most recent ticket was: "
            f"'{ticket_text}'. {closing_sentence}"
        )
    elif tier == "WATCH":
        if login_freq.lower() == "daily":
            csm_explanation = (
                f"Logs in daily, but only ~{mins_str} min/day — lower than typical engaged usage. "
                f"Last ticket was routine: '{ticket_text}'. Worth a check-in, not urgent."
            )
        elif login_freq.lower() == "weekly":
            csm_explanation = (
                f"Logs in weekly with ~{mins_str} min/day — moderate usage with routine support activity: "
                f"'{ticket_text}'. Worth a check-in, not urgent."
            )
        else:
            csm_explanation = (
                f"Moderate usage (logs in {login_freq.lower()} with ~{mins_str} min/day), and last ticket was routine: "
                f"'{ticket_text}'. Worth a check-in, not urgent."
            )
    else:  # NONE
        if eng_level == "strong":
            csm_explanation = (
                f"Engaged (logs in {login_freq.lower()} with ~{mins_str} min/day) and no concerning signals. "
                f"Last ticket: '{ticket_text}'."
            )
        elif eng_level == "weak":
            csm_explanation = (
                f"Low usage (logs in {login_freq.lower()} with ~{mins_str} min/day) but support ticket was routine with low historical churn: "
                f"'{ticket_text}'."
            )
        else:
            csm_explanation = (
                f"Stable usage (logs in {login_freq.lower()} with ~{mins_str} min/day) and no negative friction reported. "
                f"Last ticket: '{ticket_text}'."
            )

    # 2. Audit Explanation
    matched_category = TICKET_CATEGORIES.get(ticket_text, "Routine Support Inquiry")

    if eng_level == "weak" and sent_level == "negative":
        rule_fired = "weak engagement AND negative sentiment -> URGENT"
    elif eng_level == "moderate" and sent_level == "neutral":
        rule_fired = "moderate engagement AND neutral sentiment -> WATCH"
    else:
        rule_fired = f"baseline combination ({eng_level} engagement, {sent_level} sentiment) -> NONE"

    tier_validation_note = TIER_VALIDATION_NOTES.get(
        tier, "Tier evaluated using deterministic 3-tier corroboration rules."
    )

    audit_explanation = {
        "engagement_raw": {
            "login_frequency": login_freq,
            "daily_usage_mins": daily_mins,
            "engagement_level": eng_level,
        },
        "sentiment_raw": {
            "ticket_text": ticket_text,
            "matched_category": matched_category,
            "sentiment_level": sent_level,
        },
        "rule_fired": rule_fired,
        "tier_validation_note": tier_validation_note,
        "explanation_source": "template_fallback",
    }

    # 3. Actions & Email
    retention_action = generate_retention_action_fallback(result)
    email_draft = generate_retention_email(result)

    result["csm_explanation"] = csm_explanation
    result["audit_explanation"] = audit_explanation
    result["retention_action"] = retention_action
    result["email_draft"] = email_draft

    return result


# =============================================================================
# ANTHROPIC LLM CALLER WITH STRICT CONSTRAINTS
# =============================================================================

def _call_anthropic_api(
    tier: str,
    eng_level: str,
    sent_level: str,
    login_freq: str,
    daily_mins_str: str,
    ticket_text: str,
    matched_category: str,
    api_key: Optional[str] = None,
) -> Optional[Dict[str, str]]:
    """
    Executes an Anthropic API call using claude-sonnet-4-6 with an 8-second timeout.
    Returns parsed dict with keys 'csm_explanation' and 'retention_action' or None.
    """
    _load_env_credentials()
    key = api_key or os.environ.get("ANTHROPIC_API_KEY")

    if not key or not key.strip():
        logger.debug("No ANTHROPIC_API_KEY found; skipping LLM call.")
        return None

    system_prompt = (
        "You are an expert Customer Success explanation generator for a B2B SaaS Churn Risk system.\n"
        "Your task is to generate two short pieces of text for a Customer Success Manager (CSM) based STRICTLY on verified customer data:\n\n"
        "1. `csm_explanation`: 1-2 concise, plain-language sentences summarizing the evidence for the CSM.\n"
        f"   - MUST explicitly mention the customer's actual login frequency ('{login_freq}') and daily usage minutes (~{daily_mins_str} min/day).\n"
        f"   - MUST quote their verbatim support ticket text in single or double quotes.\n"
        "   - MUST NOT state any percentage, probability, or numerical confidence score (e.g. NEVER state '80% churn risk', 'X% probability', or calibrated odds). The underlying scoring system is deterministic and rule-based, not an uncalibrated black-box model.\n\n"
        "2. `retention_action`: A short, concrete, practical retention action tailored specifically to the customer's support complaint/inquiry.\n\n"
        "Respond ONLY with a valid JSON object matching this exact schema:\n"
        "{\n"
        '  "csm_explanation": "1-2 plain-language sentences quoting the ticket and citing exact usage.",\n'
        '  "retention_action": "Specific action tailored to the complaint/inquiry."\n'
        "}"
    )

    user_prompt = (
        f"Verified Customer Account Signals:\n"
        f"- Severity Tier: {tier} (Deterministic Fact — do not alter)\n"
        f"- Behavioral Engagement: {eng_level} (Login Frequency: {login_freq}, Daily Usage: {daily_mins_str} min/day)\n"
        f"- Ticket Sentiment: {sent_level} (Category: {matched_category})\n"
        f"- Verbatim Support Ticket: \"{ticket_text}\"\n\n"
        f"Generate the JSON response with 'csm_explanation' and 'retention_action'."
    )

    payload = {
        "model": MODEL_NAME,
        "max_tokens": 350,
        "temperature": 0.2,
        "system": system_prompt,
        "messages": [
            {"role": "user", "content": user_prompt}
        ],
    }

    try:
        # Check if anthropic SDK is installed
        try:
            import anthropic
            client = anthropic.Anthropic(api_key=key, timeout=LLM_TIMEOUT_SECONDS)
            response = client.messages.create(
                model=MODEL_NAME,
                max_tokens=350,
                temperature=0.2,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}],
            )
            raw_text = ""
            for block in response.content:
                if getattr(block, "type", None) == "text":
                    raw_text += getattr(block, "text", "")
                elif isinstance(block, dict) and block.get("type") == "text":
                    raw_text += block.get("text", "")
        except ImportError:
            # Fall back to zero-dependency urllib HTTP request with robust SSL context
            import ssl
            try:
                import certifi
                ssl_ctx = ssl.create_default_context(cafile=certifi.where())
            except Exception:
                try:
                    ssl_ctx = ssl.create_default_context()
                except Exception:
                    ssl_ctx = ssl._create_unverified_context()

            req_data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(
                "https://api.anthropic.com/v1/messages",
                data=req_data,
                headers={
                    "x-api-key": key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                method="POST",
            )
            try:
                with urllib.request.urlopen(req, timeout=LLM_TIMEOUT_SECONDS, context=ssl_ctx) as resp:
                    resp_json = json.loads(resp.read().decode("utf-8"))
            except urllib.error.URLError as u_err:
                if "CERTIFICATE_VERIFY_FAILED" in str(u_err):
                    unverified_ctx = ssl._create_unverified_context()
                    with urllib.request.urlopen(req, timeout=LLM_TIMEOUT_SECONDS, context=unverified_ctx) as resp:
                        resp_json = json.loads(resp.read().decode("utf-8"))
                else:
                    raise

            raw_text = ""
            for block in resp_json.get("content", []):
                if block.get("type") == "text":
                    raw_text += block.get("text", "")

        # Parse JSON response
        text = raw_text.strip()
        if "```json" in text:
            text = text.split("```json", 1)[1].split("```", 1)[0].strip()
        elif "```" in text:
            text = text.split("```", 1)[1].split("```", 1)[0].strip()

        parsed = json.loads(text)
        csm_explanation = parsed.get("csm_explanation", "").strip()
        retention_action = parsed.get("retention_action", "").strip()

        if csm_explanation and retention_action:
            return {
                "csm_explanation": csm_explanation,
                "retention_action": retention_action,
            }
        else:
            logger.warning(f"Incomplete JSON output from LLM: {parsed}")
            return None

    except Exception as e:
        logger.warning(f"Anthropic API call failed ({type(e).__name__}: {e}); falling back to template.")
        return None


def _get_llm_explanation_and_action(scored_customer: Dict[str, Any]) -> Optional[Dict[str, str]]:
    """
    Fetches explanation and action from response cache or executes an LLM call.
    """
    cust_id = str(scored_customer.get("customer_id") or scored_customer.get("Customer_ID") or "").strip()
    tier = scored_customer.get("severity_tier", "NONE")
    eng_level = scored_customer.get("engagement_level", "moderate")
    sent_level = scored_customer.get("sentiment_level", "neutral")

    raw_signals = scored_customer.get("raw_signal_values")
    if not isinstance(raw_signals, dict):
        raw_signals = {}

    login_freq = str(
        raw_signals.get("Login_Frequency")
        or raw_signals.get("login_frequency")
        or scored_customer.get("Login_Frequency")
        or scored_customer.get("login_frequency")
        or ""
    ).strip()

    if "Daily_Usage_Mins" in raw_signals:
        daily_mins = raw_signals["Daily_Usage_Mins"]
    elif "daily_usage_mins" in raw_signals:
        daily_mins = raw_signals["daily_usage_mins"]
    elif "Daily_Usage_Mins" in scored_customer:
        daily_mins = scored_customer["Daily_Usage_Mins"]
    else:
        daily_mins = scored_customer.get("daily_usage_mins", 0)

    ticket_text = str(
        raw_signals.get("Last_Support_Ticket")
        or raw_signals.get("last_support_ticket")
        or scored_customer.get("Last_Support_Ticket")
        or scored_customer.get("last_support_ticket")
        or ""
    ).strip()

    try:
        mins_val = float(daily_mins)
        mins_str = f"{mins_val:.1f}" if mins_val % 1 != 0 else f"{int(mins_val)}"
    except (ValueError, TypeError):
        mins_str = str(daily_mins)

    matched_category = TICKET_CATEGORIES.get(ticket_text, "Routine Support Inquiry")

    # Cache key: customer_id + tier + ticket digest for cache safety
    ticket_hash = hashlib.md5(ticket_text.encode("utf-8")).hexdigest()[:8]
    cache_key = f"{cust_id}:{tier}:{ticket_hash}" if cust_id else f"{tier}:{ticket_hash}:{mins_str}"

    if cache_key in _MEMORY_CACHE:
        return _MEMORY_CACHE[cache_key]

    # Call Anthropic API
    result = _call_anthropic_api(
        tier=tier,
        eng_level=eng_level,
        sent_level=sent_level,
        login_freq=login_freq,
        daily_mins_str=mins_str,
        ticket_text=ticket_text,
        matched_category=matched_category,
    )

    if result:
        _MEMORY_CACHE[cache_key] = result
        _save_cache()

    return result


# =============================================================================
# RETENTION EMAIL GENERATOR
# =============================================================================

def generate_retention_email(scored_customer: Dict[str, Any]) -> str:
    """
    Generates a personalized, context-aware retention email draft tailored
    to the customer's specific support friction, name, and usage context.
    """
    tier = scored_customer.get("severity_tier", "NONE")
    raw_signals = scored_customer.get("raw_signal_values")
    if not isinstance(raw_signals, dict):
        raw_signals = {}

    name = str(
        scored_customer.get("Name")
        or scored_customer.get("name")
        or "there"
    ).split()[0]

    ticket = str(
        raw_signals.get("Last_Support_Ticket")
        or raw_signals.get("last_support_ticket")
        or scored_customer.get("Last_Support_Ticket")
        or scored_customer.get("last_support_ticket")
        or ""
    ).strip()

    if tier == "URGENT":
        ticket_lower = ticket.lower()
        if "downtime" in ticket_lower:
            return (
                f"Subject: Important update regarding recent platform availability\n\n"
                f"Hi {name},\n\n"
                f"I'm reaching out directly from our Customer Success team. I noticed your recent ticket regarding downtime, "
                f"and I want to sincerely apologize for the disruption this caused to your workflow.\n\n"
                f"Reliability is our top priority. I'd like to schedule a brief 10-minute sync to review our root-cause "
                f"analysis, discuss our infrastructure safeguards, and apply the appropriate SLA uptime credits to your account.\n\n"
                f"Are you available for a quick call this week?\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        elif "cancelling" in ticket_lower or "3 days" in ticket_lower:
            return (
                f"Subject: Urgent follow-up regarding your support ticket\n\n"
                f"Hi {name},\n\n"
                f"I saw your recent message regarding the 3-day support delay. Waiting this long for assistance is unacceptable, "
                f"and I am truly sorry for the frustration this has caused.\n\n"
                f"I have taken personal ownership of your ticket and escalated it directly to our technical lead. "
                f"I'd love to connect with you today to ensure this is completely resolved and discuss how we can make this right.\n\n"
                f"Please let me know a time that works best, or feel free to reply directly here.\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        elif "crashes" in ticket_lower or "upload a csv" in ticket_lower:
            return (
                f"Subject: Dedicated engineering assistance for your CSV upload\n\n"
                f"Hi {name},\n\n"
                f"I noticed you ran into an issue where the app crashed during a CSV upload. "
                f"I want to make sure your data ingestion runs smoothly without blocking your daily work.\n\n"
                f"I'd like to set up a quick 15-minute screen share with one of our solutions engineers to inspect "
                f"the file structure and deploy a fix immediately.\n\n"
                f"Would tomorrow morning or afternoon work better for a quick working session?\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        elif "confusing" in ticket_lower or "export button" in ticket_lower:
            return (
                f"Subject: Quick guide & 1-on-1 walkthrough for export workflows\n\n"
                f"Hi {name},\n\n"
                f"I saw your note regarding difficulty locating the export button in our new interface. "
                f"We want to ensure your daily workflows feel seamless and intuitive.\n\n"
                f"I've attached a 1-page quick-reference guide highlighting all export paths. I'd also be happy to hop on "
                f"a 10-minute video walkthrough to answer any questions and show you navigation shortcuts.\n\n"
                f"Let me know if you'd like to sync this week!\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        elif "api documentation" in ticket_lower:
            return (
                f"Subject: Updated API documentation & developer support\n\n"
                f"Hi {name},\n\n"
                f"Thank you for your feedback regarding our API documentation. We have recently rolled out updated "
                f"reference endpoints, code snippets, and a complete Postman collection.\n\n"
                f"I'd be glad to share these resources and connect you with our developer relations engineer to help "
                f"unblock your implementation.\n\n"
                f"Would you be open to a quick technical sync this week?\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        elif "price increase" in ticket_lower or "subscription price" in ticket_lower:
            return (
                f"Subject: Reviewing your subscription plan & pricing options\n\n"
                f"Hi {name},\n\n"
                f"I'm reaching out regarding your inquiry about recent subscription pricing adjustments. "
                f"I want to make sure you have complete clarity on your account terms and options.\n\n"
                f"I'd love to schedule a brief commercial alignment call to review your current utilization and explore "
                f"grandfathered renewal options tailored to your team's budget.\n\n"
                f"Let me know what day works best for a quick conversation.\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        else:
            return (
                f"Subject: Priority follow-up on your account feedback\n\n"
                f"Hi {name},\n\n"
                f"I'm checking in regarding your recent feedback: '{ticket}'. "
                f"We want to make sure you're getting maximum value from our platform and that any blockers are resolved immediately.\n\n"
                f"Could we schedule a quick 10-minute check-in call this week to ensure everything is running smoothly?\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )

    elif tier == "WATCH":
        ticket_lower = ticket.lower()
        if "tutorial" in ticket_lower or "dashboard" in ticket_lower:
            return (
                f"Subject: New dashboard tutorial & workflow tips\n\n"
                f"Hi {name},\n\n"
                f"I saw your recent question regarding our new dashboard features. We've put together a concise "
                f"3-minute video tutorial and best-practice cheat sheet to help your team get the most out of it.\n\n"
                f"Feel free to check it out, and let me know if you'd like a quick live walkthrough!\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        elif "seats" in ticket_lower:
            return (
                f"Subject: Adding team members & onboarding assistance\n\n"
                f"Hi {name},\n\n"
                f"I noticed your inquiry about adding more seats to your plan. We're excited to see your team expanding!\n\n"
                f"I'd be happy to assist with the provisioning and provide an onboarding enablement session for your new team members.\n\n"
                f"Let me know if you'd like to coordinate this week.\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        else:
            return (
                f"Subject: Checking in on your recent support inquiry\n\n"
                f"Hi {name},\n\n"
                f"I wanted to follow up and make sure your recent question was resolved to your satisfaction.\n\n"
                f"If there's anything else you or your team need assistance with, please don't hesitate to reach out. "
                f"We're always here to help!\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )

    else:  # NONE
        return "No outreach draft required. Account is healthy with strong engagement and positive sentiment."


# =============================================================================
# PUBLIC RETENTION ACTION & EXPLANATION APIS
# =============================================================================

def generate_retention_action(scored_customer: Dict[str, Any]) -> str:
    """
    Generates a concrete, drafted retention action tailored to the customer's severity tier.
    - URGENT/WATCH: Generates via LLM (or response cache), with automatic template fallback.
    - NONE: Returns 'No action needed' immediately without LLM invocation.
    """
    tier = scored_customer.get("severity_tier", "NONE")
    if tier == "NONE":
        return "No action needed"

    llm_res = _get_llm_explanation_and_action(scored_customer)
    if llm_res and "retention_action" in llm_res and llm_res["retention_action"]:
        return llm_res["retention_action"]

    return generate_retention_action_fallback(scored_customer)


def generate_explanation(scored_customer: Dict[str, Any]) -> Dict[str, Any]:
    """
    Enriches a scored customer record with dual-framing explanations, retention actions,
    and ready-to-send personalized email drafts.

    - For NONE accounts: fast deterministic path (no LLM call, saves API tokens).
    - For URGENT/WATCH accounts: LLM-powered with strict prompt constraints, caching, and fallback.
    """
    result = dict(scored_customer)

    tier = result.get("severity_tier", "NONE")
    eng_level = result.get("engagement_level", "moderate")
    sent_level = result.get("sentiment_level", "neutral")
    raw_signals = result.get("raw_signal_values")
    if not isinstance(raw_signals, dict):
        raw_signals = {}

    login_freq = str(
        raw_signals.get("Login_Frequency")
        or raw_signals.get("login_frequency")
        or result.get("Login_Frequency")
        or result.get("login_frequency")
        or ""
    ).strip()

    if "Daily_Usage_Mins" in raw_signals:
        daily_mins = raw_signals["Daily_Usage_Mins"]
    elif "daily_usage_mins" in raw_signals:
        daily_mins = raw_signals["daily_usage_mins"]
    elif "Daily_Usage_Mins" in result:
        daily_mins = result["Daily_Usage_Mins"]
    else:
        daily_mins = result.get("daily_usage_mins", 0)

    ticket_text = str(
        raw_signals.get("Last_Support_Ticket")
        or raw_signals.get("last_support_ticket")
        or result.get("Last_Support_Ticket")
        or result.get("last_support_ticket")
        or ""
    ).strip()

    try:
        mins_val = float(daily_mins)
        mins_str = f"{mins_val:.1f}" if mins_val % 1 != 0 else f"{int(mins_val)}"
    except (ValueError, TypeError):
        mins_str = str(daily_mins)

    matched_category = TICKET_CATEGORIES.get(ticket_text, "Routine Support Inquiry")

    if eng_level == "weak" and sent_level == "negative":
        rule_fired = "weak engagement AND negative sentiment -> URGENT"
    elif eng_level == "moderate" and sent_level == "neutral":
        rule_fired = "moderate engagement AND neutral sentiment -> WATCH"
    else:
        rule_fired = f"baseline combination ({eng_level} engagement, {sent_level} sentiment) -> NONE"

    tier_validation_note = TIER_VALIDATION_NOTES.get(
        tier, "Tier evaluated using deterministic 3-tier corroboration rules."
    )

    # Fast path for NONE tier: no LLM call needed
    if tier == "NONE":
        fallback_enriched = generate_explanation_fallback(result)
        result["csm_explanation"] = fallback_enriched["csm_explanation"]
        result["retention_action"] = "No action needed"
        result["email_draft"] = generate_retention_email(result)
        result["audit_explanation"] = {
            "engagement_raw": {
                "login_frequency": login_freq,
                "daily_usage_mins": daily_mins,
                "engagement_level": eng_level,
            },
            "sentiment_raw": {
                "ticket_text": ticket_text,
                "matched_category": matched_category,
                "sentiment_level": sent_level,
            },
            "rule_fired": rule_fired,
            "tier_validation_note": tier_validation_note,
            "explanation_source": "template_fallback",
        }
        return result

    # For URGENT and WATCH: Attempt LLM generation
    llm_res = _get_llm_explanation_and_action(result)

    if llm_res and "csm_explanation" in llm_res and "retention_action" in llm_res:
        csm_explanation = llm_res["csm_explanation"]
        retention_action = llm_res["retention_action"]
        explanation_source = "llm"
    else:
        fallback_enriched = generate_explanation_fallback(result)
        csm_explanation = fallback_enriched["csm_explanation"]
        retention_action = generate_retention_action_fallback(result)
        explanation_source = "template_fallback"

    audit_explanation = {
        "engagement_raw": {
            "login_frequency": login_freq,
            "daily_usage_mins": daily_mins,
            "engagement_level": eng_level,
        },
        "sentiment_raw": {
            "ticket_text": ticket_text,
            "matched_category": matched_category,
            "sentiment_level": sent_level,
        },
        "rule_fired": rule_fired,
        "tier_validation_note": tier_validation_note,
        "explanation_source": explanation_source,
    }

    result["csm_explanation"] = csm_explanation
    result["audit_explanation"] = audit_explanation
    result["retention_action"] = retention_action
    result["email_draft"] = generate_retention_email(result)

    return result


# =============================================================================
# BATCH APPLICATION FUNCTION
# =============================================================================

def apply_explanations(scored_df: Any) -> Any:
    """
    Applies explanation generation and retention action drafting across a collection
    or DataFrame of scored customer records.
    """
    try:
        import pandas as pd
        is_df = isinstance(scored_df, pd.DataFrame)
    except ImportError:
        pd = None
        is_df = False

    if is_df:
        records = scored_df.to_dict(orient="records")
        enriched = [generate_explanation(r) for r in records]
        return pd.DataFrame(enriched)
    else:
        return [generate_explanation(r) for r in scored_df]

