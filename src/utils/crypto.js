const crypto = require("crypto");

function MD5password(password) {
  const md5 = crypto.createHash("md5");
  return md5.update(password).digest("hex");
}

module.exports = MD5password;
