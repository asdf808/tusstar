const mongoose = require('mongoose');

const jobApplicationSchema=new mongoose.Schema({
  student_id: { type:String, require:true },
  job_id: { type:String, require:true },
  status: { type:Number, require:true },
  result: { type:Number, default: 0 },
  applyTime: { type:Number, require:true }
})

module.exports=mongoose.model('jobApplication', jobApplicationSchema);