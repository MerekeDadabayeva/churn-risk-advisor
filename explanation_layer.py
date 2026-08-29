"""
explanation_layer.py
====================
Dual-Framing Explanation & Retention Action Layer for SaaS Churn Risk Scoring.

This module provides two complementary framings of the SAME underlying reasoning
from severity_scoring.py:
1. `csm_explanation` (str): Non-technical, actionable evidence summaries for Customer
   Success Managers, directly quoting raw metrics and support ticket text.
2. `audit_explanation` (dict): Structured diagnostic breakdown containing raw inputs,
   exact rule fired, matched ticket theme, and hardcoded historical validation benchmarks.
3. `retention_action` (str): Concrete, tier-tailored action suggestions (with complaint-specific
   playbooks for URGENT accounts, check-ins for WATCH, and "No action needed" for NONE).

No probabilities or uncalibrated claims are made; explanations strictly reflect
the deterministic 3-tier corroboration logic.
"""

import hashlib
from typing import Any, Dict, List, Union

# =============================================================================
# HISTORICAL VALIDATION BENCHMARKS (Hardcoded empirical constants)
# =============================================================================

TIER_VALIDATION_NOTES = {
    "URGENT": "Tier validated by historical data: 80.7% churn rate (n=135 accounts).",
    "WATCH": "Tier validated by historical data: 19.1% churn rate (n=157 accounts).",
    "NONE": "Tier validated by historical data: 15.4% churn rate (n=208 accounts).",
}

# 5 genuinely differently-structured closing sentences for URGENT tier
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
# ACTION GENERATION LOGIC
# =============================================================================

def generate_retention_action(scored_customer: Dict[str, Any]) -> str:
    """
    Generates a concrete, drafted retention action tailored to the customer's severity tier.

    - URGENT: Specific complaint-driven intervention playbook directly addressing the ticket.
    - WATCH: Light-touch check-in or enablement suggestion to reinforce weekly adoption.
    - NONE: Returns 'No action needed'.
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
        if "downtime" in ticket.lower():
            return (
                "Schedule an urgent technical review call regarding recent downtime, "
                "review SLA uptime credits, and share infrastructure roadmap."
            )
        elif "cancelling" in ticket.lower() or "3 days" in ticket.lower():
            return (
                "Initiate immediate executive outreach from CSM Lead to apologize for the support delay, "
                "resolve the blocker, and establish a direct escalation channel."
            )
        elif "crashes" in ticket.lower() or "upload a csv" in ticket.lower():
            return (
                "Coordinate an engineer-assisted working session to inspect their CSV file format, "
                "patch the upload issue, and verify successful data ingestion."
            )
        elif "confusing" in ticket.lower() or "export button" in ticket.lower():
            return (
                "Book a 15-minute 1-on-1 walkthrough to demonstrate export workflows and navigation shortcuts, "
                "and share a customized quick-start guide."
            )
        elif "api documentation" in ticket.lower():
            return (
                "Connect customer with Developer Relations / Solutions Engineering for updated API docs, "
                "working code samples, and implementation support."
            )
        elif "price increase" in ticket.lower() or "subscription price" in ticket.lower():
            return (
                "Arrange a commercial alignment call to clarify billing adjustments, "
                "review plan options, and offer a grandfathered renewal rate or discount."
            )
        else:
            return (
                f"Schedule an urgent priority outreach call to directly address their recent complaint: '{ticket}'."
            )

    elif tier == "WATCH":
        if "tutorial" in ticket.lower() or "dashboard" in ticket.lower():
            return (
                "Send curated dashboard tutorial video and best-practice guide, "
                "and offer an optional 10-minute feature walkthrough."
            )
        elif "seats" in ticket.lower():
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
        if "downtime" in ticket.lower():
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
        elif "cancelling" in ticket.lower() or "3 days" in ticket.lower():
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
        elif "crashes" in ticket.lower() or "upload a csv" in ticket.lower():
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
        elif "confusing" in ticket.lower() or "export button" in ticket.lower():
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
        elif "api documentation" in ticket.lower():
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
        elif "price increase" in ticket.lower() or "subscription price" in ticket.lower():
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
        if "tutorial" in ticket.lower() or "dashboard" in ticket.lower():
            return (
                f"Subject: New dashboard tutorial & workflow tips\n\n"
                f"Hi {name},\n\n"
                f"I saw your recent question regarding our new dashboard features. We've put together a concise "
                f"3-minute video tutorial and best-practice cheat sheet to help your team get the most out of it.\n\n"
                f"Feel free to check it out, and let me know if you'd like a quick live walkthrough!\n\n"
                f"Best regards,\n"
                f"Your Customer Success Team"
            )
        elif "seats" in ticket.lower():
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
# EXPLANATION GENERATION LOGIC
# =============================================================================

def generate_explanation(scored_customer: Dict[str, Any]) -> Dict[str, Any]:
    """
    Enriches a scored customer record with dual-framing explanations, retention actions,
    and ready-to-send personalized email drafts.
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

    # -------------------------------------------------------------------------
    # 1. CSM Explanation (Plain Language for CSMs)
    # -------------------------------------------------------------------------
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

    # -------------------------------------------------------------------------
    # 2. Audit Explanation (Structured Diagnostic Breakdown)
    # -------------------------------------------------------------------------
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
    }

    # -------------------------------------------------------------------------
    # 3. Retention Action & Email Draft
    # -------------------------------------------------------------------------
    retention_action = generate_retention_action(result)
    email_draft = generate_retention_email(result)

    result["csm_explanation"] = csm_explanation
    result["audit_explanation"] = audit_explanation
    result["retention_action"] = retention_action
    result["email_draft"] = email_draft

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
