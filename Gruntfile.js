/*
 * grunt-contrib-coffee
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var mixedConcatFixtures = [
    'test/fixtures/coffee1.coffee',
    'test/fixtures/coffee2.coffee',
    'test/fixtures/litcoffee.litcoffee'
  ];

  var uniformConcatFixtures = [
    'test/fixtures/coffee1.coffee',
    'test/fixtures/coffee2.coffee'
  ];

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp/bare', 'tmp/default', 'tmp/join', 'tmp/sourceMapDir1', 'tmp/sourceMapDir2', 'tmp/nest']
    },

    // Configuration to be run (and then tested).
    coffee: {
      compileDefault: {
        files: {
          'tmp/default/coffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/default/litcoffee.js': ['test/fixtures/litcoffee.litcoffee'],
          'tmp/default/litcoffeemd.js': ['test/fixtures/litcoffee.coffee.md'],
          'tmp/default/concat.js': mixedConcatFixtures
        }
      },
      compileBare: {
        options: {
          bare: true
        },
        files: {
          'tmp/bare/coffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/bare/litcoffee.js': ['test/fixtures/litcoffee.litcoffee'],
          'tmp/bare/litcoffeemd.js': ['test/fixtures/litcoffee.coffee.md'],
          'tmp/bare/concat.js': mixedConcatFixtures
        }
      },
      compileJoined: {
        options: {
          join: true
        },
        files: {
          'tmp/join/coffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/join/join.js': uniformConcatFixtures
        }
      },
      compileBareJoined: {
        options: {
          bare: true,
          join: true
        },
        files: {
          'tmp/join/bareCoffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/join/bareJoin.js': uniformConcatFixtures
        }
      },
      compileMaps: {
        options: {
          sourceMap: true
        },
        files: {
          'tmp/maps/coffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/maps/coffeeJoin.js': uniformConcatFixtures
        }
      },
      compileSourceMapDir: {
        options: {
          sourceMap: true,
          sourceMapDir: 'tmp/sourceMapDir2'
        },
        files: {
          'tmp/sourceMapDir1/coffee.js': ['test/fixtures/coffee1.coffee']
        }
      },
      compileEachMap: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'test/fixtures/',
          src: ['coffee1.coffee', 'litcoffee.litcoffee'],
          dest: 'tmp/eachMap/',
          ext: '.js'
        }]
      },
      compileBareMaps: {
        options: {
          sourceMap: true,
          bare: true
        },
        files: {
          'tmp/maps/coffeeBare.js': ['test/fixtures/coffee1.coffee'],
          'tmp/maps/coffeeBareJoin.js': uniformConcatFixtures
        }
      },
      compileNested: {
        options: {
          sourceMap: true
        },
        files: {
          'tmp/nest/1/coffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/nest/2/coffee.js': ['test/fixtures/coffee1.coffee']
        }
      },
      compileMDCoffeeMaps: {
        options: {
          sourceMap: true,
          joinExt: '.src.coffee.md'
        },
        files: [{
          'tmp/litCoffeeMaps/mdcoffee.js':['test/fixtures/mdcoffee.coffee.md', 'test/fixtures/mdcoffee1.coffee.md'],
        }]
      },
      compileLitCoffeeMaps: {
        options: {
          sourceMap: true,
          joinExt: '.src.litcoffee'
        },
        files: [{
          'tmp/litCoffeeMaps/litcoffee.js':['test/fixtures/litcoffee.litcoffee', 'test/fixtures/litcoffee1.litcoffee'],
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'coffee', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};
