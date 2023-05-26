const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const handlerError = require("./app/handlerError");
const config = require("../config");

const userRouter = require("./router/user.router");
const authRouter = require("./router/auth.router");
const momentRouter = require("./router/moment.router");
const commentRouter = require("./router/comment.router");
const fileRrouter = require("./router/file.router");

const koaSession = require("koa-session");
const app = new Koa();

// 解决跨域
app.use(cors());

// 使用 koa-session 中间件
app.keys = ["some secret key"];
app.use(koaSession(app));

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
// 注册file路由
app.use(fileRrouter.routes());
app.use(fileRrouter.allowedMethods());

// 错误处理
app.on("error", handlerError);

app.listen(config.server.port, config.server.host, () => {
  console.log(`koa服务器启动成功 ${config.server.host}:${config.server.port}`);
});
