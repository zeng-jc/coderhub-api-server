const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const handlerError = require("./app/handlerError");

const userRouter = require("./router/user.router");
const authRouter = require("./router/auth.router");
const momentRouter = require("./router/moment.router");
const commentRouter = require("./router/comment.router");

const app = new Koa();

// 解决跨域
app.use(cors());

// 解析body参数
app.use(bodyParser());

// 注册user路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
// 注册auth路由
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
// 注册moment路由
app.use(momentRouter.routes());
app.use(momentRouter.allowedMethods());
// 注册comment路由
app.use(commentRouter.routes());
app.use(commentRouter.allowedMethods());

// 错误处理
app.on("error", handlerError);

app.listen(8000, () => {
  console.log("koa服务器启动成功");
});
