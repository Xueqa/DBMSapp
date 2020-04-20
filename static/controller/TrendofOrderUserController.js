oraclePool=require('../../oraclePool');
sqlCombine=require('../../sqlCombine');
const funcs=require('../../funcs');


async function getfunc(ctx, next) {
    var aisle= await oraclePool.initSql('SELECT DISTINCT Zeyuan.aisles.Aisle_name From ZEYUAN.aisles');
    //console.log(aisle);
    await ctx.render('TrendofOrderUser',{
        aisle:aisle
    });

}

async function postfunc(ctx,next){
    var param=ctx.request.body;
    console.log(param);
    var result;
    var title;
    var xAxis;
    var data;
    if(param.method=='byMonth'){
        result=await funcs.userTrendsByMonth(param.user_id,param.start_date,param.end_date);
        title='Order Trends by Month';
        xAxis=new Array(result.length);
        data=new Array(result.length);
        for(var i=0;i<result.length;i++){
            data[i]=result[i][0];
            xAxis[i]=result[i][1];
        }
    }
    else if(param.method=='byDay'){
        result=await funcs.userTrendsByDay(param.aisle_name,param.start_date,param.end_date);
        title='Order Trends by Day';
        xAxis=new Array(result.length);
        data=new Array(result.length);
        for(var i=0;i<result.length;i++){
            data[i]=result[i][0];
            xAxis[i]=result[i][1]+result[i][2];
        }
    }
    console.log(result);


    console.log(data);
    console.log(xAxis);
    var message= {xAxis:xAxis,data:data,title:title}
    ctx.body=JSON.stringify(message);

}
module.exports={
    getfunc,postfunc
}