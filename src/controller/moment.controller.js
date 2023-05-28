const { create, remove, getMomentList, totalCount, getMomentByID } = require("../db/moment.db");

class momentController {
  async create(ctx, next) {
    const user_id = ctx.user.id;
    const content = ctx.request.body.content;
    const user_username = ctx.user.name;
    if (!content) return ctx.app.emit("error", -1001, ctx);
    const res = await create(user_id, user_username, content);
    ctx.body = {
      code: 200,
      msg: "动态发布成功",
      data: {
        id: res.insertId,
        content,
      },
    };
  }
  // 动态列表
  async getMomentList(ctx, next) {
    const { offset, limit, username } = ctx.query;
    if (!offset || !limit) return ctx.app.emit("error", -1001, ctx);
    // 一共多少条动态
    const count = await totalCount(username);
    const res = await getMomentList(limit, offset, username);
    ctx.body = {
      code: 200,
      msg: "列表获取成功",
      data: {
        totalCount: count,
        moments: res,
      },
    };
  }
  // 动态详情
  async getMomentByID(ctx, next) {
    const momentId = ctx.params.momentId;
    const res = await getMomentByID(momentId);
    ctx.body = {
      code: 200,
      msg: "动态详情获取成功",
      data: {
        moment: res[0],
      },
    };
  }
  async remove(ctx, next) {
    const moment_id = ctx.params.momentId;
    const user_id = ctx.user.id;
    const res = await remove(moment_id, user_id);
    if (res.affectedRows === 0) return ctx.app.emit("error", -2001, ctx);
    ctx.body = {
      code: 200,
      msg: "删除成功",
    };
  }
}

module.exports = new momentController();
