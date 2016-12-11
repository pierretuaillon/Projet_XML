/*
tuto
http://www.developper-jeux-video.com/node-js-socket-io-exemple/
*/


var io = require("./node_modules/socket.io");
var sockets = io.listen(4040);
sockets.on('connection', function (socket) {
  socket.on('monTypeDeMessage', function (data) {
    // faire ce qu'il y a à faire
    console.log("message :" + data.champ1 + " / " + data.champ2);
  });
});