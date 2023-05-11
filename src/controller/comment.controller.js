const { create, getCommentByMomentId, reply } = require("../db/comment.db");

class commentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const { momentId, content, commentId } = ctx.request.body;
    try {
      if (!momentId || !content.replace(/^\s+|\s+$/g, "")) return ctx.app.emit("error", -1002, ctx);
    } catch (error) {
      return ctx.app.emit("error", -2002, ctx);
    }
    let res;
    // 如果有commentId就是回复评论
    try {
      if (commentId) {
        res = await reply(userId, momentId, content, commentId);
      } else {
        res = await create(userId, momentId, content);
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
    const { momentId } = ctx.params;
    const res = await getCommentByMomentId(momentId);
    ctx.body = {
      code: 200,
      msg: "通过momentId，获取评论成功",
      data: {
        momentId: Number(momentId),
        comments: res,
      },
    };
  }
}

module.exports = new commentController();
