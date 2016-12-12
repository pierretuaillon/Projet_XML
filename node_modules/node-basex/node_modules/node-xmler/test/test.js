var xmler = require ('../xmler');

var chai = require('chai');
var expect = chai.expect;

describe('Element', function () {
  describe('#constructor', function () {
    it('should set the element name', function () {
      var element = new xmler.Element('element');
      expect(element.name).to.equal('element');
    });

    it('should set the element name and body content', function () {
      var element = new xmler.Element('element', 'hello world');
      expect(element.name).to.equal('element');
      expect(element.body).to.equal('hello world');
    });
  });

  describe('#addAttribute', function () {
    it('should add a single attribute to the attributes array', function () {
      var element = new xmler.Element('element');
      element.addAttribute({
        key: 'key',
        value: 'value'
      });

      expect(element.attributes[0].key).to.equal('key');
      expect(element.attributes[0].value).to.equal('value');
      expect(element.attributes.length).to.equal(1);
    });

    it('should add lots of attributes to the attributes array', function () {
      var element = new xmler.Element('element');

      for (var i = 0; i < 100; i++) {
        element.addAttribute({
          key: 'key' + i,
          value: 'value' + i
        });
        expect(element.attributes[i].key).to.equal('key' + i);
        expect(element.attributes[i].value).to.equal('value' + i);
      }

      expect(element.attributes.length).to.equal(100);
    });
  });

  describe('#addAttributes', function () {
    it('should add an array of attributes onto an empty attributes array', function () {
      var element = new xmler.Element('element');
      var attr = [];

      for (var i = 0; i < 3; i++) {
        attr.push({
          key: 'key',
          value: 'value'
        });
      }

      element.addAttributes(attr);

      expect(element.attributes.length).to.equal(3);
    });

    it('should add an array of attributes onto an existing attributes array', function () {
      var element = new xmler.Element('element');
      var attr = [];

      element.addAttribute({
        key: 'key',
        value: 'value'
      });

      for (var i = 0; i < 3; i++) {
        attr.push({
          key: 'key' + i,
          value: 'value' + i
        });
      }

      element.addAttributes(attr);

      expect(element.attributes[1].key).to.equal('key0');
      expect(element.attributes[1].value).to.equal('value0');
      expect(element.attributes.length).to.equal(4);
    });
  });

  describe('#addElement', function () {
    it('should add a single element to the children array', function () {
      var element = new xmler.Element('element');
      var child = new xmler.Element('child');

      element.addElement(child);

      expect(element.children[0]).to.equal(child);
      expect(element.children.length).to.equal(1);
    });

    it('should add lots of children to the children array', function () {
      var element = new xmler.Element('element');

      for (var i = 0; i < 100; i++) {
        var child = new xmler.Element('child');
        element.addElement(child);
        expect(element.children[i]).to.equal(child);
      }

      expect(element.children.length).to.equal(100);
    });
  });

  describe('#addElements', function () {
    it('should add an array of children onto an empty children array', function () {
      var element = new xmler.Element('element');
      var children = [
        new xmler.Element('child1'),
        new xmler.Element('child2'),
        new xmler.Element('child3')
      ];

      element.addElements(children);

      expect(element.children[0]).to.equal(children[0]);
      expect(element.children[1]).to.equal(children[1]);
      expect(element.children[2]).to.equal(children[2]);
      expect(element.children.length).to.equal(3);
    });

    it('should add an array of children onto an existing children array', function () {
      var element = new xmler.Element('element');
      var child1 = new xmler.Element('child1');
      var child2 = new xmler.Element('child2');
      var child3 = new xmler.Element('child3');
      var children = [
        new xmler.Element('child4'),
        new xmler.Element('child5'),
        new xmler.Element('child6')
      ];

      element.addElement(child1);
      element.addElement(child2);
      element.addElement(child3);
      element.addElements(children);

      expect(element.children[0]).to.equal(child1);
      expect(element.children[3]).to.equal(children[0]);
      expect(element.children.length).to.equal(6);
    });
  });

  describe('#getXML', function () {
    it('should convert an empty element to xml', function () {
      var element = new xmler.Element('element');
      expect(element.getXML()).to.equal('<element/>');
    });

    it('should convert an element with body content to xml', function () {
      var element = new xmler.Element('element', 'hello world');
      expect(element.getXML()).to.equal('<element>hello world</element>');
    });

    it('should convert an element with attributes to xml', function () {
      var element = new xmler.Element('element');
      element.addAttribute({
        key: 'key',
        value: 'value'
      });

      expect(element.getXML()).to.equal('<element key="value"/>');
    });

    it('should convert an element with children to xml', function () {
      var element = new xmler.Element('element');
      element.addElement(new xmler.Element('child'));

      expect(element.getXML()).to.equal('<element><child/></element>');
    });

    it('should convert an element with attributes and children to xml', function () {
      var element = new xmler.Element('element');
      element.addAttribute({
        key: 'key',
        value: 'value'
      });
      element.addElement(new xmler.Element('child'));

      expect(element.getXML()).to.equal('<element key="value"><child/></element>');
    });

    it('should convert an element with nested attributes and children to xml', function () {
      var element = new xmler.Element('element');
      var child = new xmler.Element('child');
      var grandchild = new xmler.Element('grandchild');
      var attr = {
        key: 'key',
        value: 'value'
      };

      grandchild.addAttribute(attr);
      child.addAttribute(attr);
      child.addElement(grandchild);
      element.addAttribute(attr);
      element.addElement(child);

      var answer = '<element key="value">';
      answer += '<child key="value">';
      answer += '<grandchild key="value"/>';
      answer += '</child>';
      answer += '</element>';
      expect(element.getXML()).to.equal(answer);
    });

    it('should convert an element with nested attributes, children and body content to xml', function () {
      var element = new xmler.Element('element', 'hello world');
      var child = new xmler.Element('child', 'foo');
      var grandchild = new xmler.Element('grandchild', 'bar');
      var attr = {
        key: 'key',
        value: 'value'
      };

      grandchild.addAttribute(attr);
      child.addAttribute(attr);
      child.addElement(grandchild);
      element.addAttribute(attr);
      element.addElement(child);

      var answer = '<element key="value">hello world';
      answer += '<child key="value">foo';
      answer += '<grandchild key="value">bar</grandchild>';
      answer += '</child>';
      answer += '</element>';
      expect(element.getXML()).to.equal(answer);
    });
  });
});
