// No binary file is sent to this service. Parse only supplied text; never claim verification.
export function ocrUnavailable(){return {error:'No document text supplied. File OCR is not available; do not upload real identity documents.'};}
export function scanDocument(payload={}){
 const text=typeof payload.textContent==='string'?payload.textContent.slice(0,20000):'';
 if(!text.trim())return {success:false,status:'unavailable',error:'File OCR is not available. No text from this file was read.',extractedData:{},proposedFields:{},confidence:null,verified:false};
 const annualIncomeMatch=text.match(/(?:annual\s+income|income|rs\.?|₹|inr)\s*(?:of|is|:)?\s*(?:rs\.?|₹|inr)?\s*([\d,]+)/i);
 const annualIncome=annualIncomeMatch?Number(annualIncomeMatch[1].replaceAll(',','')):undefined;
 const fields=annualIncome&&Number.isSafeInteger(annualIncome)?{annualIncome}:{};
 return {success:true,documentType:'Unknown - review original',extractedData:fields,proposedFields:fields,confidence:null,status:'text-pattern-only',verified:false,note:'Only a number was found in text you supplied. No file OCR, identity verification or official check took place.'};
}
