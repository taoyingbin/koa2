/**
 * Created by taoyingbin on 2023/02/11.
 * 通道 schema
 */
'use strict';

const {GraphQLObjectType,GraphQLString,
       GraphQLInt,GraphQLSchema,GraphQLNonNull}=require("graphql");
const channelService=require("../services/channel");

//定义schema
var channelPayload=new GraphQLObjectType({
    name:"channel",
    description:"通道实体",
    fields: {
        Id: {type: GraphQLInt, description: "通道实体主键Id"},
        name: {type: GraphQLString, description: "通道名称"}
    }
})

// 定义一个根 配置通用Schema  查询操作。
var rootQuerySchema=new GraphQLObjectType({
    name:'channelRootSchema',
    description:'channel RootSchema',
    fields:{
        getChannelBy:{
            type:channelPayload,
            description:"根据Id获取Channel",
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
           async resolve(parent,args,content,info) {
                console.log(JSON.stringify(args));
                let ret= await channelService.getChannelBy(1);
                return ret;
            }
        }
    }
});


//挂schema
module.exports=new GraphQLSchema({
    query:rootQuerySchema,
    description:"channel 操作实体类"
});