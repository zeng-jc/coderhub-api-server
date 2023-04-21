function handlerError(code, ctx) {
  let status, msg;
  switch (code) {
    case -1001:
      msg = "注册信息填写不完整";
      break;
    case -1002:
      msg = "格式错误";
      break;
    case -1003:
      msg = "用户已经存在";
      break;
  }
  ctx.body = {
    code,
    msg,
  };
}

module.exports = handlerError;
