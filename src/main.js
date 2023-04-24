const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const handlerError = require("./app/handlerError");

const userRouter = require("./router/user.router");
const loginRouter = require("./router/login.router");
const momentRouter = require("./router/moment.router");

const app = new Koa();
// 解析body参数
app.use(bodyParser());

// 注册user路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
// 注册login路由
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());
// 注册moment路由
app.use(momentRouter.routes());
app.use(momentRouter.allowedMethods());

// 错误处理
app.on("error", handlerError);

app.listen(8000, () => {
  console.log("koa服务器启动成功");
});
