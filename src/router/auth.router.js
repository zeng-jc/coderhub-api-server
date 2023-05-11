const KoaRouter = require("@koa/router");
const { login } = require("../controller/auth.controller");
const { verifyLogin } = require("../middleware/auth.middleware");
const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyLogin, login);

module.exports = loginRouter;
