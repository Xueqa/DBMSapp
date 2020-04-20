oraclePool=require('../../oraclePool');
sqlCombine=require('../../sqlCombine');
const funcs=require('../../funcs');


async function getfunc(ctx,next) {
    //console.log(aisle);
    // var param=ctx.params;
    // console.log(param);
    await ctx.render('PureGrowthView');
    next();
}

async function postfunc(ctx,next){
    await ctx.render('PureGrowthView');
    var param=ctx.request.body;
    console.log(param);
    var result=await funcs.IncreasingProductCount(param.product_id,param.start_date,param.end_date);
    var title='Product Trends by Month';
    var xAxis=new Array(result.length);
    data=new Array(result.length);
    for(var i=0;i<result.length;i++){
        data[i]=result[i][0];
        xAxis[i]=result[i][1];
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