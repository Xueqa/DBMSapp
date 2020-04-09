//引入Koa
var Koa=require('koa');

var app=new Koa();
//实例化router
var Router=require('koa-router');
var router=new Router();
//koa-views
var views=require('koa-views');
//koa-static
var static=require('koa-static');
//koa-bodypaerser
var bodyparser=require('koa-bodyparser');
var render=require('koa-art-template');
var path = require('path');
var mysql= require('koa-mysql');
var DB = require('./modules/Database.js');
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
    var aisle= await DB.find('SELECT DISTINCT Aisle From table1');
    var department= await DB.find('SELECT DISTINCT Department From table1');
    await ctx.render('Link1',{
        list:result,
        aisle:aisle,
        department:department
    });
    next();
});
router.post('/link1',async (ctx,next)=>{
    var param=ctx.request.body;
    result= await DB.find('SELECT * FROM table1 WHERE Aisle=? AND Department=?',[param.aisle,param.department]);
    console.log(result);
    await ctx.redirect('/link1');
})


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

//监听端口
app.listen(3000,()=> {
    console.log("starting at port 3000");
});
module.exports = app;