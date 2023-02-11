/**
 * Created by ctyb on 2023/02/11
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development', //环境名称
    port: process.env.PORT || 8016,         //服务端口号
    redis_url: '',       //redis地址
    redis_port: '',      //redis端口号
    db: {
         SpokenContext: {
             host: "127.0.0.1",
             port: "3306",
             database: "spokenEnglish",
             user: "root",
             password: "123456"
         }

    },
    white_list: [], //DDOS网关
    black_list: []  //过滤IP
};
