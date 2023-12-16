const connectPool = require("../app/connectPool");
const config = require("../../config");

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
  async create(username, email, password, nickname) {
    const statement = `insert into user (username,email,password,nickname) values (?,?,?,?);`;
    const res = await connectPool.execute(statement, [username, email, password, nickname]);
    return res[0];
  }
  async users(query) {
    const { limit, offset } = query;
    const statement =
      "select id,nickname,username,gender,createAt,email from user limit ? offset ?;";
    const [values] = await connectPool.execute(statement, [limit, offset]);
    return values;
  }
  async getUserByUsername(username) {
    const statement = `select id,nickname,
    concat('${config.server.base}/file/avatar/',id) avatar,
    username,gender,email,
    status,
    level,
    bio,birthday,
    phone,
    school,
    major,
    position,
    github,
    createAt
    from user where username = ?;`;
    const [values] = await connectPool.execute(statement, [username]);
    return values[0];
  }
  async updateUser(id, userInfo) {
    const {
      nickname,
      gender,
      bio,
      birthday,
      phone,
      school,
      major,
      position,
      github,
    } = userInfo;
    const statement = `update user set 
    nickname=?,
    gender=?,
    bio=?,
    birthday=?,
    phone=?,
    school=?,
    major=?,
    position=?,
    github=? where id = ?;`;
    const res = await connectPool.execute(statement, [
      nickname,
      gender,
      bio,
      birthday,
      phone,
      school,
      major,
      position,
      github,
      id,
    ]);
    return res[0];
  }
}

module.exports = new UserDB();
