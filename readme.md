# 准备工作
建立项目，创建后端目录和前端目录。

1. 使用express创建web服务器。 新建server.js

2. 创建服务器配置文件 config.js

3. 配置express中间件，日志，bodyParser(), cookieParser, cookieSession等

4. 配置express路由 ， 新建lib/routes目录，创建路由模块，在server.js使用路由模块

5. 构建客户端，建立angular单页面应用。创建通用目录。 src(app, assets, common, less, index.html), vendor, test

6. 新建index.html。 引用相关js和css，搭建应用窗口布局。

7. 引入第三方库文件 angular.js jquery.js bootstrap.js等 放在vendor目录中
    引入图片资源文件 放在src/assets目录中

8. 使用自动化构建工具，构建web前端应用。 本例使用grunt

9. 配置grunt
