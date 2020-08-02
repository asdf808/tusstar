const mongoose = require('mongoose');

const applysumSchema=new mongoose.Schema({
  sum: { type:Number, require:true },

})


module.exports=mongoose.model('applysum',applysumSchema);