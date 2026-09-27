const GROQ_MODEL='openai/gpt-oss-20b';
const GEMINI_MODEL='gemini-2.5-flash';
const timedFetch=async(url,options)=>{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);try{return await fetch(url,{...options,signal:controller.signal})}finally{clearTimeout(timer)}};
export async function modelReply({instruction,prompt,json=false,maxOutputTokens=650}){
 const headers={'Content-Type':'application/json'};
 if(process.env.GROQ_API_KEY){
  try{
   const response=await timedFetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{...headers,Authorization:`Bearer ${process.env.GROQ_API_KEY}`},body:JSON.stringify({model:GROQ_MODEL,messages:[{role:'system',content:instruction},{role:'user',content:prompt}],temperature:0.2,max_completion_tokens:maxOutputTokens,...(json?{response_format:{type:'json_object'}}:{})})});
   if(response.ok){const body=await response.json(),reply=body.choices?.[0]?.message?.content?.trim();if(reply)return {reply,model:body.model||GROQ_MODEL,mode:'groq'}}
   else console.warn('Groq unavailable:',response.status);
  }catch(e){console.warn('Groq request failed:',e.name)}
 }
 if(process.env.GEMINI_API_KEY){
  try{
   const response=await timedFetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,{method:'POST',headers:{...headers,'x-goog-api-key':process.env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:instruction}]},contents:[{parts:[{text:prompt}]}],generationConfig:{...(json?{responseMimeType:'application/json'}:{}),maxOutputTokens,temperature:0.2}})});
   if(response.ok){const body=await response.json(),reply=body.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('').trim();if(reply)return {reply,model:GEMINI_MODEL,mode:'gemini'}}
   else console.warn('Gemini unavailable:',response.status);
  }catch(e){console.warn('Gemini request failed:',e.name)}
 }
 return null;
}
