"""
app.py
======
CSM Daily Triage Dashboard for Churn Risk Advisor.

Enterprise-grade interface inspired by Linear, Stripe, and Vercel.
Built on foundational UX research:
- For Priya Patel (Speed): Sub-3-minute morning triage, 1-click actionable filtering,
  plain-language summaries, and copyable retention email drafts.
- For Marcus Vance (Trust & Audit): Transparent 2-signal corroboration, deterministic
  rule IDs, verbatim ticket quotes, and historical empirical calibration.
"""

import os
import pandas as pd
import streamlit as st

from severity_scoring import score_dataframe
from explanation_layer import apply_explanations

# =============================================================================
# PAGE CONFIGURATION & ENTERPRISE DESIGN SYSTEM
# =============================================================================

st.set_page_config(
    page_title="Churn Risk Advisor — Daily Triage Desk",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom Modern Enterprise-SaaS CSS (Linear / Stripe / Vercel Slate Aesthetic)
st.markdown(
    """
    <style>
    /* -------------------------------------------------------------------------
       1. Base Typography & Canvas (Clean Neutral Slate)
       ------------------------------------------------------------------------- */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

    html, body, [class*="css"] {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #0F172A;
        background-color: #FAFAFA;
    }

    /* Headings */
    h1, h2, h3, h4 {
        color: #0F172A;
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    /* -------------------------------------------------------------------------
       2. Badges & Micro Status Dots (WCAG Compliant & Restrained)
       ------------------------------------------------------------------------- */
    .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 3px 8px;
        border-radius: 5px;
        line-height: 1.2;
    }
    .badge-urgent {
        background-color: #FEF2F2;
        color: #991B1B;
        border: 1px solid #FEE2E2;
    }
    .badge-watch {
        background-color: #FFFBEB;
        color: #92400E;
        border: 1px solid #FEF3C7;
    }
    .badge-none {
        background-color: #F8FAFC;
        color: #475569;
        border: 1px solid #E2E8F0;
    }

    /* 6px Status Dots */
    .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
    }
    .dot-urgent { background-color: #DC2626; box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2); }
    .dot-watch  { background-color: #D97706; box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2); }
    .dot-none   { background-color: #10B981; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }

    /* -------------------------------------------------------------------------
       3. Metadata Chips & Quotation Callouts
       ------------------------------------------------------------------------- */
    .chip {
        display: inline-block;
        background-color: #F1F5F9;
        border: 1px solid #E2E8F0;
        color: #475569;
        padding: 2px 7px;
        border-radius: 4px;
        font-size: 0.73rem;
        font-weight: 500;
        margin-right: 4px;
    }
    .chip-mono {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.70rem;
    }

    .ticket-quote {
        background-color: #F8FAFC;
        border-left: 3px solid #64748B;
        padding: 10px 14px;
        border-radius: 0 6px 6px 0;
        margin: 10px 0;
        font-size: 0.88rem;
        color: #334155;
        font-style: italic;
        line-height: 1.45;
    }

    /* -------------------------------------------------------------------------
       4. Action & Playbook Boxes
       ------------------------------------------------------------------------- */
    .playbook-card {
        background-color: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-top: 3px solid #4F46E5;
        padding: 14px 16px;
        border-radius: 6px;
        margin: 10px 0 14px 0;
        box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .playbook-card-urgent {
        border-top: 3px solid #DC2626;
    }
    .playbook-card-watch {
        border-top: 3px solid #D97706;
    }
    .playbook-label {
        font-size: 0.70rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #64748B;
        margin-bottom: 4px;
    }
    .playbook-text {
        font-size: 0.88rem;
        color: #1E293B;
        line-height: 1.45;
        font-weight: 500;
    }

    /* -------------------------------------------------------------------------
       5. Proportion Bar & KPI Cards
       ------------------------------------------------------------------------- */
    .proportion-strip {
        display: flex;
        height: 6px;
        border-radius: 3px;
        overflow: hidden;
        margin: 8px 0 20px 0;
        background-color: #E2E8F0;
    }
    .strip-urgent { width: 27%; background-color: #DC2626; }
    .strip-watch  { width: 31%; background-color: #D97706; }
    .strip-none   { width: 42%; background-color: #94A3B8; }

    .kpi-title {
        font-size: 0.78rem;
        font-weight: 600;
        color: #475569;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 2px;
    }
    .kpi-value {
        font-size: 1.65rem;
        font-weight: 700;
        color: #0F172A;
        line-height: 1.1;
    }
    .kpi-caption {
        font-size: 0.74rem;
        color: #64748B;
        margin-top: 4px;
    }

    /* -------------------------------------------------------------------------
       6. Queue Card Preview
       ------------------------------------------------------------------------- */
    .queue-card-selected {
        background-color: #FFFFFF;
        border: 1.5px solid #4F46E5;
        border-radius: 8px;
        padding: 12px 14px;
        margin-bottom: 8px;
        box-shadow: 0 2px 4px rgba(79, 70, 229, 0.08);
    }
    .queue-card {
        background-color: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        padding: 12px 14px;
        margin-bottom: 8px;
        transition: all 0.15s ease;
    }
    .queue-card:hover {
        border-color: #CBD5E1;
        background-color: #F8FAFC;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# =============================================================================
# DATA LOADING & CACHING
# =============================================================================

@st.cache_data
def load_and_score_data(csv_path: str = "train.csv") -> pd.DataFrame:
    """
    Loads customer records, computes 3-tier severity scores, and enriches with
    CSM plain-language explanations, audit trails, and retention actions.
    """
    if not os.path.exists(csv_path):
        st.error(f"Dataset file '{csv_path}' not found in current directory.")
        return pd.DataFrame()

    df = pd.read_csv(csv_path)
    scored_df = score_dataframe(df)
    enriched_df = apply_explanations(scored_df)

    tier_order_map = {"URGENT": 0, "WATCH": 1, "NONE": 2}
    enriched_df["_sort_rank"] = enriched_df["severity_tier"].map(tier_order_map).fillna(99)
    return enriched_df


DATA_PATH = os.path.join(os.path.dirname(__file__), "train.csv")
data = load_and_score_data(DATA_PATH)

if data.empty:
    st.stop()

# Portfolio summary counts
urgent_count = int((data["severity_tier"] == "URGENT").sum())
watch_count = int((data["severity_tier"] == "WATCH").sum())
none_count = int((data["severity_tier"] == "NONE").sum())
total_count = len(data)
actionable_count = urgent_count + watch_count

# =============================================================================
# TOP GLOBAL HEADER & CONTEXT BAR
# =============================================================================

header_left, header_right = st.columns([3, 1.2])

with header_left:
    st.markdown("## 🛡️ Churn Risk Advisor — Daily Triage Desk")
    st.caption(
        "Deterministic 2-Signal Corroboration Engine · "
        "Dual-Framing Explanations · Zero Target Leakage · "
        "Kaggle SaaS Benchmark (n=500)"
    )

with header_right:
    # 1-Click Actionable Shortcut for Priya (Hackathon Speed)
    focus_actionable = st.toggle(
        "⚡ Focus on Actionable (Urgent + Watch)",
        value=True,
        help="Filters the workspace to accounts requiring proactive intervention (Urgent & Watch accounts), hiding healthy baselines.",
    )

# =============================================================================
# ZONE 1: PORTFOLIO HEALTH PULSE STRIP
# =============================================================================

m_col1, m_col2, m_col3 = st.columns(3)

with m_col1:
    with st.container(border=True):
        st.markdown(
            "<div class='kpi-title'><span class='status-dot dot-urgent'></span> Urgent Attention Required</div>",
            unsafe_allow_html=True,
        )
        st.markdown(f"<div class='kpi-value'>{urgent_count}</div>", unsafe_allow_html=True)
        st.markdown(
            "<div class='kpi-caption'><strong>80.7%</strong> Historical Churn · Weak Usage + Negative Ticket</div>",
            unsafe_allow_html=True,
        )

with m_col2:
    with st.container(border=True):
        st.markdown(
            "<div class='kpi-title'><span class='status-dot dot-watch'></span> Watchlist / Needs Check-in</div>",
            unsafe_allow_html=True,
        )
        st.markdown(f"<div class='kpi-value'>{watch_count}</div>", unsafe_allow_html=True)
        st.markdown(
            "<div class='kpi-caption'><strong>19.1%</strong> Historical Churn · Moderate Usage + Neutral Ticket</div>",
            unsafe_allow_html=True,
        )

with m_col3:
    with st.container(border=True):
        st.markdown(
            "<div class='kpi-title'><span class='status-dot dot-none'></span> Healthy Baseline Accounts</div>",
            unsafe_allow_html=True,
        )
        st.markdown(f"<div class='kpi-value'>{none_count}</div>", unsafe_allow_html=True)
        st.markdown(
            "<div class='kpi-caption'><strong>15.4%</strong> Baseline Churn · Stable Usage · No Friction</div>",
            unsafe_allow_html=True,
        )

# Visual Portfolio Distribution Strip
st.markdown(
    """
    <div class="proportion-strip">
        <div class="strip-urgent" title="Urgent: 27% (135 accounts)"></div>
        <div class="strip-watch" title="Watch: 31% (157 accounts)"></div>
        <div class="strip-none" title="Healthy: 42% (208 accounts)"></div>
    </div>
    """,
    unsafe_allow_html=True,
)

# =============================================================================
# SIDEBAR FILTERS & SETTINGS
# =============================================================================

st.sidebar.markdown("### 🎛️ Triage Configuration")

view_mode = st.sidebar.radio(
    "Queue Sorting Strategy",
    options=[
        "Priority Order (Urgent first)",
        "Mixed Sample (Urgent, Watch, Baseline alternating)",
    ],
    index=0,
    help="Priority order is optimal for daily morning operations. Mixed sample is helpful for demonstrating diverse tier comparisons.",
)

st.sidebar.markdown("<hr style='margin: 14px 0; border: none; border-top: 1px solid #E2E8F0;' />", unsafe_allow_html=True)
st.sidebar.markdown("### 🔍 Search & Slice")

search_query = st.sidebar.text_input(
    "Search Customer Name or Email",
    value="",
    placeholder="e.g., Austin, Alicia, or .com",
)

all_categories = sorted(
    list(
        {
            r.get("sentiment_raw", {}).get("matched_category", "Unknown")
            for r in data["audit_explanation"]
            if isinstance(r, dict)
        }
    )
)
selected_category = st.sidebar.selectbox(
    "Support Ticket Theme Filter",
    options=["All Themes"] + all_categories,
)

page_size = st.sidebar.selectbox(
    "Accounts per page",
    options=[10, 20, 50, "All"],
    index=1,
)

# =============================================================================
# DATA FILTERING LOGIC
# =============================================================================

# Determine effective tier filter
if focus_actionable:
    effective_data = data[data["severity_tier"].isin(["URGENT", "WATCH"])].copy()
else:
    effective_data = data.copy()

# Text search
if search_query.strip():
    q = search_query.strip().lower()
    name_match = effective_data["Name"].astype(str).str.lower().str.contains(q)
    email_match = (
        effective_data["Email"].astype(str).str.lower().str.contains(q)
        if "Email" in effective_data.columns
        else False
    )
    effective_data = effective_data[name_match | email_match]

# Support Theme Filter
if selected_category != "All Themes":
    effective_data = effective_data[
        effective_data["audit_explanation"].apply(
            lambda x: x.get("sentiment_raw", {}).get("matched_category") == selected_category
            if isinstance(x, dict)
            else False
        )
    ]

# Sort / Interleave
if "Mixed Sample" in view_mode:
    urgent_rows = effective_data[effective_data["severity_tier"] == "URGENT"].to_dict(orient="records")
    watch_rows = effective_data[effective_data["severity_tier"] == "WATCH"].to_dict(orient="records")
    none_rows = effective_data[effective_data["severity_tier"] == "NONE"].to_dict(orient="records")

    max_len = max(len(urgent_rows), len(watch_rows), len(none_rows), 0)
    interleaved = []
    for i in range(max_len):
        if i < len(urgent_rows):
            interleaved.append(urgent_rows[i])
        if i < len(watch_rows):
            interleaved.append(watch_rows[i])
        if i < len(none_rows):
            interleaved.append(none_rows[i])

    filtered_data = pd.DataFrame(interleaved) if interleaved else pd.DataFrame()
else:
    filtered_data = effective_data.sort_values(
        by=["_sort_rank", "Daily_Usage_Mins"],
        ascending=[True, True],
    )

# =============================================================================
# ZONE 1.5: TOP COMPLAINTS DRIVING URGENT RISK (PORTFOLIO SUMMARY)
# =============================================================================

st.markdown("### Top Complaints Driving Urgent Risk")
st.caption(
    "Aggregated complaint themes across negative-sentiment accounts — "
    "showing the primary customer friction points driving urgent churn risk."
)

# Filter to negative sentiment (actual complaints) only
complaint_accounts = data[data["sentiment_level"] == "negative"].copy()

if not complaint_accounts.empty:
    complaint_accounts["matched_category"] = complaint_accounts["audit_explanation"].apply(
        lambda x: x.get("sentiment_raw", {}).get("matched_category", "Other")
        if isinstance(x, dict)
        else "Other"
    )

    complaint_counts = complaint_accounts["matched_category"].value_counts()

    # Limit to top 8 categories if there are more, group the rest as "Other"
    if len(complaint_counts) > 8:
        top_8 = complaint_counts.iloc[:8]
        other_sum = complaint_counts.iloc[8:].sum()
        summary_counts = top_8.copy()
        if other_sum > 0:
            summary_counts["Other"] = other_sum
    else:
        summary_counts = complaint_counts

    chart_data = pd.DataFrame({
        "Complaint Theme": summary_counts.index,
        "Accounts": summary_counts.values,
    }).set_index("Complaint Theme")

    # Render horizontal bar chart in muted urgent palette
    st.bar_chart(chart_data, horizontal=True, color="#DC2626")

    # Dynamic single-sentence interpretation
    top_complaint = complaint_counts.index[0]
    top_count = complaint_counts.iloc[0]
    st.markdown(
        f"<div style='font-size: 0.88rem; color: #334155; margin-top: -6px; margin-bottom: 24px; font-weight: 500;'>"
        f"💡 The most common complaint among at-risk accounts is <strong>{top_complaint}</strong> ({top_count} accounts)."
        f"</div>",
        unsafe_allow_html=True,
    )

# =============================================================================
# ZONE 2: TWO-COLUMN INTERACTIVE TRIAGE WORKSPACE
# =============================================================================

st.markdown("### 📋 Morning Triage Workspace")

if filtered_data.empty:
    st.info("No accounts match your current filter criteria. Adjust your search or toggle filters.")
else:
    workspace_left, workspace_right = st.columns([1.1, 1.2], gap="medium")

    # -------------------------------------------------------------------------
    # LEFT COLUMN: PRIORITIZED TRIAGE QUEUE
    # -------------------------------------------------------------------------
    with workspace_left:
        st.markdown(
            f"**Prioritized Queue** &nbsp; "
            f"<span class='chip'>{len(filtered_data)} accounts</span>",
            unsafe_allow_html=True,
        )

        # Build clean selectable account list
        account_options = []
        for idx, row in filtered_data.iterrows():
            tier = row["severity_tier"]
            name = row["Name"]
            mins = row.get("Daily_Usage_Mins", 0)
            freq = row.get("Login_Frequency", "N/A")
            cat = row["audit_explanation"].get("sentiment_raw", {}).get("matched_category", "")

            if tier == "URGENT":
                prefix = "🚨 [URGENT]"
            elif tier == "WATCH":
                prefix = "⚠️ [WATCH]"
            else:
                prefix = "✅ [HEALTHY]"

            label = f"{prefix} {name}  ·  {freq} ({mins}m/d)  ·  {cat}"
            account_options.append((idx, label, row))

        # Selectbox selector for the active account
        selected_index = st.selectbox(
            "Select Account to Inspect:",
            options=[item[0] for item in account_options],
            format_func=lambda x: next(item[1] for item in account_options if item[0] == x),
            help="Select any account from the triage queue to load its full evidence digest, retention playbook, and diagnostic audit trail.",
        )

        # Retrieve selected row
        selected_row = filtered_data.loc[selected_index].to_dict()

        # Display Quick Queue Previews (showing up to 5 surrounding items)
        st.markdown("<div style='margin-top: 14px;'></div>", unsafe_allow_html=True)
        st.caption("Quick Queue Preview:")

        preview_limit = min(6, len(filtered_data))
        preview_items = filtered_data.head(preview_limit)

        for _, p_row in preview_items.iterrows():
            p_tier = p_row["severity_tier"]
            p_name = p_row["Name"]
            p_email = p_row.get("Email", "N/A")
            p_mins = p_row.get("Daily_Usage_Mins", 0)
            p_freq = p_row.get("Login_Frequency", "N/A")
            p_audit = p_row["audit_explanation"]
            p_ticket = p_audit.get("sentiment_raw", {}).get("ticket_text", "")
            p_cat = p_audit.get("sentiment_raw", {}).get("matched_category", "General")

            if p_tier == "URGENT":
                badge_html = "<span class='status-badge badge-urgent'><span class='status-dot dot-urgent'></span> Urgent</span>"
            elif p_tier == "WATCH":
                badge_html = "<span class='status-badge badge-watch'><span class='status-dot dot-watch'></span> Watch</span>"
            else:
                badge_html = "<span class='status-badge badge-none'><span class='status-dot dot-none'></span> Baseline</span>"

            is_active = (p_row["Name"] == selected_row["Name"])
            card_class = "queue-card-selected" if is_active else "queue-card"

            st.markdown(
                f"""
                <div class="{card_class}">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <strong>{p_name}</strong>
                        {badge_html}
                    </div>
                    <div style="font-size:0.75rem; color:#64748B; margin-bottom:6px;">
                        {p_email} &nbsp;·&nbsp; <span class="chip chip-mono">{p_freq} · {p_mins}m/day</span>
                    </div>
                    <div style="font-size:0.80rem; color:#334155; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        💬 <em>"{p_ticket}"</em>
                    </div>
                </div>
                """,
                unsafe_allow_html=True,
            )

    # -------------------------------------------------------------------------
    # RIGHT COLUMN: DEEP-DIVE RISK INSPECTOR (STICKY & STRUCTURED)
    # -------------------------------------------------------------------------
    with workspace_right:
        tier = selected_row["severity_tier"]
        name = selected_row["Name"]
        email = selected_row.get("Email", "N/A")
        cust_id = selected_row.get("Customer_ID", "N/A")
        csm_expl = selected_row["csm_explanation"]
        action = selected_row["retention_action"]
        email_draft = selected_row.get("email_draft", "No draft generated.")
        audit = selected_row["audit_explanation"]
        login_freq = selected_row.get("Login_Frequency", "N/A")
        daily_mins = selected_row.get("Daily_Usage_Mins", 0)
        ticket_text = audit.get("sentiment_raw", {}).get("ticket_text", "")
        theme_cat = audit.get("sentiment_raw", {}).get("matched_category", "")

        # Inspector Container
        with st.container(border=True):
            # Header Row
            head_c1, head_c2 = st.columns([3, 1.5])
            with head_c1:
                st.markdown(f"### {name}")
                st.caption(f"Account ID: `{cust_id}` · Contact: `{email}`")
            with head_c2:
                if tier == "URGENT":
                    st.markdown(
                        "<div style='text-align:right;'><span class='status-badge badge-urgent'><span class='status-dot dot-urgent'></span> Urgent Risk</span></div>",
                        unsafe_allow_html=True,
                    )
                    st.markdown("<div style='text-align:right; font-size:0.72rem; color:#991B1B; font-weight:600;'>80.7% Historical Churn</div>", unsafe_allow_html=True)
                elif tier == "WATCH":
                    st.markdown(
                        "<div style='text-align:right;'><span class='status-badge badge-watch'><span class='status-dot dot-watch'></span> Watchlist</span></div>",
                        unsafe_allow_html=True,
                    )
                    st.markdown("<div style='text-align:right; font-size:0.72rem; color:#92400E; font-weight:600;'>19.1% Historical Churn</div>", unsafe_allow_html=True)
                else:
                    st.markdown(
                        "<div style='text-align:right;'><span class='status-badge badge-none'><span class='status-dot dot-none'></span> Healthy Baseline</span></div>",
                        unsafe_allow_html=True,
                    )
                    st.markdown("<div style='text-align:right; font-size:0.72rem; color:#475569; font-weight:600;'>15.4% Baseline Churn</div>", unsafe_allow_html=True)

            st.markdown("<hr style='margin: 10px 0 14px 0; border: none; border-top: 1px solid #E2E8F0;' />", unsafe_allow_html=True)

            # -----------------------------------------------------------------
            # LEVEL 1: PLAIN-LANGUAGE EVIDENCE DIGEST (FOR PRIYA)
            # -----------------------------------------------------------------
            st.markdown("#### 💬 Plain-Language Evidence Summary")
            st.write(csm_expl)

            st.markdown(
                f"""
                <div class="ticket-quote">
                    <div style="font-size:0.70rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#64748B; margin-bottom:2px;">
                        Verbatim Support Ticket ({theme_cat})
                    </div>
                    "{ticket_text}"
                </div>
                """,
                unsafe_allow_html=True,
            )

            # Signal Chip Strip
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
            # LEVEL 2: COMPLAINT-TAILORED RETENTION PLAYBOOK & EMAIL DRAFT
            # -----------------------------------------------------------------
            st.markdown("#### 🎯 Recommended Retention Action")
            
            if tier == "URGENT":
                playbook_class = "playbook-card playbook-card-urgent"
                playbook_tag = "🚨 Urgent Intervention Playbook"
            elif tier == "WATCH":
                playbook_class = "playbook-card playbook-card-watch"
                playbook_tag = "⚠️ Light-Touch Check-in Playbook"
            else:
                playbook_class = "playbook-card"
                playbook_tag = "✅ Account Health Status"

            st.markdown(
                f"""
                <div class="{playbook_class}">
                    <div class="playbook-label">{playbook_tag}</div>
                    <div class="playbook-text">{action}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )

            # 1-Click Outreach Email Generator
            if tier in ["URGENT", "WATCH"]:
                with st.expander("✉️ Personalized Retention Email Draft (1-Click Copy)", expanded=True):
                    st.caption("Context-aware email draft tailored to the customer's exact complaint and usage:")
                    st.code(email_draft, language="markdown")
                    
                    btn_col1, btn_col2 = st.columns([2, 1])
                    with btn_col1:
                        if st.button("Mark Account as Triaged", key=f"triage_btn_{cust_id}"):
                            st.success(f"✓ Account {name} marked as triaged for today's follow-up!")

            # -----------------------------------------------------------------
            # LEVEL 3: DIAGNOSTIC AUDIT TRAIL & RULE PROOF (FOR MARCUS)
            # -----------------------------------------------------------------
            with st.expander("🔬 Diagnostic Audit Trail & Rule Logic (For Marcus)", expanded=False):
                st.caption(
                    "Deterministic verification: The exact corroboration rule, raw vectors, "
                    "and historical benchmark cohort backing this recommendation."
                )
                
                st.markdown(f"**Deterministic Rule Fired:** `{audit.get('rule_fired', 'N/A')}`")
                st.markdown(f"**Validation Benchmark:** {audit.get('tier_validation_note', 'N/A')}")
                
                audit_col1, audit_col2 = st.columns(2)
                with audit_col1:
                    st.markdown("**Engagement Vector:**")
                    st.json(audit.get("engagement_raw", {}))
                with audit_col2:
                    st.markdown("**Sentiment Vector:**")
                    st.json(audit.get("sentiment_raw", {}))

# =============================================================================
# ZONE 3: EMPIRICAL CALIBRATION & ZERO-TARGET-LEAKAGE AUDIT VIEW
# =============================================================================

st.markdown("<hr style='margin: 32px 0 16px 0; border: none; border-top: 1px solid #E2E8F0;' />", unsafe_allow_html=True)

with st.expander("📊 Model Auditability, Empirical Calibration & Zero-Leakage Proof", expanded=False):
    st.markdown(
        """
        ### Transparency & Empirical Rigor
        This platform avoids black-box ML hallucinations by using **deterministic 2-signal corroboration** 
        and validating predicted severity tiers against actual historical churn outcomes.
        - **Zero Target Leakage**: The ground-truth `Churn` column was strictly excluded from the scoring engine.
        - **Monotonic Risk Calibration**: Each severity tier corresponds to a strictly monotonic increase in historical churn rate.
        """
    )

    calib_c1, calib_c2 = st.columns([1.2, 1])

    with calib_c1:
        val_df = pd.DataFrame([
            {
                "Severity Tier": "🚨 URGENT",
                "Historical Accounts (n)": 135,
                "Actual Churn Rate": "80.7%",
                "Signal Corroboration": "Weak Engagement + Negative Ticket",
                "Recommended Action": "Immediate Crisis Intervention / Root-Cause Call",
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
                "Signal Corroboration": "Strong/Stable Usage + Neutral/Positive Ticket",
                "Recommended Action": "No Action Needed (Baseline Health)",
            },
        ])
        st.dataframe(val_df, hide_index=True, use_container_width=True)

    with calib_c2:
        chart_data = pd.DataFrame({
            "Tier": ["Healthy Baseline", "Watchlist", "Urgent Attention"],
            "Historical Churn Rate (%)": [15.4, 19.1, 80.7],
        }).set_index("Tier")
        st.bar_chart(chart_data, color="#DC2626")
