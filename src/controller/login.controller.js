const { login } = require("../db/login.db");
const MD5password = require("../utils/crypto");
const path = require("path");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/public.key"));

class loginController {
  async login(ctx, next) {
    const { username, password } = ctx.request.body;
    // 判断账号密码是否为空
    if (!username || !password) return ctx.app.emit("error", -1004, ctx);
    const res = await login(username, MD5password(password));
    // 如果没有查询到，res是一个空数组
    console.log(res);
    if (!res.length) return ctx.app.emit("error", -1005, ctx);
    const payload = { id: res.id, name: res.username };
    const token = jwt.sign(payload, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24,
    });
    const { nickname, gender, avatar } = res[0];
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
