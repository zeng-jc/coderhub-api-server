const { create } = require("../db/comment.db");

class commentController {
  async create(ctx, next) {
    const user_id = ctx.user.id;
    const { moment_id, content } = ctx.request.body;
    const res = await create(user_id, moment_id, content);
    ctx.body = {
      code: 200,
      msg: "评论成功",
      data: {
        id: res.insertId,
        content,
      },
    };
  }
}

module.exports = new commentController();
