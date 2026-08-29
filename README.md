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
- **Signal 2 (Ticket Sentiment)**: Categorizes customer support tickets against 18 empirical templates (Negative, Neutral, Positive).
- **Corroboration Logic**:
  - 🚨 **`URGENT`** (80.7% Historical Churn): Weak engagement + Negative complaint.
  - ⚠️ **`WATCH`** (19.1% Historical Churn): Moderate engagement + Neutral ticket.
  - ✅ **`NONE`** (15.4% Baseline Churn): Healthy / stable accounts.
- **Zero Target Leakage**: `Churn` labels are never used during scoring.

### 2. Dual-Framing Explanation Layer (`js/explanations.js` / `explanation_layer.py`)
- **CSM Plain-Language Summary**: Non-technical evidence quoting actual login frequencies, daily minutes, and verbatim ticket text.
- **Collapsible Audit Trail**: Structured diagnostic breakdown with deterministic rule fired, matched theme, and validation statistics.
- **Actionable Retention Playbooks**: 6 complaint-tailored intervention playbooks for `URGENT` and 3 check-in playbooks for `WATCH`.
- **1-Click Personalized Email Drafts**: Context-aware outreach emails ready to copy and send.

### 3. Interactive Fast Triage UI (`index.html`, `js/app.js`, `styles.css`)
- **Linear/Stripe/Vercel Slate Aesthetic**: Clean, responsive layout with sub-millisecond client-side filtering.
- **1-Click "⚡ Focus on Actionable" Toggle**: Instantly isolate Urgent + Watch accounts for morning triage.
- **Custom CSV Upload & Export**: Drag-and-drop or select any CSV dataset to score in real-time, and export scored results with 1 click.
- **Persistent Triage Checklist**: Track reviewed accounts with browser `localStorage` persistence.
- **Empirical Calibration Panel**: Monotonic calibration chart and validation benchmark cohort proof.

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
│   ├── app.js                  # UI controller, state management, search, filters & charts
│   ├── scoring.js              # Client-side 2-signal scoring engine (100% parity)
│   ├── explanations.js         # Dual-framing summaries, playbooks & email draft generator
│   └── data.js                 # Embedded benchmark dataset (n=500), CSV parser & exporter
├── tests/
│   └── verify_parity.js        # Automated verification script testing JS vs Python logic
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
