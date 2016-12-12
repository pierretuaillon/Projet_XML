/* Module de connection de wolfgangmm*/
/*lien git https://github.com/wolfgangmm/existdb-node */

var Connection = require("./node_modules/existdb-node/index.js");

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
// resultat par departement
var resultatRequeteTousLesDepartements;
// resultat par commune
var resultatRequeteToutesLesCommunes;

//Requêtes
requeteToutesLesRegions = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/REG return $x/REG)';
requeteTousLesDepartements = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/DPT return $x/DPT)';
requeteToutesLesCommunes = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/COM return $x/COM)';


//Execution des requetes Regions
var executeRequeteToutesLesRegions = connection.query(requeteToutesLesRegions, function (err, query_result) {
    resultatRequeteToutesLesRegions = query_result["result"];
}); 

//Execution des requetes Departement
var executeRequeteTousLesDepartements = connection.query(requeteTousLesDepartements, function (err, query_result) {
    resultatRequeteTousLesDepartements = query_result["result"];
}); 

// Execution des requetes "Commune"
var executeRequeteToutesLesCommunes = connection.query(requeteToutesLesCommunes, function (err, query_result) {
    resultatRequeteToutesLesCommunes = query_result["result"];
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

    //se déclenche au clique sur un  bouton
    socket.on('called', function(){
        console.log("Request received.");
        // Permet d'envoyer le résultat de la requête
        listener.sockets.emit('resultatRequeteToutesLesRegions', resultatRequeteToutesLesRegions);

        listener.sockets.emit('resultatRequeteTousLesDepartements', resultatRequeteTousLesDepartements);

        listener.sockets.emit('resultatRequeteToutesLesCommunes', resultatRequeteToutesLesCommunes);

    });
}