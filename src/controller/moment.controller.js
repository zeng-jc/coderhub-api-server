const { create, remove, list } = require("../db/moment.db");

class momentController {
  async create(ctx, next) {
    const user_id = ctx.user.id;
    const content = ctx.request.body.content;
    if (!content) return ctx.app.emit("error", -1001, ctx);
    const res = await create(user_id, content);
    console.log(user_id);
    ctx.body = {
      code: 200,
      msg: "动态发布成功",
      data: {
        id: res.insertId,
        content,
      },
    };
  }
  // 内容列表
  async list(ctx, next) {
    const { offset, limit } = ctx.query;
    if (!offset || !limit) return ctx.app.emit("error", -1001, ctx);
    const res = await list(offset, limit);
    ctx.body = {
      code: 200,
      msg: "列表获取成功",
      data: {
        list: res,
      },
    };
  }
  async remove(ctx, next) {
    const moment_id = ctx.request.body.id;
    const user_id = ctx.user.id;
    if (!moment_id) return ctx.app.emit("error", -1001, ctx);
    const res = await remove(moment_id, user_id);
    if (res.affectedRows === 0) return ctx.app.emit("error", -1007, ctx);
    ctx.body = {
      code: 200,
      msg: "删除成功",
    };
  }
}

module.exports = new momentController();
