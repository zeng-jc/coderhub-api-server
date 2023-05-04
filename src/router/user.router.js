const KoaRouter = require("@koa/router");
const userRouter = new KoaRouter({ prefix: "/user" });
const { verifyNewUser, handlerPassowrd } = require("../middleware/user.middleware");
const { create, users, getEmial, getUsername } = require("../controller/user.controller");

userRouter.post("/", verifyNewUser, handlerPassowrd, create);
userRouter.get("/", users);
userRouter.get("/email/:email", getEmial);
userRouter.get("/username/:username", getUsername);

module.exports = userRouter;
