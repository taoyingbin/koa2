/**
 * Created by taoyingbin on 2023/02/11.
 * message 服务
 */
'use strict';

const apiError =require("../utils/ApiError");
const  apiErrorCode=require("../utils/ApiErrorCode");
const db =require("../models/otherContext/")
const models = db.sequelize.models;
const _ =require('underscore');
const moment=require("moment");

const channelServer=require("../services/channel");
const {json} = require("sequelize/lib/utils");
const {errors} = require("sequelize/lib/instance-validator");

const handler = module.exports = {};

/**
 * 创建Message实休
 * @param channelId:int
 * @param title:string
 * @param content:string
 * @return {models.tb_message}
 * @author ctyb
 * @create 2023/02/11
 **/
handler.createMessage=function (channelId,title,content) {
    return models.tb_message.create({
        channelId, title, content, createdAt: moment().format("YYYY-MM-DD HH:mm:ss.SSS"), status: 1
    }).then(ret => {
        //数据逻辑
        return ret;
    }).catch(err => {
        throw new apiError(apiErrorCode.FAIL, "error", JSON.stringify(err));
    })
}

/**
 * 获取列表并返回总条件
 * @param psize:int
 * @param pIndex:int
 * @return {messagelist,count}
 * @author ctyb
 * @create 2023/02/11
 **/
handler.getMessageBy=function (psize,pIndex){
    return models.tb_message.findAndCountAll({
        attributes: ['Id', 'channelId', 'title', 'content', 'createdAt', 'status'],
        where: {'status': 1},
        raw: true,
        order: [['createdAt', 'DESC']],
        limit: psize,                  // 每页多少条
        offset: psize * (pIndex - 1)  // 跳过多少条
    }).then((result)=>{
        console.log(JSON.stringify(result))
        var count=result.count ||0 ;
        var rows=result.rows || [];
        if (rows.length>0){
            let cId=_.chain(rows).pluck('channelId').uniq().value();
            return channelServer.getChannelByIds(cId).then(ret=>{
                let list= _.chain(rows).map(function (item){
                    item.channel=_.chain(ret).where({Id:item.channelId}).first().value()||{Id:1,name: '1'};
                    //delete item.channelId;
                    let dt=moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
                    item.createdAt=dt;
                    return item
                }).value();
                return {messagelist:list,count}
            })
        }else {
            return  {messagelist:rows,count};
        }
    }).catch(ex => {
        throw  ex;
    });
}

handler.getMessagelistBy=function (psize,pIndex) {
    return models.tb_message.findAll({
        attributes: ['Id', 'channelId', 'title', 'content', 'createdAt', 'status'],
        where: {'status': 1},
        raw: true,
        order: [['createdAt', 'DESC']],
        limit: psize,                  // 每页多少条
        offset: psize * (pIndex - 1)  // 跳过多少条
    }).then((rows) => {
        ///console.log("rows:"+JSON.stringify(rows));
        if (rows && rows.length > 0) {
            let cId = _.chain(rows).pluck('channelId').uniq().value();
            //console.log("cId"+JSON.stringify(cId));
            return channelServer.getChannelByIds(cId).then(ret => {
                let list = _.chain(rows).map(function (item) {
                    item.channel = _.chain(ret).where({Id: item.channelId}).first().value() || {Id: 1, name: '1'};
                    //delete item.channelId;
                    let dt = moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
                    item.createdAt = dt;
                    return item
                }).value();
              return list
            })
        } else
            return [];
    }).catch(err => {
        throw  err;
    });
}
handler.getMessageCountBy=function (where){
    return models.tb_message.findAll({
        attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('Id')), 'count']],
        where: {'status': 1},
        raw: true,
    }).then(ret=>{
        return ret&&ret.length>0?ret[0].count:0;
    }).catch(err=> {
        throw err;
    })
};

/**
 * 根据Id获取信息
 * @param Id:int
 * @return {models.tb_message}
 * @author ctyb
 * @create 2023/02/11
 **/
handler.getMessageById=function (Id){
    return models.tb_message.findOne({
        attributes: ['Id', 'channelId', 'title', 'content', 'createdAt', 'status'],
        where: {'Id': Id},
        raw: true
    }).then(ret=>{
       if(!(_.isNull(ret)||_.isEmpty(ret))){
           //海量数据会有锁的问题,处理问题略
           return channelServer.getChannelBy(ret.channelId).then(channel=>{
                ret.channel=channel;
                ret.createdAt=moment(ret.createdAt).format("YYYY-MM-DD HH:mm:ss.SSS");
                delete ret.channelId;
                return ret;
           }).catch(err=>{
               throw  err;
           });
       }else {
           return {Id: 0, channel: {Id: 0, name: ""}, title: '', content: '', createdAt: '', status: ''}
       }
    }).catch(err=>{
        throw new apiError(apiErrorCode.FAIL,"error",JSON.stringify(err));
    })
}