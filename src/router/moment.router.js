const KoaRouter = require("@koa/router");
const { create, remove, list, selfList } = require("../controller/moment.controller");
const { isLogin } = require("../controller/login.controller");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", isLogin, create);
// 首页展示的列表
momentRouter.get("/", list);
// 用户个人中心的内容列表
momentRouter.get("/:userId", isLogin, selfList);
momentRouter.delete("/:momentId", isLogin, remove);

module.exports = momentRouter;
