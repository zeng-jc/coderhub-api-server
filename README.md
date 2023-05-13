# coderhub-api-server

coderhub 后端接口服务器

## coderhub-api-server

coderhub 后端接口服务器

## 密钥的生成

coderhub-api-server/scr/app/secretKey 目录下需要自行创建公钥和私钥

创建流程：mac 电脑直接在终端输入如下代码，windows 电脑需要安装 git，在 gitBash 中输入

- 输入 openssl
- 输入`genrsa -out private.key 2048`生成私钥
- 输入`rsa -in private.key -pubout -out public.key`生成公钥

## 邮箱验证码发送配置

/scr/app/sendEmail 目录下 config.js 需要自行创建配置

例如：

```js
module.exports = {
  auth: {
    user: "xxx@163.com", //邮箱账号
    pass: "xxx", //邮箱授权码
  },
  from: "xxx@163.com", //发件人邮箱
};
```

