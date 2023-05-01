const connectPool = require("../app/connectPool");

class loginDB {
  async verifyLogin(UsernameEmail, password) {
    let statement;
    if (UsernameEmail.includes("@")) {
      statement = `select id,username,email,nickname,avatar,gender,createAt from user
       where email = ? && password = ?`;
    } else {
      statement = `select id,username,email,nickname,avatar,gender,createAt from user
       where username = ? && password = ?`;
    }
    const [values] = await connectPool.execute(statement, [UsernameEmail, password]);
    return values;
  }
}

module.exports = new loginDB();
