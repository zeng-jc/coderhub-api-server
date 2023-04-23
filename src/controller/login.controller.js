const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/public.key"));

class loginController {
  async login(ctx, next) {
    const { id, username, nickname, gender, avatar } = ctx.loginUserInfo;
    const payload = { id: id, name: username };
    const token = jwt.sign(payload, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24,
    });
    ctx.body = {
      code: 200,
      msg: "登录成功",
      data: {
        username,
        nickname,
        gender,
        avatar,
        token,
      },
    };
  }
  async isLogin(ctx, next) {
    const token = ctx.header.authorization.replace("Bearer ", "");
    try {
      jwt.verify(token, PUBLIC_KEY);
      await next();
    } catch (error) {
      ctx.app.emit("error", -1006, ctx);
    }
  }
}

module.exports = new loginController();
