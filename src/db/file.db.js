const connectionPool = require("../app/connectPool");

class fileDB {
  async avatarCreate(userId, fileInfo) {
    const { originalname, filename, encoding, mimetype, size, path } = fileInfo;
    // 使用on duplicate key on update实现头像上传和更新
    //  - 如果用户id已经存在，则更新该用户的头像，不存在则插入头像信息
    const statement = ` 
    INSERT INTO avatar 
      (user_id,originalname,filename,encoding,mimetype,size,path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY 
      UPDATE originalname=?, filename=?, encoding=?, mimetype=?, size = ?, path=?;
    `;
    const res = await connectionPool.execute(statement, [
      userId,
      originalname,
      filename,
      encoding,
      mimetype,
      size,
      path,
      originalname,
      filename,
      encoding,
      mimetype,
      size,
      path,
    ]);
    return res[0];
  }
  async getAvatarByUserId(user_id) {
    const statement = `select filename,mimetype from avatar where user_id = ?`;
    const [values] = await connectionPool.execute(statement, [user_id]);
    return values[0];
  }
}

module.exports = new fileDB();
