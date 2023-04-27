const connectPool = require("../app/connectPool");

class momentDB {
  async create(user_id, content) {
    const statement = "insert into moment (user_id, content) values (?,?)";
    const res = await connectPool.execute(statement, [user_id, content]);
    return res[0];
  }
  // 动态列表
  async getMomentList(limit, offset, userid = "%") {
    const statement = `select 
      m.id id,m.content content,m.likes likes, m.createAt createAt,
      json_object("id",u.id,"nickname",u.nickname,"avatar",u.avatar,"gender",u.gender) userInfo,
      (select count(*) from comment where moment_id = m.id) commentCount
      from moment m left join user u 
      on m.user_id = u.id where u.id like ?
      limit ? offset ?;`;
    const [values] = await connectPool.execute(statement, [limit, offset, userid]);
    return values;
  }
  // 动态详情
  async getMomentByID(momentId) {
    const statement = `select m.id id,m.content content,m.imgs imgs,m.likes likes, m.createAt createAt, 
    JSON_OBJECT("id",u.id,"username",u.username,"nickname",u.nickname,"avatar",u.avatar,"gender",u.gender,"createAt",u.createAt) user
    from moment m left join user u on m.user_id = u.id
    where m.id = ?;`;
    const [values] = await connectPool.execute(statement, [momentId]);
    return values;
  }
  async remove(moment_id, user_id) {
    const statement = "delete from moment where id = ? && user_id = ?;";
    const res = await connectPool.execute(statement, [moment_id, user_id]);
    return res[0];
  }
  async totalCount(user_id = "%") {
    const [res] = await connectPool.execute(
      "select count(*) count from moment where user_id like ?;",
      [user_id]
    );
    return res[0].count;
  }
}

module.exports = new momentDB();
