const express = require('express');
const studentModel = require('../db/models/studentModel');
const collectModel = require('../db/models/collecModel');
const jobModel = require('../db/models/jobModel');
const md5=require('blueimp-md5');
const router = express.Router();

// router.get('/insert', (req,res)=>{
//   let arr=[
//     {studentNo: 17001, password: md5('111111'),major: '数学', name: '狗',grade: '2017', class: '171'},
//   ];
//   studentModel.insertMany(arr,(err,doc)=>{
//     if(doc){
//       res.send('success')
//     }
//   })
// })
//获取收藏列表
router.get('/getCollectedList',(req,res)=>{
  if(req.session.userId === undefined) {
    res.send({code:0,msg:'请先登录'});
    return;
  }
  collectModel.find({studentId:req.session.userId},(err,data)=>{
    if(err){
      res.send({code:0,msg:'数据库错误'});
      return;
    } else {
      res.send({code:1,data:data});
      return;
    }
  })
})

//获取收藏职位信息
router.get('/getCollectedJobInfo',(req,res)=>{
  if(req.session.userId === undefined) {
    res.send({code:0,msg:'请先登录'});
    return;
  }
  collectModel.find({studentId:req.session.userId},(err,data)=>{
    if(err){
      res.send({code:0,msg:'数据库错误'});
      return;
    } else {
      let jobIds = data.map(item=>item.jobId);
      jobModel.find({ _id: { $in: jobIds }},(err, jobs)=>{
        if(err){
          res.send({code:0,msg:'数据库错误'});
          return;
        } else {
          res.send({ code:1,jobs });
        }
      })
      return;
    }
  })
})

// 收藏工作
router.post('/collectJob', (req,res)=>{
  const info = req.body;
  new collectModel({
    studentId: info.userId,
    jobId: info.jobId
  }).save((err,data)=>{
    if(err) {
      console.log(err,'数据库错误');
      res.send({code:0,msg:'数据库错误'});
      return;
    } else {
      //在该Job岗位上添加收藏数
      jobModel.findOne({_id: info.jobId},(err,data)=>{
        if(err) {
          res.send({code:0,msg:'数据库错误'});
          return;
        } else {
          jobModel.updateOne({_id: info.jobId},{collected: data.collected+1},(err,data)=>{
            if(err) {
              res.send({code:0,msg:'数据库错误'});
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

//取消收藏
router.post('/cancelCollectJob',(req,res)=>{
  const info = req.body;
  console.log(info.userId, info.jobId);
  collectModel.deleteOne({studentId: info.userId,jobId: info.jobId},(err,data)=>{
    console.log(data);
    if(err){
      res.send({code:0,msg:'数据库错误'});
      console.log(err,'数据库错误');
      return;
    } else {
      //将职位收藏数减1
      jobModel.findByIdAndUpdate(info.jobId, { $inc: { collected: -1 } }, (err,data)=>{
        if(err) {
          res.send({code:0,msg:'数据库错误'});
          return;
        } else {
          res.send({code:1});
          return;
        }
      })
      // jobModel.findOne({_id: info.jobId},(err,data)=>{
      //   if(err) {
      //     res.send({code:0,msg:'数据库错误'});
      //     return;
      //   } else {
      //     jobModel.updateOne({_id: info.jobId},{collected: data.collected-1},(err,data)=>{
      //       if(err) {
      //         res.send({code:0,msg:'数据库错误'});
      //         return;
      //       } else {
      //         res.send({code:1});
      //         return;
      //       }
      //     })
      //   }
      // })
    }
  })
})

//修改学生密码
router.post('/changePassword',(req,res)=>{
  let info = req.body.passwordInfo;
  if(info.code!= req.session.code){
    delete req.session.code;
    res.send({code:0,msg:'验证码错误,请重新发送新的验证码'});   
    return;
  }
  console.log(req.session);
  studentModel.findOne({_id: req.session.userId},(err,data)=>{
    if(err){
      res.send({code:0,msg:'数据库查找错误'})
    }
    console.log(data,'data');
    if(md5(info.oldPassword)!=data.password){
      delete req.session.code;
      res.send({code: 0,msg:'初始密码错误，请重新发送新的验证码'});    
      return;
    }
    else if(info.email!=data.email){
      delete req.session.code;
      res.send({code:0,msg:'该邮箱不是您原始邮箱，请重新发送新的验证码'});      
      return;
    } else {
      studentModel.updateOne({_id: req.session.userId},{password:md5(info.password)},(err,data)=>{
        if(err) {
          res.send({code:0,msg:'数据库错误'});
          console.log(err,'数据库错误');
          return
        } else {
          res.send({code:1});
          return
        }
      })
    }
  })

})

// 找回学生密码
router.post('/findPassword',(req,res)=>{
  let info = req.body;
  if(info.code != req.session.code) {
    res.send({code:0,msg:'验证码错误,请重新发送验证码'})
    delete req.session.code;
    return;
  }
  studentModel.findOne({studentNo: info.username, email: info.email}, (err,data)=>{
    if(err){
      console.log(err,'数据库错误');
      res.send({code:0,msg:'数据库错误'});
      delete req.session.code;
      return;
    } else {
      if(!data) {
        res.send({code:0,msg:'可能没有这个用户，也可能是邮箱填写错误'});
        delete req.session.code;
        return;
      } else {
        studentModel.updateOne({studentNo: info.username, email:info.email}, {password: md5(info.password)},(err,data)=>{
          if(err) {
            console.log(err,'数据库错误');
            res.send({code:0,msg:'数据库错误'});
            delete req.session.code;
            return;
          } else {
            res.send({code:1});
            delete req.session.code;
            return;
          }
        })
      }
    }
  })
})

//设置学生信息
router.post('/setStudentInfo',(req,res)=>{
    console.log(req.body);
    console.log(req.session.code);
    if(req.session.code != req.body.code) {
        res.send({code:0,msg:'邮箱验证码错误，请重试'});
        return;
    }   
    studentModel.findOne({_id: req.session.userId},
        (err,data)=>{
            if(err) {
                console.log("err",err);
                res.send({code:0,msg:'数据库错误'})
            } else {
                res.send({code:1}); 
                console.log(data);         
                studentModel.update({_id: req.session.userId},{judgefirst: 1,
                                                               email:req.body.email,
                                                               password:md5(req.body.password),
                                                               phone:req.body.phone
                },(err,data)=>{
                    if (err) {
                    console.log(err,'err');
                    } else {
                    }
                })
            }
        })
  })


module.exports = router;
