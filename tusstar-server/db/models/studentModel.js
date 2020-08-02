const mongoose = require('mongoose');

const studentSchema=new mongoose.Schema({
  studentNo: { type:String, require:true },
  password: { type:String, require:true },
  major: { type:String, require:true },
  grade: { type:String, require:true },
  name: { type:String, require:true },
  class: { type:String, require:true },
  judgefirst: {type:Number,default: 0},
  phone: {type:String,require:false},
  email: {type:String,require:false}
})


module.exports=mongoose.model('student',studentSchema);