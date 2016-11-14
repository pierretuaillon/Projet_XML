Projet_XML
==
### Enoncé

On dispose de données des [Immeubles protégés au titre des Monuments Historiques](https://www.data.gouv.fr/fr/datasets/monuments-historiques-liste-des-immeubles-proteges-au-titre-des-monuments-historiques/) (total France en 2014 : 44 318 monuments). On vous demande de réaliser une application Web de consultation de ces données.

Liste des données :

*   Référence de l'édifice dans la base Mérimée : <REF>
*   Type d'étude : <ETUD> : recensement immeubles MH, avec éventuellement la mention label Xxe
*   localisation de l'édifice : <LOCA> ou <REG> + <DEPT> + <COM>
*   Code INSEE : <INSEE>
*   Appellation courante de l'édifice : <TICO>
*   Adresse : <ADRS> : adresse, n° de la voie, type de voie, nom de la voie
*   Statut propriété : <STAT> : type de propriétaire par catégorie ; pas de noms
*   Affectataire : <AFFE> : utile pour les propriétés de l'Etat, mentionne le nom du ministère affectataire
*   Précisions sur la protection : <PPRO> article 1er de l'arrêté de protection + cadastre + nature et date de la protection
*   Date de protection : <DPRO>
*   Architecte ou maître d'oeuvre : <AUTR>
*   Période de construction : <SCLE>

#### Conditions de réalisation

Ces données doivent être chargées dans une base de données native XML ; vous utiliserez [BaseX](http://basex.org/) ou [eXist](http://www.exist-db.org/); toutes les requêtes d'extraction des données seront faites en **XQuery**. L'utilisation d'une base de données relationnelle est proscrite.

Vous devrez héberger une application Web dans un serveur Node.js. Rien de doit être précalculé (ne pas stocker les résultats dans des fichiers), votre application doit accéder aux données dynamiquement. L'utilisation de PHP est proscrite.

L'application cliente pourra utiliser des frameworks modernes (comme Angular 2 ou [Aurelia](http://aurelia.io/)) et CSS pour styler l'application. Les graphiques **devront** être réalisés en SVG. Javascript pourra être utilisé pour les affichages sur une carte (GoogleMap).

#### Sources de données externes

Utilisez DBPedia/Wikidata pour compléter dynamiquement vos données. Les requêtes seront faites en **SPARQL**.

Vous pouvez également recourir à d'autres sources de données que vous jugeriez utile à votre application (pas nécessairement interrogeables en SPARQL, du moment que celles provenant de DBPedia ou Wikidata ont été interrogées avec SPARQL).

Quelques exemples dans Wikipedia:

*   [Monuments historiques](https://fr.wikipedia.org/wiki/Monument_historique_(France))
*   [Liste des monuments historiques de la Charente-Maritime](https://fr.wikipedia.org/wiki/Liste_des_monuments_historiques_de_la_Charente-Maritime) (potentiellement plusieurs listes)
*   [Liste des monuments historiques de La Rochelle](https://fr.wikipedia.org/wiki/Liste_des_monuments_historiques_de_La_Rochelle)

...et dans DBPedia :

*   [on y trouve la référence de l'exemple XML (PA17000048)](http://fr.dbpedia.org/page/Liste_des_monuments_historiques_de_La_Rochelle)
*   et en [ntriples](http://fr.dbpedia.org/data/Liste_des_monuments_historiques_de_La_Rochelle.ntriples)

...et dans Wikidata :

*   [la page qui correspond à cette même référence](https://www.wikidata.org/wiki/Q22995945) (PA17000048)
*   [Wikidata infos RDF](https://www.mediawiki.org/wiki/Wikibase/Indexing/RDF_Dump_Format)
*   [Wikidata Query Service](https://query.wikidata.org/)

...et cette référence de page Wikidata (Q22995945) se trouve aussi dans [Wikipedia](https://fr.wikipedia.org/wiki/Fichier:911_-_H%C3%B4tel_du_Commerce_10-12_Place_de_Verdun_-_La_Rochelle.jpg) donc dans DBPedia ; de là, on devrait pouvoir obtenir l'URL de cette photo avec une requête...

Après analyse des données, trouvez les services qui permettent d'exécutez vos requêtes SPARQL pour extraire les données nécessaires (latitude, longitude, photos, autres infos).