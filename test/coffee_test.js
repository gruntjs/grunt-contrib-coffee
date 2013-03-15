var grunt = require('grunt');
var fs = require('fs');
var coffee = require('../tasks/coffee.js');

function readFile(file) {
  'use strict';

  var contents = grunt.file.read(file);

  if (process.platform === 'win32') {
    contents = contents.replace(/\r\n/g, '\n');
  }

  return contents;
}

function assertFileEquality(test, pathToActual, pathToExpected, message) {
    var actual = readFile(pathToActual);
    var expected = readFile(pathToExpected);
    test.equal(expected, actual, message);
}

exports.coffee = {
  compileBare: function(test) {
    'use strict';

    test.expect(4);

    assertFileEquality(test,
      'tmp/bare/coffee.js',
      'test/expected/bare/coffee.js',
      'Should compile coffeescript to unwrapped javascript');

    assertFileEquality(test,
      'tmp/bare/litcoffee.js',
      'test/expected/bare/litcoffee.js',
      'Should compile literate coffeescript to unwrapped javascript');

    assertFileEquality(test,
      'tmp/bare/litcoffeemd.js',
      'test/expected/bare/litcoffee.js',
      'Should compile literate coffeescript to unwrapped javascript');

    assertFileEquality(test,
      'tmp/bare/concat.js',
      'test/expected/bare/concat.js',
      'Should compile coffeescript files without wrappers and concatenate them into a single javascript file');

    test.done();
  },
  compileDefault: function(test) {
    'use strict';

    test.expect(4);

    assertFileEquality(test,
      'tmp/default/coffee.js',
      'test/expected/default/coffee.js',
      'Should compile coffeescript to javascript');

    assertFileEquality(test,
      'tmp/default/litcoffee.js',
      'test/expected/default/litcoffee.js',
      'Should compile literate coffeescript to wrapped javascript');

    assertFileEquality(test,
      'tmp/default/litcoffeemd.js',
      'test/expected/default/litcoffee.js',
      'Should compile literate coffeescript to wrapped javascript');

    assertFileEquality(test,
      'tmp/default/concat.js',
      'test/expected/default/concat.js',
      'Should compile coffeescript files with wrappers and concatenate them into a single javascript file');

    test.done();
  },
  compileJoined: function(test) {
    'use strict';

    test.expect(4);

    assertFileEquality(test,
      'tmp/join/coffee.js',
      'test/expected/default/coffee.js',
      'Compilation of one file with join enabled should match normal compilation');

    assertFileEquality(test,
      'tmp/join/join.js',
      'test/expected/join/join.js',
      'Should concatenate coffeescript files prior to compilation into a single javascript file');

    assertFileEquality(test,
      'tmp/join/bareCoffee.js',
      'test/expected/bare/coffee.js',
      'Bare compilation of one file with join enabled should match bare compilation');

    assertFileEquality(test,
      'tmp/join/bareJoin.js',
      'test/expected/join/bareJoin.js',
      'Bare compilation of multiple join files should be equivalent to concatenated compilation');

    test.done();
  }
};