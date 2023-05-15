const KoaRouter = require("@koa/router");
const { login, sendEmail } = require("../controller/auth.controller");
const { verifyLogin, loginVerifyCode } = require("../middleware/auth.middleware");
const authRouter = new KoaRouter();

// 密码登录接口
authRouter.post("/login", verifyLogin, login);
// 验证码登录接口
authRouter.post("/loginVerifyCode", loginVerifyCode, login);
// 发送邮箱验证码
authRouter.post("/sendEmail", sendEmail);

module.exports = authRouter;
