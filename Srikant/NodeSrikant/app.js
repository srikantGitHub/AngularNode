/*************************************************************************************************************
 *
 * Developed by : Tinniam V Ganesh                                  Date: 20 July 2014
 * A Node.js server with PostgreSQL DB
 * 
 *************************************************************************************************************/
var pg = require("pg");
var fs = require('fs');
var finalhandler = require('finalhandler');
var http = require('http');
var Router= require('router');
var port = 5433;
var host = '127.0.0.1';
 var conString = "pg://postgres:jhpolice@localhost:5432/test";
   var client = new pg.Client(conString);
   client.connect();
var router = Router();
router.get('/creating', function(req, res) {
   console.log("In insert");
   client.query("DROP TABLE IF EXISTS userregistration");
   client.query("CREATE TABLE IF NOT EXISTS userregistration(title varchar(64), director varchar(64),releaseYear varchar(64), genre varchar(64))");
   client.query("INSERT INTO userregistration(title, director,releaseYear,genre) values($1, $2, $3, $4)",['gadar', 'sriaknt','sdsdsd', 'genere']);
   client.query("INSERT INTO userregistration(title, director,releaseYear,genre) values($1, $2, $3, $4)",['gang', 'rajesh','sdsad', 'genere']);
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.write("2 records is inserted.\n");
   res.end();
   console.log("Inserted 2 records");
   });
   

router.get('/', function(req, res) {
   console.log("In listing records");
  var query = client.query("SELECT * FROM userregistration");
  query.on("row", function (row, result) {
    	 result.addRow(row);
   });
   query.on("end", function (result) {
    	res.writeHead(200, {'Content-Type': 'application/json'});
    	res.write(JSON.stringify(result.rows) + "\n");
    	res.end();
   });
});
router.get('/:id', function(req, res) {
   console.log("SELECT * FROM userregistration WHERE title='"+req.params.id+"'");
  var query = client.query("SELECT * FROM userregistration WHERE title='"+req.params.id+"'");
  query.on("row", function (row, result) {
    	 result.addRow(row);
   });
   query.on("end", function (result) {
    	res.writeHead(200, {'Content-Type': 'application/json'});
    	res.write(JSON.stringify(result.rows[0]) + "\n");
    	res.end();
   });
});
router.post('/', function(req, res) {
   console.log("In insert");
    req.on('data', function (data) {
		var data=JSON.parse(data.toString());
		client.query("INSERT INTO userregistration(title, director,releaseYear,genre) values($1, $2, $3, $4)",[data.title, data.director,data.releaseYear,data.genre]);
		console.log(data); 
		})
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.write("2 records is inserted.\n");
   res.end();
   console.log("Inserted 2 records");
   });
router.put('/',function(req, res) {
    console.log("In update"); 
	 req.on('data', function (data) {
     console.log(data.toString()); 
  });
   //query = client.query("UPDATE userregistration set firstname = 'Kumar' WHERE id=");
     	res.writeHead(200, {'Content-Type': 'application/json'});
     	res.write("Updated record  - Set record with firstname Anand to Kumar\n");
     	res.end();
   });
router.delete('/', function(req, res) {
	console.log('Deleting the Recard............');
	console.log(req.params); 
    //client.query("DELETE FROM  userregistration WHERE title='"+req.params.id+"'");
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write("Deleted record where lastname was Karthik\n");
    res.end();
    
} );
http.createServer(function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
	router(req, res, finalhandler(req, res))	
}).listen(port,host);
console.log("Connected to " + port + "   " + host);