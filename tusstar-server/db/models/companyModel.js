const mongoose = require('mongoose');

const companySchema=new mongoose.Schema({
  companyname: { type: String, required: true },
  password: { type:String, require:true },
  name: String,
  companynature: String,
  companysize: String,
  place: String,
  fund: String,
  companytype: String,
  personphone: String,
  email: String,
  introduce: String,
  listed: String,
  website: String,
  headquarters: String,
  mark: Number
})

module.exports=mongoose.model('company',companySchema);