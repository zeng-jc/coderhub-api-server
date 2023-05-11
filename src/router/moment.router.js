const KoaRouter = require("@koa/router");
const { create, remove, getMomentList, getMomentByID } = require("../controller/moment.controller");
const { verifyIsLogin } = require("../middleware/auth.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

// 创建动态
momentRouter.post("/", verifyIsLogin, create);
// 动态列表
momentRouter.get("/", getMomentList);
// 动态详情
momentRouter.get("/:momentId", getMomentByID);
// 删除动态
momentRouter.delete("/:momentId", verifyIsLogin, remove);

module.exports = momentRouter;
