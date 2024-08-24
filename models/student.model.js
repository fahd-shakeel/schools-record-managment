const mysql = require('mysql');

var Student = mysql.createConnection({
    host:"https://schools-record-managment.onrender.com",
    user:"root",
    password:"root",
    database: 'school'

})

module.exports = Student