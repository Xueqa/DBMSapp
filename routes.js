const funcs=require('./funcs');
const router = require('koa-router')();

router.post('/result/productTrendByMonth',funcs.productTrendsByMonth);//query 1 by month
router.post('/result/productTrendByDay',funcs.productTrendsByDay);//query 1 by day
router.post('/result/aisleTrend',funcs.aisleTrends);// query1 plus , aisle sold in specific department 
router.post('/result/orderTrendByMonth',funcs.orderTrendsByMonth);//query2 by month The trend of orders in a selected aisle over a selected time period
router.post('/result/orderTrendByDay',funcs.orderTrendsByDay);//query2 by dayThe trend of orders in a selected aisle over a selected time period
router.post('/result/reorderTrendByMonth',funcs.reorderTrendsByMonth);//query3 by month The trend of reorders in a selected aisle over a selected time period
router.post('/result/reorderTrendByDay',funcs.reorderTrendsByDay);//query3 by dayThe trend of reorders in a selected aisle over a selected time period
router.post('/result/userTrendByMonth',funcs.userTrendsByMonth);//query4 by month The trend of the orders made by a selected user over a selected time period
router.post('/result/userTrendByMonth',funcs.userTrendsByDay);//query4 by day The trend of the orders made by a selected user over a selected time period
router.post('/result/topfiveinaisle',funcs.topFiveInAisle);//query5 best seller aisle version
router.post('/result/topfiveindepartment',funcs.topFiveInDepartment);//query5 best seller department version
router.post('/result/selectmostloyalcustomer',funcs.selectMostLoyalCustomer);// query6 Most loyal customer
router.post('/result/selectreordermostcustomer',funcs.selectReorderMostCustomer);// query7 reoder user
router.post('/result/selectmostdiversecustomer',funcs.selectMostDiverseCustomer);//query 8 most diverse
router.post('/result/ordercountinaisle',funcs.orderCountInAisle);//query 9 order count





module.exports=router;