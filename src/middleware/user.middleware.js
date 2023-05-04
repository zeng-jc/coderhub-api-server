const { getUserByName, getUserByEmail } = require("../db/user.db");
const MD5password = require("../utils/crypto");

class UserMiddleware {
  // 校验新用户
  async verifyNewUser(ctx, next) {
    // 获取用户名和密码
    const { username, email, password, nickname } = ctx.request.body;
    // 判断用户名、邮箱、密码、昵称是否为空
    if (!username || !email || !password || !nickname) {
      return ctx.app.emit("error", -1001, ctx);
    }
    // 判断格式
    if (
      // 用户名：长度为6-25，只能包含大小写字母、数字、下划线
      !/^[A-Za-z0-9_]{6,25}$/.test(username) ||
      // 密码：最少6位，至少包含1个大写，1个小写，1个数字，1个特殊字符
      !/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(password) ||
      // 昵称：长度1-10，不能包含空格
      !/^[^\s]{1,10}$/.test(nickname) ||
      // 邮箱
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
