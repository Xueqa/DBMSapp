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

async function selectMostLoyalCustomer(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00' 
    }
    
    var sql=sqlCombine.selectMostOrderUser(Obj.start_date,Obj.end_date);
    
    var rsp={
        result:[]
    }
    console.log(rsp.result);
    try {
        
        rsp.result =await oraclePool.initSql(sql);
        
        
    } 
    catch(error) {
        console.log(error);
        
    }
    ctx.body = JSON.stringify(rsp.result)
    //ctx.body=rsp.result;
}

async function selectMostDiverseCustomer(ctx, next) {
    
    var Obj = {
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00' 
    }
    
    var sql=sqlCombine.selectOrderEveryDepartUser(Obj.start_date,Obj.end_date);
    
    var rsp={
        result:[]
    }
    console.log(rsp.result);
    try {
        
        rsp.result =await oraclePool.initSql(sql);
        
        
    } 
    catch(error) {
        console.log(error);
        
    }
    ctx.body = JSON.stringify(rsp.result)
    //ctx.body=rsp.result;
}

async function selectReorderMostCustomer(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        aisle_name: ctx.request.body["aisle_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.selectReorderMostUser(Obj.aisle_name,Obj.start_date,Obj.end_date)
    
    var rsp={
        result:[]
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

async function toStr(result){for(i=0;i<result.length;i++){
    console.log(result[i][2]);
    switch (result[i][2]) {
        case 1:
            result[i][2]="Jan";
            break;

        case 2:
            result[i][2]="Feb";
            break;
        case 3:
            result[i][2]="Mar";
            break;
        case 4:
            result[i][2]="Apr";
            break;
        case 5:
            result[i][2]="May";
            break;

        case 6:
            result[i][2]="Jun";
            break;
        case 7:
            result[i][2]="Jul";
            break;
        case 8:
            result[i][2]="Aug";
            break;
        case 9:
            result[i][2]="Sep";
            break;
        case 10:
            result[i][2]="Oct";
            break;

        case 1:
            result[i][2]="Nov";
            break;

        case 12:
            result[i][2]="Dec";
            break;

        default:
            newValue = value;
            break;
    };
   
}
}
async function productTrends(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        aisle_name: ctx.request.body["aisle_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.productTrendSql(Obj.aisle_name,Obj.start_date,Obj.end_date)
    
    var rsp={
        result :[]
    }
    
    try {
        
        rsp.result =await oraclePool.initSql(sql);
        
        
    } 
    catch(error) {
        console.log(error);
        
    }
    var result=rsp.result

    //console.log(result.length);
    await toStr(result)
    
    //ctx.body = JSON.stringify(rsp.result)
    ctx.body = JSON.stringify(result)
    
}

async function aisleTrends(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        department_name: ctx.request.body["department_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.aisleTrendSql(Obj.department_name,Obj.start_date,Obj.end_date)
    
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

async function orderTrends(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        aisle_name: ctx.request.body["aisle_name"],
        department_name: ctx.request.body["department_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.orderTrendSql(Obj.aisle_name,Obj.department_name,Obj.start_date,Obj.end_date)
    
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

async function reorderTrends(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        aisle_name: ctx.request.body["aisle_name"],
        department_name: ctx.request.body["department_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.reorderTrendSql(Obj.aisle_name,Obj.department_name,Obj.start_date,Obj.end_date)
    
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

async function userTrends(ctx, next) {
    console.log(ctx.request.body)
    var Obj = {
        user_id: ctx.request.body["user_id"],
        aisle_name: ctx.request.body["aisle_name"],
        department_name: ctx.request.body["department_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'
        
    }
    
    var sql=sqlCombine.userTrendSql(Obj.user_id,Obj.aisle_name,Obj.department_name,Obj.start_date,Obj.end_date)
    
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

module.exports={
    topThreeInAisle,topThreeInDepartment,orderCountInAisle,selectMostLoyalCustomer,selectMostDiverseCustomer,
    selectReorderMostCustomer,aisleTrends,productTrends,orderTrends,reorderTrends,userTrends
}