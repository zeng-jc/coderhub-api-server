const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const userRouter = require("./router/user.router");
const handlerError = require("./app/handlerError");

const app = new Koa();
// 解析body参数
app.use(bodyParser());
// 注册用户路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// 错误处理
app.on("error", handlerError);

app.listen(8000, () => {
  console.log("koa服务器启动成功");
});
