const KoaRouter = require("@koa/router");
const {
  create,
  remove,
  getMomentList,
  getMomentListByUserId,
} = require("../controller/moment.controller");
const { isLogin } = require("../controller/login.controller");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", isLogin, create);
// 首页展示的列表
momentRouter.get("/", getMomentList);
// 用户个人中心的内容列表
momentRouter.get("/:userId", isLogin, getMomentListByUserId);
momentRouter.delete("/:momentId", isLogin, remove);

module.exports = momentRouter;
