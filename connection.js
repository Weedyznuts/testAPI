var mysql=require('mysql');

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'testapi'
});

conn.connect ((err)=>{
    if(err) throw err;
    console.log('database connection successful');
});

module.exports=conn;