/**
 * Created by ctyb on 2023/02/11
 * 用户路由模板-v2
 */
'use strict';

const Router = require("@koa/router");
//引用服务端
//var userSerive=require("./v1");
let router=new Router();
router.prefix("/v2");
//定义访问路由
router.get("/s",async(ctx)=>{
ctx.body="success";
});

module.exports=router;