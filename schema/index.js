/*
 *Created by ctyb on 2023/02/11.
 * graphQL中间件加载schema
 *
 */
'use strict';

//graphql
const  graphql = () => {
    return (context, next) => (() => {
        //动态schema
        next();
    }).catch(err => {
        throw  err;
    });
};

module.exports=graphql;

