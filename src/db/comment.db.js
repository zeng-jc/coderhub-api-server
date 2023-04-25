const connectPool = require("../app/connectPool");

class commentDB {
  async create(user_id, moment_id, content) {
    const statement = "insert into comment (user_id,moment_id,content) values (?, ?, ?);";
    const res = await connectPool.execute(statement, [user_id, moment_id, content]);
    return res[0];
  }
  // 通过内容id获取评论
  async getCommentByMomentId(moment_id) {
    const statement = "select id,content,likes,createAt from comment where moment_id = ?;";
    const [values] = await connectPool.execute(statement, [moment_id]);
    return values;
  }
}

module.exports = new commentDB();
