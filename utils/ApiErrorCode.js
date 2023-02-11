/*
 *Created by ctyb on 2023/02/11.
 * API错误列表
 */
'use strict';

var apiErrorCode = {};
const error_map = new Map(); //API错误名称对应的错误信息 key健值对
//204
const NOCONTENT_BODY={
    statusCode: 204,
    error: 'Not Content',
    message: '没有内容'
}
apiErrorCode.NOCONTENT_ERROR="notContent";
error_map.set(apiErrorCode.NOCONTENT_ERROR,NOCONTENT_BODY);
//401
const UNAUTHORIZED_BODY={
    statusCode: 401,
    error: 'Unauthorized',
    message: '未经授权'
}
apiErrorCode.UNAUTHORIZED="unauthorized";
error_map.set(apiErrorCode.UNAUTHORIZED,UNAUTHORIZED_BODY);
//403
const FORBIDDEN_BODY={
    statusCode: 403,
    error: 'Forbidden',
    message: '禁止访问'
};
apiErrorCode.FORBIDDEN="forbidden";
error_map.set(apiErrorCode.FORBIDDEN,FORBIDDEN_BODY);

//404
const NOTFOUND_BODY = {
    statusCode: 404,
    error: 'Not Found',
    message: 'missing'
};
apiErrorCode.NOTFOUND="notFound";
error_map.set(apiErrorCode.NOTFOUND, NOTFOUND_BODY);

//406
const NOTACCEPTABLE_BODY={
    statusCode: 406,
    error: 'Not Acceptable',
    message: '不可接受的错误'
}
apiErrorCode.NOTACCEPTABLE="notAcceptable";
error_map.set(apiErrorCode.NOTACCEPTABLE,NOTACCEPTABLE_BODY)

//409
const CONFLICT_BODY={
    statusCode: 409,
    error: 'Conflict',
    message: '服务器冲突'
};
apiErrorCode.CONFLICT="conflict";
error_map.set(apiErrorCode.CONFLICT,CONFLICT_BODY);

//500
const SERVER_ERROR_BODY={
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'An internal server error occurred'
}
apiErrorCode.SERVER_ERROR = "serverError";
error_map.set(apiErrorCode.SERVER_ERROR,SERVER_ERROR_BODY);

//自定义错误
//'未知错误'(默认)
const UNKNOW_ERROR_BODY={
    statusCode: -1,
    error: 'Unknown Error',
    message: '未知错误'
}
apiErrorCode.UNKNOW_ERROR="unknowError";
error_map.set(apiErrorCode.UNKNOW_ERROR,UNKNOW_ERROR_BODY)
//错误
const FAIL_BODY={
    statusCode: 1,
    error: 'fail',
    message: ''
}
apiErrorCode.FAIL="fail";
error_map.set(apiErrorCode.FAIL, FAIL_BODY);
//参数错误
const  PARAMETER_ERROR_BODY={
    statusCode: 1001,
    error: 'Parameter Error',
    message: '参数错误'
};
apiErrorCode.PARAMETER_ERROR="parameterError";
error_map.set(apiErrorCode.PARAMETER_ERROR, PARAMETER_ERROR_BODY);

//获取错误实体（名字）
apiErrorCode.getError=(error_name)=>{
    var error_info;
    if (error_name) {
        error_info = error_map.get(error_name);
    }
    //如果没有对应的错误信息，默认'未知错误'
    if (!error_info||Object.keys(error_info).length==0 ) {
        error_info =UNKNOW_ERROR_BODY;
    }
    return error_info;
};

module.exports=apiErrorCode;