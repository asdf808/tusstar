const mongoose = require('mongoose');

const resumeSchema=new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  school: String,
  education: String,
  age: String,
  sex: String,
  nation: String,
  intro: String,
  address: String,
  phone: String,
  email: String,
  department: String,
  major: String,
  xueli: String,
  xuezhi:String,
  admissionTime: String,
  expectSalary: String,
  work: String,
  img:String
})

module.exports=mongoose.model('resume',resumeSchema);