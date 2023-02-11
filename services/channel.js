/**
 * Created by taoyingbin on 2023/02/11.
 * channel 服务
 */
'use strict';

const apiError =require("../utils/ApiError");
const  apiErrorCode=require("../utils/ApiErrorCode");
const db =require("../models/otherContext/")
const models = db.sequelize.models;
const handler = module.exports = {};

/**
 * 创建渠道实体
 * @param name:string
 * @return models.tb_channel
 * @author ctyb
 * @create 2023/02/11
 **/
handler.createChannel=function (name){
    return models.tb_channel.create({
        name
    }).then(ret=>{
        //业务逻辑(略)
        return ret;
    }).catch(err=>{
        throw new apiError(apiErrorCode.FAIL,"error",JSON.stringify(err));
    })
}

/**
 * 根据Id取实体
 * @param Id:int
 * @return models.tb_channel
 * @author ctyb
 * @create 2023/02/11
 **/
handler.getChannelBy=function (Id){
    return models.tb_channel.findOne({
        attributes: ['Id', 'name'],
        where: {'Id': Id},
        raw:true
    }).then(ret=>{
        //业务逻辑略不写了
        return ret||{Id:0,name:''};
    }).catch(ex => {
        throw new apiError(apiErrorCode.FAIL,"error",JSON.stringify(err));
    });
}

/**
 * 根据Ids取实体列表
 * @param Ids:[int]
 * @return [models.tb_channel]
 * @author ctyb
 * @create 2023/02/11
 **/
handler.getChannelByIds=function (Ids){
    return models.tb_channel.findAll({
        attributes: ['Id', 'name'],
        raw:true,
        //whereIn: {'Id': Ids}, //没有数据暂时不按条件找出数据
    }).then(ret=>{
        return ret ||[];
    }).catch(ex => {
        throw new apiError(apiErrorCode.FAIL,"error",JSON.stringify(err));
    });
}

module.exports =handler;
