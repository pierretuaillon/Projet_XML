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
// resultat par étude
var resultatRequeteToutesLesEtudes = [];
// resultat par statut
var resultatRequeteTousLesStatuts = [];
// resultat par auteur
var resultatRequeteTousLesAuteurs = [];


//resultat region avec departement
var resultatRequeteRegion_Departement = [];
//resultat region avec Commune
var resultatRequeteRegion_Commune = [];

//resultat departement avec region
var resultatRequeteDepartement_Region = [];
//resultat departement avec commune
var resultatRequeteDepartement_Commune = [];

//resultat communes avec region
var resultatRequeteCommunes_Region = [];
// resultat Communes avec departement
var resultatRequeteCommunes_Departement = [];

//stats : nb d'occurences
var resultatRequeteStatsRegions = [];
var resultatRequeteStatsDepartements = [];
var resultatRequeteStatsCommunes = [];
var resultatRequeteStatsEtuds = [];
var resultatRequeteStatsStats = [];
var resultatRequeteStatsAutrs = [];

//Requêtes
var requeteToutesLesRegions = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/REG return $x/REG)';
var requeteTousLesDepartements = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/DPT return $x/DPT)';
var requeteToutesLesCommunes = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/COM return $x/COM)';
var requeteToutesLesEtudes = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/ETUD return $x/ETUD)';
var requeteTousLesAuteurs = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/AUTR return $x/AUTR)';
var requeteTousLesStatuts = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row order by $x/STAT return $x/STAT)';

var requeteStatsRegions = 'for $x in doc("merimee-MH.xml")//csv_data/row group by $group := $x/REG order by $group return count($x/REG)';
var requeteStatsDepartements = 'for $x in doc("merimee-MH.xml")//csv_data/row group by $group := $x/DPT order by $group return count($x/DPT)';
var requeteStatsCommunes = 'for $x in doc("merimee-MH.xml")//csv_data/row group by $group := $x/COM order by $group return count($x/COM)';
var requeteStatsEtuds = 'for $x in doc("merimee-MH.xml")//csv_data/row group by $group := $x/ETUD order by $group return count($x/ETUD)';
var requeteStatsStats = 'for $x in doc("merimee-MH.xml")//csv_data/row group by $group := $x/STAT order by $group return count($x/STAT)';
var requeteStatsAutrs = 'for $x in doc("merimee-MH.xml")//csv_data/row group by $group := $x/AUTR order by $group return count($x/AUTR)';


var query;


//requete stats regions
query = connection.query(requeteStatsRegions);
query.on("error", function(err) {
    console.log("An statsRegions error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteStatsRegions[offset]=item;
});
//requete stats departements
query = connection.query(requeteStatsDepartements);
query.on("error", function(err) {
    console.log("An statsRegions error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteStatsDepartements[offset]=item;
});
//requete stats communes
query = connection.query(requeteStatsCommunes);
query.on("error", function(err) {
    console.log("An statsRegions error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteStatsCommunes[offset]=item;
});
//requete toutes regions
query = connection.query(requeteStatsEtuds);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteStatsEtuds[offset]=item;
});
//requete toutes regions
query = connection.query(requeteStatsStats);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteStatsStats[offset]=item;
});
//requete toutes regions
query = connection.query(requeteStatsAutrs);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteStatsAutrs[offset]=item;
});

//requete tous
query = connection.query(requeteToutesLesCommunes);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteToutesLesCommunes[offset]=item;
});

//requete tous
query = connection.query(requeteTousLesDepartements);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteTousLesDepartements[offset]=item;
});

//requete tous
query = connection.query(requeteToutesLesRegions);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteToutesLesRegions[offset]=item;
});

//requete tous
query = connection.query(requeteToutesLesEtudes);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteToutesLesEtudes[offset]=item;
});

//requete tous
query = connection.query(requeteTousLesAuteurs);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteTousLesAuteurs[offset]=item;
});

//requete toutes communes
query = connection.query(requeteTousLesStatuts);
query.on("error", function(err) {
    console.log("An error occurred: " + err);
});
query.each(function(item, hits, offset) {
    resultatRequeteTousLesStatuts[offset]=item;
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
		listener.sockets.emit('resultatRequeteToutesLesRegions', resultatRequeteToutesLesRegions);
		listener.sockets.emit('resultatRequeteTousLesDepartements', resultatRequeteTousLesDepartements);
		listener.sockets.emit('resultatRequeteToutesLesCommunes', resultatRequeteToutesLesCommunes);
	});
	socket.on('requete2', function(msg) {
		console.log(msg);
		listener.sockets.emit('resultatRequeteToutesLesRegions', resultatRequeteToutesLesRegions);
		listener.sockets.emit('resultatRequeteTousLesDepartements', resultatRequeteTousLesDepartements);
		listener.sockets.emit('resultatRequeteToutesLesCommunes', resultatRequeteToutesLesCommunes);
		listener.sockets.emit('resultatRequete2', resultatRequeteToutesLesRegions);
		
	});
	socket.on('statsRegions', function(msg) {
		console.log(msg);
		listener.sockets.emit('resultatRequeteToutesLesRegions', resultatRequeteToutesLesRegions);
		listener.sockets.emit('statsRegions', resultatRequeteStatsRegions);
	});
	socket.on('statsDepts', function(msg) {
		console.log(msg);
		listener.sockets.emit('resultatRequeteTousLesDepartements', resultatRequeteTousLesDepartements);
		listener.sockets.emit('statsDepts', resultatRequeteStatsDepartements);
	});
	socket.on('statsCommunes', function(msg) {
		console.log(msg);
		listener.sockets.emit('resultatRequeteToutesLesCommunes', resultatRequeteToutesLesCommunes);
		listener.sockets.emit('statsCommunes', resultatRequeteStatsCommunes);
	});
	socket.on('statsEtuds', function(msg) {
		console.log(msg);
		listener.sockets.emit('resultatRequeteToutesLesEtudes', resultatRequeteToutesLesEtudes);
		listener.sockets.emit('statsEtuds', resultatRequeteStatsEtuds);
	});
	socket.on('statsStats', function(msg) {
		console.log(msg);
		listener.sockets.emit('resultatRequeteTousLesStatuts', resultatRequeteTousLesStatuts);
		listener.sockets.emit('statsStats', resultatRequeteStatsStats);
	});
	socket.on('statsAutrs', function(msg) {
		console.log(msg);
		listener.sockets.emit('resultatRequeteTousLesAuteurs', resultatRequeteTousLesAuteurs);
		listener.sockets.emit('statsAutrs', resultatRequeteStatsAutrs);
	});

	socket.on('selectRegion', function(NomRegion){

		var requeteDepartement_Region = 'distinct-values( for $x in doc("merimee-MH.xml")//csv_data/row where $x/REG="'+ NomRegion +'" order by $x/DPT return $x/DPT)';

		query = connection.query(requeteDepartement_Region);
		
		query.on("error", function(err) {
    		console.log("An error occurred: " + err);
		});
		query.each(function(item, hits, offset) {
    		resultatRequeteDepartement_Region.push(item);
		});

		var requeteCommune_Region = 'distinct-values( for $x in doc("merimee-MH.xml")//csv_data/row where $x/REG="'+ NomRegion +'" order by $x/COM return $x/COM)';

		query = connection.query(requeteCommune_Region);
		
		query.on("error", function(err) {
    		console.log("An error occurred: " + err);
		});
		query.each(function(item, hits, offset) {
    		resultatRequeteCommunes_Region.push(item);
		});

		listener.sockets.emit('resultatRequeteDepartement_Region', resultatRequeteDepartement_Region);
		listener.sockets.emit('resultatRequeteCommunes_Region', resultatRequeteCommunes_Region);
		
	});

	socket.on('selectDept', function(numDep){
		//Renvoie tous les communes du departement
		var requeteCommune_Departement = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row where $x/DPT="'+ numDep +'" order by $x/COM return $x/COM)';
		
		query = connection.query(requeteCommune_Departement);
		
		query.on("error", function(err) {
    		console.log("An error occurred: " + err);
		});
		query.each(function(item, hits, offset) {
    		resultatRequeteCommunes_Departement.push(item);
		});


		var  requeteRegion_Departement = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row where $x/DPT="'+ numDep +'" order by $x/REG return $x/REG)';
		query = connection.query(requeteRegion_Departement);
		
		query.on("error", function(err) {
    		console.log("An error occurred: " + err);
		});
		query.each(function(item, hits, offset) {
    		resultatRequeteRegion_Departement.push(item);
		});		


		listener.sockets.emit('resultatRequeteCommunes_Departement', resultatRequeteCommunes_Departement)
		listener.sockets.emit('resultatRequeteRegion_Departement', resultatRequeteRegion_Departement);

	
	});

	socket.on('selectCommune', function(nomCommune){

		var requeteRegion_Commune = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row where $x/COM="'+ nomCommune +'" order by $x/REG return $x/REG)';

		query = connection.query(requeteRegion_Commune);

		query.on("error", function(err) {
    		console.log("An error occurred: " + err);
		});
		query.each(function(item, hits, offset) {
    		resultatRequeteRegion_Commune.push(item);
		});		

		var requeteDepartement_Commune = 'distinct-values(for $x in doc("merimee-MH.xml")//csv_data/row where $x/COM="'+ nomCommune +'" order by $x/DPT return $x/DPT)';
		
		query = connection.query(requeteDepartement_Commune);

		query.on("error", function(err) {
    		console.log("An error occurred: " + err);
		});
		query.each(function(item, hits, offset) {
    		resultatRequeteDepartement_Commune.push(item);
		});		


		listener.sockets.emit('resultatRequeteRegion_Commune', resultatRequeteRegion_Commune);
		listener.sockets.emit('resultatRequeteDepartement_Commune', resultatRequeteDepartement_Commune);


	});


  socket.on('PDF', function (msg) {
      //  generationPDF();
    });

});



/***************FOP*********************
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
	resultat+="\n";
	resultat+='<fo:block font-family="Times" font-size="13pt" text-align="justify">';
	resultat+="\n";
	resultat+="Hello <xsl:value-of select=\"name\" />";
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


  // Marche sous Linux
  var contenuDuPDF= child_process.execFile('fop', ['afterxslt.fo', 'resultatRequete.pdf'],['fop-2.0'], function(error, stdout, stderr){
    console.log('stderr : '+stderr);
    console.log('stdout : '+stdout);
        if (error !== null) {
           console.log(error);
      }
  });
		window.open('resultatRequete.pdf');
}*/
