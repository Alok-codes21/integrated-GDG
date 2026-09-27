import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  ownerId:{type:mongoose.Schema.Types.ObjectId,required:true,index:true,ref:'User'},
  name:String,
  age:{type:Number,min:0,max:120},
  state:String,
  district:String,
  gender:String,
  category:String,
  occupation:String,
  annualFamilyIncome:{type:Number,min:0},
  familySize:{type:Number,min:1},
  ownsCultivableLand:Boolean,
  pmKisanExclusion:Boolean,
  bpl:Boolean,
  widow:Boolean,
  severeOrMultipleDisability:Boolean,
  documents:[String],
  lifeEvents:[String]
}, {timestamps:true,strict:false});
export const Profile = mongoose.model('Profile',schema);
