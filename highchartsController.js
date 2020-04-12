

async function getfunc(ctx,next) {
    await ctx.render("highchartsTest",{data:[1,2,3]});

    next();
}

module.exports={getfunc}