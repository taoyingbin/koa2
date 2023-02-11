/**
 * Created by taoyingbin on 2023/02/11.
 * 信息实体
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var message = sequelize.define('tb_message', {
            Id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true},
            channelId: {type: DataTypes.INTEGER, defaultValue: ""},
            title:{type: DataTypes.STRING, defaultValue: ""},
            content: {type: DataTypes.STRING, defaultValue: ""},
            createdAt: {type: DataTypes.DATE, defaultValue:""},
            status: {type: DataTypes.INTEGER, defaultValue: 0}
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "tb_message",
            classMethods: {
                associate: function (models) {
                    //删除核心代码
                }
            }
        });
    return message;
};