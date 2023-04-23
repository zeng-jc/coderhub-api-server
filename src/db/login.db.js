const connectPool = require("../app/connectPool");

class loginDB {
  async verifyLogin(username, password) {
    const statement =
      "select id,username,nickname,avatar,gender,createAt from user where username = ? && password = ?";
    const [values] = await connectPool.execute(statement, [username, password]);
    return values;
  }
}

module.exports = new loginDB();
