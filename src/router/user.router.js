const KoaRouter = require("@koa/router");
const userRouter = new KoaRouter({ prefix: "/user" });
const { verifyUser, handlerPassowrd } = require("../middleware/user.middleware");
const { create, users } = require("../controller/user.controller");

userRouter.post("/", verifyUser, handlerPassowrd, create);
userRouter.get("/", users);

module.exports = userRouter;
