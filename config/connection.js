// Need to import the env file for the password
//npm install dotenv --save
var dotenv = require("dotenv").config();

/* ******************************* 
    mySQL Connection Info
******************************** */
var mySQL = require("mysql");

var connection = mySQL.createConnection({
    port: 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  });
  
 // Make connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
  // Export connection for our ORM to use.
  module.exports = connection;
  