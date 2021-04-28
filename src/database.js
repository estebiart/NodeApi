const mysql = require ('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '1022409185',
    database:'hoteles'
});
mysqlConnection.connect( function (err){
    if(err){
        console.log(err);
        return;
    } else {
       console.log('Conected')
    }
})