const { auth, from } = require("./config");

const nodemailer = require("nodemailer");
const config = {
  host: "smtp.163.com", // 提供邮箱服务的主机
  secure: true, //true代表SSL连接，false代表TLS连接
  port: 465, //
  auth,
};
// 1.创建发送邮件的对象
const transporter = nodemailer.createTransport(config);

// 2.发送邮件
module.exports = function sendEmail(verifyCode, recipient) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from, //发件人邮箱
      to: recipient, //收件人邮箱
      subject: "欢迎来到程序员社区", //邮件主题
      html: `
    <p>邮箱验证码为:<strong style="color:#165dff;">${verifyCode}</strong><p>
  `,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return reject(err);
      resolve(info.response);
    });
  });
};
