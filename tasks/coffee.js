/*
 * grunt-contrib-coffee
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';


  grunt.registerMultiTask('coffee', 'Compile CoffeeScript files into JavaScript', function() {
    var path = require('path');
    var helpers = require('grunt-lib-contrib').init(grunt);

    var options = helpers.options(this, {
      bare: false
    });

    if (options.basePath || options.flatten) {
      grunt.fail.warn('experimental destination wildcards are no longer supported. please refer to readme.');
    }

    grunt.verbose.writeflags(options, 'Options');

    var taskOutput = [];
    var files = this.file.src;
    var dest = this.file.dest;

    if (files.length === 0) {
      grunt.log.writeln('Unable to compile; no valid source files were found.');
      return;
    }

    files.forEach(function(file) {
      var srcCompiled = compileCoffee(file, options);

      taskOutput.push(srcCompiled);
    });

    if (taskOutput.length > 0) {
      grunt.file.write(dest, taskOutput.join('\n') || '');
      grunt.log.writeln('File ' + dest.cyan + ' created.');
    }
  });

  var compileCoffee = function(srcFile, options) {
    options = grunt.util._.extend({filename: srcFile}, options);
    delete options.basePath;
    delete options.flatten;

    var srcCode = grunt.file.read(srcFile);

    try {
      return require('coffee-script').compile(srcCode, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('CoffeeScript failed to compile.');
    }
  };
};
