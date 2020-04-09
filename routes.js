const funcs=require('./funcs');
const router = require('koa-router')();

router.post('/result/topthreeinaisle',funcs.topThreeInAisle);
router.post('/result/topthreeindepartment',funcs.topThreeInDepartment);
router.post('/result/ordercountinaisle',funcs.orderCountInAisle);
module.exports=router;