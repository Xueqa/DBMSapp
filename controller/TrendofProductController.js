oraclePool=require('../../oraclePool');
sqlCombine=require('../../sqlCombine');
const funcs=require('../../funcs');


async function getfunc(ctx, next) {
    var aisle= await oraclePool.initSql('SELECT DISTINCT Zeyuan.aisles.Aisle_name From ZEYUAN.aisles');
    //console.log(aisle);
    await ctx.render('TrendofProductNumInAisle',{
        aisle:aisle
    });
    next();
}

async function postfunc(ctx,next){
    var param=ctx.request.body;
    console.log(param);
    var result;
    var title;
    if(param.method=='byMonth'){
        result=await funcs.productTrendsbyMonth(param.aisle_name,param.start_date,param.end_date);
        title='Product Trends by Month';
    }
    else if(param.method=='byDay'){
        result=await funcs.productTrendsbyDay(param.aisle_name,param.start_date,param.end_date);
        title='Product Trends by Day';
    }
    console.log(result);
    var xAxis=new Array(result.length);
    var data=new Array(result.length);
    for(var i=0;i<result.length;i++){
        data[i]=result[i][0];
        xAxis[i]=result[i][2]+result[i][3];
    }
    console.log(data);
    console.log(xAxis);
    var message= {xAxis:xAxis,data:data,title:title}
    ctx.body=JSON.stringify(message);
    next();
}
module.exports={
    getfunc,postfunc
}