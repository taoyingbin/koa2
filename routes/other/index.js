/**
 * Created by ctyb on 2023/02/12
 * 其它模板路由(graphQL)
 */
'use strict';

const Router = require("@koa/router");
const {graphqlHTTP} = require("koa-graphql");
const messageSchema = require("../../schema/message");
let router = new Router();
//router.prefix("/other");
router.all(
    '/other/v1',
    graphqlHTTP({
        schema: messageSchema,
        graphiql: true,
        context: () => {
            //处理认证上下文
        },
        customFormatErrorFn: error => {
            //统一主架构错误
            //console.log("graph统一处理:" + JSON.stringify(error))
            //写一个中间件处理GRAPH内部错误，由主框架统一处理。
            //throw new apiError(apiErrorCode.SERVER_ERROR, "", JSON.stringify(error));
            //return;
        }
    })
);

module.exports =router;
