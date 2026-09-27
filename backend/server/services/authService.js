import {scrypt as scryptCallback, randomBytes, timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import jwt from 'jsonwebtoken';
const scrypt=promisify(scryptCallback);
export async function hashPassword(password){const salt=randomBytes(16).toString('hex');return `${salt}:${(await scrypt(password,salt,64)).toString('hex')}`;}
export async function checkPassword(password,stored){const [salt,hex]=stored.split(':');const actual=await scrypt(password,salt,64),expected=Buffer.from(hex,'hex');return actual.length===expected.length && timingSafeEqual(actual,expected);}
export function tokenFor(userId){return jwt.sign({sub:userId},process.env.JWT_SECRET,{algorithm:'HS256',expiresIn:'2h',issuer:'sahayak-ai'});}
export function requireAuth(req,res,next){const token=req.get('authorization')?.match(/^Bearer (\S+)$/)?.[1];if(!token)return res.status(401).json({error:'Bearer token required'});try{req.userId=jwt.verify(token,process.env.JWT_SECRET,{algorithms:['HS256'],issuer:'sahayak-ai'}).sub;return next();}catch{return res.status(401).json({error:'Invalid or expired token'});}}
