/*
 *Created by ctyb on 2023/02/11.
 * API整框错误处理
 */
'use strict';

const API_STATUS=200;
const errorCode=require("../utils/ApiErrorCode");
const handleError = onError => {
    if (typeof onError !== 'function') {
        throw new TypeError('onError must be a function');
    }

    return (context, next) => next().then(() => {
            if (context.body === undefined && context.request.method !== 'OPTIONS') {
                context.status = API_STATUS;
                let error=errorCode.getError(errorCode.NOTFOUND);
                context.body =error;
            }
        }).catch(err => {
            onError(err);
            context.status = API_STATUS;
            //根据CODE取对应的错误（错误对应列表）
            let error=errorCode.getError(err.name);//根据名字取错误实体（默认'未知错误'）
            error.message=error.message+"-"+ JSON.stringify(err.message);
            context.body = error;
        });
};

module.exports = handleError;
module.exports.default = handleError;
