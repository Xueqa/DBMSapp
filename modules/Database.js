/*
数据库对象封装 mysql
*/
const mysql = require('koa-mysql');
const pool = mysql.createPool({
    host     :  'localhost',
    user     :  'root',
    password :  '091132xqa',
    database :  'DBMStest'
});


//
// let query = function( sql, values ) {
//     return new Promise(( resolve, reject ) => {
//         pool.getConnection(function(err, connection) {
//             if (err) {
//                 reject( err )
//             } else {
//                 connection.query(sql, values, ( err, rows) => {
//
//                     if ( err ) {
//                         reject( err )
//                     } else {
//                         resolve( rows )
//                     }
//                     connection.release()
//                 })
//             }
//         })
//     })
// }
//
// module.exports = { query }

class DB {
    static getInstance(){
        if(!DB.instance){
            DB.instance=new DB();
        }
        return DB.instance;
    }
    constructor(){
        this.dbClient=null;
        //this.connect();
    }
    connect(){
        return new Promise( (resolve,reject)=> {
            if(!this.dbClient) {
                pool.getConnection( (err, connection)=> {
                    if (err) {
                        reject(err);
                    }
                    else {
                        this.dbClient= connection;
                        resolve(this.dbClient);
                    }
                })
            }
            else {
                resolve(this.dbClient);
            }
        })

    }
    find(sql, values){
        return new Promise((resolve,reject)=> {
            this.connect().then( (connection)=> {
            connection.query(sql,values,( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    // connection.release()
                })

        })

        })
    }


}

// mydb=DB.getInstance();
// mydb.find('SELECT * FROM table1').then(function (data) {
//     console.log(data);
// })

module.exports=DB.getInstance();