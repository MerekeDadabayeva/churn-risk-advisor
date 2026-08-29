/**
 * app.js
 * ======
 * Triage-flow controller. One work surface: pick an account, see what to do,
 * mark it done, move to the next. Portfolio numbers live in a separate view.
 *
 * Engine modules (scoring / value / explanations / data) are unchanged — this
 * file is the view + interaction layer.
 */

import { DEFAULT_DATASET, parseCSV } from './data.js';
import { scoreDataset } from './scoring.js';
import { applyExplanations } from './explanations.js';
import { resolveValueModel, accountValue, formatValue, formatAtRisk, formatPortfolioAtRisk } from './value.js';

// Churn probability per tier when the dataset has no Churn labels to calibrate on.
const TIER_RISK_FALLBACK = { URGENT: 0.80, WATCH: 0.35, NONE: 0.15 };
const TOP_N = 12; // default worklist size before "show all"

const TIER_META = {
  URGENT: { label: 'Urgent',   cls: 'tier-urgent', badge: 'tier-urgent-badge', tone: 'tone-urgent', signal: 'Weak usage + negative ticket', action: 'Immediate intervention call' },
  WATCH:  { label: 'Watch',    cls: 'tier-watch',  badge: 'tier-watch-badge',  tone: 'tone-watch',  signal: 'Moderate usage + neutral ticket', action: 'Proactive enablement / check-in' },
  NONE:   { label: 'Healthy',  cls: 'tier-ok',     badge: 'tier-ok-badge',     tone: 'tone-ok',     signal: 'Stable usage + routine ticket', action: 'No action (baseline health)' }
};
const TIER_ORDER = ['URGENT', 'WATCH', 'NONE'];

// =============================================================================
// STATE
// =============================================================================

const state = {
  rawDataset: [...DEFAULT_DATASET],
  scoredRecords: [],
  calibration: null,
  valueModel: null,
  rankingBasis: 'priors',

  view: 'triage',
  selectedId: null,
  search: '',
  sort: 'revenue',
  tierFilter: 'actionable',   // 'actionable' | 'URGENT' | 'WATCH' | 'NONE'
  themeFilter: null,
  showAll: false,
  collapsedGroups: new Set(),
  clearedOpen: false,

  triagedIds: new Set(JSON.parse(localStorage.getItem('churn_triaged_ids') || '[]')),
  isCustomData: false,

  _flatIds: []
};

// =============================================================================
// INIT
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initDataset();
  bindEvents();
});

function initDataset() {
  const scored = scoreDataset(state.rawDataset);
  state.scoredRecords = applyExplanations(scored);
  state.scoredRecords.forEach(r => { r.isTriaged = state.triagedIds.has(r.Customer_ID); });

  state.calibration = computeCalibration(state.scoredRecords);
  state.valueModel = resolveValueModel(state.rawDataset);
  annotateValueAtRisk();

  // pick a sensible first selection
  const first = undoneInOrder()[0] || visibleRecords()[0];
  state.selectedId = first ? first.Customer_ID : null;

  renderAll();
}

function renderAll() {
  renderTopbar();
  renderRail();
  renderFilterChips();
  renderQueue();
  renderInspector();
  if (state.view === 'portfolio') renderPortfolio();
}

// =============================================================================
// DERIVED DATA
// =============================================================================

function computeCalibration(records) {
  const total = records.length;
  const out = { total, labeled: 0, tiers: {} };
  TIER_ORDER.forEach(t => {
    const inTier = records.filter(r => r.severity_tier === t);
    const withLabel = inTier.filter(r => r.Churn === 0 || r.Churn === 1);
    const churned = withLabel.filter(r => r.Churn === 1).length;
    out.labeled += withLabel.length;
    out.tiers[t] = {
      n: inTier.length,
      share: total ? (inTier.length / total) * 100 : 0,
      labeledN: withLabel.length,
      churned,
      churnRate: withLabel.length ? (churned / withLabel.length) * 100 : null
    };
  });
  out.hasOutcomes = out.labeled > 0;
  const u = out.tiers.URGENT.churnRate, w = out.tiers.WATCH.churnRate, n = out.tiers.NONE.churnRate;
  out.monotonic = (u != null && w != null && n != null) ? (u >= w && w >= n) : null;
  out.watchWeak = (w != null && n != null) ? Math.abs(w - n) < 5 : null;
  return out;
}

// Expected value at risk ABOVE the healthy baseline (baseline churn is the floor,
// not something a call recovers), so healthy high-value accounts rank near zero.
function annotateValueAtRisk() {
  const model = state.valueModel;
  const cal = state.calibration;
  const MIN_TIER_N = 30;
  const stable = !!cal && cal.hasOutcomes && cal.monotonic === true &&
    TIER_ORDER.every(t => cal.tiers[t].labeledN >= MIN_TIER_N);
  state.rankingBasis = stable ? 'calibrated' : 'priors';

  const tierProb = (tier) => (stable && cal.tiers[tier].churnRate != null)
    ? cal.tiers[tier].churnRate / 100
    : (TIER_RISK_FALLBACK[tier] ?? 0.15);
  const baseline = tierProb('NONE');

  state.scoredRecords.forEach((r, i) => {
    const raw = state.rawDataset[i] || r;
    const prob = tierProb(r.severity_tier);
    r.account_value = accountValue(raw, model);
    r.churn_prob = prob;
    r.addressable_prob = Math.max(prob - baseline, 0);
    r.value_at_risk = r.account_value * r.addressable_prob;
    r._raw = raw;
  });
}

function matchesSearch(r, q) {
  return (r.Name || '').toLowerCase().includes(q)
    || (r.Email || '').toLowerCase().includes(q)
    || (r.Last_Support_Ticket || '').toLowerCase().includes(q);
}

function themeOf(r) {
  return r.audit_explanation?.sentiment_raw?.matched_category || 'Routine Support Inquiry';
}

// filtered + sorted, INCLUDING done items
function visibleRecords() {
  let rows = state.scoredRecords.slice();

  if (state.tierFilter === 'actionable') {
    rows = rows.filter(r => r.severity_tier === 'URGENT' || r.severity_tier === 'WATCH');
  } else {
    rows = rows.filter(r => r.severity_tier === state.tierFilter);
  }
  if (state.themeFilter) rows = rows.filter(r => themeOf(r) === state.themeFilter);
  const q = state.search.trim().toLowerCase();
  if (q) rows = rows.filter(r => matchesSearch(r, q));

  const s = state.sort;
  if (s === 'revenue') {
    rows.sort((a, b) => (b.value_at_risk || 0) - (a.value_at_risk || 0) || (a.Daily_Usage_Mins || 0) - (b.Daily_Usage_Mins || 0));
  } else if (s === 'priority') {
    const ord = { URGENT: 0, WATCH: 1, NONE: 2 };
    rows.sort((a, b) => (ord[a.severity_tier] - ord[b.severity_tier]) || (b.value_at_risk || 0) - (a.value_at_risk || 0));
  } else if (s === 'usage_asc') {
    rows.sort((a, b) => (a.Daily_Usage_Mins || 0) - (b.Daily_Usage_Mins || 0));
  } else if (s === 'name_asc') {
    rows.sort((a, b) => (a.Name || '').localeCompare(b.Name || ''));
  }
  return rows;
}

function isNarrowed() {
  return state.tierFilter !== 'actionable' || !!state.themeFilter || !!state.search.trim();
}

// undone rows, capped to the worklist size unless the user narrowed or expanded
function undoneInOrder() {
  const undone = visibleRecords().filter(r => !r.isTriaged);
  if (state.showAll || isNarrowed()) return undone;
  return undone.slice(0, TOP_N);
}

function clearedInOrder() {
  return visibleRecords().filter(r => r.isTriaged);
}

// =============================================================================
// EVENTS
// =============================================================================

function bindEvents() {
  document.getElementById('tabTriage').addEventListener('click', () => switchView('triage'));
  document.getElementById('tabPortfolio').addEventListener('click', () => switchView('portfolio'));

  document.getElementById('searchInput').addEventListener('input', (e) => {
    state.search = e.target.value; state.showAll = false; renderAll();
  });
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sort = e.target.value; renderQueue(); renderInspector();
  });

  document.getElementById('resetProgressBtn').addEventListener('click', () => {
    state.triagedIds.clear();
    localStorage.setItem('churn_triaged_ids', '[]');
    state.scoredRecords.forEach(r => { r.isTriaged = false; });
    showToast('Triage progress reset');
    renderAll();
  });

  const uploadBtn = document.getElementById('uploadCsvBtn');
  const csvInput = document.getElementById('csvFileInput');
  uploadBtn.addEventListener('click', () => csvInput.click());
  csvInput.addEventListener('change', handleCsvUpload);

  document.getElementById('resetDataBtn').addEventListener('click', () => {
    state.rawDataset = [...DEFAULT_DATASET];
    state.isCustomData = false;
    document.getElementById('resetDataBtn').hidden = true;
    state.tierFilter = 'actionable'; state.themeFilter = null; state.search = ''; state.showAll = false;
    document.getElementById('searchInput').value = '';
    initDataset();
    showToast('Reset to demo cohort (n=500)');
  });

  document.getElementById('kpiUrgent').addEventListener('click', () => jumpToTier('URGENT'));
  document.getElementById('kpiWatch').addEventListener('click', () => jumpToTier('WATCH'));
  document.getElementById('kpiNone').addEventListener('click', () => jumpToTier('NONE'));

  document.addEventListener('keydown', onKeydown);
}

function onKeydown(e) {
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

  if (e.key === '/' && !typing) {
    e.preventDefault();
    document.getElementById('searchInput').focus();
    return;
  }
  if (typing) return;
  if (state.view !== 'triage') return;

  if (e.key === 'j' || e.key === 'ArrowDown') { e.preventDefault(); moveSelection(1); }
  else if (e.key === 'k' || e.key === 'ArrowUp') { e.preventDefault(); moveSelection(-1); }
  else if (e.key === 'd' || e.key === 'Enter') { e.preventDefault(); markDoneAndNext(); }
  else if (e.key === 's') { e.preventDefault(); moveSelection(1); }
  else if (e.key === 'e') { e.preventDefault(); copyEmailOfSelected(); }
}

function switchView(v) {
  state.view = v;
  document.getElementById('viewTriage').hidden = v !== 'triage';
  document.getElementById('viewPortfolio').hidden = v !== 'portfolio';
  document.getElementById('tabTriage').classList.toggle('is-active', v === 'triage');
  document.getElementById('tabPortfolio').classList.toggle('is-active', v === 'portfolio');
  document.getElementById('tabTriage').setAttribute('aria-selected', String(v === 'triage'));
  document.getElementById('tabPortfolio').setAttribute('aria-selected', String(v === 'portfolio'));
  if (v === 'portfolio') renderPortfolio();
}

function jumpToTier(tier) {
  state.tierFilter = tier;
  state.themeFilter = null;
  state.showAll = false;
  switchView('triage');
  const first = undoneInOrder()[0] || visibleRecords()[0];
  state.selectedId = first ? first.Customer_ID : null;
  renderAll();
}

function moveSelection(delta) {
  const flat = state._flatIds;
  if (!flat.length) return;
  let i = flat.indexOf(state.selectedId);
  if (i === -1) i = 0;
  else i = Math.min(Math.max(i + delta, 0), flat.length - 1);
  state.selectedId = flat[i];
  renderQueue();
  renderInspector();
  scrollSelectedIntoView();
}

function markDoneAndNext() {
  const cur = currentRecord();
  if (!cur) return;
  const undone = undoneInOrder().map(r => r.Customer_ID);
  const idx = undone.indexOf(cur.Customer_ID);

  cur.isTriaged = true;
  state.triagedIds.add(cur.Customer_ID);
  localStorage.setItem('churn_triaged_ids', JSON.stringify([...state.triagedIds]));

  const next = undoneInOrder();
  const pick = next[idx] || next[idx - 1] || next[next.length - 1] || null;
  state.selectedId = pick ? pick.Customer_ID : null;

  const remaining = next.length;
  showToast(`${cur.Name} cleared${remaining ? ` · ${remaining} left` : ' · queue clear 🎉'}`);
  renderAll();
  scrollSelectedIntoView();
}

function reopen(id) {
  const r = state.scoredRecords.find(x => x.Customer_ID === id);
  if (!r) return;
  r.isTriaged = false;
  state.triagedIds.delete(id);
  localStorage.setItem('churn_triaged_ids', JSON.stringify([...state.triagedIds]));
  renderAll();
}

function copyEmailOfSelected() {
  const r = currentRecord();
  if (!r || r.severity_tier === 'NONE') return;
  navigator.clipboard.writeText(r.email_draft || '').then(
    () => showToast('Outreach template copied'),
    () => showToast('Copy failed')
  );
}

function currentRecord() {
  return state.scoredRecords.find(r => r.Customer_ID === state.selectedId) || null;
}

function scrollSelectedIntoView() {
  requestAnimationFrame(() => {
    const el = document.querySelector('.qcard.is-selected');
    if (el) el.scrollIntoView({ block: 'nearest' });
  });
}

// =============================================================================
// RENDER — top bar + rail
// =============================================================================

function renderTopbar() {
  const cal = state.calibration;
  const actionable = state.scoredRecords.filter(r => r.severity_tier === 'URGENT' || r.severity_tier === 'WATCH');
  const done = actionable.filter(r => r.isTriaged).length;
  const money = formatPortfolioAtRisk(actionable, state.valueModel);
  const bits = [`${actionable.length} actionable`, `${done} cleared`];
  if (money) bits.push(money);
  document.getElementById('topbarStat').textContent = bits.join('  ·  ');
  document.getElementById('resetDataBtn').hidden = !state.isCustomData;
}

function renderRail() {
  // progress over the current worklist scope (actionable unless narrowed)
  const scope = state.tierFilter === 'actionable'
    ? state.scoredRecords.filter(r => r.severity_tier === 'URGENT' || r.severity_tier === 'WATCH')
    : state.scoredRecords.filter(r => r.severity_tier === state.tierFilter);
  const done = scope.filter(r => r.isTriaged).length;
  const pct = scope.length ? (done / scope.length) * 100 : 0;
  document.getElementById('progressLabel').textContent = `${done} of ${scope.length} cleared`;
  document.getElementById('progressFill').style.width = `${pct}%`;

  // tier facets
  const counts = { URGENT: 0, WATCH: 0, NONE: 0 };
  state.scoredRecords.forEach(r => { counts[r.severity_tier]++; });
  const tierFacets = document.getElementById('tierFacets');
  const facet = (key, name, dot, count) => `
    <li><button class="facet ${state.tierFilter === key ? 'is-active' : ''}" data-tier="${key}">
      ${dot ? `<span class="facet-dot ${dot}"></span>` : '<span class="facet-dot" style="visibility:hidden"></span>'}
      <span class="facet-name">${name}</span>
      <span class="facet-count">${count}</span>
    </button></li>`;
  tierFacets.innerHTML =
    facet('actionable', 'Actionable', '', counts.URGENT + counts.WATCH) +
    facet('URGENT', 'Urgent', 'tier-urgent', counts.URGENT) +
    facet('WATCH', 'Watch', 'tier-watch', counts.WATCH) +
    facet('NONE', 'Healthy baseline', 'tier-ok', counts.NONE);
  tierFacets.querySelectorAll('.facet').forEach(b => b.addEventListener('click', () => {
    state.tierFilter = b.dataset.tier; state.showAll = false;
    const first = undoneInOrder()[0] || visibleRecords()[0];
    state.selectedId = first ? first.Customer_ID : null;
    renderAll();
  }));

  // theme facets (counts within the current tier scope)
  const themeCounts = {};
  scope.forEach(r => { const t = themeOf(r); themeCounts[t] = (themeCounts[t] || 0) + 1; });
  const themeEntries = Object.entries(themeCounts).sort((a, b) => b[1] - a[1]);
  const themeFacets = document.getElementById('themeFacets');
  themeFacets.innerHTML =
    `<li><button class="facet ${!state.themeFilter ? 'is-active' : ''}" data-theme="">
      <span class="facet-name">All themes</span><span class="facet-count">${scope.length}</span></button></li>` +
    themeEntries.map(([t, c]) => `
    <li><button class="facet ${state.themeFilter === t ? 'is-active' : ''}" data-theme="${escapeAttr(t)}">
      <span class="facet-name" title="${escapeAttr(t)}">${escapeHtml(t)}</span>
      <span class="facet-count">${c}</span>
    </button></li>`).join('');
  themeFacets.querySelectorAll('.facet').forEach(b => b.addEventListener('click', () => {
    state.themeFilter = b.dataset.theme || null; state.showAll = false;
    const first = undoneInOrder()[0] || visibleRecords()[0];
    state.selectedId = first ? first.Customer_ID : null;
    renderAll();
  }));
}

function renderFilterChips() {
  const wrap = document.getElementById('filterChips');
  const chips = [];
  if (state.tierFilter !== 'actionable') {
    chips.push(chipHtml(`Tier: ${TIER_META[state.tierFilter].label}`, 'tier'));
  }
  if (state.themeFilter) chips.push(chipHtml(`Theme: ${state.themeFilter}`, 'theme'));
  if (state.search.trim()) chips.push(chipHtml(`Search: “${state.search.trim()}”`, 'search'));

  if (!chips.length) { wrap.hidden = true; wrap.innerHTML = ''; return; }
  wrap.hidden = false;
  wrap.innerHTML = chips.join('') +
    `<button class="linkbtn fchip-clear" id="clearFilters">Clear all</button>`;
  wrap.querySelectorAll('.fchip button[data-clear]').forEach(b => {
    b.addEventListener('click', () => clearFilter(b.dataset.clear));
  });
  document.getElementById('clearFilters').addEventListener('click', () => {
    state.tierFilter = 'actionable'; state.themeFilter = null; state.search = '';
    document.getElementById('searchInput').value = '';
    state.showAll = false; renderAll();
  });
}

function chipHtml(label, key) {
  return `<span class="fchip">${escapeHtml(label)}<button data-clear="${key}" aria-label="Remove filter">×</button></span>`;
}

function clearFilter(key) {
  if (key === 'tier') state.tierFilter = 'actionable';
  if (key === 'theme') state.themeFilter = null;
  if (key === 'search') { state.search = ''; document.getElementById('searchInput').value = ''; }
  state.showAll = false;
  renderAll();
}

// =============================================================================
// RENDER — queue
// =============================================================================

function renderQueue() {
  const host = document.getElementById('queueScroll');
  const undone = undoneInOrder();
  const cleared = clearedInOrder();
  state._flatIds = [];

  if (!undone.length && !cleared.length) {
    host.innerHTML = `<div class="queue-empty">No accounts match the current filters.</div>`;
    return;
  }

  let html = '';

  if (!undone.length) {
    html += `
      <div class="queue-allclear">
        <div class="big">✅</div>
        <div class="headline">Queue clear</div>
        <div>Every account in this view has been triaged.</div>
      </div>`;
  } else {
    // Group by tier only when sorting by priority AND not already scoped to one
    // tier. Otherwise (revenue / usage / name, or a tier facet) show a flat list
    // so the chosen order is honoured across tiers.
    const grouped = state.sort === 'priority' && state.tierFilter === 'actionable';

    if (grouped) {
      TIER_ORDER
        .map(t => [t, undone.filter(r => r.severity_tier === t)])
        .filter(([, rows]) => rows.length)
        .forEach(([tier, rows]) => {
          const collapsed = state.collapsedGroups.has(tier);
          html += `
            <div class="group-head ${collapsed ? 'collapsed' : ''}" data-group="${tier}">
              <span class="chevron">▾</span>
              <span>${TIER_META[tier].label}</span>
              <span class="g-count">${rows.length}</span>
              <span class="g-line"></span>
            </div>`;
          if (!collapsed) {
            rows.forEach(r => { html += qcardHtml(r); state._flatIds.push(r.Customer_ID); });
          }
        });
    } else {
      undone.forEach(r => { html += qcardHtml(r); state._flatIds.push(r.Customer_ID); });
    }

    // "show all" affordance
    const totalUndone = visibleRecords().filter(r => !r.isTriaged).length;
    if (!state.showAll && !isNarrowed() && totalUndone > undone.length) {
      html += `<div class="show-all-row">
        <button class="btn btn-ghost" id="showAllBtn">Show all ${totalUndone} accounts</button>
      </div>`;
    }
  }

  if (cleared.length) {
    html += `
      <div class="group-head ${state.clearedOpen ? '' : 'collapsed'}" data-group="__cleared">
        <span class="chevron">▾</span>
        <span>Cleared</span>
        <span class="g-count">${cleared.length}</span>
        <span class="g-line"></span>
      </div>`;
    if (state.clearedOpen) {
      cleared.forEach(r => { html += qcardHtml(r); state._flatIds.push(r.Customer_ID); });
    }
  }

  host.innerHTML = html;

  host.querySelectorAll('.qcard').forEach(el => {
    el.addEventListener('click', () => {
      state.selectedId = el.dataset.id;
      renderQueue(); renderInspector();
    });
  });
  host.querySelectorAll('.group-head').forEach(el => {
    el.addEventListener('click', () => {
      const g = el.dataset.group;
      if (g === '__cleared') state.clearedOpen = !state.clearedOpen;
      else if (state.collapsedGroups.has(g)) state.collapsedGroups.delete(g);
      else state.collapsedGroups.add(g);
      renderQueue();
    });
  });
  const showAllBtn = document.getElementById('showAllBtn');
  if (showAllBtn) showAllBtn.addEventListener('click', () => { state.showAll = true; renderQueue(); });
}

function qcardHtml(r) {
  const m = TIER_META[r.severity_tier];
  const sel = r.Customer_ID === state.selectedId ? 'is-selected' : '';
  const done = r.isTriaged ? 'is-done' : '';
  const riskChip = state.valueModel
    ? `<span class="qcard-risk">${escapeHtml(formatAtRisk(r.account_value, r.addressable_prob, state.valueModel))}</span>`
    : '';
  const grouped = state.sort === 'priority' && state.tierFilter === 'actionable';
  const tierPrefix = grouped ? '' : `<span class="qcard-tier ${m.cls}">${m.label}</span> · `;
  const sub = `${tierPrefix}${r.Login_Frequency} · ${r.Daily_Usage_Mins}m/day · ${escapeHtml(themeOf(r))}`;
  return `
    <div class="qcard ${m.cls} ${sel} ${done}" data-id="${escapeAttr(r.Customer_ID)}">
      <span class="qcard-accent"></span>
      <span class="qcard-name">${escapeHtml(r.Name || 'Unknown')}</span>
      ${r.isTriaged ? '<span class="qcard-check">✓</span>' : riskChip}
      <span class="qcard-sub">${sub}</span>
    </div>`;
}

// =============================================================================
// RENDER — inspector
// =============================================================================

function renderInspector() {
  const host = document.getElementById('inspector');
  const r = currentRecord();

  if (!r) {
    host.innerHTML = `<div class="inspector-empty">
      <p><strong>Nothing selected.</strong></p>
      <p>Pick an account from the queue, or press <kbd>j</kbd>.</p>
    </div>`;
    return;
  }

  const tier = r.severity_tier;
  const m = TIER_META[tier];
  const audit = r.audit_explanation || {};
  const theme = themeOf(r);
  const ticket = audit.sentiment_raw?.ticket_text || r.Last_Support_Ticket || '';

  const riskBadge = state.valueModel
    ? `<span class="risk-badge" title="Account value ${escapeAttr(formatValue(r.account_value, state.valueModel))} × churn risk above baseline">${escapeHtml(formatAtRisk(r.account_value, r.addressable_prob, state.valueModel))}</span>`
    : '';

  const isNone = tier === 'NONE';
  const emailBlock = isNone ? '' : `
    <details class="email-toggle">
      <summary>Outreach email template</summary>
      <p style="font-size:11.5px;color:var(--text-mute);margin:8px 0 0;">Name + ticket quote filled in. Review before sending.</p>
      <div class="email-box" id="emailBox">${escapeHtml(r.email_draft || '')}</div>
      <div class="action-row"><button class="btn btn-ghost" id="copyEmailBtn">Copy template  ( e )</button></div>
    </details>`;

  const ctx = contextGrid(r);

  const commitBar = r.isTriaged
    ? `<div class="commit-bar"><button class="btn btn-lg" id="reopenBtn">Reopen</button></div>`
    : `<div class="commit-bar">
        <button class="btn btn-primary btn-lg" id="doneBtn">✓ Mark done &amp; next  ( d )</button>
        <button class="btn btn-lg" id="skipBtn">Skip  ( s )</button>
      </div>`;

  host.innerHTML = `
    <div class="insp-head">
      <div class="insp-name">${escapeHtml(r.Name || 'Unknown')}</div>
      <div class="insp-meta">
        <span>${escapeHtml(r.Email || 'no email')}</span>
        <span>·</span>
        <span style="font-family:var(--font-mono);font-size:11px;">${escapeHtml(String(r.Customer_ID).slice(0, 12))}</span>
      </div>
      <div class="insp-tags">
        <span class="tier-badge ${m.badge}">${m.label}</span>
        ${riskBadge}
      </div>
    </div>

    <div class="insp-body">
      <div class="insp-section">
        <div class="insp-label">Do this now</div>
        <div class="action-card ${m.tone}">
          <div class="action-text">${escapeHtml(r.retention_action || 'No action needed — account is healthy.')}</div>
          ${emailBlock}
        </div>
      </div>

      <div class="insp-section">
        <div class="insp-label">Why</div>
        <div class="evidence">${escapeHtml(r.csm_explanation || '')}</div>
        <div class="ticket-quote">
          <span class="q-theme">Support ticket — ${escapeHtml(theme)}</span>
          “${escapeHtml(ticket)}”
        </div>
        <div class="rule-trace">Deterministic rule: <code>${escapeHtml(audit.rule_fired || 'n/a')}</code></div>
      </div>

      <div class="insp-section">
        <div class="insp-label">Context</div>
        <div class="ctx-grid">${ctx}</div>
      </div>
    </div>

    ${commitBar}
  `;

  const doneBtn = document.getElementById('doneBtn');
  if (doneBtn) doneBtn.addEventListener('click', markDoneAndNext);
  const skipBtn = document.getElementById('skipBtn');
  if (skipBtn) skipBtn.addEventListener('click', () => moveSelection(1));
  const reopenBtn = document.getElementById('reopenBtn');
  if (reopenBtn) reopenBtn.addEventListener('click', () => reopen(r.Customer_ID));
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) copyBtn.addEventListener('click', copyEmailOfSelected);
}

function contextGrid(r) {
  const raw = r._raw || {};
  const val = (v) => (v === undefined || v === null || v === '' ? null : v);
  const tenure = val(raw.Account_Age_Days ?? raw.account_age_days);
  const plan = val(raw.Plan ?? raw.plan ?? raw.Tier ?? raw.tier ?? raw.Plan_Tier);
  const items = [
    ['Login frequency', r.Login_Frequency],
    ['Daily usage', `${r.Daily_Usage_Mins} min`],
    ['Ticket theme', themeOf(r)],
    ['Account tenure', tenure != null ? `${tenure} days` : null],
    ['Plan', plan],
    ['Account value', state.valueModel ? formatValue(r.account_value, state.valueModel) : null],
  ];
  return items.map(([k, v]) => `
    <div class="ctx-item">
      <span class="ctx-k">${escapeHtml(k)}</span>
      <span class="ctx-v ${v == null ? 'muted' : ''}">${v == null ? '—' : escapeHtml(String(v))}</span>
    </div>`).join('');
}

// =============================================================================
// RENDER — portfolio view
// =============================================================================

function renderPortfolio() {
  const cal = state.calibration;
  const counts = { URGENT: 0, WATCH: 0, NONE: 0 };
  state.scoredRecords.forEach(r => counts[r.severity_tier]++);
  const total = state.scoredRecords.length || 1;

  const cap = (tier, tail) => {
    const rate = cal?.tiers[tier]?.churnRate;
    return rate == null ? tail : `${rate.toFixed(1)}% churned · ${tail}`;
  };
  setText('urgentCount', counts.URGENT);
  setText('watchCount', counts.WATCH);
  setText('noneCount', counts.NONE);
  setText('urgentCaption', cap('URGENT', 'weak usage + negative ticket'));
  setText('watchCaption', cap('WATCH', 'moderate usage + neutral ticket'));
  setText('noneCaption', cap('NONE', 'stable usage · no friction'));

  document.getElementById('barUrgent').style.width = `${(counts.URGENT / total) * 100}%`;
  document.getElementById('barWatch').style.width = `${(counts.WATCH / total) * 100}%`;
  document.getElementById('barNone').style.width = `${(counts.NONE / total) * 100}%`;

  const actionable = state.scoredRecords.filter(r => r.severity_tier === 'URGENT' || r.severity_tier === 'WATCH');
  const money = formatPortfolioAtRisk(actionable, state.valueModel);
  const basis = state.rankingBasis === 'calibrated'
    ? "churn rates from this dataset's outcomes"
    : 'default tier priors (no stable outcome rates in data)';
  document.getElementById('portfolioRiskLine').innerHTML =
    (money
      ? `<strong>${escapeHtml(money)}</strong> across ${actionable.length} actionable accounts`
      : `Ranking ${actionable.length} actionable accounts by risk-weighted value`) +
    `<span class="value-source">value: ${escapeHtml(state.valueModel.label)} · risk: ${basis}</span>`;

  renderRiskDrivers();
  renderCalibration();
}

function renderRiskDrivers() {
  const chart = document.getElementById('riskDriversChart');
  const insight = document.getElementById('riskDriversInsight');
  const complaints = state.scoredRecords.filter(r => r.sentiment_level === 'negative');
  if (!complaints.length) {
    chart.innerHTML = '<p style="font-size:12.5px;color:var(--text-mute);">No negative-sentiment accounts in this dataset.</p>';
    insight.textContent = '';
    return;
  }
  const byTheme = {};
  const riskByTheme = {};
  complaints.forEach(r => {
    const t = themeOf(r);
    byTheme[t] = (byTheme[t] || 0) + 1;
    riskByTheme[t] = (riskByTheme[t] || 0) + (r.value_at_risk || 0);
  });
  const entries = Object.entries(byTheme).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const max = Math.max(...entries.map(e => e[1]), 1);
  chart.innerHTML = entries.map(([t, c]) => {
    const money = state.valueModel?.mode === 'numeric'
      ? ` · ${formatAtRisk(riskByTheme[t], 1, state.valueModel).replace('~', '')}`
      : '';
    return `<div class="rbar-row">
      <span class="rbar-label" title="${escapeAttr(t)}">${escapeHtml(t)}</span>
      <span class="rbar-track"><span class="rbar-fill" style="width:${(c / max) * 100}%"></span></span>
      <span class="rbar-val">${c}</span>
    </div>`;
  }).join('');
  const top = entries[0];
  insight.innerHTML = `Most common complaint among at-risk accounts: <strong>${escapeHtml(top[0])}</strong> (${top[1]} accounts).`;
}

function renderCalibration() {
  const cal = state.calibration;
  const table = document.getElementById('calibrationTable');
  const chart = document.getElementById('calibrationChart');
  const note = document.getElementById('calibrationNote');

  table.innerHTML = `
    <table class="benchmark-table">
      <thead><tr><th>Tier</th><th>Accounts</th><th>Actual churn</th><th>Recommended action</th></tr></thead>
      <tbody>${TIER_ORDER.map(t => {
        const c = cal.tiers[t], m = TIER_META[t];
        const rate = c.churnRate == null
          ? '<span style="color:var(--text-mute)">no labels</span>'
          : `<strong>${c.churnRate.toFixed(1)}%</strong> <span style="color:var(--text-mute)">(${c.churned}/${c.labeledN})</span>`;
        return `<tr>
          <td><span class="tier-badge ${m.badge}">${m.label}</span></td>
          <td>${c.n} <span style="color:var(--text-mute)">(${c.share.toFixed(0)}%)</span></td>
          <td>${rate}</td>
          <td>${m.action}</td>
        </tr>`;
      }).join('')}</tbody>
    </table>`;

  if (!cal.hasOutcomes) {
    chart.innerHTML = '<p style="font-size:12.5px;color:var(--text-mute);">No <code>Churn</code> labels — nothing to calibrate against.</p>';
    note.textContent = 'The loaded data has no Churn column, so tier accuracy cannot be measured. Tiers are still assigned by the same deterministic rules.';
    return;
  }

  const baseY = 132, topY = 16, h = baseY - topY;
  const bars = [
    { t: 'NONE', x: 55, label: 'Healthy', color: 'var(--ok)' },
    { t: 'WATCH', x: 140, label: 'Watch', color: 'var(--watch)' },
    { t: 'URGENT', x: 225, label: 'Urgent', color: 'var(--urgent)' }
  ].map(b => {
    const rate = cal.tiers[b.t].churnRate;
    if (rate == null) return `<text x="${b.x + 22}" y="${baseY - 4}" font-size="9" fill="var(--text-mute)" text-anchor="middle">n/a</text>`;
    const bh = Math.max(2, (rate / 100) * h), y = baseY - bh;
    return `<rect x="${b.x}" y="${y.toFixed(1)}" width="44" height="${bh.toFixed(1)}" rx="3" fill="${b.color}" />
      <text x="${b.x + 22}" y="${(y - 6).toFixed(1)}" font-size="10" font-weight="700" fill="${b.color}" text-anchor="middle">${rate.toFixed(1)}%</text>
      <text x="${b.x + 22}" y="${baseY + 15}" font-size="9.5" fill="var(--text-mute)" text-anchor="middle">${b.label}</text>`;
  }).join('');
  chart.innerHTML = `<svg class="svg-chart" viewBox="0 0 300 160">
    <line x1="36" y1="${baseY}" x2="285" y2="${baseY}" stroke="var(--border-strong)" />
    ${bars}
  </svg>`;

  let msg = `${cal.labeled} of ${cal.total} accounts carry a Churn label. `;
  if (cal.monotonic === true) msg += 'Churn rate rises monotonically across tiers. ';
  else if (cal.monotonic === false) msg += 'Churn rate is NOT monotonic across tiers — separation is weak here. ';
  if (cal.watchWeak) msg += 'Watch and Healthy churn within 5 points of each other, so the Watch tier adds little over baseline on this data.';
  note.textContent = msg.trim();
}

// =============================================================================
// CSV upload
// =============================================================================

function handleCsvUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const parsed = parseCSV(ev.target.result);
      if (!parsed.length) throw new Error('No data rows found.');
      state.rawDataset = parsed;
      state.isCustomData = true;
      state.tierFilter = 'actionable'; state.themeFilter = null; state.search = ''; state.showAll = false;
      document.getElementById('searchInput').value = '';
      initDataset();
      showToast(`Loaded ${parsed.length} accounts`);
    } catch (err) {
      showToast(`CSV error: ${err.message}`);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// =============================================================================
// utils
// =============================================================================

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function escapeAttr(s) { return escapeHtml(s).replace(/`/g, '&#96;'); }
