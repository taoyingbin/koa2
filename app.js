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
const apiErrorCode=require("./utils/ApiErrorCode");
const apiError= require("./utils/ApiError");
//graphql
const mount = require('koa-mount');
const { graphqlHTTP } = require('koa-graphql');
const messageSchema = require("./schema/message");

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

//7、 挂载graph模板，后期把他写成Apollo 与源合并（暂时先这样子写）
app.use(mount('/message/v1/',
    graphqlHTTP({
            schema: messageSchema,
            graphiql: true,
            context: () => {
                //处理认证上下文
            },
            customFormatErrorFn: error => {
                //统一主架构错误
                console.log("graph统一处理:" + JSON.stringify(error))
                //写一个中间件处理GRAPH内部错误，由主框架统一处理。
                throw new apiError(apiErrorCode.SERVER_ERROR, "", JSON.stringify(error));
                return;
            }
        }
    )));

//4、加载主程路由索引
app.use(router.routes()).use(router.allowedMethods());
//启动端口
app.listen(8016, () => {
    console.log("服务器启动-success");//success
});