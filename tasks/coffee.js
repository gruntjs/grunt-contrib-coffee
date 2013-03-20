/*
 * grunt-contrib-coffee
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var _ = grunt.util._;

  grunt.registerMultiTask('coffee', 'Compile CoffeeScript files into JavaScript', function() {

    var options = this.options({
      bare: false,
      join: false,
      separator: grunt.util.linefeed
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function (f) {
      var validFiles = removeInvalidFiles(f);
      var output;

      // get all extensions for input files
      var ext = validFiles.map(function (f) {
        return path.extname(f);
      });

      if (options.join === true) {
        if(_.uniq(ext).length > 1) {
          grunt.fail.warn('Join options requires input files share the same extension (found '+_.uniq(ext).join(', ')+').');
        } else {
          output = concatInput(validFiles, options);
        }
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

  var isLiterate = function (ext) {
    return (ext === ".litcoffee" || ext === ".md");
  };

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
    }).join(grunt.util.normalizelf(options.separator));
    return compileCoffee(code, options);
  };

  var concatOutput = function(files, options) {
    return files.map(function(filepath) {
      var code = grunt.file.read(filepath);
      return compileCoffee(code, options, filepath);
    }).join(grunt.util.normalizelf(options.separator));
  };

  var compileCoffee = function(code, options, filepath) {
    options = _.clone(options);
    if(filepath) {
      options.filename = filepath;
      options.literate = isLiterate(path.extname(filepath));
    }

    try {
      return require('coffee-script').compile(code, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.log.error('In file: '+filepath);
      grunt.log.error('On line: '+e.location.first_line);
      grunt.fail.warn('CoffeeScript failed to compile.');
    }
  };
};
