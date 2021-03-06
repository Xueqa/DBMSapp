oraclePool=require('../../oraclePool');
sqlCombine=require('../../sqlCombine');
const funcs=require('../../funcs');


async function getfunc(ctx, next) {
    var aisle= await oraclePool.initSql('SELECT DISTINCT Zeyuan.aisles.Aisle_name From ZEYUAN.aisles');
    //console.log(aisle);
    await ctx.render('PureGrowth',{
        aisle:aisle
    });

}

async function postfunc(ctx,next){
    var param=ctx.request.body;
    console.log(param);
    var result=await funcs.IncreasingProduct(param.aisle_name,param.start_date,param.end_date);
    console.log(result);
    var message={func:"draw_table",start_date:param.start_date,end_date: param.end_date,data: result};
    ctx.body = JSON.stringify(message);
    //await ctx.redirect('/bestSeller');

}


module.exports={
    getfunc,postfunc
}