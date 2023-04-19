const mysql = require("mysql2");

const connectPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "123",
  connectionLimit: 10,
});

module.exports = connectPool.promise();
