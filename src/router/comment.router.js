const KoaRouter = require("@koa/router");
const { create } = require("../controller/comment.controller");
const { isLogin } = require("../controller/login.controller");
const commentRouter = new KoaRouter({ prefix: "/comment" });

commentRouter.post("/", isLogin, create);

module.exports = commentRouter;
