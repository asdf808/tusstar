const express = require('express');
const router = express.Router();
const jobModel = require('../db/models/jobModel');
const jobApplicationModel = require('../db/models/jobApplicationModel');
const studentModel = require('../db/models/studentModel');
const companyModel = require('../db/models/companyModel');
const { disconnect } = require('mongoose');
const applysumModdel = require('../db/models/applysumModel');
//检测当前岗位是否已投递
router.get('/checkApply',(req,res) =>{
  const { studentId, jobId } = req.query;
  console.log( studentId,jobId );
  jobApplicationModel.findOne({ student_id: studentId, job_id: jobId },(err,doc)=>{
    if(err){
      res.send({code:0,msg:err});
      return;
    }
    if(doc){
      res.send({code:1, isApply: true})
    } else {
      res.send({code:1, isApply: false})
    }
  })
})

//申请职位
router.post('/apply',(req,res) =>{
  const { studentId, jobId } = req.body;
  jobApplicationModel.findOne({ student_id: studentId, job_id: jobId }, (err,doc)=>{
    if(err){
      res.send({code:0});
      return;
    }
    if(!doc){
      new jobApplicationModel({ student_id: studentId, job_id: jobId, status: 0,applyTime: Date.now() }).save((err,doc)=>{
        if(err || !doc){
          res.send({code:0})
          return;
        }
        jobModel.findByIdAndUpdate(jobId, { $inc: { applycount: 1, unreadcount: 1 } }, (err,doc)=>{
          if (!err) {
            applysumModdel.findOne({_id:'5f17dfb3e02d150e046fedf2'},(err,data)=>{
              if (err) {
                res.send({code:0})
                return;
              } else {
                applysumModdel.update({_id:'5f17dfb3e02d150e046fedf2'},{sum:data.sum+1},(err,data)=>{
                  if(err) {
                    res.send({code:0});
                    return;
                  } else {
                    res.send({code:1});
                    return;
                  }
                })
              }
            })
          }
        })
        
      })
    }
  })
})

router.get('/getApplyStudent/:jobId', (req,res)=>{
  const jobId = req.params.jobId;
  jobModel.findById(jobId, (err,job)=>{
    if(!job) {
      res.send({code:0});
      return;
    }
    jobApplicationModel.find({ job_id: jobId }, (err,docs)=>{
      if(docs.length){
        const stuIds = docs.map(doc=>doc.student_id);
        studentModel.find({ _id: { $in: stuIds } }, (err,students)=>{
          const applications = docs.map(doc => {
            let obj = doc.toObject();
            obj.student = students.find(stu => stu._id.toString() === doc.student_id)
            return obj;
          })
          res.send({code: 1, applications, job })
        })
      } else {
        res.send({code: 1, applications: [], job })
      }
    })
  })
})

router.post('/adviceInterview', (req, res)=>{
  const { jobId, studentId } = req.body;
  jobApplicationModel.updateOne({ job_id: jobId, student_id: studentId }, { status: 1 }, (err,doc)=>{
    if (doc.ok){
      jobModel.findByIdAndUpdate(jobId, { $inc: { unreadcount: -1 } }, (err,doc)=>{
        if (!err) {
          res.send({code:1})
          return;
        }
        res.send({code:0})
      })
    } else {
      res.send({ code: 0 })
    }
  })
})

router.post('/accept', (req, res)=>{
  const { jobId, studentId } = req.body;
  jobApplicationModel.findOne({ job_id: jobId, student_id: studentId }, (err,doc)=>{
    if(!doc) {
      res.send({code:0})
      return;
    }
    const status = doc.status;
    doc.status = 2;
    doc.result = 1;
    doc.save((err, data)=>{
      if(status === 0) {
        jobModel.findByIdAndUpdate(jobId, { $inc: { unreadcount: -1 } }, (err,doc)=>{
          if (!err) {
            res.send({code:1})
            return;
          }
          res.send({code:0})
        })
      } else {
        res.send({code:1})
      }
    })
  })
})

router.post('/reject', (req, res)=>{
  const { jobId, studentId } = req.body;
  jobApplicationModel.findOne({ job_id: jobId, student_id: studentId }, (err,doc)=>{
    if(!doc) {
      res.send({code:0})
      return;
    }
    const status = doc.status;
    doc.status = 2;
    doc.result = 0;
    doc.save((err, data)=>{
      if(status === 0) {
        jobModel.findByIdAndUpdate(jobId, { $inc: { unreadcount: -1 } }, (err,doc)=>{
          if (!err) {
            res.send({code:1})
            return;
          }
          res.send({code:0})
        })
      } else {
        res.send({code:1})
      }
    })
  })
})

router.get('/getApplyJob', (req, res)=>{
  const { studentId } = req.query;
  jobApplicationModel.find({ student_id: studentId }, (err,docs)=>{
    if(docs.length) {
      const jobIds = docs.map(doc=>doc.job_id);
      jobModel.find({ _id: { $in: jobIds } }, 'jobname companyId companyname phone', (err,jobs)=>{
        // console.log(jobs);
        const applications = docs.map(doc => {
          let obj = doc.toObject();
          job = jobs.find(job => job._id == doc.job_id);
          obj.jobname = job.jobname;
          obj.companyname = job.companyname;
          obj.companyId = job.companyId;
          obj.phone = job.phone;
          return obj;
        })
        // console.log(applications);
        res.send({code: 1, applications})
      })
    } else {
      res.send({code: 1, applications: []})
    }
  })
})

module.exports = router
