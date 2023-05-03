const userDB = require("../db/user.db");

class userController {
  async create(ctx, next) {
    const { username, email, password, nickname } = ctx.request.body;
    const res = await userDB.create(username, email, password, nickname);
    ctx.body = {
      code: 200,
      msg: "注册成功",
      data: {
        id: res.insertId,
        username,
        email,
        nickname,
      },
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
