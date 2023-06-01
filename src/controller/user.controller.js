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
  async getEmial(ctx, next) {
    const res = await userDB.getUserByEmail(ctx.params.email);
    if (res) return ctx.app.emit("error", -1008, ctx);
    ctx.body = {
      code: 200,
      msg: "邮箱未注册",
    };
  }
  async getUsername(ctx, next) {
    const res = await userDB.getUserByName(ctx.params.username);
    if (res) return ctx.app.emit("error", -1003, ctx);
    ctx.body = {
      code: 200,
      msg: "用户未注册",
    };
  }
  async getUserByUsername(ctx, next) {
    const username = ctx.request.params.username;
    const value = await userDB.getUserByUsername(username);
    ctx.body = {
      code: 200,
      msg: "获取用户成功",
      data: {
        user: value,
      },
    };
  }
  async updateUser(ctx, next) {
    const id = ctx.user.id;
    const userInfo = ctx.request.body;
    try {
      await userDB.updateUser(id, userInfo);
    } catch (error) {
      return ctx.app.emit("error", -1001, ctx);
    }
    ctx.body = {
      code: 200,
      msg: "用户信息修改成功",
    };
  }
}

module.exports = new userController();
