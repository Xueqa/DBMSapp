var sql=require('./sql');



function topKSql(tables,attribute,id,k){
    var selectSql=sql.select(attribute);
    var fromSql=sql.from(tables);
    var whereSql=sql.topK(id,k);
    const sqlquery=selectSql+fromSql+whereSql;
    module.exports.sqlquery = sqlquery; 
    return sqlquery;
}
function selectAll(tables,attribute){
    var selectSql=sql.select(attribute);
    var fromSql=sql.from(tables);
    const sqlquery=selectSql+fromSql;
    module.exports.sqlquery = sqlquery; 
    return sqlquery;
}

function selectBestThreeInOneAisle(aisle_name,start_date,end_date){
    var selectSql=sql.select('Zeyuan.products.product_name,Zeyuan.products.product_id,Zeyuan.aisles.aisle_name,Zeyuan.departments.department_id');
    var fromSql=sql.from('ZEYUAN.products,ZEYUAN.put_on,ZEYUAN.aisles,Zeyuan.departments,zeyuan.belong_to');
    var whereSql=" where Zeyuan.aisles.aisle_name='"+aisle_name;
    var whereSql1="' and Zeyuan.products.product_id=Zeyuan.put_on.product_id ";
    whereSql1+='and Zeyuan.aisles.aisle_id=Zeyuan.put_on.aisle_id '
    whereSql1+='and Zeyuan.products.product_id=Zeyuan.belong_to.product_id ';
    whereSql1+='and Zeyuan.departments.department_id=Zeyuan.belong_to.department_id ';
    whereSql1+='and Zeyuan.products.product_id in ';
    whereSql1+='(select Zeyuan.contain.product_id from Zeyuan.contain,Zeyuan.orders '
    whereSql1+='where zeyuan.contain.order_id=zeyuan.orders.order_id '
    whereSql1+="and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss') ";
    whereSql1+="and zeyuan.orders.order_date>= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')) ";
    whereSql1+='and rownum<=3 group by Zeyuan.products.product_name,Zeyuan.products.product_id,Zeyuan.aisles.aisle_name,Zeyuan.departments.department_id  order by count(*) desc';
    const sqlquery=selectSql+fromSql+whereSql+whereSql1;
    console.log(sqlquery);
    return sqlquery;
}

function selectBestThreeInOneDepartment(department_name,start_date,end_date){
    var selectSql=sql.select('Zeyuan.products.product_name,Zeyuan.products.product_id,Zeyuan.aisles.aisle_name,Zeyuan.departments.department_id');
    var fromSql=sql.from('ZEYUAN.products,ZEYUAN.belong_to,ZEYUAN.departments,ZEYUAN.put_on,ZEYUAN.aisles');
    var whereSql=" where Zeyuan.departments.department_name='"+department_name;
    var whereSql1="' and Zeyuan.products.product_id=Zeyuan.belong_to.product_id ";
    whereSql1+='and Zeyuan.departments.department_id=Zeyuan.belong_to.department_id '
    whereSql1+='and Zeyuan.aisles.aisle_id=Zeyuan.put_on.aisle_id '
    whereSql1+='and Zeyuan.put_on.product_id=Zeyuan.products.product_id '
    whereSql1+='and Zeyuan.products.product_id in ';
    whereSql1+='(select Zeyuan.contain.product_id from Zeyuan.contain,Zeyuan.orders '
    whereSql1+='where zeyuan.contain.order_id=zeyuan.orders.order_id '
    whereSql1+="and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss') ";
    whereSql1+="and zeyuan.orders.order_date>= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')) ";
    whereSql1+='and rownum<=3 group by Zeyuan.products.product_name,Zeyuan.products.product_id,Zeyuan.aisles.aisle_name,Zeyuan.departments.department_id  order by count(*) desc';
    const sqlquery=selectSql+fromSql+whereSql+whereSql1;
    console.log(sqlquery);
    return sqlquery;
}

function selectMostOrderUser(start_date,end_date){
    var selectSql=sql.select('Zeyuan.make.user_id');
    var fromSql=sql.from('Zeyuan.make,Zeyuan.orders');
    whereSql=' where Zeyuan.make.order_id=Zeyuan.orders.order_id';
    whereSql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    whereSql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    whereSql+=' group by Zeyuan.make.user_id';
    whereSql+=' having count(*) = (select max(count(*)) from Zeyuan.make,Zeyuan.orders';
    whereSql+=' where Zeyuan.make.order_id=Zeyuan.orders.order_id ';
    whereSql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    whereSql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    whereSql+=' group by Zeyuan.make.user_id)'
    const sqlquery=selectSql+fromSql+whereSql;
    return sqlquery;
}
function orderNumberForAisle(aisle_name,start_date,end_date){
    var selectSql=sql.select('count(*)');
    var fromSql=sql.from('Zeyuan.products,zeyuan.orders,zeyuan.contain');
    var whereSql=' where zeyuan.products.product_id=zeyuan.contain.product_id';
    whereSql+=' and zeyuan.orders.order_id=zeyuan.contain.order_id';
    whereSql+=' and zeyuan.products.product_id in';
    whereSql+=' (select Zeyuan.products.product_id from zeyuan.products,zeyuan.put_on,zeyuan.aisles';
    whereSql+=' where zeyuan.aisles.aisle_id=zeyuan.put_on.aisle_id';
    whereSql+=' and zeyuan.products.product_id=zeyuan.put_on.product_id';
    whereSql+=" and zeyuan.aisles.aisle_name='"+aisle_name+"')";
    whereSql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    whereSql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    var sqlquery=selectSql+fromSql+whereSql;
    console.log(sqlquery);
    return sqlquery;
}
function orderNumberOfMonth(){
    sql="select count(*) as totalNumber , to_number(to_char(o.order_date, 'ww')) AS week, p.product_name ";
    sql+="from Zeyuan.orders o, Zeyuan.contain c, Zeyuan.products p ";
    sql+="where o.order_id = c.order_id and c.product_id = p.product_id ";
    sql+="group by to_number(to_char(o.order_date, 'ww')), p.product_name ";
    sql+="order by week, totalNumber desc ";
    return sql
}
//function selectForAisle(table)
module.exports={
    topKSql,selectAll,selectBestThreeInOneAisle,orderNumberOfMonth,selectBestThreeInOneDepartment,orderNumberForAisle,
    selectMostOrderUser
};
