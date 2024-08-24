const mysql = require('mysql');

var Student = mysql.createConnection({
    host:'sql12.freemysqlhosting.net',
    port:'3306',
    user:'sql12727656',
    password:"ZmmQNthEXW",
    database:"sql12727656"
})

module.exports = Student
