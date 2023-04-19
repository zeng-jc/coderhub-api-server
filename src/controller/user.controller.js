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
}

module.exports = new userController();
