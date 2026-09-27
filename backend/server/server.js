import 'dotenv/config';
import mongoose from 'mongoose';
import {app} from './app.js';
const port=Number(process.env.PORT)||4000;
if(!process.env.JWT_SECRET || process.env.JWT_SECRET.length<32) {console.error('Set JWT_SECRET to a random value of at least 32 characters');process.exit(1);}
if(process.env.NODE_ENV==='production'&&!process.env.MONGODB_URI){console.error('Production requires MONGODB_URI');process.exit(1);}
if(!process.env.MONGODB_URI && process.env.DEMO_MODE!=='true'){console.error('Set MONGODB_URI or DEMO_MODE=true locally');process.exit(1);}
if(process.env.MONGODB_URI) {try {await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:5000});console.log('MongoDB connected');}catch(e){console.error('MongoDB unavailable:',e.message);process.exit(1);}}
const server=app.listen(port,()=>console.log(`Sahayak API listening on port ${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(async()=>{await mongoose.disconnect();process.exit(0);}));
