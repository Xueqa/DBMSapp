var oracledb = require("oracledb");
var sqlCombine =require('./sqlCombine');
var tables='Zeyuan.aisles';
var attribute='*';
var id='aisle_id';
var k='5';
var aisle_name='prepared soups salads';
var start_date='2017-01-07 00:00:00';
var end_date='2017-09-07 00:00:00';
var method='selectBestThreeInOneAisle';

const sql1=sqlCombine.topKSql(tables,attribute,id,k);

var initPool=async function(){
    try{
        await oracledb.createPool({
                _enableStats: true,
                user    :"ruochen",
                password    :"xrc1996854026",
                connectString:"oracle.cise.ufl.edu/orcl",
                poolAlias: "xrc"
          });
         
    }
    catch(err){
        console.log(err.message)
    }
}

//查询函数
var executeSql = async function (sql1) {

    try {
        var connection =  await oracledb.getPool('xrc').getConnection();
         var result = await connection.execute(sql1);
         await connection.close();
         console.log(result)
         return result.rows;
    }
    catch(err){
        console.log(err.message)
    }
  
  };


var initSql = async function(sql1){
    var result;
    try{
        await initPool();
        result= await executeSql(sql1);
        
    }
    catch(err){
        console.log(err.message)
    }
    return result;
}

module.exports={
    initPool,executeSql,initSql
};