/*
 * grunt-contrib-coffee
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

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
      tests: ['tmp/bare', 'tmp/default', 'tmp/join']
    },

    // Configuration to be run (and then tested).
    coffee: {
      compileDefault: {
        files: {
          'tmp/default/coffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/default/litcoffee.js': ['test/fixtures/litcoffee.litcoffee'],
          'tmp/default/litcoffeemd.js': ['test/fixtures/litcoffee.coffee.md'],
          'tmp/default/concat.js': [
            'test/fixtures/coffee1.coffee',
            'test/fixtures/coffee2.coffee',
            'test/fixtures/litcoffee.litcoffee'
          ]
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
          'tmp/bare/concat.js': [
            'test/fixtures/coffee1.coffee',
            'test/fixtures/coffee2.coffee',
            'test/fixtures/litcoffee.litcoffee'
          ]
        }
      },
      compileJoined: {
        options: {
          join: true
        },
        files: {
          'tmp/join/coffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/join/join.js': [
            'test/fixtures/coffee1.coffee',
            'test/fixtures/coffee2.coffee'
          ]
        }
      },
      compileBareJoined: {
        options: {
          bare: true,
          join: true
        },
        files: {
          'tmp/join/bareCoffee.js': ['test/fixtures/coffee1.coffee'],
          'tmp/join/bareJoin.js': [
            'test/fixtures/coffee1.coffee',
            'test/fixtures/coffee2.coffee'
          ]
        }
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
  grunt.registerTask('test', ['clean', 'coffee', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
