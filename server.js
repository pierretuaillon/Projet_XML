var http = require('http');

/*************
Base de donnée
*************/



var server = http.createServer(function(req, res) {

	if (req.method === 'POST') {

	} else {
		res.end("Requete autre que Post");  
	}
	

});

server.listen(1337);
console.log("Serveur web lancé sur localhost:1337 ...");