/**
 * app.js
 * ======
 * Main UI Controller & State Manager for Churn Risk Advisor.
 * Built for high-speed morning triage and deep auditability.
 */

import { DEFAULT_DATASET, parseCSV, exportToCSV, downloadFile } from './data.js';
import { scoreDataset } from './scoring.js';
import { applyExplanations } from './explanations.js';

// =============================================================================
// APPLICATION STATE
// =============================================================================

const state = {
  rawDataset: [...DEFAULT_DATASET],
  scoredRecords: [],
  filteredRecords: [],
  selectedCustomerId: null,
  focusActionable: true,
  searchQuery: '',
  selectedTheme: 'all',
  sortBy: 'priority',
  activeTierFilter: null, // null or 'URGENT' | 'WATCH' | 'NONE'
  triagedIds: new Set(JSON.parse(localStorage.getItem('churn_triaged_ids') || '[]')),
  isCustomData: false
};

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initDataset();
  bindEvents();
});

function initDataset() {
  // Score and enrich
  const scored = scoreDataset(state.rawDataset);
  state.scoredRecords = applyExplanations(scored);

  // Synchronize triaged status
  state.scoredRecords.forEach(r => {
    r.isTriaged = state.triagedIds.has(r.Customer_ID);
  });

  // Populate theme dropdown
  populateThemeOptions();

  // Apply filters and select first record
  applyFiltersAndRender();
}

// =============================================================================
// DOM EVENT LISTENERS
// =============================================================================

function bindEvents() {
  // 1-Click Actionable Toggle
  const focusToggle = document.getElementById('focusActionableToggle');
  if (focusToggle) {
    focusToggle.addEventListener('change', (e) => {
      state.focusActionable = e.target.checked;
      state.activeTierFilter = null; // reset specific KPI click
      updateKpiCardStyles();
      applyFiltersAndRender();
    });
  }

  // Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Sort Select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Theme Select
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      state.selectedTheme = e.target.value;
      applyFiltersAndRender();
    });
  }

  // KPI Card Clicks (Filter by specific tier)
  const kpiUrgent = document.getElementById('kpiUrgentCard');
  const kpiWatch = document.getElementById('kpiWatchCard');
  const kpiNone = document.getElementById('kpiNoneCard');

  if (kpiUrgent) kpiUrgent.addEventListener('click', () => toggleTierFilter('URGENT'));
  if (kpiWatch) kpiWatch.addEventListener('click', () => toggleTierFilter('WATCH'));
  if (kpiNone) kpiNone.addEventListener('click', () => toggleTierFilter('NONE'));

  // CSV Upload Button & Input
  const uploadBtn = document.getElementById('uploadCsvBtn');
  const csvInput = document.getElementById('csvFileInput');
  if (uploadBtn && csvInput) {
    uploadBtn.addEventListener('click', () => csvInput.click());
    csvInput.addEventListener('change', handleCsvUpload);
  }

  // CSV Export Button
  const exportBtn = document.getElementById('exportCsvBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const csvStr = exportToCSV(state.scoredRecords);
      const filename = `churn_risk_scored_${new Date().toISOString().slice(0, 10)}.csv`;
      downloadFile(filename, csvStr);
      showToast('Scored dataset exported successfully!', '📥');
    });
  }

  // Reset Dataset Button
  const resetBtn = document.getElementById('resetDataBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.rawDataset = [...DEFAULT_DATASET];
      state.isCustomData = false;
      resetBtn.style.display = 'none';
      document.getElementById('datasetCohortBadge').textContent = 'Kaggle Benchmark (n=500)';
      initDataset();
      showToast('Reset to Kaggle benchmark dataset (n=500).', '🔄');
    });
  }

  // Calibration Section Accordion Toggle
  const calibToggle = document.getElementById('calibrationToggle');
  const calibContent = document.getElementById('calibrationContent');
  const calibArrow = document.getElementById('calibrationArrow');
  if (calibToggle && calibContent) {
    calibToggle.addEventListener('click', () => {
      const isHidden = calibContent.style.display === 'none';
      calibContent.style.display = isHidden ? 'block' : 'none';
      calibArrow.textContent = isHidden ? '▲' : '▼';
    });
    // Start expanded
    calibContent.style.display = 'block';
    calibArrow.textContent = '▲';
  }
}

function toggleTierFilter(tier) {
  if (state.activeTierFilter === tier) {
    state.activeTierFilter = null;
  } else {
    state.activeTierFilter = tier;
    // Uncheck actionable toggle if clicking NONE
    if (tier === 'NONE' && state.focusActionable) {
      state.focusActionable = false;
      const toggle = document.getElementById('focusActionableToggle');
      if (toggle) toggle.checked = false;
    }
  }
  updateKpiCardStyles();
  applyFiltersAndRender();
}

function updateKpiCardStyles() {
  const cards = {
    URGENT: document.getElementById('kpiUrgentCard'),
    WATCH: document.getElementById('kpiWatchCard'),
    NONE: document.getElementById('kpiNoneCard')
  };

  Object.entries(cards).forEach(([tier, el]) => {
    if (el) {
      if (state.activeTierFilter === tier) {
        el.classList.add('active-filter');
      } else {
        el.classList.remove('active-filter');
      }
    }
  });
}

// =============================================================================
// CSV FILE UPLOAD HANDLER
// =============================================================================

function handleCsvUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const content = event.target.result;
      const parsed = parseCSV(content);
      if (!parsed.length) throw new Error('No data rows found in CSV.');

      state.rawDataset = parsed;
      state.isCustomData = true;

      const resetBtn = document.getElementById('resetDataBtn');
      if (resetBtn) resetBtn.style.display = 'inline-flex';

      const cohortBadge = document.getElementById('datasetCohortBadge');
      if (cohortBadge) cohortBadge.textContent = `Custom Dataset (n=${parsed.length})`;

      initDataset();
      showToast(`Successfully loaded ${parsed.length} customer records!`, '✨');
    } catch (err) {
      console.error(err);
      alert(`Error parsing CSV file: ${err.message}\n\nPlease verify that your CSV includes headers like Customer_ID, Name, Login_Frequency, Daily_Usage_Mins, Last_Support_Ticket.`);
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // Reset input
}

// =============================================================================
// FILTERING & SORTING PIPELINE
// =============================================================================

function populateThemeOptions() {
  const themeSelect = document.getElementById('themeSelect');
  if (!themeSelect) return;

  const categories = new Set();
  state.scoredRecords.forEach(r => {
    const cat = r.audit_explanation?.sentiment_raw?.matched_category;
    if (cat) categories.add(cat);
  });

  const sortedCategories = Array.from(categories).sort();
  const currentVal = themeSelect.value;

  themeSelect.innerHTML = '<option value="all">All Ticket Themes</option>';
  sortedCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    themeSelect.appendChild(opt);
  });

  if (categories.has(currentVal)) {
    themeSelect.value = currentVal;
  }
}

function applyFiltersAndRender() {
  let records = [...state.scoredRecords];

  // 1. Actionable vs All Filter
  if (state.activeTierFilter) {
    records = records.filter(r => r.severity_tier === state.activeTierFilter);
  } else if (state.focusActionable) {
    records = records.filter(r => r.severity_tier === 'URGENT' || r.severity_tier === 'WATCH');
  }

  // 2. Search Query Filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.trim().toLowerCase();
    records = records.filter(r => {
      const name = (r.Name || '').toLowerCase();
      const email = (r.Email || '').toLowerCase();
      const ticket = (r.Last_Support_Ticket || '').toLowerCase();
      return name.includes(q) || email.includes(q) || ticket.includes(q);
    });
  }

  // 3. Ticket Theme Filter
  if (state.selectedTheme !== 'all') {
    records = records.filter(r => {
      const cat = r.audit_explanation?.sentiment_raw?.matched_category;
      return cat === state.selectedTheme;
    });
  }

  // 4. Sorting
  if (state.sortBy === 'priority') {
    const tierOrder = { URGENT: 0, WATCH: 1, NONE: 2 };
    records.sort((a, b) => {
      const tierDiff = tierOrder[a.severity_tier] - tierOrder[b.severity_tier];
      if (tierDiff !== 0) return tierDiff;
      return (a.Daily_Usage_Mins || 0) - (b.Daily_Usage_Mins || 0);
    });
  } else if (state.sortBy === 'mixed') {
    const urgent = records.filter(r => r.severity_tier === 'URGENT');
    const watch = records.filter(r => r.severity_tier === 'WATCH');
    const none = records.filter(r => r.severity_tier === 'NONE');
    const maxLen = Math.max(urgent.length, watch.length, none.length);
    const mixed = [];
    for (let i = 0; i < maxLen; i++) {
      if (i < urgent.length) mixed.push(urgent[i]);
      if (i < watch.length) mixed.push(watch[i]);
      if (i < none.length) mixed.push(none[i]);
    }
    records = mixed;
  } else if (state.sortBy === 'usage_asc') {
    records.sort((a, b) => (a.Daily_Usage_Mins || 0) - (b.Daily_Usage_Mins || 0));
  } else if (state.sortBy === 'usage_desc') {
    records.sort((a, b) => (b.Daily_Usage_Mins || 0) - (a.Daily_Usage_Mins || 0));
  } else if (state.sortBy === 'name_asc') {
    records.sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));
  }

  state.filteredRecords = records;

  // If selected record is not in filtered list, pick the first one
  const isSelectedPresent = records.some(r => r.Customer_ID === state.selectedCustomerId);
  if (!isSelectedPresent && records.length > 0) {
    state.selectedCustomerId = records[0].Customer_ID;
  } else if (records.length === 0) {
    state.selectedCustomerId = null;
  }

  // Render UI
  renderPulseKPIs();
  renderRiskDriversChart();
  renderQueueList();
  renderInspector();
}

// =============================================================================
// RENDERING FUNCTIONS
// =============================================================================

function renderRiskDriversChart() {
  const chartContainer = document.getElementById('riskDriversChart');
  const insightContainer = document.getElementById('riskDriversInsight');
  if (!chartContainer || !insightContainer) return;

  // Filter to negative sentiment (actual complaints) only
  const complaintAccounts = state.scoredRecords.filter(r => r.sentiment_level === 'negative');

  if (complaintAccounts.length === 0) {
    chartContainer.innerHTML = '<div style="font-size:0.80rem; color:var(--text-muted); padding:10px 0;">No active complaint accounts in current dataset.</div>';
    insightContainer.innerHTML = 'No accounts currently exhibiting negative support sentiment.';
    return;
  }

  // Aggregate counts per matched_category
  const countsMap = {};
  complaintAccounts.forEach(r => {
    const cat = r.audit_explanation?.sentiment_raw?.matched_category || 'Other';
    countsMap[cat] = (countsMap[cat] || 0) + 1;
  });

  // Sort descending
  const sortedEntries = Object.entries(countsMap).sort((a, b) => b[1] - a[1]);

  // Top 8 categories, group rest as Other
  let displayEntries = [];
  if (sortedEntries.length > 8) {
    displayEntries = sortedEntries.slice(0, 8);
    const otherSum = sortedEntries.slice(8).reduce((acc, curr) => acc + curr[1], 0);
    if (otherSum > 0) {
      displayEntries.push(['Other', otherSum]);
    }
  } else {
    displayEntries = sortedEntries;
  }

  const maxVal = Math.max(...displayEntries.map(e => e[1]), 1);

  // Render Horizontal Bars with urgent red styling
  chartContainer.innerHTML = displayEntries.map(([cat, count]) => {
    const pct = ((count / maxVal) * 100).toFixed(1);
    return `
      <div class="risk-bar-row">
        <div class="risk-bar-label" title="${escapeHtml(cat)}">${escapeHtml(cat)}</div>
        <div class="risk-bar-track">
          <div class="risk-bar-fill" style="width: ${pct}%; background-color: var(--urgent-color);"></div>
        </div>
        <div class="risk-bar-value">${count}</div>
      </div>
    `;
  }).join('');

  // Dynamic Insight Sentence
  const topTheme = sortedEntries[0][0];
  const topCount = sortedEntries[0][1];
  insightContainer.innerHTML = `💡 The most common complaint among at-risk accounts is <strong>${escapeHtml(topTheme)}</strong> (${topCount} accounts).`;
}

function renderPulseKPIs() {
  const urgent = state.scoredRecords.filter(r => r.severity_tier === 'URGENT').length;
  const watch = state.scoredRecords.filter(r => r.severity_tier === 'WATCH').length;
  const none = state.scoredRecords.filter(r => r.severity_tier === 'NONE').length;
  const total = state.scoredRecords.length || 1;

  const urgentEl = document.getElementById('urgentCount');
  const watchEl = document.getElementById('watchCount');
  const noneEl = document.getElementById('noneCount');

  if (urgentEl) urgentEl.textContent = urgent;
  if (watchEl) watchEl.textContent = watch;
  if (noneEl) noneEl.textContent = none;

  // Proportion Bar
  const barUrgent = document.getElementById('barUrgent');
  const barWatch = document.getElementById('barWatch');
  const barNone = document.getElementById('barNone');

  const uPct = ((urgent / total) * 100).toFixed(1);
  const wPct = ((watch / total) * 100).toFixed(1);
  const nPct = ((none / total) * 100).toFixed(1);

  if (barUrgent) {
    barUrgent.style.width = `${uPct}%`;
    barUrgent.title = `Urgent: ${uPct}% (${urgent} accounts)`;
  }
  if (barWatch) {
    barWatch.style.width = `${wPct}%`;
    barWatch.title = `Watch: ${wPct}% (${watch} accounts)`;
  }
  if (barNone) {
    barNone.style.width = `${nPct}%`;
    barNone.title = `Baseline: ${nPct}% (${none} accounts)`;
  }
}

function renderQueueList() {
  const container = document.getElementById('queueListContainer');
  const countBadge = document.getElementById('queueCountBadge');
  const progressBadge = document.getElementById('triageProgress');

  if (!container) return;

  if (countBadge) countBadge.textContent = `${state.filteredRecords.length} accounts`;

  const triagedCount = state.filteredRecords.filter(r => r.isTriaged).length;
  if (progressBadge) {
    progressBadge.textContent = `${triagedCount}/${state.filteredRecords.length} Triaged`;
  }

  if (state.filteredRecords.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
        <div style="font-size: 1.5rem; margin-bottom: 8px;">🔍</div>
        <div style="font-weight: 600; font-size: 0.88rem; color: var(--text-main);">No matching accounts found</div>
        <div style="font-size: 0.78rem; margin-top: 4px;">Try adjusting your search criteria or toggling filters.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = state.filteredRecords.map(r => {
    const isSelected = r.Customer_ID === state.selectedCustomerId;
    const tier = r.severity_tier;
    let badgeHtml = '';
    if (tier === 'URGENT') {
      badgeHtml = `<span class="status-badge badge-urgent"><span class="status-dot dot-urgent"></span> Urgent</span>`;
    } else if (tier === 'WATCH') {
      badgeHtml = `<span class="status-badge badge-watch"><span class="status-dot dot-watch"></span> Watch</span>`;
    } else {
      badgeHtml = `<span class="status-badge badge-none"><span class="status-dot dot-none"></span> Baseline</span>`;
    }

    const ticketSnippet = (r.Last_Support_Ticket || '').replace(/"/g, '&quot;');
    const cat = r.audit_explanation?.sentiment_raw?.matched_category || 'Support';
    const triagedBadgeHtml = r.isTriaged ? `<span class="triaged-badge">✓ Triaged</span>` : '';

    return `
      <div class="queue-card ${isSelected ? 'selected' : ''}" data-id="${r.Customer_ID}">
        <div class="card-top-row">
          <div class="card-name">
            <span>${r.Name || 'Unknown'}</span>
            ${triagedBadgeHtml}
          </div>
          ${badgeHtml}
        </div>
        <div class="card-meta-row">
          <span>${r.Email || 'No email'}</span>
          <span>·</span>
          <span class="chip chip-mono">${r.Login_Frequency} · ${r.Daily_Usage_Mins}m/day</span>
        </div>
        <div class="card-ticket-preview" title="${ticketSnippet}">
          💬 "${ticketSnippet}"
        </div>
      </div>
    `;
  }).join('');

  // Attach card click handlers
  container.querySelectorAll('.queue-card').forEach(card => {
    card.addEventListener('click', () => {
      const custId = card.getAttribute('data-id');
      state.selectedCustomerId = custId;
      renderQueueList();
      renderInspector();
    });
  });
}

function renderInspector() {
  const container = document.getElementById('inspectorContainer');
  if (!container) return;

  const current = state.scoredRecords.find(r => r.Customer_ID === state.selectedCustomerId);

  if (!current) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 8px;">📋</div>
        <div style="font-weight: 700; color: var(--text-main);">Select an account from the queue</div>
        <div style="font-size: 0.82rem; margin-top: 4px;">Choose any account to view its evidence summary, playbook, and email draft.</div>
      </div>
    `;
    return;
  }

  const tier = current.severity_tier;
  let badgeHtml = '';
  let churnStatHtml = '';

  if (tier === 'URGENT') {
    badgeHtml = `<span class="status-badge badge-urgent"><span class="status-dot dot-urgent"></span> Urgent Risk</span>`;
    churnStatHtml = `<span class="churn-stat churn-urgent">80.7% Historical Churn</span>`;
  } else if (tier === 'WATCH') {
    badgeHtml = `<span class="status-badge badge-watch"><span class="status-dot dot-watch"></span> Watchlist</span>`;
    churnStatHtml = `<span class="churn-stat churn-watch">19.1% Historical Churn</span>`;
  } else {
    badgeHtml = `<span class="status-badge badge-none"><span class="status-dot dot-none"></span> Healthy Baseline</span>`;
    churnStatHtml = `<span class="churn-stat churn-none">15.4% Baseline Churn</span>`;
  }

  const audit = current.audit_explanation || {};
  const ticketText = audit.sentiment_raw?.ticket_text || current.Last_Support_Ticket || '';
  const themeCat = audit.sentiment_raw?.matched_category || 'Support Inquiry';

  let playbookClass = 'playbook-box';
  let playbookTag = '✅ Account Health Status';
  if (tier === 'URGENT') {
    playbookClass = 'playbook-box urgent-playbook';
    playbookTag = '🚨 Urgent Intervention Playbook';
  } else if (tier === 'WATCH') {
    playbookClass = 'playbook-box watch-playbook';
    playbookTag = '⚠️ Light-Touch Check-in Playbook';
  }

  const emailDraft = current.email_draft || 'No draft generated.';
  const isTriaged = !!current.isTriaged;

  container.innerHTML = `
    <!-- Inspector Header -->
    <div class="inspector-header">
      <div class="inspector-name-wrap">
        <h2>${current.Name || 'Unknown Customer'}</h2>
        <div class="inspector-sub">
          <span>ID: <code style="font-family:var(--font-mono); font-size:0.72rem;">${current.Customer_ID}</code></span>
          <span>·</span>
          <span>${current.Email || 'No contact email'}</span>
        </div>
      </div>
      <div class="inspector-status-wrap">
        ${badgeHtml}
        ${churnStatHtml}
      </div>
    </div>

    <!-- LEVEL 1: Evidence Summary -->
    <div>
      <div class="section-title">💬 Plain-Language Evidence Summary</div>
      <div class="evidence-text">${current.csm_explanation || ''}</div>
      
      <div class="ticket-callout">
        <div class="ticket-callout-header">Verbatim Support Ticket (${themeCat})</div>
        <div class="ticket-callout-body">"${ticketText}"</div>
      </div>

      <div class="chips-row">
        <span class="chip">📅 Logins: <strong>${current.Login_Frequency}</strong></span>
        <span class="chip">⏱️ Daily Usage: <strong>${current.Daily_Usage_Mins} min/day</strong></span>
        <span class="chip">🏷️ Theme: <strong>${themeCat}</strong></span>
      </div>
    </div>

    <!-- LEVEL 2: Retention Playbook & Email Draft -->
    <div>
      <div class="section-title">🎯 Recommended Retention Action</div>
      <div class="${playbookClass}">
        <div class="playbook-tag">${playbookTag}</div>
        <div class="playbook-action-text">${current.retention_action || 'No action needed'}</div>
      </div>
    </div>

    ${tier !== 'NONE' ? `
    <!-- Personalized Email Draft -->
    <div class="collapsible-container">
      <div class="collapsible-header" id="emailExpanderToggle">
        <span>✉️ Personalized Retention Email Draft (1-Click Copy)</span>
        <span id="emailExpanderArrow">▲</span>
      </div>
      <div class="collapsible-content" id="emailExpanderContent">
        <div style="font-size:0.76rem; color:var(--text-muted); margin-bottom:4px;">
          Context-aware email draft tailored to customer's exact complaint and usage metrics:
        </div>
        <div class="email-draft-box" id="emailDraftBox">${escapeHtml(emailDraft)}</div>
        <div class="inspector-btn-row">
          <button class="btn btn-primary btn-sm" id="copyEmailBtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Email Draft
          </button>
          
          <button class="btn ${isTriaged ? 'btn-success' : 'btn-secondary'} btn-sm" id="triageToggleBtn">
            ${isTriaged ? '✓ Triaged' : 'Mark as Triaged'}
          </button>
        </div>
      </div>
    </div>
    ` : `
    <div class="inspector-btn-row">
      <button class="btn ${isTriaged ? 'btn-success' : 'btn-secondary'} btn-sm" id="triageToggleBtn">
        ${isTriaged ? '✓ Triaged' : 'Mark Account as Reviewed'}
      </button>
    </div>
    `}

    <!-- LEVEL 3: Diagnostic Audit Trail -->
    <div class="collapsible-container">
      <div class="collapsible-header" id="auditExpanderToggle">
        <span>🔬 Diagnostic Audit Trail & Rule Logic (For Marcus)</span>
        <span id="auditExpanderArrow">▼</span>
      </div>
      <div class="collapsible-content" id="auditExpanderContent" style="display:none;">
        <div style="font-size:0.76rem; color:var(--text-muted); margin-bottom:8px;">
          Deterministic verification: Exact corroboration rule, raw vectors, and historical validation benchmark.
        </div>
        
        <div style="font-size:0.78rem; margin-bottom:8px;">
          <strong>Rule Fired:</strong> <code style="font-family:var(--font-mono); background:var(--bg-subtle); padding:2px 6px; border-radius:3px;">${audit.rule_fired || 'N/A'}</code>
        </div>
        <div style="font-size:0.78rem; margin-bottom:12px;">
          <strong>Validation Benchmark:</strong> ${audit.tier_validation_note || 'N/A'}
        </div>

        <div class="audit-details-grid">
          <div>
            <div style="font-size:0.72rem; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Engagement Vector</div>
            <pre class="audit-json-box">${JSON.stringify(audit.engagement_raw || {}, null, 2)}</pre>
          </div>
          <div>
            <div style="font-size:0.72rem; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Sentiment Vector</div>
            <pre class="audit-json-box">${JSON.stringify(audit.sentiment_raw || {}, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach buttons & expander event listeners
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailDraft).then(() => {
        showToast('Email draft copied to clipboard!', '📋');
      }).catch(() => {
        showToast('Failed to copy to clipboard', '⚠️');
      });
    });
  }

  const triageBtn = document.getElementById('triageToggleBtn');
  if (triageBtn) {
    triageBtn.addEventListener('click', () => {
      current.isTriaged = !current.isTriaged;
      if (current.isTriaged) {
        state.triagedIds.add(current.Customer_ID);
        showToast(`Account ${current.Name} marked as triaged!`, '✅');
      } else {
        state.triagedIds.delete(current.Customer_ID);
        showToast(`Account ${current.Name} triage status reset`, '↩️');
      }
      localStorage.setItem('churn_triaged_ids', JSON.stringify(Array.from(state.triagedIds)));
      renderQueueList();
      renderInspector();
    });
  }

  // Email expander
  const emailToggle = document.getElementById('emailExpanderToggle');
  const emailContent = document.getElementById('emailExpanderContent');
  const emailArrow = document.getElementById('emailExpanderArrow');
  if (emailToggle && emailContent) {
    emailToggle.addEventListener('click', () => {
      const isHidden = emailContent.style.display === 'none';
      emailContent.style.display = isHidden ? 'flex' : 'none';
      emailArrow.textContent = isHidden ? '▲' : '▼';
    });
  }

  // Audit expander
  const auditToggle = document.getElementById('auditExpanderToggle');
  const auditContent = document.getElementById('auditExpanderContent');
  const auditArrow = document.getElementById('auditExpanderArrow');
  if (auditToggle && auditContent) {
    auditToggle.addEventListener('click', () => {
      const isHidden = auditContent.style.display === 'none';
      auditContent.style.display = isHidden ? 'grid' : 'none';
      auditArrow.textContent = isHidden ? '▲' : '▼';
    });
  }
}

// =============================================================================
// TOAST NOTIFICATION UTILITY
// =============================================================================

let toastTimer = null;
function showToast(message, icon = '✓') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = document.getElementById('toastIcon');

  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (iconEl) iconEl.textContent = icon;

  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
