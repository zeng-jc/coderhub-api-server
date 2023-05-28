const connectPool = require("../app/connectPool");
const config = require("../../config");

class momentDB {
  async create(user_id, user_username, content) {
    const statement = "insert into moment (user_id,user_username, content) values (?,?,?)";
    const res = await connectPool.execute(statement, [user_id, user_username, content]);
    return res[0];
  }
  // 动态列表
  async getMomentList(limit, offset, username = "%") {
    const statement = `select 
      m.id id,m.content content,m.likes likes, m.createAt createAt,
      json_object("id",u.id,
      "username",u.username,
      "nickname",u.nickname,
      "gender",u.gender,
      "avatar",concat('${config.server.base}/file/avatar/',u.id)) userInfo,
      (select count(*) from comment where moment_id = m.id) commentCount
      from moment m left join user u 
      on m.user_id = u.id where u.username like ? 
      order by m.id desc
      limit ? offset ?;`;
    const [values] = await connectPool.execute(statement, [username, limit, offset]);
    return values;
  }
  // 动态详情
  async getMomentByID(momentId) {
    const statement = `select 
    m.id id,m.content content,m.imgs imgs,m.likes likes, m.createAt createAt, 
    (select count(*) from comment where moment_id = m.id) commentCount,
    JSON_OBJECT("id",u.id,
     "username",u.username,
      "nickname",u.nickname,
      "gender",u.gender,
      "createAt",u.createAt,
      "avatar",concat('${config.server.base}/file/avatar/',u.id)) user
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
  async totalCount(user_username = "%") {
    const [res] = await connectPool.execute(
      "select count(*) count from moment where user_username like ?;",
      [user_username]
    );
    return res[0].count;
  }
}

module.exports = new momentDB();
