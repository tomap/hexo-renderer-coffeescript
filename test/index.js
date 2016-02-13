'use strict';

var should = require('chai').should(); // eslint-disable-line

describe('hexo-renderer-coffeescript', function() {
  var ctx = {
    config: {}
  };
  var r = require('../lib/renderer').bind(ctx);

  it('default', function() {
    var body = 'alert "hello world"';
    var result = r({text: body});

    result.should.eql([
      '(function() {',
      '  alert("hello world");',
      '',
      '}).call(this);'
    ].join('\n') + '\n');
  });

  it('bare', function() {
    ctx.config.coffee = {
      bare: true
    };

    var body = 'alert "hello world"';
    var result = r({text: body});

    result.should.eql('alert("hello world");\n');
    delete ctx.config.coffee;
  });

  it('header', function() {
    ctx.config.coffee = {
      header: true
    };

    var body = 'alert "hello world"';
    var result = r({text: body});

    result.should.contain('// Generated by CoffeeScript');

    delete ctx.config.coffee;
  });
});
