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
    var options = this.options({
      bare: false,
      join: false,
      separator: grunt.util.linefeed
    });

    if (options.basePath || options.flatten) {
      grunt.fail.warn('Experimental destination wildcards are no longer supported. please refer to README.');
    }

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(f) {
      var validFiles = removeInvalidFiles(f);
      var output;

      if (options.join === true) {
        output = concatInput(validFiles, options);
      } else {
        output = concatOutput(validFiles, options);
      }

      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        grunt.file.write(f.dest, output);
        grunt.log.writeln('File ' + f.dest + ' created.');
      }
    });
  });

  var removeInvalidFiles = function(files) {
    return files.src.filter(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    });
  };

  var concatInput = function (files, options) {
    var code = files.map(function (filePath) {
      return grunt.file.read(filePath);
    }).join(grunt.util.normalizelf(grunt.util.linefeed));
    options = grunt.util._.clone(options);
    return require('coffee-script').compile(code, options);
  };

  var concatOutput = function(files, options) {
    return files.map(function(filepath) {
      return compileCoffee(filepath, options);
    }).join(grunt.util.normalizelf(options.separator));
  };

  var compileCoffee = function(srcFile, options) {
    options = grunt.util._.extend({filename: srcFile}, options);

    var ext = require('path').extname(srcFile);
    if (ext === '.litcoffee' || ext === '.md') {
      options.literate = true;
    }

    var srcCode = grunt.file.read(srcFile);

    try {
      return require('coffee-script').compile(srcCode, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('CoffeeScript failed to compile.');
    }
  };
};
