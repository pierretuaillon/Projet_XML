let $in := doc('name.xml')
let $style := doc('geneseXSLTDoc.xsl')
return xslt:transform($in, $style)
