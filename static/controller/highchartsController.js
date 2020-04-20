

async function getfunc(ctx,next) {
    await ctx.render("highchartsTest");

}

async function postfunc(ctx,next) {
    var result=ctx.request.body;
    console.log(result);
    var message= {name:result.name,
        data:result.data};
    ctx.body=JSON.stringify(message);
}
module.exports={getfunc,postfunc}