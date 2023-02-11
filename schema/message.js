/**
 * Created by taoyingbin on 2023/02/11.
 * 信息 schema
 */
'use strict';

const {
    GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLList, GraphQLSchema,
    GraphQLInputObjectType, GraphQLNonNull,
    GraphQLError
}=require("graphql");
//数据源服务
const messageservice= require("../services/message");
const channelService=require("../services/channel");

const _ =require('underscore');
const {errors} = require("sequelize/lib/instance-validator");

//定义schema
var channel=new GraphQLObjectType({
    name:"channel",
    description:"信息通道实体",
    fields: {
        Id: {type: GraphQLInt, description: "信息通道实体主键Id"},
        name: {type: GraphQLString, description: "信息通道名称"}
    }
})
var message=new GraphQLObjectType({
    name:'message',
    description:"信息实体",
    fields: {
        Id: {type: GraphQLInt, description: "信息主銉ID"},
        channel: {type: channel, description: "信息所属通道"},
        title: {type: GraphQLString, description: "标题"},
        content: {type: GraphQLString, description: "具体内容"},
        createdAt: {type: GraphQLString, description: "创建时间"},
        status: {type: GraphQLInt, description: "状态 0：删除 1：正常"}
    }
})
//传入分面参数 //
var messagePageInput=new GraphQLInputObjectType({
    name:'messagePageInput',
    fields: {
        psize: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "每页条数"
        },
        pIndex: {
            type: GraphQLNonNull(GraphQLInt),
            description: "分页索引（页码）",
        },
        title: {
            type: GraphQLString,
            description: "信息标题",
        }
    }
})
//输出Message分页信息
var messagePage=new GraphQLObjectType({
    name:'messagePage',
    description:"message分页输出类型",
    fields: {
        messagelist: {type: GraphQLList(message), description: "信息列表"},
        count: {type: GraphQLInt, description: "总条数"},
    }
})

var messageInput=new GraphQLInputObjectType({
    name:'messageInput',
    fields: {
        channelId: {type: GraphQLNonNull(GraphQLInt), description: "信息所属通道Id"},
        title: {type: GraphQLNonNull(GraphQLString), description: "标题"},
        content: {type: GraphQLString, description: "具体内容"},
    }
})

//2、定义一个根 配置通用Schema 方法。
var querySchema=new GraphQLObjectType({
    name:'messageQuerySchema',
    description:'信息管理查询Schema',
    fields:{
        getMessagelist:{
            type:messagePage,
            description:"获取信息列表并分页",
            args: {
                data: { type: new GraphQLNonNull(messagePageInput) }
            },
            async resolve(parent, args,context,info){
                console.log("传入参数:"+JSON.stringify(args));
                //固定参数 ==> args.psize,args.pIndex,args.title
                let {messagelist, count }=await messageservice.getMessageBy(10,1);
                return {messagelist, count}
            }
        },
        getMessageById: {
            type: message,
            description: "根据Id获取管理信息实体",
            args: {
                Id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parent, args, context, info) {
                //console.log("传入参数:"+JSON.stringify(args));args.Id
                //主框架处理错误
                //throw new GraphQLError("111") ;
                let Id=args.Id||0;
                let result = await messageservice.getMessageById(Id);
                return result || {};
            }
        },
        getMessageChannelById:{
            type:channel,
            description:"根根Id获取信息通道实体",
            args:{
                channelId:{type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parent, args, context, info) {
                let Id = args.channelId || 0;
                let result = await channelService.getChannelBy(Id);
                return result;
            }
        }
    }
})

var mutationSchema=new GraphQLObjectType({
    name:'messageMutationSchema',
    description:'信息管理操作Schema',
    fields:{
        createMessage:{
            type:message,
            description:"创建信息资源",
            args:{
                data: { type: new GraphQLNonNull(messageInput) }
            },
            async resolve(parent, args, context, info) {
                console.log(JSON.stringify(args));
                //数据验证逻辑不写了
                /*
                let p1= messageservice.createMessage(args.channelId,args.title,args.content||'');
                let p2= channelService.getChannelBy(args.channelId);
                 let ret=await  Promise.all([p1,p2]).then(data=>{
                    let item ={...data[0],channel:data[1]};
                     delete item.channelId;
                      return item;
                 }).catch(err=>{throw  err});
                 return  ret
                 */
                let result = await messageservice.createMessage(1, "1", "1").then(data=>{
                    return messageservice.getMessageById(data.Id);
                })
                return result
            }
        },
        createChannel: {
            type: channel,
            description: "创建渠道实体",
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "渠道名称"
                }
            },
            async resolve(parent, args, context, info) {
                let result =await  channelService.createChannel(args.name);
                console.log(JSON.stringify(result));
                return result;
            }
        }
    }
})

//挂schema并对面输出
module.exports=new GraphQLSchema({
    query:querySchema,
    mutation:mutationSchema,
});