const { getUserByName, getUserByEmail } = require("../db/user.db");
const MD5password = require("../utils/crypto");

class UserMiddleware {
  // 校验新用户
  async verifyNewUser(ctx, next) {
    // 去除空格
    ctx.request.body.username = ctx.request.body.username.replace(/\s*/g, "");
    ctx.request.body.email = ctx.request.body.email.replace(/\s*/g, "");
    ctx.request.body.password = ctx.request.body.password.replace(/\s*/g, "");
    ctx.request.body.nickname = ctx.request.body.nickname.replace(/\s*/g, "");

    // 获取用户名和密码
    const { username, email, password, nickname, gender } = ctx.request.body;
    // 判断用户名、密码、昵称、性别是否为空
    if (!(username || email || password || nickname || gender === 1 || gender === 0)) {
      return ctx.app.emit("error", -1001, ctx);
    }

    // 判断长度
    if (
      username.length < 6 ||
      password.length < 6 ||
      nickname.length > 10 ||
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return ctx.app.emit("error", -1002, ctx);
    }

    // 判断用户是否存在
    const isExistUser = await getUserByName(username);
    if (isExistUser) {
      return ctx.app.emit("error", -1003, ctx);
    }
    // 判断邮箱是否被注册
    const isExistEmail = await getUserByEmail(email);
    if (isExistEmail) {
      return ctx.app.emit("error", -1008, ctx);
    }
    await next();
  }
  async handlerPassowrd(ctx, next) {
    ctx.request.body.password = MD5password(ctx.request.body.password);
    await next();
  }
}

module.exports = new UserMiddleware();
