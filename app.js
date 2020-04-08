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
var username;

router.get('/',async (ctx,next)=>{
    await ctx.render("index");
});

router.post('/login', async (ctx,next)=>{
    let userinfo=ctx.request.body;
    username=userinfo.username;
    if (username==""){
        ctx.redirect('/');
        return false;
    }

    ctx.redirect('/main');
});

router.get('/main', async (ctx,next)=>{
    await ctx.render("main_page" ,{
        username:username
    });
});
router.get('/link1',async (ctx,next)=>{
    await ctx.render('Link1');
})
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

app.use(bodyparser());
app.use(static("CSS"));
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
