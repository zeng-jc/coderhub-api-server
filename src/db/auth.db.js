const connectPool = require("../app/connectPool");

class authDB {
  // 1.验证用户登录的数据库操作
  async verifyLogin(email, password) {
    const statement = `select id,username,email,nickname,gender,createAt,
      concat('http://localhost:8000/upload/avatar/',id) avatar  
      from user
      where email = ? && password = ?`;
    const [values] = await connectPool.execute(statement, [email, password]);
    return values;
  }
  // 2.验证用户权限的数据库操作
  async checkResource(tableName, resourceId, userId) {
    const statement = `select id from ${tableName} where id = ? and user_id = ?`;
    const [res] = await connectPool.execute(statement, [resourceId, userId]);
    return !!res.length;
  }
  // 3.验证码登录数据库操作
  async loginVerifyCode(email) {
    console.log(email);
    const statement = `select id,username,email,nickname,gender,createAt from user
       where email = ?`;
    const [values] = await connectPool.execute(statement, [email]);
    return values;
  }
}

module.exports = new authDB();
