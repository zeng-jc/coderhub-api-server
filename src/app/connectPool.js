const mysql = require("mysql2");
const config = require("../../config");

// 1.创建连接池
const connectPool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  connectionLimit: config.db.connectionLimit,
});

// 2.判断连接是否成功
connectPool.getConnection((err, connection) => {
  if (err) return console.log("连接池获取失败");
  // 尝试和数据库连接
  connection.connect(err => (err ? console.log("数据库连接失败") : console.log("数据库连接成功")));
});

// 3.导出连接池对象
module.exports = connectPool.promise();
