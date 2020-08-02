const mongoose = require('mongoose');

const commentsSchema=new mongoose.Schema({
  studentId: { type:String, require:true },
  companyId: {type:String, require:true},
  date: {type:String,require:true},
  content: {type:String,require:true},
  profession: {type:String,require:true},
  name: {type:String,require:true}
})


module.exports=mongoose.model('comments',commentsSchema);