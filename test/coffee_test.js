var grunt = require('grunt');
var fs = require('fs');

exports.coffee = {
  compile: function(test) {
    'use strict';

    test.expect(2);

    var actual = grunt.file.read('tmp/coffee.js');
    var expected = grunt.file.read('test/expected/coffee.js');
    test.equal(expected, actual, 'should compile coffeescript to javascript');

    actual = grunt.file.read('tmp/concat.js');
    expected = grunt.file.read('test/expected/concat.js');
    test.equal(expected, actual, 'should compile multiple coffeescript files to a single javascript file');

    test.done();
  }
};