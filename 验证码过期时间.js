const Koa = require("koa");
const Router = require("koa-router");
const session = require("koa-session");
const app = new Koa();
const router = new Router();

// 使用 koa-session 中间件
app.keys = ["some secret key"];
app.use(session(app));

// 设置验证码有效期为 1 分钟
const expirationTime = 60 * 1000;

// 生成一个随机验证码
function generateCode() {
  // ...
}

router.get("/api/code", (ctx, next) => {
  // 生成验证码
  const code = generateCode();
  // 存储验证码和过期时间在 session 中
  ctx.session.code = code;
  ctx.session.codeExpiredTime = new Date().getTime() + expirationTime;
  ctx.body = { code };
});

router.get("/api/check-code/:code", (ctx, next) => {
  // 获取用户输入的验证码
  const enteredCode = ctx.params.code;
  // 获取 session 中存储的验证码和过期时间
  const code = ctx.session.code;
  const expiredTime = ctx.session.codeExpiredTime;
  if (!code || !expiredTime) {
    // session 中没有验证码或过期时间，验证码无效
    ctx.body = { valid: false };
  } else if (new Date().getTime() > expiredTime) {
    // 验证码已过期，验证码无效
    ctx.session.code = null;
    ctx.session.codeExpiredTime = null;
    ctx.body = { valid: false };
  } else if (enteredCode !== code) {
    // 验证码不匹配，验证码无效
    ctx.body = { valid: false };
  } else {
    // 验证码有效
    ctx.session.code = null;
    ctx.session.codeExpiredTime = null;
    ctx.body = { valid: true };
  }
});

app.use(router.routes());
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
