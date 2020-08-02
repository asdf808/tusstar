const express = require('express');
const companyModel = require('../db/models/companyModel');
const router = express.Router();
const md5=require('blueimp-md5');
const commentsModel = require('../db/models/commentsModel');
const studentModel = require('../db/models/studentModel');
const filter={password:0,_v:0};

router.get('/getAll',(req,res) =>{
  companyModel.find({},filter,(err,docs)=>{
    if(err){
      res.send({code:0, msg: err})
      return;
    }
    res.send({code:1,data: docs})
  })
})

// 获取所有评论
router.get('/getComments',(req,res)=>{
  console.log(req.query);
  commentsModel.find({companyId: req.query.companyId},(err,data)=>{
    if(err){
      console.log('数据库错误',err);
      res.send({code:0});
      return;
    } else {
      res.send({code:1,data:data});
      return;
    }
  })
})

// 接收评论
router.post('/setComment',(req,res)=>{
  const info = req.body;
  var commentInfo = {};
  commentInfo.studentId = info.studentId;
  commentInfo.companyId = info.companyId;
  commentInfo.content = info.content;
  commentInfo.date = new Date();
  console.log(commentInfo.date);
  studentModel.findOne({_id:info.studentId},(err,data1)=>{
    if(err) {
      res.send({code:0});
      return;
    } else {
      console.log(data1);
      commentInfo.profession = data1.major;
      commentInfo.name = data1.name;
      new commentsModel(commentInfo).save((err,data2)=>{
        if(err){
          console.log(err);
          res.send({code:0});
          return;
        } else {          
          res.send({code:1,data:commentInfo});
          return;
        }
      })
    }
  })
})

// 忘记密码
router.post('/findPassword',(req,res)=>{
  let info = req.body;
  if(info.code != req.session.code) {
    res.send({code:0,msg:'验证码错误,请重新发送验证码'})
    delete req.session.code;
    return;
  }
  companyModel.findOne({companyname: info.username, email: info.email}, (err,data)=>{
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
        companyModel.updateOne({companyname: info.username, email:info.email}, {password: md5(info.password)},(err,data)=>{
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

//修改公司密码
router.post('/changePassword',(req,res)=>{
  let info = req.body.passwordInfo;
  if(info.code!= req.session.code){
    delete req.session.code;
    res.send({code:0,msg:'验证码错误,请重新发送新的验证码'});   
    return;
  }
  companyModel.findOne({_id: req.session.userId},(err,data)=>{
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
      companyModel.updateOne({_id: req.session.userId},{password:md5(info.password)},(err,data)=>{
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

router.get('/getById/:id',(req,res) =>{
  const id=req.params.id;
  companyModel.findById(id, filter, (err,docs)=>{
    if(err){
      res.send({code:0, msg: err})
      return;
    }
    res.send({code:1,data: docs})
  })
})
router.get('/getCompanies', (req,res)=>{
  const { place, companytype, companysize, companynature, keyword, page = 1, pageSize = 9 } = req.query;
  const param = {};
  if(place){
    param.place = { $regex: place, $options: 'i' };
  }
  if(companytype){
    param.companytype = companytype;
  }
  if(companysize){
    param.companysize = companysize;
  }
  if(companynature){
    param.companynature = companynature;
  }
  if(keyword){
    param.companyname = { $regex: keyword, $options: 'i' };
  }
  companyModel.countDocuments(param, (err,count)=>{
    if(err){
      res.send({code:0,msg:err});
      return;
    }
    companyModel.find(param, filter).skip((page - 1) * pageSize).limit(pageSize)
    .exec((err,docs)=>{
      if(err){
        res.send({code:0,msg:err});
        return;
      }
      res.send({code:1, data:docs, totalCount: count})
    })
  })
})

router.post('/updateInfo', (req, res)=>{
  const body = req.body;
  const cid = body.companyId;
  const params={
    companynature: body.companynature,
    companysize: body.companysize,
    place: body.place,
    fund: body.fund,
    companytype: body.companytype,
    personphone: body.personphone,
    email: body.email,
    website: body.website,
    introduce: body.introduce,
    listed: body.listed,
    headquarters: body.headquarters,
  }
  companyModel.findOneAndUpdate(cid, params, (err,doc)=>{
    if(doc){
      res.send({code: 1});
      return;
    }
    res.send({code: 0});
  })
})

module.exports = router;