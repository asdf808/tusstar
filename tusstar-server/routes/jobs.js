const express = require('express');
const jobModel = require('../db/models/jobModel');
const router = express.Router();
const collectModel = require('../db/models/collecModel');
const companyModel = require('../db/models/companyModel');

router.get('/getAll',(req,res) =>{
  jobModel.find({},(err,docs)=>{
    if(err){
      res.send({code:0,msg:err});
      return;
    }
    
    res.send({code:1,data:docs})
  })
})

router.get('/getById/:id',(req,res)=>{
  const id=req.params.id;

  jobModel.findById(id,(err,doc)=>{
    if(err){
      res.send({code:0,msg:err});
      return;
    }
    res.send({code:1,data:doc})
  })
})

router.get('/getFromCompany',(req,res)=>{
  const cid=req.query.cid;

  jobModel.find({ companyId: cid },(err,doc)=>{
    if(err){
      res.send({code:0,msg:err});
      return;
    }
    res.send({code:1,data:doc})
    // res.send(doc)
  })
}) 

//根据条件查询工作岗位
router.get('/getJobs', (req,res)=>{
  const { place, jobType, keyword, worktype, page = 1, pageSize = 10 } = req.query;
  const param = {};
  if(place){
    param.place = { $regex: place, $options: 'i' };
  }
  if(jobType){
    param.type = jobType;
  }
  if(worktype){
    param.worktype = worktype;
  }
  if(keyword){
    param.jobname = { $regex: keyword, $options: 'i' };
  }
  jobModel.countDocuments(param, (err,count)=>{
    if(err){
      res.send({code:0,msg:err});
      return;
    }
    jobModel.find(param).skip((page - 1) * pageSize).limit(pageSize)
    .exec((err,docs)=>{
      if(err){
        res.send({code:0,msg:err});
        return;
      }
      var judge = new Array();
      for(let i = 0;i<docs.length;i++){
        judge.push(false);
      }
      //将judge插入进去
      if(req.session.userId === undefined || req.session.type === 1) {
        console.log('进入false');
        res.send({code:1, data:docs,judge:judge,totalCount: count})
      } else {
        console.log('进入true');
        collectModel.find({studentId: req.session.userId},(err,data)=>{
          if(err) {
            console.log(err,'数据库错误');
          } else {           
            for(let i = 0;i< docs.length;i++){
              for(let j = 0;j<data.length;j++){
                if(docs[i]._id == data[j].jobId){
                  judge[i] = true;
                  console.log(judge[i]);
                  break;
                } else {
                  judge[i] = false;
                }
              }
            }
            console.log(judge);
            res.send({code:1, data:docs,judge:judge,totalCount: count})
          }
        })
      }

    })
  })
  
})

router.post('/updateJob', )

router.delete('/deleteJob/:jobId', (req, res)=>{
  const { jobId } = req.params;
  console.log(jobId);
  jobModel.findByIdAndRemove(jobId, (err)=>{
    if(err){
      res.send({ code: 0 });
      return;
    }
    res.send({ code: 1})
  })
})

//发布一个工作岗位
router.post('/setOneJob',(req,res)=>{
  var jobData = new Object;
  var companyId = req.body.companyid;
  jobData = {
    jobname: req.body.jobname,
    worktype: req.body.worktype,
    type: req.body.type,
    place: req.body.place,
    companyname: req.body.companyname,
    companyId: req.body.companyid,
    money: req.body.money,
    edubackground: (()=>{
      var edustring = "";
      for(let i in req.body.edubackground){
        edustring+=req.body.edubackground[i];
        if(i<req.body.edubackground.length-1){
          edustring+='、';
        }
      }
      return edustring;
    })(),
    workyear:req.body.workyear,
    email:req.body.email,
    phone:req.body.phone,
    detail1:req.body.detail1,
    detail2:req.body.detail2,
    welfare:req.body.welfare,
    contact:req.body.contact,
    img:''
  }
  console.log(jobData);
  new jobModel(jobData).save((err,data)=>{
    if(err) {
      console.log(err,"err");
      res.send({code:0});
    } else {
      console.log("成功")
      res.send({code:1});
    }

  })
})

module.exports = router
