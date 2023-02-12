/**
 * Created by ctyb on 2023/01/11
 * 路由模板主索引
 */
'use strict';

const Router = require("@koa/router");

let router=new Router();
let userRoute = require('../routes/user/');
let otherRoute=require("../routes/other/");
//1、用户模块
router.use(userRoute.routes()).use(userRoute.allowedMethods());
//graphQL
router.use(otherRoute.routes()).use(userRoute.allowedMethods());
//router.use(errorHandler());
//2、...

module.exports = router;