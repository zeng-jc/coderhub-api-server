const KoaRouter = require("@koa/router");
const userRouter = KoaRouter({ prefix: "/user" });
const { verifyUser, handlerPassowrd } = require("../middleware/user.middleware");
const { create } = require("../controller/user.controller");

userRouter.post("/", verifyUser, handlerPassowrd, create);

module.exports = userRouter;
