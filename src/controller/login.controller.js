const { login } = require("../db/login.db");
const MD5password = require("../utils/crypto");
const path = require("path");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/private.key"));

class loginController {
  async login(ctx, next) {
    const { username } = ctx.request.body;
    const password = MD5password(ctx.request.body.password);
    const res = await login(username, password);
    const payload = { id: res.id, name: res.username };
    const token = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24,
    });
    ctx.body = {
      code: 200,
      msg: "登录成功",
      data: {
        token,
        username: res.username,
        nickname: res.nickname,
        gender: res.gender,
      },
    };
  }
}

module.exports = new loginController();
