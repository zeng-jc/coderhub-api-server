const KoaRouter = require("@koa/router");
const { create, getCommentByMomentId } = require("../controller/comment.controller");
const { verifyIsLogin } = require("../middleware/auth.middleware");
const commentRouter = new KoaRouter({ prefix: "/comment" });

// 给内容评论 or 回复评论
commentRouter.post("/", verifyIsLogin, create);
// 通过内容id获取评论
commentRouter.get("/:moment_id", getCommentByMomentId);
module.exports = commentRouter;
