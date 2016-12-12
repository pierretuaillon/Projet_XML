# BaseX REST Client

[![Build Status](https://travis-ci.org/nerdenough/node-basex.svg?branch=master)](https://travis-ci.org/nerdenough/node-basex)

BaseX REST Client provides an easy way to query a BaseX (XML Database) HTTP
server through its [REST](http://docs.basex.org/wiki/REST_API) API using the
POST method.

## Getting Started
### Installation
```
$ npm install node-basex
```

### Usage
```javascript
var basex = require('node-basex');

var client = new basex.Client({});
var query = {
  text: 'for $i in //example return $i'
};

client.query(query, function (data) {
  console.log(data); // Response data
});
```

## In Depth
The [BaseX REST API documentation](http://docs.basex.org/wiki/REST_API#POST_Method)
contains information on how a POST query should be structured for communicating
with Basex and will help clarify the various options specified below.

### Creating the REST Client
The BaseX REST Client is created by providing an object containing all the
options for the connection. The options are option and include `host`, `port`,
`path`, `username`, and `password`. Any option omitted will use the default
BaseX value.

```javascript
var basex = require('node-basex');
var client = new basex.Client({
  host: 'localhost',
  port: 8984,
  path: '/rest/mydatabase',
  username: 'admin',
  password: 'admin'
});
```

*Note: An empty object is required for the options even if you are using
defaults*

### Queries
Queries follow the [BaseX REST POST Schema](http://docs.basex.org/wiki/REST:_POST_Schema)
and can consist of text, context, parameter, variable and option elements.

#### Text
The text element is used to specify the query operation.

```javascript
var query = {
  text: 'for $i in //example return $i'
};
```

#### Context
The context parameter is used to provide an initial XML context node.

```javascript
var query = {
  context: 'context'
};
```

#### Options
[Options](http://docs.basex.org/wiki/Options) are applied before the actual
query operation (text) is performed.

```javascript
var query = {
  options: [
    {key: 'option1', value: 1},
    {key: 'option2', value: 2}
  ]
};
```

#### Variables
[Variables](http://docs.basex.org/wiki/REST#Assigning_Variables) allow for
external variables to be set that can be referenced from the text element.

```javascript
var query = {
  variables: [
    {key: 'var1', value: 1},
    {key: 'var2', value: 2}
  ]
};
```

#### Running the Query
When the query is run, any response data will be returned via the callback so
long as the BaseX HTTP server is running.

```javascript
client.query(query, function (data) {
  // Response data can be null
});
```

### Running Tests
```
$ npm install -g gulp mocha
$ npm test
```
