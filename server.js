var http = require('http');

/*************
Base de donnée
*************/

var existdb = require("./node_modules/easy-exist/index");


//Création session
var exist = require('easy-exist');

// connect
var db = new exist.DB('http://localhost', {
    username: "admin",
    password: "admin"
});

body = '<message><body>Hello World</body></message>'



var server = http.createServer(function(req, res) {


});

server.listen(1337);
console.log("Serveur web lancé sur localhost:1337 ...");
