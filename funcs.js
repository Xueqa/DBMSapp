oraclePool=require('./oraclePool');
sqlCombine=require('./sqlCombine');
async function topFiveInAisle(aisle_name, start_date,end_date) {
    var Obj = {
        aisle_name,
        start_date,
        end_date
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.selectBestFiveInOneAisle(Obj.aisle_name,Obj.start_date,Obj.end_date)

    var rsp={
        result :[]
    }

    try {

        rsp.result =await oraclePool.initSql(sql);


    }
    catch(error) {
        console.log(error);

    }
    return rsp.result;
    //ctx.body = JSON.stringify(rsp.result)
    //ctx.body=rsp.result;
}

async function topFiveInDepartment(ctx, next) {

    var Obj = {
        department_name: ctx.request.body["department_name"],
        start_date: ctx.request.body['start_date'],
        end_date: ctx.request.body['end_date']
        // department_name: 'frozen',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.selectBestFiveInOneDepartment(Obj.department_name,Obj.start_date,Obj.end_date)

    var rsp={
        result :[]
    }

    try {

        rsp.result =await oraclePool.initSql(sql);


    }
    catch(error) {
        console.log(error);

    }
    return rsp.result;
    //ctx.body=rsp.result;
}

async function orderCountInAisle(ctx, next) {

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
    return rsp.result;
    //ctx.body=rsp.result;
}

async function selectMostLoyalCustomer(start_date,end_date) {

    var Obj = {
        start_date,
        end_date
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
    return rsp.result;
    //ctx.body=rsp.result;
}

async function selectMostDiverseCustomer( start_date,end_date) {

    var Obj = {
        start_date,
        end_date
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
    return rsp.result;
    //ctx.body=rsp.result;
}

async function selectReorderMostCustomer(aisle_name, start_date,end_date) {

    var Obj = {
        aisle_name,
        start_date,
        end_date
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
    return rsp.result;
    //ctx.body=rsp.result;
}

function toStr(result){for(i=0;i<result.length;i++){
    switch (result[i][1]) {
        case 1:
            result[i][1]="Jan";
            break;

        case 2:
            result[i][1]="Feb";
            break;
        case 3:
            result[i][1]="Mar";
            break;
        case 4:
            result[i][1]="Apr";
            break;
        case 5:
            result[i][1]="May";
            break;

        case 6:
            result[i][1]="Jun";
            break;
        case 7:
            result[i][1]="Jul";
            break;
        case 8:
            result[i][1]="Aug";
            break;
        case 9:
            result[i][1]="Sep";
            break;
        case 10:
            result[i][1]="Oct";
            break;

        case 11:
            result[i][1]="Nov";
            break;

        case 12:
            result[i][1]="Dec";
            break;

        default:
            newValue = value;
            break;
    };

}
}
async function productTrendsByMonth(aisle_name, start_date,end_date) {
    var Obj = {
        aisle_name,
        start_date,
        end_date
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
    toStr(result)
    return result;

    //ctx.body = JSON.stringify(rsp.result)
    //ctx.body = JSON.stringify(result)

}

async function productTrendsByDay(aisle_name, start_date,end_date) {
    var Obj = {
        aisle_name,
        start_date,
        end_date
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.productTrendSql1(Obj.aisle_name,Obj.start_date,Obj.end_date)

    var rsp={
        result :[]
    }

    try {

        rsp.result =await oraclePool.initSql(sql);


    }
    catch(error) {
        console.log(error);

    }
    var result=rsp.result;
    toStr(result);
    return result;
    //console.log(result.length);
    //ctx.body = JSON.stringify(rsp.result)
    //ctx.body = JSON.stringify(result)

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
    var result=rsp.result


    //console.log(result.length);
    toStr(result)
    return result;
}

async function orderTrendsByMonth( start_date,end_date) {
    var Obj = {

        start_date,
        end_date
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.orderTrendSql(Obj.start_date,Obj.end_date)

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
    toStr(result)
    return result;
}

async function orderTrendsByDay( start_date,end_date) {
    var Obj = {
        start_date,
        end_date
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.orderTrendSql1(Obj.start_date,Obj.end_date)

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
    toStr(result)
    return result;
}
async function reorderTrendsByMonth(aisle_name, start_date,end_date) {
    var Obj = {
        aisle_name,
        start_date,
        end_date
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.reorderTrendSql(Obj.aisle_name,Obj.start_date,Obj.end_date)

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
    toStr(result)
    return result;
}

async function reorderTrendsByDay(aisle_name, start_date,end_date) {
    var Obj = {
        aisle_name,
        start_date,
        end_date
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.reorderTrendSql1(Obj.aisle_name,Obj.start_date,Obj.end_date)

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
    toStr(result)
    return result;
}

async function userTrendsByMonth(user_id, start_date,end_date) {
    var Obj = {
        user_id,
        start_date,
        end_date
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.userTrendSql(Obj.user_id,Obj.start_date,Obj.end_date)

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
    toStr(result)
    return result;

}

async function userTrendsByDay(user_id, start_date,end_date) {
    var Obj = {
        user_id,
        start_date,
        end_date
        // aisle_name: 'prepared soups salads',
        // start_date: '2017-01-07 00:00:00',
        // end_date:'2017-09-07 00:00:00'

    }

    var sql=sqlCombine.userTrendSql1(Obj.user_id,Obj.start_date,Obj.end_date)

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
    toStr(result)
    return result;

}
module.exports={
    topFiveInAisle,topFiveInDepartment,orderCountInAisle,selectMostLoyalCustomer,selectMostDiverseCustomer,
    selectReorderMostCustomer,aisleTrends,productTrendsByMonth,orderTrendsByMonth,reorderTrendsByMonth,userTrendsByMonth,productTrendsByDay,orderTrendsByDay,
    reorderTrendsByDay,userTrendsByDay
}