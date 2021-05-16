var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/auth', (req, res)=>{
    console.log(`request: ${toString(req)} response ${toString(res)}`);
    
})