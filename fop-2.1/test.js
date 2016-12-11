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