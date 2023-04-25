const KoaRouter = require("@koa/router");
const { create, getCommentByMomentId } = require("../controller/comment.controller");
const { isLogin } = require("../controller/login.controller");
const commentRouter = new KoaRouter({ prefix: "/comment" });

// 给内容评论 or 回复评论
commentRouter.post("/", isLogin, create);
// 通过内容id获取评论
commentRouter.get("/:moment_id", getCommentByMomentId);

module.exports = commentRouter;
