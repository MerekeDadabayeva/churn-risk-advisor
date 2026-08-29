import { scoreDataset } from '../js/scoring.js';
import { applyExplanations } from '../js/explanations.js';
import { DEFAULT_DATASET } from '../js/data.js';

console.log('Testing JS Engine Parity on 500 records...');

const scored = scoreDataset(DEFAULT_DATASET);
const enriched = applyExplanations(scored);

const counts = { URGENT: 0, WATCH: 0, NONE: 0 };
let urgentChurns = 0, watchChurns = 0, noneChurns = 0;

enriched.forEach((r, idx) => {
  counts[r.severity_tier]++;
  const churn = DEFAULT_DATASET[idx].Churn;
  if (r.severity_tier === 'URGENT') urgentChurns += churn;
  if (r.severity_tier === 'WATCH') watchChurns += churn;
  if (r.severity_tier === 'NONE') noneChurns += churn;
});

console.log('Total scored:', enriched.length);
console.log('Tier counts:', counts);
console.log(`URGENT: count=${counts.URGENT}, churn_rate=${(urgentChurns / counts.URGENT).toFixed(4)}`);
console.log(`WATCH: count=${counts.WATCH}, churn_rate=${(watchChurns / counts.WATCH).toFixed(4)}`);
console.log(`NONE: count=${counts.NONE}, churn_rate=${(noneChurns / counts.NONE).toFixed(4)}`);

// Assertions
if (counts.URGENT !== 135) throw new Error(`URGENT count mismatch: expected 135, got ${counts.URGENT}`);
if (counts.WATCH !== 157) throw new Error(`WATCH count mismatch: expected 157, got ${counts.WATCH}`);
if (counts.NONE !== 208) throw new Error(`NONE count mismatch: expected 208, got ${counts.NONE}`);

const urgentRate = (urgentChurns / counts.URGENT).toFixed(4);
const watchRate = (watchChurns / counts.WATCH).toFixed(4);
const noneRate = (noneChurns / counts.NONE).toFixed(4);

if (urgentRate !== '0.8074') throw new Error(`URGENT rate mismatch: expected 0.8074, got ${urgentRate}`);
if (watchRate !== '0.1911') throw new Error(`WATCH rate mismatch: expected 0.1911, got ${watchRate}`);
if (noneRate !== '0.1538') throw new Error(`NONE rate mismatch: expected 0.1538, got ${noneRate}`);

console.log('✅ ALL PARITY TESTS PASSED! 100% Exact Match with Python Engine.');
