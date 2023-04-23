const KoaRouter = require("@koa/router");
const { login } = require("../controller/login.controller");
const { verifyLogin } = require("../middleware/login.middleware");
const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyLogin, login);

module.exports = loginRouter;
