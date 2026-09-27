import schemes from '../data/schemes.json' with { type: 'json' };
export const allSchemes = schemes;
export const fields = ['age','state','district','name','gender','category','mobile','occupation','annualFamilyIncome','familySize','ownsCultivableLand','pmKisanExclusion','bpl','widow','severeOrMultipleDisability','documents','lifeEvents'];
export function sanitizeProfile(rawInput) {
  if (!rawInput || typeof rawInput !== 'object' || Array.isArray(rawInput)) throw new Error('Profile must be a JSON object');
  const input = { ...rawInput };
  if (input.annualFamilyIncome === undefined && typeof input.income === 'number') input.annualFamilyIncome = input.income;
  if (input.ownsCultivableLand === undefined && typeof input.land === 'boolean') input.ownsCultivableLand = input.land;
  const out = {};
  for (const key of fields) if (input[key] !== undefined) {
    const v = input[key];
    if (['age','annualFamilyIncome','familySize'].includes(key)) {
      if (typeof v !== 'number' || !Number.isFinite(v) || v < (key === 'familySize' ? 1 : 0) || (key === 'age' && v > 120)) throw new Error(`Invalid ${key}`);
    } else if (['ownsCultivableLand','pmKisanExclusion','bpl','widow','severeOrMultipleDisability'].includes(key)) {
      if (typeof v !== 'boolean') throw new Error(`Invalid ${key}; use true or false`);
    } else if (['documents','lifeEvents'].includes(key)) {
      if (!Array.isArray(v) || v.length > 20 || v.some(x => typeof x !== 'string' || x.length > 100)) throw new Error(`Invalid ${key}`);
    } else if (typeof v !== 'string' || v.length > 120) throw new Error(`Invalid ${key}`);
    out[key] = v;
  }
  return out;
}
export function matchScheme(profile, scheme) {
  const criteria = scheme.rules.map(rule => {
    const actual = profile[rule.field];
    const result = actual === undefined || actual === null ? 'unknown' : rule.op === 'equals' ? (actual === rule.value ? 'met' : 'not_met') : rule.op === 'min' ? (actual >= rule.value ? 'met' : 'not_met') : (actual <= rule.value ? 'met' : 'not_met');
    return {criterion:rule.label, field:rule.field, expected:rule.op === 'equals' ? rule.value : `${rule.op} ${rule.value}`, supplied:actual ?? null, result, source:rule.source};
  });
  const status = criteria.some(c=>c.result==='not_met') ? 'not_matched' : criteria.some(c=>c.result==='unknown') ? 'needs_information' : 'potential_match';
  return {id:scheme.id,name:scheme.name,category:scheme.category,benefit:scheme.benefit,summary:scheme.summary,status,criteria,officialSource:scheme.officialSource,limitations:scheme.limitations,documentChecklist:scheme.documentChecklist,actionPlan:[...new Set(criteria.filter(c=>c.result==='unknown').map(c=>`Confirm ${c.criterion.toLowerCase()}`)), 'Check the latest rules and required documents at the official source', 'Apply only through the official government process']};
}
export function matchAll(profile) {
 const results=schemes.map(s=>matchScheme(profile,s));
 return {disclaimer:'These are preliminary self-reported matches, not official eligibility or approval. Verify current rules and documents with the government authority.',results:results.sort((a,b)=>({potential_match:0,needs_information:1,not_matched:2}[a.status]-{potential_match:0,needs_information:1,not_matched:2}[b.status]))};
}
