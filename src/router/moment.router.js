const KoaRouter = require("@koa/router");
const { create, remove, list } = require("../controller/moment.controller");
const { isLogin } = require("../controller/login.controller");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", isLogin, create);
momentRouter.get("/", list);
momentRouter.delete("/", isLogin, remove);

module.exports = momentRouter;
