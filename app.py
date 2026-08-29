"""
app.py
======
Churn Risk Advisor — Daily Triage Desk
Enterprise-grade Streamlit application implementing the Linear/Stripe/Vercel Slate design system.

Step 1: Page Configuration & Design Tokens / CSS Injection
Step 2: State Management & Data Pipeline
Step 3: Layout Scaffolding (The Zone System)
Step 4: Interactive Triage Desk (Split-Screen Workspace)
"""

import streamlit as st
import pandas as pd
from typing import Dict, List, Any

# =============================================================================
# STEP 1: PAGE CONFIG & CUSTOM CSS INJECTION (DESIGN SYSTEM & TYPOGRAPHY)
# =============================================================================

st.set_page_config(
    page_title="Churn Risk Advisor — Daily Triage Desk",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Custom Design Tokens & Typography Injection (Linear / Stripe / Vercel Slate)
st.markdown(
    """
    <style>
    /* -------------------------------------------------------------------------
       1. Typography & CSS Design Tokens
       ------------------------------------------------------------------------- */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    :root {
        --bg-canvas: #F8FAFC;
        --bg-card: #FFFFFF;
        --bg-subtle: #F1F5F9;
        --border-color: #E2E8F0;
        --border-focus: #4F46E5;
        
        --text-main: #0F172A;
        --text-muted: #64748B;
        --text-subtle: #94A3B8;

        --color-primary: #4F46E5;
        --color-primary-hover: #4338CA;
        --color-primary-light: #EEF2FF;

        --urgent-color: #DC2626;
        --urgent-bg: #FEF2F2;
        --urgent-border: #FEE2E2;
        --urgent-text: #991B1B;

        --watch-color: #D97706;
        --watch-bg: #FFFBEB;
        --watch-border: #FEF3C7;
        --watch-text: #92400E;

        --healthy-color: #10B981;
        --healthy-bg: #ECFDF5;
        --healthy-border: #D1FAE5;
        --healthy-text: #065F46;

        --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        --font-mono: 'JetBrains Mono', monospace;
    }

    /* Base Canvas & Reset */
    html, body, [class*="css"] {
        font-family: var(--font-sans);
        color: var(--text-main);
        background-color: var(--bg-canvas);
    }

    /* Streamlit Padding Tightening for High Information Density */
    .block-container {
        padding-top: 1.5rem;
        padding-bottom: 3rem;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        max-width: 1400px;
    }

    /* Headings */
    h1, h2, h3, h4 {
        font-family: var(--font-sans);
        color: var(--text-main);
        font-weight: 700;
        letter-spacing: -0.025em;
    }

    /* -------------------------------------------------------------------------
       2. Badges & 7px Micro Status Dots (WCAG AAA Compliant)
       ------------------------------------------------------------------------- */
    .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 3px 8px;
        border-radius: 5px;
        line-height: 1.2;
    }
    .badge-urgent {
        background-color: var(--urgent-bg);
        color: var(--urgent-text);
        border: 1px solid var(--urgent-border);
    }
    .badge-watch {
        background-color: var(--watch-bg);
        color: var(--watch-text);
        border: 1px solid var(--watch-border);
    }
    .badge-none {
        background-color: var(--healthy-bg);
        color: var(--healthy-text);
        border: 1px solid var(--healthy-border);
    }

    /* 7px Status Dots */
    .status-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
    }
    .dot-urgent { background-color: var(--urgent-color); box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2); }
    .dot-watch  { background-color: var(--watch-color);  box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2); }
    .dot-none   { background-color: var(--healthy-color); box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }

    /* -------------------------------------------------------------------------
       3. Metadata Chips & Verbatim Quotation Callout Component
       ------------------------------------------------------------------------- */
    .chip {
        display: inline-flex;
        align-items: center;
        background-color: var(--bg-subtle);
        border: 1px solid var(--border-color);
        color: var(--text-main);
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.74rem;
        font-weight: 500;
        margin-right: 4px;
    }
    .chip-mono {
        font-family: var(--font-mono);
        font-size: 0.70rem;
    }

    /* Verbatim Quotation Callout (3px solid #64748B left border) */
    .ticket-quote {
        background-color: var(--bg-subtle);
        border-left: 3px solid #64748B;
        padding: 12px 16px;
        border-radius: 0 6px 6px 0;
        margin: 10px 0 14px 0;
    }
    .ticket-quote-label {
        font-size: 0.70rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-muted);
        margin-bottom: 4px;
    }
    .ticket-quote-body {
        font-size: 0.90rem;
        color: var(--text-main);
        font-style: italic;
        line-height: 1.45;
    }

    /* -------------------------------------------------------------------------
       4. Action Playbook Cards & Diagnostic Elements
       ------------------------------------------------------------------------- */
    .playbook-card {
        background-color: var(--bg-card);
        border: 1px solid var(--border-color);
        border-top: 3px solid var(--color-primary);
        padding: 14px 16px;
        border-radius: 6px;
        margin: 8px 0 14px 0;
        box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .playbook-card-urgent { border-top: 3px solid var(--urgent-color); }
    .playbook-card-watch  { border-top: 3px solid var(--watch-color); }
    
    .playbook-label {
        font-size: 0.70rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-muted);
        margin-bottom: 4px;
    }
    .playbook-text {
        font-size: 0.90rem;
        color: var(--text-main);
        line-height: 1.45;
        font-weight: 600;
    }

    /* KPI Pulse Metric Cards */
    .kpi-metric-box {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 14px 18px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    .kpi-metric-title {
        font-size: 0.74rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-muted);
        margin-bottom: 2px;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .kpi-metric-num {
        font-size: 1.85rem;
        font-weight: 800;
        color: var(--text-main);
        line-height: 1.1;
    }
    .kpi-metric-sub {
        font-size: 0.74rem;
        color: var(--text-muted);
        margin-top: 4px;
    }

    /* Proportion Bar */
    .proportion-bar-wrap {
        display: flex;
        height: 7px;
        border-radius: 4px;
        overflow: hidden;
        margin: 10px 0 20px 0;
        background-color: var(--border-color);
    }
    .prop-urgent { width: 27%; background-color: var(--urgent-color); }
    .prop-watch  { width: 31%; background-color: var(--watch-color); }
    .prop-none   { width: 42%; background-color: #94A3B8; }

    /* Account Card in Queue */
    .queue-item-card {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        padding: 10px 12px;
        margin-bottom: 8px;
        transition: all 0.15s ease;
    }
    .queue-item-card.active {
        border: 1.5px solid var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary);
    }
    .triaged-tag {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        font-size: 0.68rem;
        font-weight: 700;
        color: #047857;
        background-color: #D1FAE5;
        padding: 2px 6px;
        border-radius: 4px;
    }
    </style>
    """,
    unsafe_allow_html=True,
)


# =============================================================================
# STEP 2: STATE MANAGEMENT & DATA PIPELINE
# =============================================================================

def get_initial_dataset() -> List[Dict[str, Any]]:
    """
    Constructs a high-fidelity dataset of SaaS accounts representing
    Urgent, Watch, and Baseline tiers with complete dual-framing metadata.
    """
    return [
        {
            "customer_id": "068b54d7-7461-4d1c-885e-f5b43efed384",
            "name": "Dr. David Austin MD",
            "email": "woodlydia@example.com",
            "severity_tier": "URGENT",
            "engagement_level": "weak",
            "sentiment_level": "negative",
            "login_frequency": "Rarely",
            "daily_usage_mins": 9,
            "last_support_ticket": "The UI is too confusing. I can't find the export button.",
            "matched_category": "UX / Usability Friction",
            "historical_churn_rate": "80.7%",
            "csm_explanation": "Logs in rarely with ~9 min/day and their most recent ticket was: 'The UI is too confusing. I can't find the export button.' Severe product friction in an inactive account is our strongest historical indicator of imminent churn.",
            "retention_action": "Book a 15-minute 1-on-1 walkthrough to demonstrate export workflows and navigation shortcuts, and share a customized quick-start guide.",
            "email_draft": (
                "Subject: Quick guide & 1-on-1 walkthrough for export workflows\n\n"
                "Hi David,\n\n"
                "I saw your note regarding difficulty locating the export button in our new interface. "
                "We want to ensure your daily workflows feel seamless and intuitive.\n\n"
                "I've attached a 1-page quick-reference guide highlighting all export paths. I'd also be happy to hop on "
                "a 10-minute video walkthrough to answer any questions and show you navigation shortcuts.\n\n"
                "Let me know if you'd like to sync this week!\n\n"
                "Best regards,\nYour Customer Success Team"
            ),
            "rule_fired": "weak engagement AND negative sentiment -> URGENT",
            "validation_note": "Tier validated by historical data: 80.7% churn rate (n=135 accounts)."
        },
        {
            "customer_id": "c07c0a8a-bac0-47f9-b93d-57d61490a610",
            "name": "Dorothy Rose",
            "email": "naguirre@example.org",
            "severity_tier": "URGENT",
            "engagement_level": "weak",
            "sentiment_level": "negative",
            "login_frequency": "Rarely",
            "daily_usage_mins": 1,
            "last_support_ticket": "I've been waiting for support for 3 days. I'm cancelling.",
            "matched_category": "Support Delay / Cancellation Threat",
            "historical_churn_rate": "80.7%",
            "csm_explanation": "Logs in rarely with ~1 min/day and their most recent ticket was: 'I've been waiting for support for 3 days. I'm cancelling.' Both behavioral usage and support sentiment have aligned negatively, placing this account in our highest-risk tier.",
            "retention_action": "Initiate immediate executive outreach from CSM Lead to apologize for the support delay, resolve the blocker, and establish a direct escalation channel.",
            "email_draft": (
                "Subject: Urgent follow-up regarding your support ticket\n\n"
                "Hi Dorothy,\n\n"
                "I saw your recent message regarding the 3-day support delay. Waiting this long for assistance is unacceptable, "
                "and I am truly sorry for the frustration this has caused.\n\n"
                "I have taken personal ownership of your ticket and escalated it directly to our technical lead. "
                "I'd love to connect with you today to ensure this is completely resolved and discuss how we can make this right.\n\n"
                "Best regards,\nYour Customer Success Team"
            ),
            "rule_fired": "weak engagement AND negative sentiment -> URGENT",
            "validation_note": "Tier validated by historical data: 80.7% churn rate (n=135 accounts)."
        },
        {
            "customer_id": "3cbddf97-c9ff-4701-a979-2d2d341aa8fc",
            "name": "Sabrina Perez",
            "email": "wdavis@example.org",
            "severity_tier": "URGENT",
            "engagement_level": "weak",
            "sentiment_level": "negative",
            "login_frequency": "Rarely",
            "daily_usage_mins": 11,
            "last_support_ticket": "Why did my subscription price increase without notice?",
            "matched_category": "Pricing / Commercial Dispute",
            "historical_churn_rate": "80.7%",
            "csm_explanation": "Logs in rarely with ~11 min/day and their most recent ticket was: 'Why did my subscription price increase without notice?' This drop in engagement combined with a critical support complaint historically precedes account cancellation.",
            "retention_action": "Arrange a commercial alignment call to clarify billing adjustments, review plan options, and offer a grandfathered renewal rate or discount.",
            "email_draft": (
                "Subject: Reviewing your subscription plan & pricing options\n\n"
                "Hi Sabrina,\n\n"
                "I'm reaching out regarding your inquiry about recent subscription pricing adjustments. "
                "I'd love to schedule a brief commercial alignment call to review your utilization and explore grandfathered renewal options.\n\n"
                "Best regards,\nYour Customer Success Team"
            ),
            "rule_fired": "weak engagement AND negative sentiment -> URGENT",
            "validation_note": "Tier validated by historical data: 80.7% churn rate (n=135 accounts)."
        },
        {
            "customer_id": "a37b8137-7b88-4273-b2ed-b9993192e791",
            "name": "Jonathan Payne",
            "email": "matthew78@example.com",
            "severity_tier": "URGENT",
            "engagement_level": "weak",
            "sentiment_level": "negative",
            "login_frequency": "Rarely",
            "daily_usage_mins": 12,
            "last_support_ticket": "I'm very frustrated with the downtime. This is unacceptable.",
            "matched_category": "Downtime Frustration",
            "historical_churn_rate": "80.7%",
            "csm_explanation": "Logs in rarely with ~12 min/day and their most recent ticket was: 'I'm very frustrated with the downtime. This is unacceptable.' Without proactive CSM outreach, accounts displaying this negative ticket pattern rarely recover.",
            "retention_action": "Schedule an urgent technical review call regarding recent downtime, review SLA uptime credits, and share infrastructure roadmap.",
            "email_draft": (
                "Subject: Important update regarding recent platform availability\n\n"
                "Hi Jonathan,\n\n"
                "I noticed your recent ticket regarding downtime, and I want to apologize for the disruption. "
                "I'd like to schedule a brief sync to review our root-cause analysis and apply appropriate SLA credits.\n\n"
                "Best regards,\nYour Customer Success Team"
            ),
            "rule_fired": "weak engagement AND negative sentiment -> URGENT",
            "validation_note": "Tier validated by historical data: 80.7% churn rate (n=135 accounts)."
        },
        {
            "customer_id": "cfc0646f-0927-4e8e-b40f-75090340aa0a",
            "name": "Miranda Gilbert",
            "email": "xbauer@example.com",
            "severity_tier": "WATCH",
            "engagement_level": "moderate",
            "sentiment_level": "neutral",
            "login_frequency": "Daily",
            "daily_usage_mins": 22,
            "last_support_ticket": "Is there a tutorial for the new dashboard feature?",
            "matched_category": "Feature Enablement & Onboarding",
            "historical_churn_rate": "19.1%",
            "csm_explanation": "Logs in daily, but only ~22 min/day — lower than typical engaged usage. Last ticket was routine: 'Is there a tutorial for the new dashboard feature?'. Worth a check-in, not urgent.",
            "retention_action": "Send curated dashboard tutorial video and best-practice guide, and offer an optional 10-minute feature walkthrough.",
            "email_draft": (
                "Subject: New dashboard tutorial & workflow tips\n\n"
                "Hi Miranda,\n\n"
                "I saw your question regarding dashboard features. We've put together a 3-minute tutorial to help your team get maximum value.\n\n"
                "Best regards,\nYour Customer Success Team"
            ),
            "rule_fired": "moderate engagement AND neutral sentiment -> WATCH",
            "validation_note": "Tier validated by historical data: 19.1% churn rate (n=157 accounts)."
        },
        {
            "customer_id": "14315c24-aa38-40f9-8eaa-bf5f242107d9",
            "name": "Matthew Ruiz",
            "email": "donnalewis@example.org",
            "severity_tier": "WATCH",
            "engagement_level": "moderate",
            "sentiment_level": "neutral",
            "login_frequency": "Weekly",
            "daily_usage_mins": 50,
            "last_support_ticket": "How do I change my password?",
            "matched_category": "Account Security & Access",
            "historical_churn_rate": "19.1%",
            "csm_explanation": "Logs in weekly with ~50 min/day — moderate usage with routine support activity: 'How do I change my password?'. Worth a check-in, not urgent.",
            "retention_action": "Send a proactive check-in email confirming their recent inquiry was resolved, and share workflow tips to help deepen weekly product usage.",
            "email_draft": (
                "Subject: Checking in on your recent support inquiry\n\n"
                "Hi Matthew,\n\n"
                "I wanted to follow up and ensure your password reset went smoothly. Let us know if you need anything else!\n\n"
                "Best regards,\nYour Customer Success Team"
            ),
            "rule_fired": "moderate engagement AND neutral sentiment -> WATCH",
            "validation_note": "Tier validated by historical data: 19.1% churn rate (n=157 accounts)."
        },
        {
            "customer_id": "592b837b-6df9-4267-8009-b8a7d1c63e01",
            "name": "Edgar Taylor",
            "email": "rodriguezcynthia@example.net",
            "severity_tier": "WATCH",
            "engagement_level": "moderate",
            "sentiment_level": "neutral",
            "login_frequency": "Weekly",
            "daily_usage_mins": 42,
            "last_support_ticket": "Can I add more seats to my current plan?",
            "matched_category": "Account Expansion & Seats",
            "historical_churn_rate": "19.1%",
            "csm_explanation": "Logs in weekly with ~42 min/day — moderate usage with routine support activity: 'Can I add more seats to my current plan?'. Worth a check-in, not urgent.",
            "retention_action": "Follow up on seat addition request with onboarding assistance for new team members.",
            "email_draft": (
                "Subject: Adding team members & onboarding assistance\n\n"
                "Hi Edgar,\n\n"
                "I noticed your inquiry about adding seats. We'd love to help configure provisioning and onboarding for your team.\n\n"
                "Best regards,\nYour Customer Success Team"
            ),
            "rule_fired": "moderate engagement AND neutral sentiment -> WATCH",
            "validation_note": "Tier validated by historical data: 19.1% churn rate (n=157 accounts)."
        },
        {
            "customer_id": "068b54d7-7461-4d1c-885e-f5b43efed384-2",
            "name": "Alyssa Clark",
            "email": "shawn43@example.com",
            "severity_tier": "NONE",
            "engagement_level": "strong",
            "sentiment_level": "neutral",
            "login_frequency": "Daily",
            "daily_usage_mins": 43,
            "last_support_ticket": "Just checking if my payment went through.",
            "matched_category": "Payment Verification",
            "historical_churn_rate": "15.4%",
            "csm_explanation": "Engaged (logs in daily with ~43 min/day) and no concerning signals. Last ticket: 'Just checking if my payment went through.'",
            "retention_action": "No action needed",
            "email_draft": "No outreach draft required. Account is healthy with strong engagement and positive sentiment.",
            "rule_fired": "baseline combination (strong engagement, neutral sentiment) -> NONE",
            "validation_note": "Tier validated by historical data: 15.4% churn rate (n=208 accounts)."
        },
        {
            "customer_id": "67855f87-2552-4273-9aff-1b2060638673",
            "name": "Adam Hayden",
            "email": "austinolivia@example.org",
            "severity_tier": "NONE",
            "engagement_level": "strong",
            "sentiment_level": "positive",
            "login_frequency": "Daily",
            "daily_usage_mins": 88,
            "last_support_ticket": "Just upgraded to the Pro plan, excited to use it.",
            "matched_category": "Expansion & Upgrade Enthusiasm",
            "historical_churn_rate": "15.4%",
            "csm_explanation": "Engaged (logs in daily with ~88 min/day) and no concerning signals. Last ticket: 'Just upgraded to the Pro plan, excited to use it.'",
            "retention_action": "No action needed",
            "email_draft": "No outreach draft required. Account is healthy with strong engagement and positive sentiment.",
            "rule_fired": "baseline combination (strong engagement, positive sentiment) -> NONE",
            "validation_note": "Tier validated by historical data: 15.4% churn rate (n=208 accounts)."
        },
        {
            "customer_id": "a974822d-cc71-48a4-b411-8127968af6f1",
            "name": "Brian Krueger",
            "email": "briannasmith@example.net",
            "severity_tier": "NONE",
            "engagement_level": "strong",
            "sentiment_level": "positive",
            "login_frequency": "Daily",
            "daily_usage_mins": 116,
            "last_support_ticket": "The integration with Slack works perfectly.",
            "matched_category": "Workflow Integration Adoption",
            "historical_churn_rate": "15.4%",
            "csm_explanation": "Engaged (logs in daily with ~116 min/day) and no concerning signals. Last ticket: 'The integration with Slack works perfectly.'",
            "retention_action": "No action needed",
            "email_draft": "No outreach draft required. Account is healthy with strong engagement and positive sentiment.",
            "rule_fired": "baseline combination (strong engagement, positive sentiment) -> NONE",
            "validation_note": "Tier validated by historical data: 15.4% churn rate (n=208 accounts)."
        }
    ]

# -----------------------------------------------------------------------------
# Session State Initialization
# -----------------------------------------------------------------------------
if "dataset" not in st.session_state:
    st.session_state.dataset = get_initial_dataset()

if "focus_actionable" not in st.session_state:
    st.session_state.focus_actionable = True

if "selected_account_id" not in st.session_state:
    st.session_state.selected_account_id = st.session_state.dataset[0]["customer_id"]

if "triaged_account_ids" not in st.session_state:
    st.session_state.triaged_account_ids = set()


# =============================================================================
# STEP 3: LAYOUT SCAFFOLDING (THE ZONE SYSTEM)
# =============================================================================

# -----------------------------------------------------------------------------
# ZONE 0: GLOBAL CONTEXT BAR
# -----------------------------------------------------------------------------
header_left, header_right = st.columns([3, 1.2])

with header_left:
    st.markdown("## 🛡️ Churn Risk Advisor — Daily Triage Desk")
    st.caption(
        "Deterministic 2-Signal Corroboration · "
        "Dual-Framing Explanations · Zero Target Leakage · "
        "Kaggle SaaS Benchmark"
    )

with header_right:
    # 1-Click Actionable Shortcut for Priya
    focus_toggle = st.toggle(
        "⚡ Focus Actionable (Urgent + Watch)",
        value=st.session_state.focus_actionable,
        help="Filters the workspace to accounts requiring proactive intervention, hiding healthy baselines.",
    )
    st.session_state.focus_actionable = focus_toggle

# -----------------------------------------------------------------------------
# ZONE 1: PORTFOLIO HEALTH PULSE STRIP
# -----------------------------------------------------------------------------
urgent_count = sum(1 for r in st.session_state.dataset if r["severity_tier"] == "URGENT")
watch_count = sum(1 for r in st.session_state.dataset if r["severity_tier"] == "WATCH")
none_count = sum(1 for r in st.session_state.dataset if r["severity_tier"] == "NONE")

kpi_c1, kpi_c2, kpi_c3 = st.columns(3)

with kpi_c1:
    st.markdown(
        f"""
        <div class="kpi-metric-box">
            <div class="kpi-metric-title"><span class="status-dot dot-urgent"></span> Urgent Attention Required</div>
            <div class="kpi-metric-num">{urgent_count}</div>
            <div class="kpi-metric-sub"><strong>80.7%</strong> Historical Churn · Weak Usage + Negative Ticket</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

with kpi_c2:
    st.markdown(
        f"""
        <div class="kpi-metric-box">
            <div class="kpi-metric-title"><span class="status-dot dot-watch"></span> Watchlist / Needs Check-in</div>
            <div class="kpi-metric-num">{watch_count}</div>
            <div class="kpi-metric-sub"><strong>19.1%</strong> Historical Churn · Moderate Usage + Neutral Ticket</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

with kpi_c3:
    st.markdown(
        f"""
        <div class="kpi-metric-box">
            <div class="kpi-metric-title"><span class="status-dot dot-none"></span> Healthy Baseline Accounts</div>
            <div class="kpi-metric-num">{none_count}</div>
            <div class="kpi-metric-sub"><strong>15.4%</strong> Baseline Churn · Stable Usage · No Friction</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

# Proportional distribution bar
st.markdown(
    """
    <div class="proportion-bar-wrap">
        <div class="prop-urgent" title="Urgent: 27%"></div>
        <div class="prop-watch" title="Watch: 31%"></div>
        <div class="prop-none" title="Healthy: 42%"></div>
    </div>
    """,
    unsafe_allow_html=True,
)

# -----------------------------------------------------------------------------
# ZONE 1.5: TOP COMPLAINTS DRIVING URGENT RISK
# -----------------------------------------------------------------------------
st.markdown("### Top Complaints Driving Urgent Risk")
st.caption(
    "Aggregated complaint themes across negative-sentiment accounts — "
    "showing the primary customer friction points driving urgent churn risk."
)

neg_accounts = [r for r in st.session_state.dataset if r["sentiment_level"] == "negative"]
if neg_accounts:
    complaint_counts = pd.Series([r["matched_category"] for r in neg_accounts]).value_counts()
    chart_df = pd.DataFrame({"Complaint Theme": complaint_counts.index, "Accounts": complaint_counts.values}).set_index("Complaint Theme")
    st.bar_chart(chart_df, horizontal=True, color="#DC2626")
    
    top_complaint = complaint_counts.index[0]
    top_count = complaint_counts.iloc[0]
    st.markdown(
        f"<div style='font-size: 0.88rem; color: #334155; margin-top: -6px; margin-bottom: 24px; font-weight: 500;'>"
        f"💡 The most common complaint among at-risk accounts is <strong>{top_complaint}</strong> ({top_count} accounts)."
        f"</div>",
        unsafe_allow_html=True,
    )

st.markdown("<hr style='margin: 16px 0 24px 0; border: none; border-top: 1px solid #E2E8F0;' />", unsafe_allow_html=True)


# =============================================================================
# STEP 4: INTERACTIVE TRIAGE DESK (LEFT & RIGHT COLUMNS)
# =============================================================================

# Filter dataset based on Actionable toggle
if st.session_state.focus_actionable:
    active_accounts = [r for r in st.session_state.dataset if r["severity_tier"] in ["URGENT", "WATCH"]]
else:
    active_accounts = list(st.session_state.dataset)

# Ensure selected_account_id exists in active list
if not any(r["customer_id"] == st.session_state.selected_account_id for r in active_accounts) and active_accounts:
    st.session_state.selected_account_id = active_accounts[0]["customer_id"]

# Split-screen layout (35% Left Queue, 65% Right Sticky Inspector)
queue_col, inspector_col = st.columns([0.35, 0.65], gap="medium")

# -----------------------------------------------------------------------------
# LEFT COLUMN: PRIORITIZED QUEUE
# -----------------------------------------------------------------------------
with queue_col:
    st.markdown(
        f"**Prioritized Queue** &nbsp; <span class='chip'>{len(active_accounts)} accounts</span>",
        unsafe_allow_html=True,
    )

    # Search filter
    search_q = st.text_input(
        "Search Queue",
        placeholder="🔍 Search name, email, or ticket...",
        label_visibility="collapsed",
    )

    filtered_queue = active_accounts
    if search_q.strip():
        q_lower = search_q.strip().lower()
        filtered_queue = [
            r for r in active_accounts
            if q_lower in r["name"].lower()
            or q_lower in r["email"].lower()
            or q_lower in r["last_support_ticket"].lower()
        ]

    # Render interactive account cards
    for acc in filtered_queue:
        cust_id = acc["customer_id"]
        is_selected = (cust_id == st.session_state.selected_account_id)
        is_triaged = (cust_id in st.session_state.triaged_account_ids)
        tier = acc["severity_tier"]
        name = acc["name"]
        email = acc["email"]
        freq = acc["login_frequency"]
        mins = acc["daily_usage_mins"]
        ticket = acc["last_support_ticket"]

        if tier == "URGENT":
            badge_html = "<span class='status-badge badge-urgent'><span class='status-dot dot-urgent'></span> Urgent</span>"
        elif tier == "WATCH":
            badge_html = "<span class='status-badge badge-watch'><span class='status-dot dot-watch'></span> Watch</span>"
        else:
            badge_html = "<span class='status-badge badge-none'><span class='status-dot dot-none'></span> Baseline</span>"

        triaged_html = "<span class='triaged-tag'>✓ Triaged</span>" if is_triaged else ""
        card_class = "queue-item-card active" if is_selected else "queue-item-card"

        # Card container with button trigger
        with st.container():
            st.markdown(
                f"""
                <div class="{card_class}">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <strong>{name}</strong> {triaged_html}
                        <div>{badge_html}</div>
                    </div>
                    <div style="font-size:0.75rem; color:#64748B; margin-bottom:4px;">
                        {email} &nbsp;·&nbsp; <span class="chip chip-mono">{freq} · {mins}m/day</span>
                    </div>
                    <div style="font-size:0.78rem; color:#334155; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        💬 <em>"{ticket}"</em>
                    </div>
                </div>
                """,
                unsafe_allow_html=True,
            )

            # Button to select account
            btn_label = f"Select {name}" if not is_selected else f"✓ Active: {name}"
            if st.button(btn_label, key=f"btn_select_{cust_id}", use_container_width=True):
                st.session_state.selected_account_id = cust_id
                st.rerun()

# -----------------------------------------------------------------------------
# RIGHT COLUMN: DEEP-DIVE RISK INSPECTOR (STICKY)
# -----------------------------------------------------------------------------
with inspector_col:
    selected_acc = next(
        (r for r in st.session_state.dataset if r["customer_id"] == st.session_state.selected_account_id),
        None
    )

    if selected_acc:
        tier = selected_acc["severity_tier"]
        name = selected_acc["name"]
        email = selected_acc["email"]
        cust_id = selected_acc["customer_id"]
        csm_expl = selected_acc["csm_explanation"]
        action = selected_acc["retention_action"]
        email_draft = selected_acc["email_draft"]
        ticket_text = selected_acc["last_support_ticket"]
        theme_cat = selected_acc["matched_category"]
        login_freq = selected_acc["login_frequency"]
        daily_mins = selected_acc["daily_usage_mins"]
        is_triaged = (cust_id in st.session_state.triaged_account_ids)

        with st.container(border=True):
            # Header Row
            h_c1, h_c2 = st.columns([3, 1.5])
            with h_c1:
                st.markdown(f"### {name}")
                st.caption(f"Account ID: `{cust_id}` · Contact: `{email}`")
            with h_c2:
                if tier == "URGENT":
                    st.markdown(
                        "<div style='text-align:right;'><span class='status-badge badge-urgent'><span class='status-dot dot-urgent'></span> Urgent Risk</span></div>",
                        unsafe_allow_html=True,
                    )
                    st.markdown("<div style='text-align:right; font-size:0.75rem; color:#991B1B; font-weight:700;'>80.7% Historical Churn</div>", unsafe_allow_html=True)
                elif tier == "WATCH":
                    st.markdown(
                        "<div style='text-align:right;'><span class='status-badge badge-watch'><span class='status-dot dot-watch'></span> Watchlist</span></div>",
                        unsafe_allow_html=True,
                    )
                    st.markdown("<div style='text-align:right; font-size:0.75rem; color:#92400E; font-weight:700;'>19.1% Historical Churn</div>", unsafe_allow_html=True)
                else:
                    st.markdown(
                        "<div style='text-align:right;'><span class='status-badge badge-none'><span class='status-dot dot-none'></span> Healthy Baseline</span></div>",
                        unsafe_allow_html=True,
                    )
                    st.markdown("<div style='text-align:right; font-size:0.75rem; color:#065F46; font-weight:700;'>15.4% Baseline Churn</div>", unsafe_allow_html=True)

            st.markdown("<hr style='margin: 10px 0 14px 0; border: none; border-top: 1px solid #E2E8F0;' />", unsafe_allow_html=True)

            # -----------------------------------------------------------------
            # LEVEL 1: PLAIN-LANGUAGE EVIDENCE DIGEST (FOR PRIYA)
            # -----------------------------------------------------------------
            st.markdown("#### 💬 Plain-Language Evidence Summary")
            st.write(csm_expl)

            # Verbatim quotation component (3px solid #64748B left border)
            st.markdown(
                f"""
                <div class="ticket-quote">
                    <div class="ticket-quote-label">Verbatim Support Ticket ({theme_cat})</div>
                    <div class="ticket-quote-body">"{ticket_text}"</div>
                </div>
                """,
                unsafe_allow_html=True,
            )

            # Signal Chips
            st.markdown(
                f"""
                <div style="margin: 8px 0 16px 0;">
                    <span class="chip">📅 Logins: <strong>{login_freq}</strong></span>
                    <span class="chip">⏱️ Usage: <strong>{daily_mins} min/day</strong></span>
                    <span class="chip">🏷️ Theme: <strong>{theme_cat}</strong></span>
                </div>
                """,
                unsafe_allow_html=True,
            )

            # -----------------------------------------------------------------
            # LEVEL 2: RETENTION PLAYBOOK & EMAIL DRAFT
            # -----------------------------------------------------------------
            st.markdown("#### 🎯 Recommended Retention Action")
            playbook_class = "playbook-card-urgent" if tier == "URGENT" else ("playbook-card-watch" if tier == "WATCH" else "")
            playbook_tag = "🚨 Urgent Intervention Playbook" if tier == "URGENT" else ("⚠️ Light-Touch Check-in Playbook" if tier == "WATCH" else "✅ Account Health Status")

            st.markdown(
                f"""
                <div class="playbook-card {playbook_class}">
                    <div class="playbook-label">{playbook_tag}</div>
                    <div class="playbook-text">{action}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )

            if tier in ["URGENT", "WATCH"]:
                with st.expander("✉️ Personalized Retention Email Draft (1-Click Copy)", expanded=True):
                    st.caption("Context-aware email draft tailored to the customer's exact complaint and usage metrics:")
                    st.code(email_draft, language="markdown")

                    btn_c1, btn_c2 = st.columns([1.5, 1])
                    with btn_c1:
                        if is_triaged:
                            if st.button("↩️ Reset Triage Status", key=f"triage_btn_{cust_id}"):
                                st.session_state.triaged_account_ids.remove(cust_id)
                                st.rerun()
                        else:
                            if st.button("✓ Mark Account as Triaged", key=f"triage_btn_{cust_id}", type="primary"):
                                st.session_state.triaged_account_ids.add(cust_id)
                                st.rerun()

            # -----------------------------------------------------------------
            # LEVEL 3: DIAGNOSTIC AUDIT TRAIL (FOR MARCUS)
            # -----------------------------------------------------------------
            with st.expander("🔬 Diagnostic Audit Trail & Rule Logic (For Marcus)", expanded=False):
                st.caption("Deterministic verification: exact corroboration rule, raw vectors, and validation benchmark.")
                st.markdown(f"**Deterministic Rule Fired:** `{selected_acc['rule_fired']}`")
                st.markdown(f"**Historical Validation:** {selected_acc['validation_note']}")

                audit_c1, audit_c2 = st.columns(2)
                with audit_c1:
                    st.markdown("**Engagement Raw Vector:**")
                    st.json({
                        "login_frequency": login_freq,
                        "daily_usage_mins": daily_mins,
                        "engagement_level": selected_acc["engagement_level"]
                    })
                with audit_c2:
                    st.markdown("**Sentiment Raw Vector:**")
                    st.json({
                        "ticket_text": ticket_text,
                        "matched_category": theme_cat,
                        "sentiment_level": selected_acc["sentiment_level"]
                    })
    else:
        st.info("Select an account from the queue to inspect.")

# -----------------------------------------------------------------------------
# ZONE 3: EMPIRICAL CALIBRATION & AUDIT PROOF
# -----------------------------------------------------------------------------
st.markdown("<hr style='margin: 32px 0 16px 0; border: none; border-top: 1px solid #E2E8F0;' />", unsafe_allow_html=True)

with st.expander("📊 Model Auditability, Empirical Calibration & Zero-Leakage Proof", expanded=False):
    st.markdown(
        """
        ### Transparency & Empirical Rigor
        This platform avoids black-box ML hallucinations by using **deterministic 2-signal corroboration** 
        and validating predicted severity tiers against actual historical churn outcomes.
        - **Zero Target Leakage**: The ground-truth `Churn` column was strictly excluded from scoring logic.
        - **Monotonic Risk Calibration**: Each severity tier corresponds to a strictly monotonic increase in historical churn rate.
        """
    )

    val_c1, val_c2 = st.columns([1.3, 1])
    with val_c1:
        val_df = pd.DataFrame([
            {
                "Severity Tier": "🚨 URGENT",
                "Historical Accounts (n)": 135,
                "Actual Churn Rate": "80.7%",
                "Signal Corroboration": "Weak Engagement + Negative Ticket",
                "Recommended Action": "Immediate Crisis Intervention Call",
            },
            {
                "Severity Tier": "⚠️ WATCH",
                "Historical Accounts (n)": 157,
                "Actual Churn Rate": "19.1%",
                "Signal Corroboration": "Moderate Engagement + Neutral Ticket",
                "Recommended Action": "Proactive Enablement / Feature Walkthrough",
            },
            {
                "Severity Tier": "✅ NONE (Baseline)",
                "Historical Accounts (n)": 208,
                "Actual Churn Rate": "15.4%",
                "Signal Corroboration": "Strong/Stable Usage + Routine Ticket",
                "Recommended Action": "No Action Needed (Baseline Health)",
            },
        ])
        st.dataframe(val_df, hide_index=True, use_container_width=True)

    with val_c2:
        chart_data = pd.DataFrame({
            "Tier": ["Healthy Baseline", "Watchlist", "Urgent Attention"],
            "Historical Churn Rate (%)": [15.4, 19.1, 80.7],
        }).set_index("Tier")
        st.bar_chart(chart_data, color="#DC2626")
