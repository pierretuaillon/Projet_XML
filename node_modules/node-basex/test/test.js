var chai = require('chai');
var xmler = require('node-xmler');
var basex = require('../basex');

var expect = chai.expect;

describe('Client', function () {
  describe('#constructor', function () {
    it('should set custom values if specified', function () {
      var options = {
        host: 'localhost1',
        port: 9000,
        username: 'admin1',
        password: 'admin1'
      };
      var client = new basex.Client(options);

      expect(client.options.host).to.equal(options.host);
      expect(client.options.port).to.equal(options.port);
      expect(client.options.username).to.equal(options.username);
      expect(client.options.password).to.equal(options.password);
    });

    it('should set default values if not specified', function () {
      var client = new basex.Client({});

      expect(client.options.host).to.equal('localhost');
      expect(client.options.port).to.equal(8984);
      expect(client.options.username).to.equal('admin');
      expect(client.options.password).to.equal('admin');
    });

    it('should encode username and password to base64', function () {
      var client = new basex.Client({});
      var username = client.options.username;
      var password = client.options.password;
      var encoded = new Buffer(username + ':' + password).toString('base64');

      expect(client.encoded).to.equal(encoded);
    });
  });

  describe('#buildQuery', function () {
    it('should build a query with basex rest xmlns', function () {
      var client = new basex.Client({});
      var query = client.buildQuery({});
      var answer = new xmler.Element('query');
      answer.addAttribute({
        key: 'xmlns',
        value: 'http://basex.org/rest'
      });

      expect(query).to.equal(answer.getXML());
    });

    it('should build a query with text', function () {
      var client = new basex.Client({});
      var query = client.buildQuery({
        text: 'xquery'
      });

      var answer = new xmler.Element('query');
      var text = new xmler.Element('text', 'xquery');

      answer.addElement(text);
      answer.addAttribute({
        key: 'xmlns',
        value: 'http://basex.org/rest'
      });

      expect(query).to.equal(answer.getXML());
    });

    it('should build a query with context', function () {
      var client = new basex.Client({});
      var query = client.buildQuery({
        context: 'some context'
      });

      var answer = new xmler.Element('query');
      var context = new xmler.Element('context', 'some context');

      answer.addElement(context);
      answer.addAttribute({
        key: 'xmlns',
        value: 'http://basex.org/rest'
      });

      expect(query).to.equal(answer.getXML());
    });

    it('should build a query with options', function () {
      var client = new basex.Client({});
      var query = client.buildQuery({
        options: [
          {key: 'id', value: 1},
          {key: 'id', value: 2}
        ]
      });

      var answer = new xmler.Element('query');
      var option1 = new xmler.Element('option');
      var option2 = new xmler.Element('option');
      option1.addAttribute({key: 'id', value: 1});
      option2.addAttribute({key: 'id', value: 2});

      answer.addElement(option1);
      answer.addElement(option2);
      answer.addAttribute({
        key: 'xmlns',
        value: 'http://basex.org/rest'
      });

      expect(query).to.equal(answer.getXML());
    });

    it('should build a query with variables', function () {
      var client = new basex.Client({});
      var query = client.buildQuery({
        variables: [
          {key: 'id', value: 1},
          {key: 'id', value: 2}
        ]
      });

      var answer = new xmler.Element('query');
      var variable1 = new xmler.Element('variable');
      var variable2 = new xmler.Element('variable');
      variable1.addAttribute({key: 'id', value: 1});
      variable2.addAttribute({key: 'id', value: 2});

      answer.addElement(variable1);
      answer.addElement(variable2);
      answer.addAttribute({
        key: 'xmlns',
        value: 'http://basex.org/rest'
      });

      expect(query).to.equal(answer.getXML());
    });
  });

  describe('#buildCommand', function () {
    it('should build a command with text', function () {
      var client = new basex.Client({});
      var command = client.buildCommand({
        text: 'LIST database'
      });

      var answer = new xmler.Element('command');
      var text = new xmler.Element('text', 'LIST database');
      answer.addElement(text);
      answer.addAttribute({
        key: 'xmlns',
        value: 'http://basex.org/rest'
      });

      expect(command).to.equal(answer.getXML());
    });
  });
});
