const KoaRouter = require("@koa/router");
const userRouter = new KoaRouter({ prefix: "/user" });
const { verifyUser, handlerPassowrd } = require("../middleware/user.middleware");
const { create, users } = require("../controller/user.controller");
const { isLogin } = require("../controller/login.controller");

userRouter.post("/", verifyUser, handlerPassowrd, create);
userRouter.get("/", isLogin, users);

module.exports = userRouter;
