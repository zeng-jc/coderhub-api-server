const { avatarCreate, getAvatarByUserId } = require("../db/file.db");
const fs = require("fs");

class fileController {
  async avatarCreate(ctx, next) {
    const res = await avatarCreate(ctx.user.id, ctx.request.file);
    ctx.body = {
      code: 200,
      msg: "头像上传成功",
    };
  }
  async getAvatarByUserId(ctx, next) {
    const user_id = ctx.params.userId;
    try {
      const { filename, mimetype } = await getAvatarByUserId(user_id);
      // 指定返回的数据类型
      ctx.type = mimetype;
      // 路径是相对于项目的启动目录
      ctx.body = fs.createReadStream(`./upload/avatar/${filename}`);
    } catch (error) {
      ctx.body = fs.createReadStream(`./src/asserts/default_avatar.webp`);
    }
  }
}

module.exports = new fileController();
