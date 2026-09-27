import {allSchemes} from './7-matchingV3.js';
// Small grounded source retrieval for a hackathon; not vector RAG. No generated claims.
export function searchSchemes(query) {
 if(typeof query!=='string'||query.length>200) throw new Error('query must be a string up to 200 characters');
 const terms=query.toLowerCase().split(/\W+/).filter(x=>x.length>2);
 return allSchemes.map(s=>({id:s.id,name:s.name,officialSource:s.officialSource,summary:s.summary,score:terms.filter(t=>(s.name+' '+(s.categories||[s.category]).join(' ')+' '+s.summary).toLowerCase().includes(t)).length})).filter(x=>x.score).sort((a,b)=>b.score-a.score);
}
