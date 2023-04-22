const connectPool = require("../app/connectPool");

class loginDB {
  async login(username, password) {
    const statement = "select * from user where username = ? && password = ?";
    const [values] = await connectPool.execute(statement, [username, password]);
    console.log(values);
    return !!values.length;
  }
}

module.exports = new loginDB();
