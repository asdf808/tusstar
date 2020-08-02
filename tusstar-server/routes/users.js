var express = require('express');
const md5=require('blueimp-md5');
const StudentModel = require('../db/models/studentModel');
const CompanyModel = require('../db/models/companyModel');
const ResumeModel = require("../db/models/resumeModel");
var router = express.Router();
const sendmail = require('../utils/email');
const makecode = require('../utils/makecode');
const applysumModel = require('../db/models/applysumModel');
const companyModel = require('../db/models/companyModel');
const jobModel = require('../db/models/jobModel');
const studentModel = require('../db/models/studentModel');

router.post('/insert',(req,res)=>{
  new applysumModel({sum : 0}).save((err,msg)=>{
    if(err) {
      res.send({code:0,msg:'数据库错误'});
      return;
    } else {
      res.send({code:1});
      console.log(msg);
    }
  })
})

//获取首页下方的信息
router.get('/getMessage',(req,res)=>{
  var mes = new Array();
  companyModel.find((err,data1)=>{
    if(err) {
      res.send({code:0,msg:'数据库错误'});
      return;
    } else {
      mes.push(data1.length);
      jobModel.find((err,data2)=>{
        if(err) {
          res.send({code:0,msg:'数据库错误'});
          return;
        } else {
          mes.push(data2.length);
          applysumModel.findOne({_id:'5f17dfb3e02d150e046fedf2'},(err,data3)=>{
            if(err) {
              res.send({code:0,msg:'数据库错误'});
              return;
            } else {
              console.log(data3,'data3');
              mes.push(data3.sum);
              StudentModel.find((err,data4)=>{
                if(err) {
                  res.send({code:0,msg:'数据库错误'});
                  return;
                } else {
                  mes.push(data4.length);
                  res.send({code:1,data:mes});
                  return;
                }
              })
            }

          })
        }
      })
    }
  })
})

//注册发送邮箱验证码
router.get('/sentEmailCode',(req,res)=>{
  let email = req.query.email;
  let code = makecode.code;
  console.log(code);
  req.session.code = code;
  console.log(req.session.code);
  let x = sendmail(email,code);
  if(x==0){
    res.send({code:0});
  } else {
    res.send({code:1});
  }
})

//sendenial

// express.use(multer({ dest: 'tmp'}). array('image'))
/* GET users listing. */
router.post('/comRegist',function(req, res) {
  const body = req.body;
  const { password,password2 } = body;
  if(password!==password2){
    res.send({code:0,msg:'两次密码不相同'});
    return;
  }
  CompanyModel.findOne({companyname: body.companyname},(err,user)=>{
    if(err){
      res.send({code:0,msg:err});
      return;
    }
    if(user){
      res.send({code:0,msg:'此公司已注册'});
      return;
    }
    const params={
      companyname: body.companyname,
      password: md5(body.password),
      name: body.name,
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
      mark: 2.5
    }
    new CompanyModel(params).save((err,doc)=>{
      if(err){
        res.send({code:0,msg:err});
        return
      }
      res.send({code:1});
    })
  })
})




const filter={password:0,_v:0};

// 用户登录
router.post('/stuLogin', (req, res) => {
  const {username,password,rem}=req.body;
  StudentModel.findOne({studentNo: username,password:md5(password)},filter,(err,student)=>{
    if(err){
      res.send({code:0, msg: err})
      return;
    }
    if(!student){
      res.send({code:0,msg:'用户名或密码错误'});
      return;
    }
    if(rem){
      res.cookie('userId',student._id, {maxAge: 1000*60*60*24*7});
      res.cookie('userType',0 , {maxAge: 1000*60*60*24*7});
    } else {
      res.clearCookie("userId");
    }
    //重置session
    req.session.userId = student._id;
    req.session.type = 0;
    res.send({
      code:1,
      data: {
        _id: student._id,
        username: student.name,
        type: 0,
        student,
        judgefirst: student.judgefirst
      },
      msg: `欢迎您，${student.name}`});
 
    
  })
})

// 公司登录
router.post('/comLogin', (req, res) => {
  const {username,password,rem}=req.body;
  CompanyModel.findOne({companyname: username,password:md5(password)},filter,(err,company)=>{
    if(err){
      res.send({code:0, msg: err})
      return;
    }
    if(!company){
      res.send({code:0,msg:'用户名或密码错误'});
      return;
    }
    if(rem){
      res.cookie('userId',company._id, {maxAge: 1000*60*60*24*7});
      res.cookie('userType',1 , {maxAge: 1000*60*60*24*7});
    } else {
      res.clearCookie("userId");
    }
    req.session.userId = company._id;
    req.session.type = 1;
    res.send({
      code:1,
      data: {
        _id: company._id,
        username: company.companyname,
        type: 1,
        company
      },
      msg: `欢迎您，${company.companyname}`});

  })
})

// 获取用户信息
router.get('/getUser',(req,res)=>{
  let id=req.cookies.userId;
  const type = req.cookies.userType;
  if(id === undefined || type === undefined){
    return res.send({code:0,msg:"请先登录"})
  }
  if(type == 0){
    StudentModel.findById(id, filter, (err, student)=>{
      if(err){
        return res.send({code:0,msg:"err"})
      }
      if(!student){
        res.clearCookie("userId");
        return res.send({code:0,msg:'请先登录'});
      }
      res.send({
        code:1,
        data: {
          _id: student._id,
          username: student.name,
          type: 0,
          student
        },
      })
    })
  }

  if(type == 1){
    CompanyModel.findById(id, filter, (err, company)=>{
      if(err){
        return res.send({code:0,msg:"err"})
      }
      if(!company){
        res.clearCookie("userId");
        return res.send({code:0,msg:'请先登录'});
      }
      res.send({
        code:1,
        data: {
          _id: company._id,
          username: company.companyname,
          type: 1,
          company
        },
      })
    })
  }
})






module.exports = router;
