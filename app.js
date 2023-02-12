/*
 *Created by ctyb on 2023/02/11.
 * 主线程模块如下：
    1、Ddos模块
    2、网关过滤器
    3、token 认证
    4、日志 权限 容错
    5、response输出
    6、加载模块化路（eg:user/V1/getUserById）
    7、graph模板处理
    8、...
 */
'use strict';

const koa = require('koa');
const path = require("path");
const router = require('./routes/');//主程路由
const handleError=require("./middlewares/handleError");

const app = new koa();

//1、错误处理
//1-1 进程崩溃
process.on('uncaughtException', (err) => {
    console.error('进程:' + err.message);
});
//1-2 app 内部错误
app.use(handleError(err=>{
    /*
          错误的集中处理:
          log 出来
          写入日志
          写入数据库
           ...
        */
    console.log(path.join("错误的集中处理-",JSON.stringify(err)));
}));
//错误处理-end

//2、response输出进行格式化处理
//4、加载主程路由索引
app.use(router.routes()).use(router.allowedMethods());
//启动端口
app.listen(8016, () => {
    console.log("服务器启动-success");//success
});