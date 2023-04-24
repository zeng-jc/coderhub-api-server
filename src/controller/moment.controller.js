const { create, remove, list, selfList, totalCount } = require("../db/moment.db");

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
    const count = await totalCount();
    const res = await list(limit, offset);
    ctx.body = {
      code: 200,
      msg: "列表获取成功",
      data: {
        totalCount: count,
        comments: res,
      },
    };
  }
  // 个人内容列表
  async selfList(ctx, next) {
    const { offset, limit } = ctx.query;
    const user_id = ctx.params.userId;
    if (!offset || !limit) return ctx.app.emit("error", -1001, ctx);
    const count = await totalCount(user_id);
    const res = await selfList(limit, offset, user_id);
    ctx.body = {
      code: 200,
      msg: "列表个人获取成功",
      data: {
        totalCount: count,
        comments: res,
      },
    };
  }
  async remove(ctx, next) {
    const moment_id = ctx.params.momentId;
    const user_id = ctx.user.id;
    const res = await remove(moment_id, user_id);
    if (res.affectedRows === 0) return ctx.app.emit("error", -1007, ctx);
    ctx.body = {
      code: 200,
      msg: "删除成功",
    };
  }
}

module.exports = new momentController();
