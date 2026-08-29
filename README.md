# 🛡️ Churn Risk Advisor — Daily Triage Desk

[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-success)](README.md)
[![Zero Target Leakage](https://img.shields.io/badge/Target_Leakage-0%25-brightgreen)](README.md)
[![Calibration Rigor](https://img.shields.io/badge/Monotonic_Calibration-Validated-blue)](README.md)
[![Platform](https://img.shields.io/badge/Platform-Static%20Web-orange)](README.md)

A high-performance Customer Success churn-risk triage platform powered by a deterministic **2-Signal Corroboration Engine** and a **Dual-Framing Explanation Layer**.

Designed for SaaS Customer Success Managers (CSMs) to prioritize interventions on high-risk accounts in under 3 minutes, while providing transparent, auditable reasoning without uncalibrated black-box predictions.

---

## 🌐 Live GitHub Pages Deployment

This application is built as a zero-dependency, ultra-fast static web application that runs directly in the browser and deploys effortlessly to **GitHub Pages**.

### 🚀 1-Step Setup on GitHub Pages:
1. Push this repository to GitHub:
   ```bash
   git push origin main
   ```
2. In your GitHub repository, navigate to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**.
   - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.
4. Your site will automatically go live at:
   ```
   https://<your-username>.github.io/churn-risk-advisor/
   ```

---

## ⚡ Key Capabilities

### 1. Deterministic 3-Tier Severity Scoring (`js/scoring.js` / `severity_scoring.py`)
- **Signal 1 (Engagement)**: Combines `Login_Frequency` and `Daily_Usage_Mins` into an adoption signal.
  - *Weak*: `Login_Frequency == "Rarely"` OR `Daily_Usage_Mins < 20`
  - *Strong*: `Login_Frequency == "Daily"` AND `Daily_Usage_Mins >= 35`
  - *Moderate*: Intermediate patterns
- **Signal 2 (Ticket Sentiment)**: Matches the last support ticket against 18 empirical templates first; anything else (real uploaded tickets) falls through to a free-text lexicon scan for negative / positive / neutral cues. A pre-scored `Sentiment` column, if present, overrides both. Churn risk is asymmetric, so a negative/positive tie resolves to negative.
- **Corroboration Logic**:
  - 🚨 **`URGENT`**: Weak engagement + Negative complaint.
  - ⚠️ **`WATCH`**: Moderate engagement + Neutral ticket.
  - ✅ **`NONE`**: Healthy / stable accounts.
- **Zero Target Leakage**: `Churn` labels are never used during scoring. On the bundled Kaggle cohort (n=500) the assigned tiers back-test to 80.7% / 19.1% / 15.4% actual churn — note that `WATCH` sits only ~3.7 points above the `NONE` baseline, so it separates real churn weakly.

### 2. Dual-Framing Explanation Layer (`js/explanations.js` / `explanation_layer.py`)
- **CSM Plain-Language Summary**: Non-technical evidence quoting actual login frequencies, daily minutes, and verbatim ticket text.
- **Deterministic Rule Trace**: A one-line record of the exact corroboration rule that fired, shown inline in the inspector — no black-box score.
- **Actionable Retention Playbooks**: 6 complaint-tailored intervention playbooks for `URGENT` and 3 check-in playbooks for `WATCH`.
- **Outreach Email Templates**: Complaint-type starter templates with the customer name and ticket quote filled in — meant to be reviewed and personalized before sending, not sent as-is.

### 3. Triage-Flow UI (`index.html`, `js/app.js`, `styles.css`)
- **Three-pane work surface**: left rail (tier + ticket-theme facets with counts, batch progress) · queue · inspector. Each pane scrolls on its own; nothing invents or infers account value or revenue.
- **Ranking**: severity tier first, then lowest daily usage (most disengaged) first. Sort options: Priority, Lowest usage, Name.
- **Work the queue**: the inspector leads with *Do this now*; **Mark done & next** clears an account and advances. Keyboard: `j`/`k` move, `d` done, `s` skip, `e` copy template, `/` search.
- **Batch progress**: the rail tracks a snapshotted 12-account worklist (`0 of 12 in this batch`), not the whole portfolio, so it stays meaningful at any dataset size. "Next batch" re-anchors it.
- **Scales**: default view renders the top 12; flat lists cap at 100 with a "refine" note; the Cleared group caps at 50; one delegated click handler for the whole queue.
- **Custom CSV Upload**: Load your own customer CSV in place of the bundled cohort. See `sample_upload.csv` for the expected shape (optional `Churn` column enables the calibration panel).
- **Persistent progress**: reviewed accounts tracked in browser `localStorage`.
- **Empirical Calibration Panel** (Portfolio view): recomputes on every data load — takes the tiers the engine assigned and measures their actual churn rate against the `Churn` outcomes in the same dataset, flagging weak tier separation when it occurs.

---

## 💻 Local Preview & Development

To run the application locally without any server dependencies:

### Option A: Open directly in Browser
Double-click `index.html` or open it with any web browser.

### Option B: Local Static Server
```bash
# Using Python 3 built-in HTTP server
python3 -m http.server 8000

# Open http://localhost:8000
```

### Option C: Using Node.js
```bash
# Run engine parity verification test
node tests/verify_parity.js

# Or serve locally with npx
npx serve .
```

---

## 📂 Project Structure

```
├── index.html                  # Main static entry point (HTML5 semantic dashboard)
├── styles.css                  # Enterprise SaaS design system (Slate / Indigo theme)
├── js/
│   ├── app.js                  # Triage-flow UI controller: state, filters, queue, inspector, calibration
│   ├── scoring.js              # 2-signal scoring engine + free-text sentiment lexicon (100% parity)
│   ├── explanations.js         # Plain-language summaries, rule trace, playbooks & email templates
│   └── data.js                 # Embedded benchmark dataset (n=500) & CSV parser for uploads
├── tests/
│   └── verify_parity.js        # Automated verification script testing JS vs Python logic
├── sample_upload.csv           # Example custom-upload CSV (free-text tickets + Churn)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for automated Pages deployment
├── train.csv                   # Kaggle SaaS benchmark dataset (500 accounts)
├── severity_scoring.py         # Python scoring module (reference / CLI)
├── explanation_layer.py        # Python explanation module (reference / CLI)
└── app.py                      # Python Streamlit application (alternative runtime)
```

---

## 🧪 Parity & Calibration Validation

To run the automated parity tests verifying that the JavaScript engine produces exact identical tier assignments and churn calibrations as the Python benchmark:

```bash
node tests/verify_parity.js
```

**Output**:
```
Testing JS Engine Parity on 500 records...
Total scored: 500
Tier counts: { URGENT: 135, WATCH: 157, NONE: 208 }
URGENT: count=135, churn_rate=0.8074
WATCH: count=157, churn_rate=0.1911
NONE: count=208, churn_rate=0.1538
✅ ALL PARITY TESTS PASSED! 100% Exact Match with Python Engine.
```

---

## 📄 License
MIT License. Built for Customer Success Teams.
