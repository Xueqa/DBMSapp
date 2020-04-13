oraclePool=require('../../oraclePool');
sqlCombine=require('../../sqlCombine');
const funcs=require('../../funcs');

var result=[];

async function getfunc(ctx, next) {
    var aisle= await oraclePool.initSql('SELECT DISTINCT Zeyuan.aisles.Aisle_name From ZEYUAN.aisles');
    //console.log(aisle);
    await ctx.render('TrendofReorder',{
        list:result,
        aisle:aisle
    });
    next();
}

async function postfunc(ctx,next){
    var result=ctx.request.body;
    console.log(result);
    var message= {
        data:result.data};
    ctx.body=JSON.stringify(message);
    next();
}
module.exports={
    getfunc,postfunc
}