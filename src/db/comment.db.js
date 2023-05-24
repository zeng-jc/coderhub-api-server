const connectPool = require("../app/connectPool");

class commentDB {
  async create(user_id, moment_id, content) {
    const statement = "insert into comment (user_id,moment_id,content) values (?, ?, ?);";
    const res = await connectPool.execute(statement, [user_id, moment_id, content]);
    return res[0];
  }
  async reply(user_id, moment_id, content, comment_id) {
    const statement =
      "insert into comment (user_id,moment_id,content,comment_id) values (?, ?, ?, ?);";
    const res = await connectPool.execute(statement, [user_id, moment_id, content, comment_id]);
    return res[0];
  }
  // 通过内容id获取评论
  async getCommentByMomentId(moment_id) {
    const statement = `select 
      c.id id,c.content content,c.comment_id commentId,c.createAt createAt,
      JSON_OBJECT("id",u.id ,
        "nickname",u.nickname,
        "username",u.username,
        "avatar",concat('http://localhost:8000/file/avatar/',u.id)) user
      from comment c left join user u 
      on c.user_id = u.id 
      where moment_id = ?
      order by c.id desc;`;
    const [values] = await connectPool.execute(statement, [moment_id]);
    return values;
  }
  async remove(commentId) {
    const statement = `with recursive comment_tree as(
      select id, comment_id from comment where id = ?
      union all
      select c.id, c.comment_id from comment c
      join comment_tree ct on ct.id = c.comment_id
    )delete from comment WHERE id IN (SELECT id FROM comment_tree);`;
    const res = await connectPool.execute(statement, [commentId]);
    return res[0];
  }
}

module.exports = new commentDB();
