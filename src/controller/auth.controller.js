const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/private.key"));

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
}

module.exports = new authController();
