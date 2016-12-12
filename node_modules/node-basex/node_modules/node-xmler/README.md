# XMLer

[![Build Status](https://travis-ci.org/nerdenough/node-xmler.svg?branch=master)](https://travis-ci.org/nerdenough/node-xmler)

XMLer is a simple package for creating XML elements. It allows elements to be
created as JavaScript objects, adding attributes and child elements to the
element, and provides a way to easily convert the element into an XML string.

## Getting Started
### Installation
```
$ npm install node-xmler
```

### Usage
```javascript
var xmler = require('node-xmler');

var cat = new xmler.Element('cat');
var name = new xmler.Element('name', 'Mr. Meowgi');
var breed = new xmler.Element('breed', 'Munchkin');

breed.addAttribute({
  key: 'purebred',
  value: 'true'
});

cat.addElement(name);
cat.addElement(breed);

var xml = cat.getXML();
console.log(xml);
```

The output of the `console.log(xml)` will be:

```xml
<cat>
  <name>Mr. Meowgi</name>
  <breed purebred="true">Munchkin</breed>
</cat>
```

## In Depth

### Creating an Element
An element can be created by specifying its name and optionally its body
content in the arguments.

```javascript
var cat = new xmler.Element(name, [body]); // <name>body</name>
```

*Note: The body content should be plain text with any required inline XML*

### Adding Attributes
Attributes are objects that have `key` and `value` fields and can be added
to an element's attributes as a single object or as part of an array of
attributes.

#### `addAttribute(attribute)`
```javascript
var cat = new xmler.Element('cat');
var attr = { key: 'color', value: 'grey' };
cat.addAttribute(attr); // <cat color="grey"...
```

#### `addAttributes(attributes)`
```javascript
var cat = new xmler.Element('cat');
var attr = [
  { key: 'color', value: 'grey' },
  { key: 'cute', value: 'true' }
];

cat.addAttributes(attr); // <cat color="grey" cute="true"...
```

### Adding Child Elements
Child elements can be added in similar fashion to attributes, either as a single
object or as an array of children.

#### `addElement(element)`
```javascript
var cat = new xmler.Element('cat');
var name = new xmler.Element('name', 'Mr. Meowgi');
cat.addElement(name); // <cat><name>Mr. Meowgi</name></cat>
```

#### `addElements(elements)`
```javascript
var cat = new xmler.Element('cat');
var children = [
  new xmler.Element('name', 'Mr. Meowgi'),
  new xmler.Element('breed', 'Munchkin')
];

cat.addElements(children); // <cat><name>...</name><breed>...</breed></cat>
```

### Converting to XML
You can convert an element along with any children to an XML string using the
`getXML()` function.

#### `getXML()`
```javascript
var cat = new xmler.Element('cat');
var xml = cat.getXML(); // Your element as an XML string
```

### Running Tests
Tests are written using mocha and chai and can be run through gulp.

```
$ npm install -g gulp mocha
$ npm test
```
