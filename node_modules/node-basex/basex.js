// The BaseX REST Client provides an easy way to connect to a BaseX database
// and make queries via its REST Web Application service.
//
// Author: Brendan Goodenough <brendan@goodenough.nz>
// GitHub: https://github.com/nerdenough/node-basex
// License: MIT

var http = require('http');
var xmler = require('node-xmler');

// Creates the client object with the specified options. Any option not
// specified will use BaseX's default value.
var Client = function (options) {
  this.options = {
    host: options.host || 'localhost',
    port: options.port || 8984,
    path: options.path || '',
    username: options.username || 'admin',
    password: options.password || 'admin'
  };

  var auth = this.options.username + ':' + this.options.password;
  this.encoded = new Buffer(auth).toString('base64');
};

Client.prototype.command = function (args, callback) {
  var cmd = this.buildCommand(args);
  this.execute(cmd, callback);
};

Client.prototype.buildCommand = function (args) {
  var command = new xmler.Element('command');
  var text = new xmler.Element('text', args.text);

  command.addAttribute({
    key: 'xmlns',
    value: 'http://basex.org/rest'
  });

  command.addElement(text);

  return command.getXML();
};

// Queries the BaseX database and sends any response data to the specified
// callback. The args object will be used to build the query through the
// buildQuery function.
Client.prototype.query = function (args, callback) {
  var query = this.buildQuery(args);
  this.execute(query, callback);
};

// Executes a call to the BaseX REST API and sends any data received to the
// callback.
Client.prototype.execute = function (query, callback) {
  var options = {
    host: this.options.host,
    port: this.options.port,
    path: this.options.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
      'Content-Length': query.length,
      'Authorization': 'Basic ' + this.encoded
    }
  };

  var req = http.request(options, function (res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      data === '' ? callback(null) : callback(data);
    });
  });

  req.write(query);
  req.end();
};

// Builds the query based on the args provided. The query is constructed based
// on the POST Method examples for the BaseX REST documentation.
//
// See: http://docs.basex.org/wiki/REST#POST_Method
// See: http://docs.basex.org/wiki/REST:_POST_Schema
Client.prototype.buildQuery = function (args) {
  var query = new xmler.Element('query');

  query.addAttribute({
    key: 'xmlns',
    value: 'http://basex.org/rest'
  });

  query.addElements(this.buildQueryChildren(args));
  return query.getXML();
};

// Builds the child elements for the query based on the args provided. Returns
// and array of child elements.
//
// See: http://docs.basex.org/wiki/REST#POST_Method
// See: http://docs.basex.org/wiki/REST:_POST_Schema
Client.prototype.buildQueryChildren = function (args) {
  var children = [];

  // Text
  if (args.text) {
    var text = new xmler.Element('text', args.text);
    children.push(text);
  }

  // Options
  if (args.options) {
    args.options.forEach(function (item) {
      var element = new xmler.Element('option');
      element.addAttributes(item);
      children.push(element);
    });
  }

  // Variables
  if (args.variables) {
    args.variables.forEach(function (item) {
      var element = new xmler.Element('variable');
      element.addAttributes(item);
      children.push(element);
    });
  }

  // Context
  if (args.context) {
    var context = new xmler.Element('context', args.context);
    children.push(context);
  }

  return children;
};

// Exports Client
module.exports = {
  Client: Client
};
