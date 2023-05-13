const KoaRouter = require("@koa/router");
const { login, postEmail } = require("../controller/auth.controller");
const { verifyLogin } = require("../middleware/auth.middleware");
const loginRouter = new KoaRouter({ prefix: "/login" });

// 密码登录
loginRouter.post("/", verifyLogin, login);
// 发送邮箱验证码
loginRouter.post("/email", postEmail);

module.exports = loginRouter;
