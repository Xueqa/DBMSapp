const bodyParser = require('koa-bodyparser')
const Koa=require('koa');

const app=new Koa();
//实例化router
// const Router=require('koa-router');
// const router=new Router();
//koa-views
const views=require('koa-views');
//koa-static
const static=require('koa-static');
//koa-bodypaerser
const bodyparser=require('koa-bodyparser');
const render=require('koa-art-template');
const path = require('path');
const Router=require('koa-router');
const router=new Router();
const funcs=require('./funcs');
const oraclePool=require('./oraclePool');
var result=[];


router.get('/',async (ctx,next)=>{
    await ctx.render("index");
    next();

});
router.post('/login', async (ctx,next)=>{
    ctx.redirect('/main');
    next();
});

router.get('/main', async (ctx,next)=>{
    await ctx.render("main_page");
    next();
});
router.get('/link1',async (ctx,next)=>{
    var aisle= await oraclePool.initSql('SELECT DISTINCT Zeyuan.aisles.Aisle_name From ZEYUAN.aisles');
    //console.log(aisle);
    await ctx.render('Link1',{
        list:result,
        aisle:aisle
    });
    next();
});
router.post('/link1',async (ctx,next)=>{
    var param=ctx.request.body;
    result= await funcs.topThreeInAisle(ctx,next);
    console.log(param);
    console.log(result);
    await ctx.redirect('/link1');
})
app.use(bodyParser())
app.use(router.routes());

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
app.use(bodyparser());
app.use(static(path.join(__dirname,'css')));
app.use(views("views",{
    map: {
        html: 'ejs'
    }}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8080,()=> {
    console.log("starting at port 8080");
});
module.exports = app;