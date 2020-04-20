oraclePool=require('../../oraclePool');
sqlCombine=require('../../sqlCombine');
const funcs=require('../../funcs');


async function getfunc(ctx, next) {
    //console.log(aisle);
    await ctx.render('TheMostDivUser');

}

async function postfunc(ctx,next){
    var param=ctx.request.body;
    console.log(param);
    var result=await funcs.selectMostDiverseCustomer(param.start_date,param.end_date);
    console.log(result);
    var message={data: result};
    ctx.body = JSON.stringify(message);
    //await ctx.redirect('/bestSeller');


}
module.exports={
    getfunc,postfunc
}