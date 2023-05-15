const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/private.key"));
const sendEmail = require("../app/sendEmail");
const getRandomInt = require("../utils/getRandomInt");

class authController {
  async login(ctx, next) {
    const { id, username, email, nickname, gender, avatar } = ctx.loginUserInfo;
    const payload = { id: id, name: username };
    // 通过私钥PRIVATE_KEY，颁发token
    const token = jwt.sign(payload, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24,
    });
    ctx.body = {
      code: 200,
      msg: "登录成功",
      data: {
        id,
        username,
        email,
        nickname,
        gender,
        avatar,
      },
      token,
    };
  }
  async postEmail(ctx, next) {
    const email = ctx.request.body.email;
    if (!email) return ctx.app.emit("error", -1001, ctx);
    // 1.生成验证码
    const verifyCode = getRandomInt(100000, 999999);
    try {
      // 2.发送邮件
      const res = await sendEmail(verifyCode, email);
      console.log("邮件发送：", res);
      ctx.body = {
        code: 200,
        msg: "邮件发送成功",
      };
      // 3.设置验证码有效期为 1 分钟
      const expirationTime = 1000 * 60;
      // 4.验证码,邮箱,过期时间存入session中
      ctx.session.verifyCode = verifyCode;
      ctx.session.email = email;
      ctx.session.verifyCodeExpiredTime = new Date().getTime() + expirationTime;
    } catch (error) {
      ctx.app.emit("error", -3001, ctx);
    }
  }
}

module.exports = new authController();
