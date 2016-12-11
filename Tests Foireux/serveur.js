var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

io.on('connection', function (socket) {
	io.on('monTypeDeMessage', function (data) {
    	// faire ce qu'il y a à faire
    	console.log("message :" + data.champ1 + " / " + data.champ2);
	});
});

app.listen(4040);