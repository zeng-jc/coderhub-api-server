const connectPool = require("../app/connectPool");

class UserDB {
  async getUserByName(username) {
    const statement = `select username from user where username = ?;`;
    const [values] = await connectPool.execute(statement, [username]);
    return !!values.length;
  }
  async getUserByEmail(email) {
    const statement = `select email from user where email = ?;`;
    const [values] = await connectPool.execute(statement, [email]);
    return !!values.length;
  }
  async create(username, email, password, nickname, gender) {
    const statement = `insert into user (username,email,password,nickname,gender) values (?,?,?,?,?);`;
    const res = await connectPool.execute(statement, [username, email, password, nickname, gender]);
    return res[0];
  }
  async users(query) {
    const { limit, offset } = query;
    const statement = "select * from user limit ? offset ?;";
    const [values] = await connectPool.execute(statement, [limit, offset]);
    return values;
  }
}

module.exports = new UserDB();
