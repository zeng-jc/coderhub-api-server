const KoaRouter = require("@koa/router");
const { login } = require("../controller/login.controller");
const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", login);

module.exports = loginRouter;
