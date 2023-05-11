const { verifyLogin } = require("../db/auth.db");
const MD5password = require("../utils/crypto");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/public.key"));

class authMiddleware {
  // 验证登录的中间件
  async verifyLogin(ctx, next) {
    // username也可以是邮箱
    const { username, password } = ctx.request.body;
    // 判断账号密码是否为空
    if (!username || !password) return ctx.app.emit("error", -1004, ctx);
    // 格式判断
    if (username.length < 6 || username.length > 255 || password.length > 25) {
      return ctx.app.emit("error", -1002, ctx);
    }
    const res = await verifyLogin(username, MD5password(password));
    if (!res.length) return ctx.app.emit("error", -1005, ctx);
    ctx.loginUserInfo = res[0];
    await next();
  }
  // 验证是否登录中间件
  async verifyIsLogin(ctx, next) {
    const token = ctx.header.authorization;
    if (!token) return ctx.app.emit("error", -1006, ctx);
    try {
      // result的数据中包含payload中的数据，通过公钥PUBLIC_KEY解密
      const result = jwt.verify(token.replace("Bearer ", ""), PUBLIC_KEY);
      ctx.user = result;
      await next();
    } catch (error) {
      // 数据库查询也会抛到此处返回
      ctx.app.emit("error", -1006, ctx);
    }
  }
}

module.exports = new authMiddleware();
