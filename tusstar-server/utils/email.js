
'use strict';

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: '1963945679@qq.com',//你的邮箱
    // 这里密码不是qq密码，是设置的smtp授权码
    pass: 'assrsddehbjbhehi',
  }
});



// send mail with defined transport object


module.exports=function(to, code){
  const mailOptions = {
    from: '"启迪之星" <1963945679@qq.com>', // sender address
    to, // list of receivers
    subject: 'Hello', // Subject line
    // 发送text或者html格式
    // text: 'Hello 我是火星黑洞', // plain text body
    html: `Hello 我是启迪之星,您的验证码是**<b>${code}</b>**` // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('err',error);
      return 0;
    }
    return 1;
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
  });
}
