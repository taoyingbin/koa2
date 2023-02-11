/**
 * Created by ctyb on 2023/02/11
 * 运行环境主线
 */

'use strict';
var development_env = require('./development');
var test_env = require('./test');
var production_env = require('./production');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    development: development_env,
    test: test_env,
    production: production_env
}[process.env.NODE_ENV || 'development'];