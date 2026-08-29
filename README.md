# 🛡️ Churn Risk Advisor — Daily Triage

A Customer Success churn-risk triage platform powered by a deterministic **2-Signal Corroboration Engine** and a **Dual-Framing Explanation Layer**.

Designed for SaaS Customer Success Managers (CSMs) to prioritize interventions on high-risk accounts and provide clear, auditable reasoning without uncalibrated black-box predictions.

---

## 🚀 Key Capabilities

1. **Deterministic 3-Tier Severity Scoring (`severity_scoring.py`)**:
   - **Signal 1 (Engagement)**: Combines `Login_Frequency` and `Daily_Usage_Mins` into an adoption signal.
   - **Signal 2 (Ticket Sentiment)**: Maps customer support tickets against 18 empirical templates (Negative, Neutral, Positive).
   - **Corroboration Logic**:
     - 🚨 **`URGENT`** (80.7% Historical Churn): Weak engagement + Negative complaint.
     - ⚠️ **`WATCH`** (19.1% Historical Churn): Moderate engagement + Neutral ticket.
     - ✅ **`NONE`** (15.4% Baseline Churn): Healthy / stable accounts.
   - **Zero Target Leakage**: `Churn` labels are never used during scoring.

2. **Dual-Framing Explanation Layer (`explanation_layer.py`)**:
   - **CSM Plain-Language Summary**: Concrete evidence quoting actual login frequencies, daily minutes, and verbatim ticket text.
   - **Collapsible Audit Trail**: Structured diagnostic breakdown with deterministic rule fired, matched theme, and validation statistics.
   - **Actionable Retention Playbooks**: Complaint-tailored recommendations for `URGENT` and check-in playbooks for `WATCH`.

3. **Fast Triage UI (`app.py`)**:
   - Built with Streamlit for sub-second load times and intuitive triage filtering.
   - 1-click **"Focus on Actionable Accounts"** shortcut.
   - Retroactive historical validation panel with monotonic calibration chart.

---

## 📦 Production Deployment Options

### Option 1: Streamlit Community Cloud (Recommended — 1-Click & Free)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Churn Risk Advisor"
   git branch -M main
   git remote add origin https://github.com/<your-username>/churn-risk-advisor.git
   git push -u origin main
   ```
2. Navigate to [share.streamlit.io](https://share.streamlit.io/).
3. Connect your GitHub account and select this repository.
4. Set Main file path to `app.py` and click **Deploy**.

---

### Option 2: Docker Container (Render / Fly.io / GCP Cloud Run / Hugging Face Spaces)

Build and run locally:
```bash
docker build -t churn-risk-advisor .
docker run -p 8501:8501 churn-risk-advisor
```

Deploy to **Render**:
1. Connect GitHub repo on Render.
2. Select **Web Service** $ightarrow$ **Docker** environment.
3. Set Port to `8501`.

Deploy to **Fly.io**:
```bash
fly launch
fly deploy
```

---

## 💻 Local Development

```bash
# Clone and install dependencies
pip install -r requirements.txt

# Run the app
streamlit run app.py
```

Access at `http://localhost:8501`.
