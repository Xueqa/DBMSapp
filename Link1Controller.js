oraclePool=require('../../oraclePool');
sqlCombine=require('../../sqlCombine');
const funcs=require('../../funcs');

var result=[];

async function getfunc(ctx, next) {
    var aisle= await oraclePool.initSql('SELECT DISTINCT Zeyuan.aisles.Aisle_name From ZEYUAN.aisles');
    //console.log(aisle);
    await ctx.render('Link1',{
        list:result,
        aisle:aisle
    });
    next();
}

async function postfunc(ctx,next){
    var param=ctx.request.body;
    result= await funcs.topThreeInAisle(ctx,next);
    console.log(param);
    console.log(result);
    await ctx.redirect('/link1');
    next();
}
module.exports={
    getfunc,postfunc
}