/**
 * Created by taoyingbin on 2023/02/11.
 * 渠道实体类
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var channel = sequelize.define('tb_channel', {
            Id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true},
            name: {type: DataTypes.STRING, defaultValue: ""}
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "tb_channel",
            classMethods: {
                associate: function (models) {
                    //略
                }
            }
        });
    return channel;
};