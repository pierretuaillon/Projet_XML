/* Module de connection de wolfgangmm*/
/*lien git https://github.com/wolfgangmm/existdb-node */

var Connection = require("existdb-node/index.js");
var fs = require("fs");

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
var connection = new Connection(options);

var data = [];

/*Recupere tout le document xml */
connection.get("/db/merimee-MH.xml", function(res) {
    // collect input and print it out upon end
    
    res.on("data", function(chunk) {
        data.push(chunk);
    });
    res.on("end", function() {
       // console.log(data.join(""));
    });
    res.on("error", function(err) {
       // console.log("error: " + err);
    });
});

/*Préparation de la requête ici on recupere toute les REF */
/*
var query = connection.query("//csv_data/row/REF");
    query.on("error", function(err) {
        console.log("An error occurred: " + err);
    });
*/
/*Lancement de la requete*/
/*
item correspond à la valeur de la requete ici : <REF> numRef </REF>
hits le numéro de l'élement
offset le nombre d'elements total ici 44665
*/

var Requete = 'for $x in doc("merimee-MH.xml")//csv_data/row where $x/DPT="10" order by $x/TICO return $x/TICO';


var RefData = [];

var query = connection.query(Requete);
    query.on("error", function(err) {
        console.log("An error occurred: " + err);
    });


    query.each(function(item, hits, offset) {
        //console.log("Item %d out of %d:", offset, hits);
        //console.log(item);
        RefData.push(item);
    });


/* Serveur HTTP */

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHeader(200 , {"Content-Type" : "text/html; charset=utf-8"});
  res.write(RefData.length + " ");
  res.end(RefData.join(""));  
});

server.listen(1337);
console.log("Serveur web lancé sur localhost:1337 ...");