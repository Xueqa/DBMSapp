oraclePool=require('./oraclePool');
sqlCombine=require('./sqlCombine');
async function topThreeInAisle(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        aisle_name: ctx.request.body["aisle_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.selectBestThreeInOneAisle(Obj.aisle_name,Obj.start_date,Obj.end_date)
    
    var rsp={
        result :[]
    }
    
    try {
        
        rsp.result =await oraclePool.initSql(sql);
        
        
    } 
    catch(error) {
        console.log(error);
        
    }
    ctx.body = JSON.stringify(rsp.result)
    //ctx.body=rsp.result;
}

async function topThreeInDepartment(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        department_name: ctx.request.body["department_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // department_name: 'frozen',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.selectBestThreeInOneDepartment(Obj.department_name,Obj.start_date,Obj.end_date)
    
    var rsp={
        result :[]
    }
    
    try {
        
        rsp.result =await oraclePool.initSql(sql);
        
        
    } 
    catch(error) {
        console.log(error);
        
    }
    ctx.body = JSON.stringify(rsp.result)
    //ctx.body=rsp.result;
}

async function orderCountInAisle(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        aisle_name: ctx.request.body["aisle_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.orderNumberForAisle(Obj.aisle_name,Obj.start_date,Obj.end_date)
    
    var rsp={
        result:[]
    }
    
    try {
        
        rsp.result =await oraclePool.initSql(sql);
        
        
    } 
    catch(error) {
        console.log(error);
        
    }
    ctx.body = JSON.stringify(rsp.result[0])
    //ctx.body=rsp.result;
}
module.exports={
    topThreeInAisle,topThreeInDepartment,orderCountInAisle
}