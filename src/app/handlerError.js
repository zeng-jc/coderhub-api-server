function handlerError(code, ctx) {
  let status, msg;
  switch (code) {
    case -1001:
      msg = "参数填写不完整";
      break;
    case -1002:
      msg = "格式错误";
      break;
    case -1003:
      msg = "用户已经存在";
      break;
    case -1004:
      msg = "用户名或密码不能为空";
      break;
    case -1005:
      msg = "账号或密码错误";
      break;
    case -1006:
      msg = "无效token，请登录";
      break;
    case -1007:
      msg = "删除失败，不能删除别人的数据";
      break;
    case -1008:
      msg = "邮箱已经被注册";
      break;
    case -2001:
      msg = "sql错误，操作的数据不存在";
      break;
    default:
      msg = "未知错误";
  }
  ctx.body = {
    code,
    msg,
  };
}

module.exports = handlerError;
