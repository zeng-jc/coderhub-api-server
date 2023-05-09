const KoaRouter = require("@koa/router");
const userRouter = new KoaRouter({ prefix: "/user" });
const { verifyNewUser, handlerPassowrd } = require("../middleware/user.middleware");
const {
  create,
  users,
  getEmial,
  getUsername,
  getUserByUsername,
} = require("../controller/user.controller");

userRouter.post("/", verifyNewUser, handlerPassowrd, create);
// 查询用户列表
userRouter.get("/", users);
// 根据主页id查询用户信息
userRouter.get("/:username", getUserByUsername);
userRouter.get("/email/:email", getEmial);
userRouter.get("/username/:username", getUsername);

module.exports = userRouter;
