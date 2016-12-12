// XMLer is a simple package that allows the creation of XML elements within
// JavaScript. It allows the addition of attributes as well as nested child
// elements.
//
// Author: Brendan Goodenough <brendan@goodenough.nz>
// GitHub: https://github.com/nerdenough/node-xmler
// License: MIT

// Creates the element with a specified name and initialises the arrays for
// attributes and child elements.
var Element = function (name, body) {
  this.name = name;
  this.body = body;
  this.attributes = [];
  this.children = [];
};

// Adds a single attribute to the attributes array.
Element.prototype.addAttribute = function (attribute) {
  this.attributes.push(attribute);
};

// Adds an array of attributes to the attributes array.
Element.prototype.addAttributes = function (attributes) {
  this.attributes = this.attributes.concat(attributes);
};

// Adds a single child element to the children array.
Element.prototype.addElement = function (element) {
  this.children.push(element);
};

// Adds an array of child elements to the children array.
Element.prototype.addElements = function (elements) {
  this.children = this.children.concat(elements);
};

// Builds an XML string for the element by iterating over all the attributes
// and child elements.
Element.prototype.getXML = function () {
  var xml = '<' + this.name;

  this.attributes.forEach(function (attribute) {
    xml += ' ' + attribute.key + '="' + attribute.value + '"';
  });

  xml += this.children.length || this.body ? '>' : '/>';
  xml += this.body ? this.body : '';

  this.children.forEach(function (element) {
    xml += element.getXML();
  });

  xml += this.children.length || this.body ? '</' + this.name + '>' : '';

  return xml;
};

// Exports Element
module.exports = {
  Element: Element
};
