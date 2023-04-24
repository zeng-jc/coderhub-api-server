const userDB = require("../db/user.db");

class userController {
  async create(ctx, next) {
    const { username, password, nickname, gender } = ctx.request.body;
    const res = await userDB.create(username, password, nickname, gender);
    ctx.body = {
      code: 200,
      msg: "注册成功",
      data: {
        id: res.insertId,
        username,
        nickname,
        gender,
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
