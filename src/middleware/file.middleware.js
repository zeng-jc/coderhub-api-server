const multer = require("@koa/multer");

const upload = multer({
  // 注意！！这里的相对路径，是相对与项目启动目录
  dest: "./upload/avatar",
  // 限制图片大小为1MB
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  // 文件过滤
  fileFilter(req, file, cb) {
    //  限制图片格式：jpg、png、jpeg
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      return cb(null, true);
    }
    cb(new Error("文件类型错误"), false);
  },
});

class fileController {
  async avatarHandler(ctx, next) {
    try {
      await upload.single("avatar")(ctx, next);
    } catch (error) {
      ctx.app.emit("error", -4001, ctx);
    }
  }
}

module.exports = new fileController();
