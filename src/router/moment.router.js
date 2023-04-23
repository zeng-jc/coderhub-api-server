const KoaRouter = require("@koa/router");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: "发布内容接口",
  };
});

module.exports = momentRouter;
