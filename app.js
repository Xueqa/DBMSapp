const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const router= require('./routes');
app.use(bodyParser())
app.use(router.routes());

app.listen(3000,()=> {
    console.log("starting at port 3000");
});