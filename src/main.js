const Koa = require("koa");
const KoaRouter = require("@koa/router");

const app = new Koa();
const userRouter = KoaRouter({ prefix: "/user" });

userRouter.post("/registry", (ctx, next) => {
  ctx.body = "";
});

app.use(userRouter.routes());

app.listen(8000, () => {
  console.log("koa服务器启动成功");
});
