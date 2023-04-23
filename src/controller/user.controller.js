const userDB = require("../db/user.db");

class userController {
  async create(ctx, next) {
    const userInfo = ctx.request.body;
    const res = await userDB.create(userInfo);
    ctx.body = {
      code: 200,
      msg: "注册成功",
    };
  }
  async users(ctx, next) {
    const res = await userDB.users(ctx.query);
    ctx.body = {
      code: 200,
      msg: "用户列表获取成功",
      data: {
        users: res,
      },
    };
  }
}

module.exports = new userController();
