const mysql = require('mysql');

var Student = mysql.createConnection({
    host:'localhost',
    port:"3306",
    user:"root",
    password:"root",
    database: 'school'

})

module.exports = Student
