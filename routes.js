const funcs=require('./funcs');
const router = require('koa-router')();

router.post('/result/topthreeinaisle',funcs.topThreeInAisle);
router.post('/result/topthreeindepartment',funcs.topThreeInDepartment);
router.post('/result/ordercountinaisle',funcs.orderCountInAisle);
router.post('/result/selectmostloyalcustomer',funcs.selectMostLoyalCustomer);
router.post('/result/selectmostdiversecustomer',funcs.selectMostDiverseCustomer);
router.post('/result/selectreordermostcustomer',funcs.selectReorderMostCustomer);
router.post('/result/productTrend',funcs.productTrends);
router.post('/result/productTrend1',funcs.productTrends1);
router.post('/result/aisleTrend',funcs.aisleTrends);
router.post('/result/orderTrend',funcs.orderTrends);
router.post('/result/reorderTrend',funcs.reorderTrends);
router.post('/result/userTrend',funcs.userTrends);

module.exports=router;