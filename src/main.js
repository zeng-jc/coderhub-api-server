const Koa = require("koa");
const KoaRouter = require("@koa/router");
const mysql = require("mysql2");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const userRouter = KoaRouter({ prefix: "/user" });
const connectPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "123",
  connectionLimit: 10,
});

const statement = `insert into user (username,password,nickname,gender) values (?,?,?,?)`;

app.use(bodyParser());
userRouter.post("/registry", (ctx, next) => {
  const { username, password, nickname, gender } = ctx.request.body;
  console.log(username, password, nickname, gender);
  connectPool.execute(statement, [username, password, nickname, gender], (err, value) => {
    if (err) return;
    ctx.body = {
      code: 200,
      msg: "注册成功",
    };
  });
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("koa服务器启动成功");
});
