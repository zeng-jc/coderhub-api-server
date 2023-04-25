const connectPool = require("../app/connectPool");

class commentDB {
  async create(user_id, moment_id, content) {
    const statement = "insert into comment (user_id,moment_id,content) values (?, ?, ?);";
    const res = await connectPool.execute(statement, [user_id, moment_id, content]);
    return res[0];
  }
}

module.exports = new commentDB();
