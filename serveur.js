/* Module de connection de wolfgangmm*/
/*lien git https://github.com/wolfgangmm/existdb-node */

var Connection = require("existdb-node/index.js");

/*option de connection à la base de donnée */
/*
host : hebergeur
port : port de connection de existDB
rest : chemin jusqu'au dossier rest sur existDB
auth : admin:mdp
*/

var options = {
    host: "localhost",
    port: 8080,
    rest: "/exist/rest",
    auth: "admin:admin"
};
/*connection à la BD */
connection = new Connection(options);


var fs = require("fs");

var express = require('express'),
    app = module.exports.app = express();

var http = require('http');
var io = require('socket.io');


// resultat par region
var resultatRequeteToutesLesRegions;


//Requêtes
resultatRequeteToutesLesRegions = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/REG return $x/REG)';



//Execution des requetes Regions
var executeRequeteToutesLesRegions = connection.query(resultatRequeteToutesLesRegions).results(function (err, query_result) {
    resultatRequeteToutesLesRegions = query_result["result"];
}); 



/*******************************SERVEUR*******************************/


// Fonction qui permet de charger la page d'accueil
function loadfile(src){
    return fs.readFileSync(__dirname+"/"+src,'utf-8')
};

app.use(express.static(__dirname));
// Affiche l'index
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var server = http.createServer(app);
server.listen(4040);

var listener = io.listen(server);
console.log("serveur connecté, port 4040");

function start(socket){
    socket.on('called', function(){
        console.log("Request received.");
        // Permet d'envoyer le résultat de la requête
        listener.sockets.emit('resultatRequeteToutesLesRegions', resultatRequeteToutesLesRegions);
    });
}