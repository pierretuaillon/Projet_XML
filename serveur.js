/////////////////////////////////////// BD ////////////////////////////////////////


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
var connection = new Connection(options);
console.log('connection bdd : ');
console.log(connection);

var fs = require("fs");

var express = require('express'),
    app = module.exports.app = express();

var http = require('http');
var io = require('socket.io');


// resultat par region
var resultatRequeteToutesLesRegions = [];
// resultat par departement
var resultatRequeteTousLesDepartements = [];
// resultat par commune
var resultatRequeteToutesLesCommunes = [];

//Requêtes
var requeteToutesLesRegions = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/REG return $x/REG)';
var requeteTousLesDepartements = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/DPT return $x/DPT)';
var requeteToutesLesCommunes = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/COM return $x/COM)';
/*
//Execution des requetes Regions
var executeRequeteToutesLesRegions = connection.query(requeteToutesLesRegions, function (err, query_result) {
	//if (err) throw err;
	console.log("génération liste régions");
    resultatRequeteToutesLesRegions = query_result["result"];
});
console.log('res1 : '+resultatRequeteToutesLesRegions);
//Execution des requetes Departement
var executeRequeteTousLesDepartements = connection.query(requeteTousLesDepartements, function (err, query_result) {
    resultatRequeteTousLesDepartements = query_result["result"];
});

// Execution des requetes "Commune"
var executeRequeteToutesLesCommunes = connection.query(requeteToutesLesCommunes, function (err, query_result) {
    resultatRequeteToutesLesCommunes = query_result["result"];
});
*/
var query = connection.query(requeteToutesLesRegions);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteToutesLesRegions.push(item);
});

var query = connection.query(requeteTousLesDepartements);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteTousLesDepartements.push(item);
});

var query = connection.query(requeteToutesLesCommunes);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteToutesLesCommunes.push(item);
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
listener.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
	socket.on('called', function(msg) {
		console.log(msg);
	});
	socket.on('requeteDept', function(msg) {
		console.log(msg);
		socket.emit('resultatRequeteTousLesDepartements', resultatRequeteTousLesDepartements);
	});
	//socket.emit('resultatRequeteTousLesDepartements', resultatRequeteTousLesDepartements);
	socket.emit('resultatRequeteToutesLesRegions', resultatRequeteToutesLesRegions);
	//socket.emit('resultatRequeteToutesLesCommunes', resultatRequeteToutesLesCommunes);
	//socket.emit('resultatsListes', 'finit');
  socket.on('PDF', function (msg) {
        generationPDF();
    });

});
/*
function start(socket){

    //se déclenche au clique sur un  bouton
    socket.on('called', function(){
        console.log("Request received.");
        // Permet d'envoyer le résultat de la requête
        listener.sockets.emit('resultatRequeteToutesLesRegions', resultatRequeteToutesLesRegions);

        listener.sockets.emit('resultatRequeteTousLesDepartements', resultatRequeteTousLesDepartements);

        listener.sockets.emit('resultatRequeteToutesLesCommunes', resultatRequeteToutesLesCommunes);

    });
}*/


/***************FOP*********************/
socket.on('requeteDept', function(msg) {

function generationPDF(){
	var resultat= '<?xml version="1.0" encoding="UTF-8"?>';
	resultat+="\n";
	resultat+= '<xsl:stylesheet version="1.0"';
	resultat+= ' xmlns:xsl="http://www.w3.org/1999/XSL/Transform">';
	resultat+="\n";
	resultat+="\n";
	resultat+='<xsl:output method="xml"  encoding="UTF-8" />';
	resultat+="\n";
	resultat+="\n";
	resultat+='<xsl:template match="/">';
	resultat+="\n";
	resultat+='<fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">';
	resultat+='<fo:layout-master-set> \n <fo:simple-page-master page-height="297mm" page-width="210mm" margin="5mm 25mm 5mm 25mm" master-name="PageMaster"> <fo:region-body margin="20mm 0mm 20mm 0mm"/> \n </fo:simple-page-master> \n </fo:layout-master-set>';
	resultat+="\n";
	resultat+="\n";
	resultat+='<fo:page-sequence master-reference="PageMaster">';
	resultat+="\n";
	resultat+='<fo:flow flow-name="xsl-region-body">';
	resultat+="\n";
	resultat+='<fo:block text-align="end">';
	resultat+="\n";
	resultat+='<fo:external-graphic src="http://jmc-miage.unice.fr/projects/miage/wp-content/uploads/2014/01/logo1.png"  content-height="scale-to-fit" height="0.7in"  content-width="1.00in" scaling="non-uniform"/>';
	resultat+="\n";
	resultat+='</fo:block>'
	resultat+="\n";
	resultat+="\n";
	resultat+='<fo:block font-family="Helvetica" font-size="18pt" text-align="center">';
	resultat+="\n";
	resultat+='Critère : Recherche selon blabla ';
	resultat+="\n";
	resultat+='</fo:block>';
	resultat+="\n";/*
	resultat+="\n";
	resultat+='<xsl:for-each select="ONISEP_ETABLISSEMENT/etablissement">';
	resultat+="\n";*/
	resultat+='<fo:block font-family="Times" font-size="13pt" text-align="justify">';
	resultat+="\n";
	resultat+="Hello <xsl:value-of select=\"name\" />";/*
	if(quelR=='t'){
		if(surQuelRecherche=="Ecole d\'art"){
			resultat+='Ecole d\'art ne fonctionne pas (technique : même avec les deux \'\' de basex)';
		}else if (surQuelRecherche=="Ecole d\'ingénieurs"){
			resultat+='Ecole d\'ingénieurs ne fonctionne pas (technique même avec les deux \'\' de basex)';
		} else if (surQuelRecherche=="École supérieure du professorat et de l\'éducation"){
			resultat+='École supérieure du professorat et de l\'éducation ne fonctionne pas (technique même avec les deux \'\' de basex)';
		} else {
			resultat+='<xsl:value-of select="type[text()=\''+surQuelRecherche+'\']/.."/>';
		}
	}else if(quelR=='c'){
		resultat+='<xsl:value-of select="commune[text()=\''+surQuelRecherche+'\']/.."/>';
	} else if(quelR=='a'){
		resultat+='<xsl:value-of select="academie[text()=\''+surQuelRecherche+'\']/.."/>';
	} else if (quelR=='s'){
		resultat+='<xsl:value-of select="statut[text()=\''+surQuelRecherche+'\']/.."/>';
	}*/
	resultat+='</fo:block>';
	resultat+="\n";
	resultat+="\n";
	resultat+='</xsl:for-each>';
	resultat+="\n";

	resultat+='</fo:flow>';
	resultat+="\n";
	resultat+='</fo:page-sequence>'
	resultat+="\n";
	resultat+="\n";
	resultat+='</fo:root>';
	resultat+="\n";
	resultat+="\n";
	resultat+='</xsl:template>';
	resultat+="\n";
	resultat+="\n";
	resultat+='</xsl:stylesheet>';



	// mise en place de la generation xslt document
	fs.writeFile('geneseXSLTDoc.xsl', resultat, function (err) {
  		if (err) return console.log(err);
  		console.log('Génération du XSLT document réussie !');
      		console.log(" \n ==== Avant l'instruction de transform xslt ==== \n");
	    	processXSLT();
	});
}



var xq=["genericxquery.xq"];

function list() {
    var query1 = session.query(cmd);
    query1.execute(function(err, r) {
    console.log(" étape : écriture d'un fichier afterxslt.fo\n");
    fs.writeFile('afterxslt.fo', r.result, function (err) {
        if (err) return console.log(err);
        console.log('\nGénération du fichier .fo  réussie !');
      executionDeFOP();
    });
  });
};
var cmd=loadfile(xq[0]);

function processXSLT(){
  // demarche de transformation
  list();

}

function executionDeFOP(){
  /* MARCHE sous windows
  cmd= "fop " + "afterxslt.fo "+ "resultatRequete.pdf";
  exec(cmd, print, "fop-2.0");
  */

  // Marche sous Linux
  var contenuDuPDF= child_process.execFile('fop', ['afterxslt.fo', 'resultatRequete.pdf'],['fop-2.0'], function(error, stdout, stderr){
    console.log('stderr : '+stderr);
    console.log('stdout : '+stdout);
        if (error !== null) {
           console.log(error);
      }
  });
		window.open('resultatRequete.pdf');
}
