const KoaRouter = require("@koa/router");
const { create, getCommentByMomentId, remove } = require("../controller/comment.controller");
const { verifyIsLogin, verifyPermission } = require("../middleware/auth.middleware");
const commentRouter = new KoaRouter({ prefix: "/comment" });

// 给内容评论 or 回复评论
commentRouter.post("/", verifyIsLogin, create);
// 通过内容id获取评论
commentRouter.get("/:momentId", getCommentByMomentId);
// 通过评论id删除评论以及子评论（params参数必须是：表名+Id）
commentRouter.delete("/:commentId", verifyIsLogin, verifyPermission, remove);

module.exports = commentRouter;
