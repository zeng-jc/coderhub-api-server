function handlerError(code, ctx) {
  let status, msg;
  switch (code) {
    case -1001:
      msg = "注册信息填写不完整";
      break;
    case -1002:
      msg = "注册格式错误";
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
      msg = "无效token，请重新登录";
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
