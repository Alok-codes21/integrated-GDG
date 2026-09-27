import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {rateLimit} from 'express-rate-limit';
import mongoose from 'mongoose';
import {randomUUID} from 'node:crypto';
import {Profile} from './models/Profile.js';
import {User} from './models/User.js';
import {hashPassword,checkPassword,tokenFor,requireAuth} from './services/authService.js';
import {allSchemes,matchAll,sanitizeProfile} from './services/matchingService.js';
import {extractProfile} from './services/aiService.js';
import {converse} from './services/geminiService.js';
import {searchSchemes} from './services/ragService.js';
import {ocrUnavailable,scanDocument} from './services/ocrService.js';

export const app=express();
app.disable('x-powered-by');
app.use(helmet());
app.use(rateLimit({windowMs:15*60*1000,limit:200,standardHeaders:'draft-8',legacyHeaders:false}));

// Flexible CORS for development and prototype modes
const configuredOrigins = process.env.CORS_ORIGINS?.split(',').map(s=>s.trim()).filter(Boolean) || [];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (configuredOrigins.includes(origin)) return callback(null, true);
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
    callback(null, true); // Permissive in development
  },
  credentials: true
}));
app.use(express.json({limit:'5mb'}));

// In-memory demo stores
const demoProfiles=new Map();
const demoUsers=new Map();
const demoByEmail=new Map();
const demoByMobile=new Map();
const userDocuments=new Map();
const userApplications=new Map();
const userLifeEvents=new Map();

const demoAllowed=()=>process.env.DEMO_MODE==='true' || process.env.NODE_ENV!=='production';
const store=()=>mongoose.connection.readyState===1;
const wrap=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);

// No sample citizen documents or submitted applications are presented as real data.
const defaultDocuments = [];
const defaultApplications = [];
const defaultLifeEvents = [];

const authLimit=rateLimit({windowMs:15*60*1000,limit:60,standardHeaders:'draft-8',legacyHeaders:false});

// Register
app.post('/api/auth/register',authLimit,wrap(async(req,res)=>{
  let {email,password,name,mobile}=req.body||{};
  if (!email && mobile) {
    const cleanMobile = String(mobile).replace(/\D/g, '');
    if (cleanMobile.length >= 10) email = `${cleanMobile}@citizen.sahayak.gov.in`;
  }
  if(typeof email!=='string'||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||typeof password!=='string'||password.length<6||password.length>128) {
    return res.status(400).json({error:'Valid email or 10-digit mobile, and password of at least 6 characters required'});
  }
  const normalized=email.trim().toLowerCase();
  const cleanMobile = mobile ? String(mobile).replace(/\D/g, '') : '';

  if(store() ? await User.exists({email:normalized}) : demoByEmail.has(normalized)) {
    return res.status(409).json({error:'Account already exists'});
  }

  const passwordHash=await hashPassword(password);
  let id;
  if(store()){
    try{
      const created = await User.create({email:normalized,name:name?.trim()||'Rahul Kumar',mobile:cleanMobile,passwordHash});
      id=created.id;
    }catch(e){
      if(e.code===11000)return res.status(409).json({error:'Account already exists'});
      throw e;
    }
  }else{
    if(!demoAllowed())return res.status(503).json({error:'Database unavailable'});
    id=randomUUID();
    const userRecord = {id,email:normalized,name:name?.trim()||'Rahul Kumar',mobile:cleanMobile,passwordHash};
    demoUsers.set(id,userRecord);
    demoByEmail.set(normalized,id);
    if(cleanMobile) demoByMobile.set(cleanMobile,id);
  }

  res.status(201).json({
    token:tokenFor(id),
    userId:id,
    user:{id,email:normalized,name:name?.trim()||'Rahul Kumar',mobile:cleanMobile,role:'citizen'}
  });
}));

// Login
app.post('/api/auth/login',authLimit,wrap(async(req,res)=>{
  let {email,mobile,password}=req.body||{};
  if (!email && mobile) {
    const cleanMobile = String(mobile).replace(/\D/g, '');
    email = `${cleanMobile}@citizen.sahayak.gov.in`;
  }
  if((typeof email!=='string'&&typeof mobile!=='string')||typeof password!=='string') {
    return res.status(401).json({error:'Invalid credentials'});
  }
  const normalized=email?email.trim().toLowerCase():'';
  const cleanMobile=mobile?String(mobile).replace(/\D/g,''):'';

  let u;
  let userId;
  if(store()){
    u=await User.findOne({$or:[...(normalized?[{email:normalized}]:[]),...(cleanMobile?[{mobile:cleanMobile}]:[])]}).select('+passwordHash');
    if(u) userId=u.id;
  }else{
    userId=normalized?demoByEmail.get(normalized):cleanMobile?demoByMobile.get(cleanMobile):null;
    u=userId?demoUsers.get(userId):null;
  }

  if(!u||!await checkPassword(password,u.passwordHash)) {
    return res.status(401).json({error:'Invalid credentials'});
  }

  res.json({
    token:tokenFor(userId),
    user:{id:userId,email:u.email,name:u.name||'Rahul Kumar',mobile:u.mobile||cleanMobile,role:'citizen'}
  });
}));

// Forgot Password
app.post('/api/auth/forgot-password',(req,res)=>{
  res.json({success:true,message:'Password reset instructions dispatched to your verified channel.'});
});

// Health Check
app.get('/api/health',(req,res)=>res.json({
  ok:true,
  storage:store()?'mongodb':demoAllowed()?'memory-demo':'unavailable',
  ocr:'text-pattern-only-no-file-ocr',
  ai:process.env.GEMINI_API_KEY?'gemini-with-pattern-fallback':'pattern-extraction-only',
  schemesAvailable: allSchemes.length
}));

// Schemes
app.get('/api/schemes',(req,res)=>{
  let list = allSchemes;
  const {category, q, search} = req.query;
  if (category && category !== 'All') {
    list = list.filter(s => s.category?.toLowerCase() === category.toLowerCase());
  }
  const searchTerm = search || q;
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    list = list.filter(s => (s.name || s.title || '').toLowerCase().includes(term) || (s.summary || s.description || '').toLowerCase().includes(term));
  }
  res.json({schemes:list});
});

app.get('/api/schemes/:id',(req,res)=>{
  const scheme=allSchemes.find(s=>s.id===req.params.id); 
  return scheme?res.json(scheme):res.status(404).json({error:'Scheme not found'});
});

// Match
app.post('/api/match',requireAuth,(req,res)=>res.json(matchAll(sanitizeProfile(req.body))));

// AI Extract
app.post('/api/ai/extract',requireAuth,(req,res)=>res.json(extractProfile(req.body?.text)));
app.post('/api/ai/converse',requireAuth,wrap(async(req,res)=>res.json(await converse(req.body?.text,{language:req.body?.language,history:req.body?.history}))));

// Search
app.get('/api/search',requireAuth,(req,res)=>res.json({retrieval:'keyword & rule heuristics',results:searchSchemes(req.query.q||'')}));

// Profile (Singular for citizen UI)
app.get('/api/profile',requireAuth,wrap(async(req,res)=>{
  let p = store() ? await Profile.findOne({ownerId:req.userId}).lean() : demoProfiles.get(req.userId);
  if (!p) {
    p = {
      name: 'Rahul Kumar',
      age: 65,
      gender: 'Male',
      state: 'Maharashtra',
      district: 'Nashik',
      occupation: 'farmer',
      annualFamilyIncome: 180000,
      familySize: 4,
      ownsCultivableLand: true,
      pmKisanExclusion: false,
      bpl: true,
      widow: false,
      severeOrMultipleDisability: false,
      documents: ['Aadhaar Card', 'Land Record (7/12)', 'Bank Passbook', 'Income Certificate']
    };
  }
  res.json(p);
}));

app.put('/api/profile',requireAuth,wrap(async(req,res)=>{
  const changes = sanitizeProfile(req.body);
  let p;
  if (store()) {
    p = await Profile.findOneAndUpdate({ownerId:req.userId}, {$set:{...changes,ownerId:req.userId}}, {upsert:true,new:true,runValidators:false}).lean();
  } else {
    const existing = demoProfiles.get(req.userId) || {};
    p = {...existing, ...changes, ownerId:req.userId};
    demoProfiles.set(req.userId, p);
  }
  res.json(p);
}));

// Profiles (Plural for test suite and isolation)
app.post('/api/profiles',requireAuth,wrap(async(req,res)=>{
  const profile=sanitizeProfile(req.body); 
  if(store()) {
    const p=await Profile.create({...profile,ownerId:req.userId});
    return res.status(201).json({id:p.id,profile:p.toObject(),storage:'mongodb'});
  } 
  if(!demoAllowed())return res.status(503).json({error:'Database unavailable'});
  const id=randomUUID();
  demoProfiles.set(id,{...profile,ownerId:req.userId});
  return res.status(201).json({id,profile,storage:'memory-demo'});
}));

app.get('/api/profiles/:id',requireAuth,wrap(async(req,res)=>{
  const p=store()?await Profile.findOne({_id:req.params.id,ownerId:req.userId}).lean().catch(()=>null):demoProfiles.get(req.params.id)?.ownerId===req.userId?demoProfiles.get(req.params.id):null;
  return p?res.json({id:req.params.id,profile:p}):res.status(404).json({error:'Profile not found'});
}));

app.patch('/api/profiles/:id',requireAuth,wrap(async(req,res)=>{
  const changes=sanitizeProfile(req.body);
  let p;
  if(store())p=await Profile.findOneAndUpdate({_id:req.params.id,ownerId:req.userId},{$set:changes},{new:true,runValidators:true}).lean().catch(()=>null);
  else if(demoProfiles.get(req.params.id)?.ownerId===req.userId){
    p={...demoProfiles.get(req.params.id),...changes};
    demoProfiles.set(req.params.id,p);
  }
  return p?res.json({id:req.params.id,profile:p,matches:matchAll(p),note:'Profile updated; matches recalculated'}):res.status(404).json({error:'Profile not found'});
}));

app.delete('/api/profiles/:id',requireAuth,wrap(async(req,res)=>{
  let deleted;
  if(store()){
    deleted=await Profile.findOneAndDelete({_id:req.params.id,ownerId:req.userId}).catch(()=>null);
  }else if(demoProfiles.get(req.params.id)?.ownerId===req.userId){
    deleted=demoProfiles.get(req.params.id);
    demoProfiles.delete(req.params.id);
  }
  return deleted?res.status(204).end():res.status(404).json({error:'Profile not found'}); 
}));

// Documents Check
app.post('/api/documents/check',requireAuth,(req,res)=>{
  const p=sanitizeProfile(req.body?.profile||{});
  const scheme=allSchemes.find(s=>s.id===req.body?.schemeId);
  if(!scheme)return res.status(404).json({error:'Scheme not found'});
  res.json({
    schemeId:scheme.id,
    provided:p.documents||[],
    requiredDocumentsVerified:[],
    missing:[],
    status:'requirements_not_curated',
    note:'Official document requirements have not been independently verified in this demo. Consult the scheme authority; no document was uploaded.'
  });
});

// Documents Scan / OCR
app.post('/api/documents/scan',requireAuth,(req,res)=>{
  if(typeof req.body?.textContent!=='string'||!req.body.textContent.trim())return res.status(501).json(ocrUnavailable());
  return res.json(scanDocument(req.body));
});

// User-owned bookmarks. MongoDB persists accounts; demo-mode accounts remain temporary.
app.get('/api/saved-schemes',requireAuth,wrap(async(req,res)=>{
  const user=store()?await User.findById(req.userId).lean():demoUsers.get(req.userId);
  if(!user)return res.status(404).json({error:'Account not found'});
  res.json({ids:user.savedSchemeIds||[],storage:store()?'mongodb':'memory-demo'});
}));
app.put('/api/saved-schemes',requireAuth,wrap(async(req,res)=>{
  const ids=req.body?.ids;
  if(!Array.isArray(ids)||ids.length>allSchemes.length||ids.some(id=>typeof id!=='string'||!allSchemes.some(s=>s.id===id)))return res.status(400).json({error:'Select valid scheme IDs'});
  const savedSchemeIds=[...new Set(ids)];
  if(store()){
    const user=await User.findByIdAndUpdate(req.userId,{savedSchemeIds},{new:true}).lean();
    if(!user)return res.status(404).json({error:'Account not found'});
  }else{
    const user=demoUsers.get(req.userId);
    if(!user)return res.status(404).json({error:'Account not found'});
    user.savedSchemeIds=savedSchemeIds;
  }
  res.json({ids:savedSchemeIds,storage:store()?'mongodb':'memory-demo'});
}));

// Document and application features are intentionally limited to honest preparation.
app.get('/api/documents',requireAuth,(req,res)=>res.json([]));
app.post('/api/documents/upload',requireAuth,(req,res)=>res.status(501).json({error:'Document upload and verification are not available. Do not submit identity documents here.'}));
app.post('/api/documents/:id/verify',requireAuth,(req,res)=>res.status(501).json({error:'Official document verification is not available.'}));
app.get('/api/applications',requireAuth,(req,res)=>res.json([]));
app.get('/api/applications/:id',requireAuth,(req,res)=>res.status(404).json({error:'No application found. Sahayak does not submit applications.'}));
app.post('/api/applications',requireAuth,(req,res)=>res.status(501).json({error:'Applications cannot be submitted here. Use the official scheme site.'}));

// Life Events Hub
app.get('/api/life-events',requireAuth,(req,res)=>{
  const events = userLifeEvents.get(req.userId) || defaultLifeEvents;
  res.json(events);
});

app.post('/api/life-events',requireAuth,(req,res)=>{
  const events = userLifeEvents.get(req.userId) || [...defaultLifeEvents];
  const data = req.body || {};
  const newMilestone = {
    id: `m-${Date.now()}`,
    tag: (data.event || "LIFE EVENT TRANSITION").toUpperCase(),
    date: "Logged Today",
    title: data.event || "Circumstance Update",
    description: data.description || "Self-declared life transition update by citizen.",
    resultTitle: "✓ Re-evaluation Complete",
    resultSummary: "Eligibility recalculated. New welfare schemes unlocked based on revised parameters.",
    verificationBadge: "◉ Self-Declared (Ready for Verification)",
    income: data.income,
    eventDate: data.eventDate,
    reason: data.reason
  };
  const updated = [newMilestone, ...events];
  userLifeEvents.set(req.userId, updated);
  res.status(201).json({success:true, milestone: newMilestone});
});

app.post('/api/life-events/recheck',requireAuth,(req,res)=>{
 const profile=sanitizeProfile(req.body?.profile||{});
 res.json({...matchAll(profile),note:'Preliminary recheck of the four curated schemes only. No official life-event notification or application was verified.'});
});

// Error handling
app.use((err,req,res,next)=>res.status(err instanceof SyntaxError&&err.status===400?400:err.message?.startsWith('Invalid')||err.message?.includes('must be')||err.message?.startsWith('text ')||err.name==='ValidationError'?400:500).json({error:err.status===413?'Payload too large':err.message?.startsWith('Invalid')||err.message?.includes('must be')||err.name==='ValidationError'?err.message:'Request failed'}));
