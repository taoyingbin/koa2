/**
 * Created by ctyb on 2023/02/11
 * 用户路由模板-v1
 */
'use strict';

const Router = require("@koa/router");
const  moment=require("moment");
let router=new Router();
router.prefix("/v1");

//定义访问路由 /v1/t
router.get("/t", async (ctx,next) => {
    //console.log("成功")
    let dt=moment().format("YYYY-MM-DD HH:mm:ss.SSS");
    ctx.body=dt;
});
module.exports=router;

