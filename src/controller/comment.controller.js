const { create, getCommentByMomentId, reply } = require("../db/comment.db");

class commentController {
  async create(ctx, next) {
    const user_id = ctx.user.id;
    const { moment_id, content, comment_id } = ctx.request.body;
    try {
      if (!moment_id || !content.replace(/^\s+|\s+$/g, ""))
        return ctx.app.emit("error", -1002, ctx);
    } catch (error) {
      return ctx.app.emit("error", -2002, ctx);
    }
    let res;
    // 如果有comment_id就是回复评论
    try {
      if (comment_id) {
        res = await reply(user_id, moment_id, content, comment_id);
      } else {
        res = await create(user_id, moment_id, content);
      }
    } catch (error) {
      return ctx.app.emit("error", -2001, ctx);
    }
    ctx.body = {
      code: 200,
      msg: "评论成功",
      data: {
        id: res.insertId,
        content,
      },
    };
  }
  // 通过内容id获取评论
  async getCommentByMomentId(ctx, next) {
    const { moment_id } = ctx.params;
    const res = await getCommentByMomentId(moment_id);
    ctx.body = {
      code: 200,
      msg: "通过moment_id，获取评论成功",
      data: {
        moment_id: Number(moment_id),
        comments: res,
      },
    };
  }
}

module.exports = new commentController();
