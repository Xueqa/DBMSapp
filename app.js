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
const BestSellerController=require('./static/controller/BestSellerController');
const highchartsController=require('./static/controller/highchartsController');
const TrendofOrderInAisleController=require('./static/controller/TrendofOrderInAisleController');
const TrendofProductController=require('./static/controller/TrendofProductController');
const TrendofReorderController=require('./static/controller/TrendofReorderController');
const TrendofOrderUserController=require('./static/controller/TrendofOrderUserController');
const TheMostDivController=require('./static/controller/TheMostDivController');
const TheMostLoyalController=require('./static/controller/TheMostLoyalController');
const PureGrowthController=require('./static/controller/PureGrowthController');
const PureGrowthViewController=require('./static/controller/PureGrowthViewController');
const RecommendController=require('./static/controller/RecommendController');


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
router.get('/bestSeller',BestSellerController.getfunc);
router.post('/bestSeller',BestSellerController.postfunc);

router.get('/test', highchartsController.getfunc);
router.post('/test', highchartsController.postfunc);

router.get('/trendofOrderA',TrendofOrderInAisleController.getfunc);
router.post('/trendofOrderA',TrendofOrderInAisleController.postfunc);

router.get('/trendofPro',TrendofProductController.getfunc);
router.post('/trendofPro',TrendofProductController.postfunc);

router.get('/trendofRe',TrendofReorderController.getfunc);
router.post('/trendofRe',TrendofReorderController.postfunc);

router.get('/trendofOrderU',TrendofOrderUserController.getfunc);
router.post('/trendofOrderU',TrendofOrderUserController.postfunc);

router.get('/TheMDC',TheMostDivController.getfunc);
router.post('/TheMDC',TheMostDivController.postfunc);

router.get('/TheMLU',TheMostLoyalController.getfunc);
router.post('/TheMLU',TheMostLoyalController.postfunc);

router.get('/PureGrowth',PureGrowthController.getfunc);
router.post('/PureGrowth',PureGrowthController.postfunc);

router.get('/Recommend',RecommendController.getfunc);
router.post('/Recommend',RecommendController.postfunc);

router.get('/PureGrowthView',PureGrowthViewController.getfunc);
router.post('/PureGrowthView',PureGrowthViewController.postfunc);

app.use(bodyParser());
app.use(router.routes());

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});
app.use(bodyparser());
app.use(static(path.join(__dirname,'static')));
app.use(static(path.join(__dirname,'static/images')));

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