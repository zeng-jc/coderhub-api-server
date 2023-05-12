const connectPool = require("../app/connectPool");

class authDB {
  // 1.验证用户登录信息的数据库操作
  async verifyLogin(email, password) {
    const statement = `select id,username,email,nickname,avatar,gender,createAt from user
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
}

module.exports = new authDB();
