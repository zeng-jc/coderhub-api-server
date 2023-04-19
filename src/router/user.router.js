const KoaRouter = require("@koa/router");
const userRouter = KoaRouter({ prefix: "/user" });
const { verifyUser } = require("../middleware/user.middleware");
const { create } = require("../controller/user.controller");

userRouter.post("/", verifyUser, create);

module.exports = userRouter;
