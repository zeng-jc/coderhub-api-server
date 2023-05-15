const { verifyLogin, checkResource, loginVerifyCode } = require("../db/auth.db");
const MD5password = require("../utils/crypto");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../app/secretKey/public.key"));

class authMiddleware {
  // 1.验证用户登录信息的中间件
  async verifyLogin(ctx, next) {
    // 只能通过邮箱登录
    const { email, password } = ctx.request.body;
    // 判断账号密码是否为空
    if (!email || !password) return ctx.app.emit("error", -1004, ctx);
    // 格式判断
    if (email.length < 6 || email.length > 255 || password.length > 25) {
      return ctx.app.emit("error", -1002, ctx);
    }
    const res = await verifyLogin(email, MD5password(password));
    if (!res.length) return ctx.app.emit("error", -1005, ctx);
    ctx.loginUserInfo = res[0];
    await next();
  }
  // 2.验证是否登录中间件
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
      return ctx.app.emit("error", -1006, ctx);
    }
  }
  // 3.验证用户权限中间件
  async verifyPermission(ctx, next) {
    // 3.1. 获取资源的key
    const [resourceKey] = Object.keys(ctx.params);
    // 3.2. 去除key的id，拿到tableName
    const tableName = resourceKey.replace("Id", "");
    // 3.3. 继续通过resourceKey拿到资源id
    const resourceId = ctx.params[resourceKey];
    // 3.4. 用户id
    const userId = ctx.user.id;
    // 检查该资源是否属于该用户
    const isPermission = await checkResource(tableName, resourceId, userId);
    if (!isPermission) return ctx.app.emit("error", -1007, ctx);
    await next();
  }
  // 4.验证码登录中间件
  async loginVerifyCode(ctx, next) {
    // 1.获取用户传输过来的邮箱和验证码
    const { email, code } = ctx.request.body;
    // 2.邮箱和验证码不能为空
    if (!email || !code) return ctx.app.emit("error", -1001, ctx);
    // 3.判断验证码是否过期
    if (new Date().getTime() > ctx.session.verifyCodeExpiredTime)
      return ctx.app.emit("error", -3003, ctx);
    // 4.判断code是否有效
    if (!(ctx.session.verifyCode + "" === code + "") || !(ctx.session.email === email)) {
      return ctx.app.emit("error", -3002, ctx);
    }
    const res = await loginVerifyCode(email);
    if (!res.length) return ctx.app.emit("error", -2001, ctx);
    ctx.loginUserInfo = res[0];
    await next();
  }
}

module.exports = new authMiddleware();
