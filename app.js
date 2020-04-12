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
const Link1Controller=require('./static/controller/Link1Controller');
const highchartsController=require('./static/controller/highchartsController')


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
router.get('/link1',Link1Controller.getfunc);
router.post('/link1',Link1Controller.postfunc);

router.get('/test', highchartsController.getfunc);
router.post('/test', async (ctx,next) =>{
    var result=ctx.request.body;
    console.log(result);
    var message= {name:result.name,
    data:result.data};
    ctx.body=JSON.stringify(message);
})
app.use(bodyParser())
app.use(router.routes());

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
app.use(bodyparser());
app.use(static(path.join(__dirname,'static')));
app.use(static(path.join(__dirname)));
app.use(static(path.join(__dirname,'static/controller')));

app.use(static(path.join(__dirname,'node_modules/highcharts')));

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