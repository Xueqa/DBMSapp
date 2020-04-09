//var connect=require('./connect.js');

function topK(keyId,K){
    var whereSql=" where rownum<="+K+" order by "+keyId+" Desc";
    return whereSql;
    //module.exports.whereSql=whereSql; 
}

function select(attributes){
    var selectSql="select "+attributes;
    return selectSql;
    //module.exports.selectSql = selectSql; 
}

function from(tables){
    var fromSql=" from "+tables;
    return fromSql;
    //module.exports.fromSql = fromSql; 
}

module.exports={
    topK,select,from
}