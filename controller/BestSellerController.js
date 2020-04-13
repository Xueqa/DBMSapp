oraclePool=require('../../oraclePool');
sqlCombine=require('../../sqlCombine');
const funcs=require('../../funcs');


async function getfunc(ctx, next) {
    var aisle= await oraclePool.initSql('SELECT DISTINCT Zeyuan.aisles.Aisle_name From ZEYUAN.aisles');
    //console.log(aisle);
    await ctx.render('BestSeller',{
        aisle:aisle
    });
    next();
}

async function postfunc(ctx,next){
    var param=ctx.request.body;
    console.log(param);
    var result=await funcs.topThreeInAisle(ctx,next);
    console.log(result);
    var message={data: result};
    ctx.body = JSON.stringify(message);
    //await ctx.redirect('/bestSeller');

    next();
}
module.exports={
    getfunc,postfunc
}