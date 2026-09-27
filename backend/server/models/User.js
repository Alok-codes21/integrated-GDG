import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  name:{type:String,trim:true},
  mobile:{type:String,trim:true},
  passwordHash:{type:String,required:true,select:false}
}, {timestamps:true});
export const User=mongoose.model('User',userSchema);
