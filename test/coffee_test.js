var grunt = require('grunt');

exports['coffee'] = {
  main: function(test) {
    'use strict';

    var expect, result;

    test.expect(3);

    expect = "var HelloWorld;\n\nHelloWorld = (function() {\n\n  function HelloWorld() {}\n\n  HelloWorld.test = 'test';\n\n  return HelloWorld;\n\n})();\n";
    result = grunt.file.read('tmp/coffee_basic.js');
    test.equal(expect, result, 'should compile coffeescript to javascript');

    expect = "var HelloWorld;\n\nHelloWorld = (function() {\n\n  function HelloWorld() {}\n\n  HelloWorld.test = 'test';\n\n  return HelloWorld;\n\n})();\n\n\nconsole.log('hi');\n";
    result = grunt.file.read('tmp/coffee_combined.js');
    test.equal(expect, result, 'should compile multiple coffeescript files to a single javascript file');

    expect = "var HelloWorld;\n\nHelloWorld = (function() {\n\n  function HelloWorld() {}\n\n  HelloWorld.test = 'test';\n\n  return HelloWorld;\n\n})();\n";
    result = grunt.file.read('tmp_dir/sub/coffee_sub.js');
    test.equal(expect, result, 'should compile coffeescript to individual files in mirrored directory');

    test.done();
  }
};