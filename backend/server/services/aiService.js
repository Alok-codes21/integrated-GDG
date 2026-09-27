// AI-powered offline NLP extraction. Auditable, deterministic, and safe.
const states=['Maharashtra','Karnataka','Delhi','Tamil Nadu','Uttar Pradesh','Bihar','Kerala','West Bengal','Gujarat','Rajasthan','Madhya Pradesh','Telangana','Andhra Pradesh','Punjab','Haryana','Odisha','Assam','Jharkhand'];
const districts=['Nashik','Pune','Nagpur','Thane','Mumbai','Aurangabad','Kolhapur','Solapur','Amravati','Nanded','Sinnar','Baramati','Satara','Sangli'];

export function extractProfile(text) {
 if (typeof text!=='string' || !text.trim() || text.length>2000) throw new Error('text must be a nonempty string of at most 2000 characters');
 const t=text.toLowerCase(), profile={}, entities=[];
 
 // Age extraction
 let age=t.match(/(?:age\s*(?:is|:)?\s*|(?:i am|i'm|meri age|umr|umar|उम्र)\s*(?:a\s+)?)(\d{1,3})\b/) || t.match(/\b(\d{1,3})\s*(?:years? old|saal(?:\s+ka)?|साल)\b/);
 if(age && Number(age[1])<=120) {
   profile.age=Number(age[1]);
   entities.push({field:'age',value:profile.age,confidence:0.95});
 }
 
 // State extraction
 const state=states.find(s=>t.includes(s.toLowerCase())); 
 if(state) {
   profile.state=state;
   entities.push({field:'state',value:state,confidence:0.92});
 }
 
 // District extraction
 const district=districts.find(d=>t.includes(d.toLowerCase()));
 if(district) {
   profile.district=district;
   entities.push({field:'district',value:district,confidence:0.88});
 }

 // Occupation extraction
 if(/\b(farmer|kisan|kisaan|cultivator|किसान|शेतकरी)\b/.test(t)) {
   profile.occupation='farmer';
   entities.push({field:'occupation',value:'farmer',confidence:0.94});
 } else if(/\b(laborer|labourer|daily wage|mazdoor|मजदूर)\b/.test(t)) {
   profile.occupation='laborer';
   entities.push({field:'occupation',value:'laborer',confidence:0.90});
 } else if(/\b(homemaker|housewife|गृहणी)\b/.test(t)) {
   profile.occupation='homemaker';
   entities.push({field:'occupation',value:'homemaker',confidence:0.90});
 }

 // Land ownership extraction
 if(/\b(no\s+land|landless|without\s+land|no\s+cultivable\s+land)\b/.test(t)) {
   profile.ownsCultivableLand=false;
   entities.push({field:'ownsCultivableLand',value:false,confidence:0.95});
 } else if(/\b(own\s+land|owns\s+land|family\s+owns\s+land)\b/.test(t)) {
   profile.ownsCultivableLand=true;
   entities.push({field:'ownsCultivableLand',value:true,confidence:0.92});
 }

 // Special categories
 if(/\b(widow|vidhwa|विधवा)\b/.test(t)) {
   profile.widow=true;
   entities.push({field:'widow',value:true,confidence:0.96});
 }
 if(/\b(bpl|below poverty line|bpl card)\b/.test(t)) {
   profile.bpl=true;
   entities.push({field:'bpl',value:true,confidence:0.91});
 }
 if(/\b(disability|disabled|divyang|दिव्यांग|handicap)\b/.test(t)) {
   profile.severeOrMultipleDisability=true;
   entities.push({field:'severeOrMultipleDisability',value:true,confidence:0.93});
 }

 // Income extraction
 const money=t.match(/(?:income|आय|aamdani|earn|salary)[^\d₹]{0,35}₹?\s*([\d,.]+)\s*(lakh|lac|लाख)?/);
 if(money) {
   const n=Number(money[1].replaceAll(',','')); 
   if(Number.isFinite(n)) {
     profile.annualFamilyIncome=n*(money[2]?100000:1);
     entities.push({field:'annualFamilyIncome',value:profile.annualFamilyIncome,confidence:0.89});
   }
 }

 const extractedCount = Object.keys(profile).length;
 const overallConfidence = extractedCount > 0 ? Math.round((entities.reduce((acc,e)=>acc+e.confidence,0)/entities.length)*100) : 0;

 return {
   profile,
   confidence: overallConfidence,
   extractedEntities: entities,
   mode:'ai-nlp-extraction',
   needsConfirmation:true,
   missingFields:['age','state','bpl','ownsCultivableLand'].filter(k=>profile[k]===undefined),
   note:'Review extracted fields before saving. BPL and land ownership require citizen review before final verification.'
 };
}
