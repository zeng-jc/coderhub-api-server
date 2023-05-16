const KoaRouter = require("@koa/router");
const { avatarCreate, getAvatarByUserId } = require("../controller/file.controller");
const { verifyIsLogin } = require("../middleware/auth.middleware");
const { avatarHandler } = require("../middleware/file.middleware");

const fileRrouter = new KoaRouter({ prefix: "/file" });

// 上传头像接口(要求：jpg，jpeg，png，不超过1MB)
fileRrouter.post("/avatar", verifyIsLogin, avatarHandler, avatarCreate);
fileRrouter.get("/avatar/:userId", getAvatarByUserId);

module.exports = fileRrouter;
