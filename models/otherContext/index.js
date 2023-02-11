/**
 * Created by taoyingbin on 2023/02/11.
 * 加态加载信息DB实体
 */
"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var db = require('../../config/').db;
const config = db.SpokenContext;

var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    timezone: '+08:00',
    dialect: 'mysql',
    pool: {
        maxConnections: 2000,
        minConnections: 0,
        maxIdleTime: 10000
    },
    logging: function (sql) {
        console.log(sql);
    }
});

const SpokenContext = module.exports = {};

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    SpokenContext[model.name] = model;
});

Object.keys(SpokenContext).forEach(function (modelName) {
    if ("associate" in SpokenContext[modelName]) {
        SpokenContext[modelName].associate(SpokenContext);
    }
});

SpokenContext.sequelize = sequelize;
SpokenContext.Sequelize = Sequelize;