const { avatarCreate } = require("../db/file.db");

class fileController {
  async avatarCreate(ctx, next) {
    const res = await avatarCreate(ctx.user.id, ctx.request.file);
    ctx.body = {
      code: 200,
      msg: "头像上传成功",
    };
  }
}

module.exports = new fileController();
