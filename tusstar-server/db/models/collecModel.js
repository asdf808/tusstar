const mongoose = require('mongoose');

const collectSchema=new mongoose.Schema({
  studentId: { type:String, require:true },
  jobId: { type:String, require:true}
})


module.exports=mongoose.model('collects',collectSchema);