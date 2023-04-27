const KoaRouter = require("@koa/router");
const { create, remove, getMomentList, getMomentByID } = require("../controller/moment.controller");
const { isLogin } = require("../controller/login.controller");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", isLogin, create);
// 动态列表
momentRouter.get("/", getMomentList);
// 动态详情
momentRouter.get("/:momentId", getMomentByID);
// 删除动态
momentRouter.delete("/:momentId", isLogin, remove);

module.exports = momentRouter;
