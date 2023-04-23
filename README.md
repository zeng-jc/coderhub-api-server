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
