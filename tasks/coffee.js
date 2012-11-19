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
      bare: false,
      basePath: false,
      flatten: false
    });

    grunt.verbose.writeflags(options, 'Options');

    var taskOutput = [];
    var files = this.file.src;
    var dest = this.file.dest;

    if (files.length === 0) {
      grunt.log.writeln('Unable to compile; no valid source files were found.');
      return;
    }

    // hack by chris to support compiling individual files
    if (helpers.isIndividualDest(dest)) {
      var basePath = helpers.findBasePath(files, options.basePath);
    }

    files.forEach(function(file) {
      var srcCompiled = compileCoffee(file, options);

      if (basePath !== undefined) {
        var newFileDest = helpers.buildIndividualDest(dest, file, basePath, options.flatten);

        grunt.file.write(newFileDest, srcCompiled || '');
        grunt.log.writeln('File ' + newFileDest.cyan + ' created.');
      } else {
        taskOutput.push(srcCompiled);
      }
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
