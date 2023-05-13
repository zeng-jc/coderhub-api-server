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
    try {
      const res = await sendEmail(getRandomInt(100000, 999999), "2356924146@qq.com");
      console.log("邮件发送：", res);
      ctx.body = {
        code: 200,
        msg: "邮件发送成功",
      };
    } catch (error) {
      ctx.app.emit("error", -3001, ctx);
    }
  }
}

module.exports = new authController();
