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

function selectBestFiveInOneAisle(aisle_name,start_date,end_date){
    var selectSql='SELECT Zeyuan.products.product_id,Zeyuan.products.product_name,Zeyuan.aisles.aisle_name,Zeyuan.departments.department_name';
    var fromSql=' FROM ZEYUAN.products,ZEYUAN.put_on,ZEYUAN.aisles,Zeyuan.departments,zeyuan.belong_to';
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
    whereSql1+='and rownum<=5 group by Zeyuan.products.product_id,Zeyuan.products.product_name,Zeyuan.aisles.aisle_name,Zeyuan.departments.department_name  order by count(*) desc';
    const sqlquery=selectSql+fromSql+whereSql+whereSql1;
    console.log(sqlquery);
    return sqlquery;
}

function selectBestFiveInOneDepartment(department_name,start_date,end_date){
    var selectSql='SELECT Zeyuan.products.product_name,Zeyuan.products.product_id,Zeyuan.aisles.aisle_name,Zeyuan.departments.department_id';
    var fromSql=' FROM ZEYUAN.products,ZEYUAN.belong_to,ZEYUAN.departments,ZEYUAN.put_on,ZEYUAN.aisles';
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
    whereSql1+='and rownum<=5 group by Zeyuan.products.product_name,Zeyuan.products.product_id,Zeyuan.aisles.aisle_name,Zeyuan.departments.department_id  order by count(*) desc';
    const sqlquery=selectSql+fromSql+whereSql+whereSql1;
    console.log(sqlquery);
    return sqlquery;
}

function selectMostOrderUser(start_date,end_date){
    sqlquery='select * from ('
    var selectSql='SELECT distinct Zeyuan.make.user_id,count(*)';
    var fromSql=' FROM Zeyuan.make,Zeyuan.orders';
    whereSql=' where Zeyuan.make.order_id=Zeyuan.orders.order_id';
    whereSql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    whereSql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    whereSql+=' and user_id in (select distinct user_id from Zeyuan.make,Zeyuan.orders';
    whereSql+=' where Zeyuan.make.order_id=Zeyuan.orders.order_id ';
    whereSql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    whereSql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss'))";
    whereSql+=' group by Zeyuan.make.user_id order by count(*) desc) where rownum<=5'
    sqlquery+=selectSql+fromSql+whereSql;
    console.log(sqlquery);
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

function selectOrderEveryDepartUser(start_date,end_date){
    sqlquery='SELECT * ';
    sqlquery+='FROM (SELECT USER_ID, COUNT(DISTINCT DEPARTMENT_ID) as Totalnumber ';
    sqlquery+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."CONTAIN"  NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."PUT_ON" NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."PRODUCTS"  NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."AISLES" NATURAL JOIN "ZEYUAN"."MAKE" ';
    sqlquery+=" where zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sqlquery+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sqlquery+=' group by Zeyuan.make.user_id';
    sqlquery+=' order by Totalnumber desc) '
    sqlquery+=' where Totalnumber>=18'
    console.log(sqlquery);
    return sqlquery;
}

function selectReorderMostUser(aisle_name,start_date,end_date){
    sqlquery='SELECT * ';
    sqlquery+='FROM (SELECT USER_ID, COUNT(*)) as Totalnumber ';
    sqlquery+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."CONTAIN"  NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."PUT_ON" NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."PRODUCTS"  NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN ';
    sqlquery+='"ZEYUAN"."AISLES" NATURAL JOIN "ZEYUAN"."MAKE" ';
    sqlquery+="WHERE AISLE_NAME = '"+aisle_name+"'"
    sqlquery+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sqlquery+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sqlquery+=' and reordered =1';
    sqlquery+=' group by user_id ';
    sqlquery+=' order by Totalnumber DESC) ';
    sqlquery+=' WHERE rownum <= 5';
    console.log(sqlquery);
    return sqlquery;
}

function aisleTrendSql(department_name,start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber, Aisle_NAME, Month(ORDER_DATE), DAY(ORDER_DATE) ';
    sql+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN "ZEYUAN"."CONTAIN"  NATURAL JOIN '
    sql+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN "ZEYUAN"."PUT_ON" NATURAL JOIN "ZEYUAN"."PRODUCTS"  NATURAL JOIN '
    sql+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN "ZEYUAN"."AISLES" ';
    sql+="where department_name='"+department_name+"'";
    sql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' GROUP BY ORDER_DATE, aisle_NAME ORDER BY ORDER_DATE, aisle_NAME';
    console.log(sql);
    return sql;

}

function productTrendSql(aisle_name,start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber,EXTRACT(MONTH FROM ORDER_DATE) as createMonth ';
    sql+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN "ZEYUAN"."CONTAIN"  NATURAL JOIN '
    sql+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN "ZEYUAN"."PUT_ON" NATURAL JOIN "ZEYUAN"."PRODUCTS"  NATURAL JOIN '
    sql+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN "ZEYUAN"."AISLES" ';
    sql+="where aisle_name='"+aisle_name+"'";
    sql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE), Aisle_NAME ORDER BY EXTRACT(MONTH FROM ORDER_DATE), AISLE_NAME';
    console.log(sql);
    return sql;

}

function productTrendSql1(aisle_name,start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber,EXTRACT(MONTH FROM ORDER_DATE) as createMonth,EXTRACT(Day FROM ORDER_DATE) as createDay ';
    sql+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN "ZEYUAN"."CONTAIN"  NATURAL JOIN '
    sql+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN "ZEYUAN"."PUT_ON" NATURAL JOIN "ZEYUAN"."PRODUCTS"  NATURAL JOIN '
    sql+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN "ZEYUAN"."AISLES" ';
    sql+="where aisle_name='"+aisle_name+"'";
    sql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE), EXTRACT(Day FROM ORDER_DATE) ORDER BY EXTRACT(MONTH FROM ORDER_DATE),EXTRACT(day FROM ORDER_DATE)';
    console.log(sql);
    return sql;

}

function orderTrendSql(start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber, EXTRACT(MONTH FROM ORDER_DATE) as createMonth ';
    sql+='FROM "ZEYUAN"."ORDERS" '
    sql+=" WHERE zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE) ORDER BY EXTRACT(MONTH FROM ORDER_DATE)';
    console.log(sql);
    return sql;

}

function orderTrendSql1(start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber, EXTRACT(MONTH FROM ORDER_DATE) as createMonth,EXTRACT(Day FROM ORDER_DATE) as createDay ';
    sql+='FROM "ZEYUAN"."ORDERS" '
    sql+=" WHERE zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE), EXTRACT(Day FROM ORDER_DATE) ORDER BY  EXTRACT(MONTH FROM ORDER_DATE), EXTRACT(Day FROM ORDER_DATE)';
    console.log(sql);
    return sql;

}

function reorderTrendSql(aisle_name,start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber, EXTRACT(MONTH FROM ORDER_DATE) as createMonth ';
    sql+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN "ZEYUAN"."CONTAIN"  NATURAL JOIN '
    sql+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN "ZEYUAN"."PUT_ON" NATURAL JOIN "ZEYUAN"."PRODUCTS"  NATURAL JOIN '
    sql+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN "ZEYUAN"."AISLES" ';
    sql+="where aisle_name='"+aisle_name+"'";
    sql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' and reordered=1'
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE)  ORDER BY EXTRACT(MONTH FROM ORDER_DATE)';
    console.log(sql);
    return sql;

}

function reorderTrendSql1(aisle_name,start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber, EXTRACT(MONTH FROM ORDER_DATE) as createMonth,EXTRACT(Day FROM ORDER_DATE) as createDay ';
    sql+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN "ZEYUAN"."CONTAIN"  NATURAL JOIN '
    sql+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN "ZEYUAN"."PUT_ON" NATURAL JOIN "ZEYUAN"."PRODUCTS"  NATURAL JOIN '
    sql+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN "ZEYUAN"."AISLES" ';
    sql+=" where aisle_name='"+aisle_name+"'";
    sql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' and reordered=1'
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE),EXTRACT(Day FROM ORDER_DATE) ORDER BY EXTRACT(MONTH FROM ORDER_DATE),EXTRACT(Day FROM ORDER_DATE)';
    console.log(sql);
    return sql;

}

function userTrendSql(user_id,start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber, EXTRACT(MONTH FROM ORDER_DATE) as createMonth ';
    sql+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN "ZEYUAN"."CONTAIN"  NATURAL JOIN '
    sql+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN "ZEYUAN"."PUT_ON" NATURAL JOIN "ZEYUAN"."PRODUCTS"  NATURAL JOIN '
    sql+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN "ZEYUAN"."AISLES" NATURAL JOIN "ZEYUAN"."MAKE"';
    sql+=" where user_id='"+user_id+"'";
    sql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE) ORDER BY EXTRACT(MONTH FROM ORDER_DATE)';
    console.log(sql);
    return sql;

}

function userTrendSql1(user_id,start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber, EXTRACT(MONTH FROM ORDER_DATE) as createMonth, EXTRACT(Day FROM ORDER_DATE) as createDay ';
    sql+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN "ZEYUAN"."CONTAIN"  NATURAL JOIN '
    sql+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN "ZEYUAN"."PUT_ON" NATURAL JOIN "ZEYUAN"."PRODUCTS"  NATURAL JOIN '
    sql+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN "ZEYUAN"."AISLES" NATURAL JOIN "ZEYUAN"."MAKE"';
    sql+="where user_id='"+user_id+"'";
    sql+=" and zeyuan.orders.order_date>= to_date('"+start_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=" and zeyuan.orders.order_date<= to_date('"+end_date+"','yyyy-mm-dd hh24:mi:ss')";
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE), EXTRACT(Day FROM ORDER_DATE) ORDER BY EXTRACT(MONTH FROM ORDER_DATE), EXTRACT(Day FROM ORDER_DATE)';
    console.log(sql);
    return sql;
}

function recommendProductSql(aisle_name){
    sql='select product_name,(cast( Probability as decimal(10,3))) as Probability ';
    sql+=' from(select count(*)/(max(count(*)) over()) as Probability, product_name ';
    sql+=' from (select  p.product_name, c.add_to_cart_order, o.order_id ';
    sql+=' from Zeyuan.orders o, Zeyuan.contain c, Zeyuan.make m, Zeyuan.users u, Zeyuan.products p ';
    sql+=' where o.order_id = c.order_id and ';
    sql+='c.product_id = p.product_id and ';
    sql+='m.order_id = o.order_id and ';
    sql+='m.user_id = u.user_id and ';
    sql+='u.user_id in ';
    sql+='(select user_id ';
    sql+='from (select * ';
    sql+='from(select u.user_id, count(*) as TotalOrders ';
    sql+='from Zeyuan.orders o, Zeyuan.users u, Zeyuan.make m ';
    sql+='where o.order_id = m.order_id and m.user_id = u.user_id ';
    sql+='group by u.user_id ';
    sql+='order by TotalOrders desc) ';
    sql+='where TotalOrders >=50)) and  ';
    sql+='o.order_id in (select o.order_id ';
    sql+='from Zeyuan.orders o, Zeyuan.contain c, Zeyuan.products p ';
    sql+='where o.order_id = c.order_id and ';
    sql+='p.product_id = c.product_id and ';
    sql+='p.product_name = (select product_name ';
    sql+='from (select * ';
    sql+=' from(select  p.product_name,  count(*) as TotalFirstNum ';
    sql+='from Zeyuan.orders o, Zeyuan.contain c, Zeyuan.products p, Zeyuan.put_on po,Zeyuan.aisles a ';
    sql+='where o.order_id = c.order_id and ';
    sql+='p.product_id = c.product_id and ';
    sql+='c.add_to_cart_order = 1 and ';
    sql+='a.aisle_id=po.aisle_id and ';
    sql+='po.product_id=p.product_id and ';
    sql+="a.aisle_name='"+aisle_name+"' ";
    sql+='group by p.product_name ';
    sql+='order by count(*) desc) ';
    sql+='where rownum <= 10) ';
    sql+='where  rownum <= 1))) ';
    sql+='group by product_name ';
    sql+='order by Probability desc) ';
    sql+='where rownum <= 11'
    console.log(sql);
    return sql;

}

function onlyIncreasingProduct(aisle_name,start_date,end_date){
    sql='select distinct p.product_id, p.product_name, a.aisle_name, d.department_name ';
    sql+='from Zeyuan.products p, Zeyuan.aisles a, Zeyuan.put_on po, Zeyuan.belong_to b,Zeyuan.departments d '
    sql+='where po.aisle_id=a.aisle_id and ';
    sql+='b.department_id= d.department_id and ';
    sql+='b.product_id= p.product_id and ';
    sql+='po.product_id=p.product_id and ';
    sql+='product_name in '
    sql+='((select distinct product_name from (select (TotalNumber- LAG1)as ind, product_name ';
    sql+='from(select  TotalNumber, product_name,months, to_number(TO_CHAR(LAG(TotalNumber,1) OVER (ORDER BY product_name, months))) AS LAG1 ';
    sql+='from(select count(*) as TotalNumber, p.product_name, EXTRACT(MONTH FROM order_date) AS months ';
    sql+='from Zeyuan.orders o, Zeyuan.contain c, Zeyuan.products p, Zeyuan.put_on  po, Zeyuan.aisles a ';
    sql+='where  o.order_id = c.order_id and  ';
    sql+='p.product_id = c.product_id and ';
    sql+='po.aisle_id = a.aisle_id and ';
    sql+="a.aisle_name = '"+aisle_name+"' and ";
    sql+='po.product_id = p.product_id and ' ;
    sql+='p.product_name in (select product_name ';
    sql+='from(select product_name, count(*) ';
    sql+='from (select count(*) as TotalNumber,  p.product_name, EXTRACT(MONTH FROM order_date) AS months ';
    sql+='from Zeyuan.orders o, Zeyuan.contain c, Zeyuan.products p, Zeyuan.put_on  po, Zeyuan.aisles a ';
    sql+='where  o.order_id = c.order_id and  ';
    sql+=' p.product_id = c.product_id and ';
    sql+='po.aisle_id = a.aisle_id and  ';
    sql+="a.aisle_name = '"+aisle_name+"' and ";
    sql+=' EXTRACT(MONTH FROM order_date) <> 1 and EXTRACT(MONTH FROM order_date) between '+start_date+' and '+end_date;
    sql+=' and po.product_id = p.product_id ';
    sql+='group by p.product_name, EXTRACT(MONTH FROM order_date) ';
    sql+='order by p.product_name, months) ';
    sql+='group by product_name ';
    sql+='having count(*) = '+end_date+'-'+start_date+'+1)) ';
    sql+='group by p.product_name, EXTRACT(MONTH FROM order_date) ';
    sql+='order by p.product_name, months)) ';
    sql+='where months <> 1 and months between '+start_date+' and '+end_date+')) minus (select distinct  product_name ';
    sql+=' from (select (TotalNumber- LAG1)as ind, product_name ';
    sql+='from(select  TotalNumber, product_name,months, to_number(TO_CHAR(LAG(TotalNumber,1) OVER (ORDER BY product_name, months))) AS LAG1 ';
    sql+='from(select count(*) as TotalNumber, p.product_name, EXTRACT(MONTH FROM order_date) AS months ';
    sql+='from Zeyuan.orders o, Zeyuan.contain c, Zeyuan.products p, Zeyuan.put_on  po, Zeyuan.aisles a ';
    sql+='where  o.order_id = c.order_id and ';
    sql+='p.product_id = c.product_id and  ';
    sql+='po.aisle_id = a.aisle_id and  ';
    sql+="a.aisle_name = '"+aisle_name+"' and ";
    sql+=' po.product_id = p.product_id and ';
    sql+='p.product_name in (select product_name ';
    sql+='from(select product_name, count(*) ';
    sql+='from (select count(*) as TotalNumber,  p.product_name, EXTRACT(MONTH FROM order_date) AS months ';
    sql+='from Zeyuan.orders o, Zeyuan.contain c, Zeyuan.products p, Zeyuan.put_on  po, Zeyuan.aisles a ';
    sql+='where  o.order_id = c.order_id and ';
    sql+='p.product_id = c.product_id and ';
    sql+='po.aisle_id = a.aisle_id and ';
    sql+="a.aisle_name = '"+aisle_name+"' and ";
    sql+=' EXTRACT(MONTH FROM order_date) <> 1 and EXTRACT(MONTH FROM order_date) between '+start_date+' and '+end_date;
    sql+=' and po.product_id = p.product_id ';
    sql+='group by p.product_name, EXTRACT(MONTH FROM order_date) ';
    sql+='order by p.product_name, months) ';
    sql+='group by product_name ';
    sql+='having count(*) = '+end_date+'-'+start_date+'+1)) ';
    sql+='group by p.product_name, EXTRACT(MONTH FROM order_date) ';
    sql+='order by p.product_name, months)) ';
    sql+='where months <> 1 and months between '+start_date+' and '+end_date+') ';
    sql+='where ind < 0))';
    console.log(sql);
    return sql;
}

function increasingCountSql1(product_id,start_date,end_date){
    sql='SELECT COUNT(*) as Totalnumber, EXTRACT(MONTH FROM ORDER_DATE) as Month ';
    sql+='FROM "ZEYUAN"."ORDERS" NATURAL JOIN "ZEYUAN"."CONTAIN"  NATURAL JOIN '
    sql+='"ZEYUAN"."BELONG_TO"  NATURAL JOIN "ZEYUAN"."PUT_ON" NATURAL JOIN "ZEYUAN"."PRODUCTS"  NATURAL JOIN '
    sql+='"ZEYUAN"."DEPARTMENTS"  NATURAL JOIN "ZEYUAN"."AISLES" ';
    sql+="where product_id='"+product_id+"'";
    sql+=" and EXTRACT(MONTH FROM order_date) between "+start_date+' and '+end_date;
    sql+=' GROUP BY EXTRACT(MONTH FROM ORDER_DATE) ORDER BY EXTRACT(MONTH FROM ORDER_DATE)';
    console.log(sql);
    return sql;

}
module.exports={
    topKSql,selectAll,selectBestFiveInOneAisle,orderNumberOfMonth,selectBestFiveInOneDepartment,orderNumberForAisle,
    selectMostOrderUser,selectOrderEveryDepartUser,selectReorderMostUser,aisleTrendSql,productTrendSql,
    orderTrendSql,reorderTrendSql,userTrendSql,productTrendSql1,orderTrendSql1,reorderTrendSql1,userTrendSql1,
    recommendProductSql,onlyIncreasingProduct,increasingCountSql1
};