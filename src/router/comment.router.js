const KoaRouter = require("@koa/router");
const { create, getCommentByMomentId } = require("../controller/comment.controller");
const { isLogin } = require("../controller/login.controller");
const commentRouter = new KoaRouter({ prefix: "/comment" });

commentRouter.post("/", isLogin, create);
// 通过内容id获取评论
commentRouter.get("/:moment_id", getCommentByMomentId);

module.exports = commentRouter;
