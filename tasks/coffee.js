/*
 * grunt-contrib-coffee
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-coffee/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  grunt.registerMultiTask('coffee', 'Compile CoffeeScript files into JavaScript', function() {

    var _ = grunt.util._;
    var path = require('path');
    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this);

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);


    this.files.forEach(function(file) {
      if(path.extname(file.dest) === ''){
        compileToDir(file, options);
      }
      else{
        compileAndConcat(file, options);
      }
    });
  });

  var compileToDir = function(file, options){
    grunt.file.mkdir(file.dest);
    grunt.log.writeln('Directory ' + file.dest + ' created.');

    var _ = grunt.util._;
    var path = require('path');

    var srcFiles,
      destPath,
      sourceCode,
      sourceCompiled,
      helperOptions;

    srcFiles = grunt.file.expandFiles(file.src);

    srcFiles.forEach(function(srcFile) {
      // ======================
      // The following segment is derived from https://github.com/avalade/grunt-coffee
      // ======================
      destPath = file.dest;

      if( destPath && options.preserveDirs ){
        var dirname = path.dirname(srcFile);
        if ( options.basePath ) {
          dirname = dirname.replace(new RegExp('^'+options.basePath), '');
        }
        destPath = path.join(destPath, dirname);
      } else if( !destPath ){
        destPath = path.dirname(srcFile);
      }

      var dest = path.join(destPath, path.basename(srcFile, '.coffee') + '.js');

      // De-dup dest if we have .js.js
      if (dest.match(/\.js\.js/)) {
        dest = dest.replace(/\.js\.js/, ".js");
      }

      if (path.extname(srcFile) === '.js') {
        grunt.file.copy(srcFile, dest);
        return true;
      }

      if( options.bare !== false ) {
        options.bare = true;
      }

      helperOptions = _.extend({filename: srcFile}, options);
      sourceCode = grunt.file.read(srcFile);

      sourceCompiled = compileCoffee(sourceCode, helperOptions);

      grunt.file.write(dest, sourceCompiled);
      grunt.log.writeln('File ' + dest + ' created.');
    });
  };

  var compileAndConcat = function(file, options){
    var _ = grunt.util._;

    var srcFiles;
    var taskOutput;
    var sourceCode;
    var sourceCompiled;
    var helperOptions;

    srcFiles = grunt.file.expandFiles(file.src);

    taskOutput = [];

    srcFiles.forEach(function(srcFile) {
      helperOptions = _.extend({filename: srcFile}, options);
      sourceCode = grunt.file.read(srcFile);

      sourceCompiled = compileCoffee(sourceCode, helperOptions);

      taskOutput.push(sourceCompiled);
    });

    if (taskOutput.length > 0) {
      grunt.file.write(file.dest, taskOutput.join('\n'));
      grunt.log.writeln('File ' + file.dest + ' created.');
    }
  };

  var compileCoffee = function(coffeescript, options) {
    try {
      return require('coffee-script').compile(coffeescript, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('CoffeeScript failed to compile.');
    }
  };
};