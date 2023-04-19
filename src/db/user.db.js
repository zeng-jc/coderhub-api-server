const connectPool = require("../app/connectPool");

class UserDB {
  async getUserByName(username) {
    const statement = `select username from user where username = ?;`;
    const [values] = await connectPool.execute(statement, [username]);
    return !!values.length;
  }
  async create(userInfo) {
    const statement = `insert into user (username,password,nickname,gender) values (?,?,?,?);`;
    const { username, password, nickname, gender } = userInfo;
    const res = await connectPool.execute(statement, [username, password, nickname, gender]);
    return res;
  }
}

module.exports = new UserDB();
