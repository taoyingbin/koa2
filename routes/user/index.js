/**
 * Created by ctyb on 2023/02/11
 * 用户路由模板
 */
'use strict';

const Router = require("@koa/router");
let userV1=require("./v1");
let userV2=require("./v2");
let router = new Router();
router.prefix("/user");

//版本控置
//router.use(userV1.routes()).use(userV1.allowedMethods());
router.use(userV1.routes(),userV1.allowedMethods());
router.use(userV2.routes(),userV2.allowedMethods());

module.exports =router;

