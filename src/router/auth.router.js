const KoaRouter = require("@koa/router");
const { login, postEmail } = require("../controller/auth.controller");
const { verifyLogin } = require("../middleware/auth.middleware");
const authRouter = new KoaRouter();

// 密码登录接口
authRouter.post("/login", verifyLogin, login);
// 验证码登录接口
authRouter.post("/login-verify-code", (ctx, next) => {});
// 发送邮箱验证码
authRouter.post("/email", postEmail);

module.exports = authRouter;
