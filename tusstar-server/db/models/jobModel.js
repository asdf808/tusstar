const mongoose = require('mongoose');

const jobSchema=new mongoose.Schema({
  jobname: { type: String, required: true },
  worktype: String,
  type: String,
  place: String,
  companyname: { type: String, required: true },
  companyId: { type: String, required: true },
  money: String,
  edubackground: String,
  workyear: String,
  email: String,
  phone: String,
  detail1: String,
  detail2: String,
  welfare: String,
  contact: String,
  applycount: { type: Number, default: 0 },
  unreadcount: { type: Number, default: 0 },
  img: String,
  collected: { type: Number, default: 0}
})

module.exports=mongoose.model('job',jobSchema);