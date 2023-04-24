const { verifyLogin } = require("../db/login.db");
const MD5password = require("../utils/crypto");

class loginMiddleware {
  async verifyLogin(ctx, next) {
    const { username, password } = ctx.request.body;
    // 判断账号密码是否为空
    if (!username || !password) return ctx.app.emit("error", -1004, ctx);
    // 格式判断
    if (username.length > 20 || password.length > 20) {
      return ctx.app.emit("error", -1002, ctx);
    }
    const res = await verifyLogin(username, MD5password(password));
    if (!res.length) return ctx.app.emit("error", -1005, ctx);
    ctx.loginUserInfo = res[0];
    await next();
  }
}

module.exports = new loginMiddleware();