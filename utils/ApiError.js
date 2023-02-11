/*
 *Created by ctyb on 2023/02/11.
 * 自定义Api异常
 */
'use strict';

const  apiErrorCode=require("./ApiErrorCode");
class ApiError extends Error {
    //构造方法
    constructor(name, code, message) {
        super();
        //通过错误名字，找出相关的代码。利用銉值对处理问题
         let error=apiErrorCode.getError(name);
        if (code == "" || code == undefined || code == null)
            code = error.statusCode;
        if (message == "" || message == undefined || message == null)
            message = error.message;

        this.name = name;
        this.code = code;
        this.message = message;
    }
};

module.exports =ApiError;
