const { getUserByName } = require("../db/user.db");
const MD5password = require("../utils/crypto");

class UserMiddleware {
  async verifyUser(ctx, next) {
    // 去除空格
    ctx.request.body.username = ctx.request.body.username.replace(/\s*/g, "");
    ctx.request.body.password = ctx.request.body.password.replace(/\s*/g, "");
    ctx.request.body.nickname = ctx.request.body.nickname.replace(/\s*/g, "");

    // 获取用户名和密码
    const { username, password, nickname, gender } = ctx.request.body;

    // 判断用户名、密码、昵称、性别是否为空
    if (!(username || password || nickname || gender === 1 || gender === 0)) {
      return ctx.app.emit("error", -1001, ctx);
    }

    // 判断长度
    if (username.length > 20 || password.length > 20 || nickname.length > 10) {
      return ctx.app.emit("error", -1002, ctx);
    }

    // 判断用户是否存在
    const isExist = await getUserByName(username);
    if (isExist) {
      return ctx.app.emit("error", -1003, ctx);
    }
    await next();
  }
  async handlerPassowrd(ctx, next) {
    ctx.request.body.password = MD5password(ctx.request.body.password);
    await next();
  }
}

module.exports = new UserMiddleware();
