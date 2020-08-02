const express = require('express');
const router = express.Router();
const ResumeModel = require('../db/models/resumeModel');
const multiparty = require("multiparty");//表单传输的插件
var fs = require('fs');
const { query } = require('express');

router.post('/setResume',(req,res) => {
  console.log(req.body);
  var form = new multiparty.Form({ uploadDir: './public/images' });
    form.parse(req, function(err, fields, files) {
        if(err){
          console.log(err);
        }
        else{
          console.log(fields,"fields");
          console.log(files,"files");
          var userData = new Object;
          userData = {
            userId: fields.userid[0],
            name: fields.name[0],
            school: fields.school[0],
            education: fields.education[0],
            age: fields.age[0],
            sex: fields.sex[0],
            nation: fields.nation[0],
            intro: fields.intro[0],
            address: fields.address[0],
            phone: fields.phone[0],
            email: fields.email[0],
            department: fields.department[0],
            major: fields.major[0],
            xueli: fields.xueli[0],
            xuezhi: fields.xuezhi[0],
            admissionTime: fields.admissionTime[0],
            expectSalary: fields.expectSalary[0],
            work: fields.work[0],
            img: null
          }
          if(files.file){
            userData.img = files.file[0].path;
          } else {
          }
          console.log(userData);
          ResumeModel.find({'userId':fields.userid[0]},(err,data)=>{
            if(err){
              console.log(err,'err');
            } else {
              if(data.length == 0){
                console.log("进入查询")
                new ResumeModel(userData).save((error,doc)=>{
                  if(error){
                    res.send({code:0,msg:err});
                    console.log(error);
                    return 
                  } else {
                    res.send({code:1});
                    return
                  }
                })
              } else {
                console.log('进入修改')
                var deleteImgUrl = data[0].img;
                console.log(deleteImgUrl);           
                if(files.file){
                  userData.img = files.file[0].path;
                  fs.unlink(deleteImgUrl,(err)=>{
                  if(err){
                    console.log(err,'err');
                  }
                });
                } else {
                  userData.img = deleteImgUrl;
                }
                // deleteOne(deleteImgUrl);
                ResumeModel.updateOne({'userId': fields.userid[0]},{$set:userData },(err,data)=>{
                  if(err){
                    res.send({code:0});
                    return;
                  } else {
                    console.log(data);
                    res.send({code:1});
                    return;
                  }

                })
              }
            }
          })
        }
    });
})

router.get('/getResume/:userid',(req,res) =>{
  const userid = req.params.userid;
  console.log(userid);
  ResumeModel.findOne({'userId':userid},(err,data)=>{
    if(err) {
      res.send({code:0})
      return;
    } else {
      if(!data){
        res.send({code:0})
        return;
      } else {
        res.send({code:1,data});
        return;
      }
    }

  })
})

//判断学生简历是否填写
router.get('/hasResume',(req,res) =>{
  const { studentId } = req.query;
  console.log(studentId);
  ResumeModel.findOne({ userId: studentId }, (err, doc)=>{
    if(doc) {
      res.send(true)
      return
    }
    res.send(false)
  })
})

module.exports = router;