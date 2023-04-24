const connectPool = require("../app/connectPool");

class momentDB {
  async create(user_id, content) {
    const statement = "insert into moment (user_id, content) values (?,?)";
    const res = await connectPool.execute(statement, [user_id, content]);
    return res[0];
  }
  // 内容列表
  async list(limit, offset) {
    const statement = `select 
      m.id id,m.content content,m.likes likes, m.createAt createAt,
      json_object("id",u.id,"nickname",u.nickname,"avatar",u.avatar,"gender",u.gender) userInfo
      from moment m left join user u 
      on m.user_id = u.id 
      limit ? offset ?;`;
    const [values] = await connectPool.execute(statement, [limit, offset]);
    return values;
  }
  async remove(moment_id, user_id) {
    const statement = "delete from moment where id = ? && user_id = ?;";
    const res = await connectPool.execute(statement, [moment_id, user_id]);
    return res[0];
  }
  async totalCount() {
    const [res] = await connectPool.execute("select count(*) count from moment;");
    return res[0].count;
  }
}

module.exports = new momentDB();
