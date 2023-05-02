const mysql = require("mysql2");

// 1.创建连接池
const connectPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "123",
  connectionLimit: 10,
});

// 2.判断连接是否成功
connectPool.getConnection((err, connection) => {
  if (err) return console.log("连接池获取失败");
  // 尝试和数据库连接
  connection.connect(err => (err ? console.log("数据库连接失败") : console.log("数据库连接成功")));
});

// 3.导出连接池对象
module.exports = connectPool.promise();
