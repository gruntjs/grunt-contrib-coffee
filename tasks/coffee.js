/*
 * grunt-contrib-coffee
 * http://gruntjs.com/
 *
 * Copyright (c) 2017 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var chalk = require('chalk');
  var _ = require('lodash');
  var uriPath = require('uri-path');

  grunt.registerMultiTask('coffee', 'Compile CoffeeScript files into JavaScript', function() {
    var options = this.options({
      bare: false,
      join: false,
      sourceMap: false,
      joinExt: '.src.coffee',
      separator: grunt.util.linefeed
    });
    var actionCounts = {
      createdFile: 0,
      createdMap: 0
    };

    options.separator = grunt.util.normalizelf(options.separator);

    this.files.forEach(function(f) {
      var validFiles = removeInvalidFiles(f);

      if (validFiles.length === 0) {
        grunt.log.warn('Destination ' + chalk.cyan(f.dest) + ' not written because no source files were found.');
        return;
      }

      if (options.sourceMap === true) {
        var paths = createOutputPaths(f.dest);
        // add sourceMapDir to options object
        var fileOptions = _.extend({ sourceMapDir: paths.destDir }, options);
        var writeResult = writeFileAndMap(paths, compileWithMaps(validFiles, fileOptions, paths), fileOptions);
        actionCounts.createdFile += writeResult.createdFile;
        actionCounts.createdMap += writeResult.createdMap;
      } else if (options.join === true) {
        actionCounts.createdFile += writeCompiledFile(f.dest, concatInput(validFiles, options));
      } else {
        actionCounts.createdFile += writeCompiledFile(f.dest, concatOutput(validFiles, options));
      }
    });

    grunt.log.ok(actionCounts.createdFile + ' files created.');
    if (actionCounts.createdMap > 0) {
      grunt.log.ok(actionCounts.createdMap + ' source map files created.');
    }
  });

  var isLiterate = function(ext) {
    return ext === '.litcoffee' || ext === '.md';
  };

  var removeInvalidFiles = function(files) {
    return files.src.filter(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      }
      return true;
    });
  };

  var createOutputPaths = function(destination) {
    var fileName = path.basename(destination, path.extname(destination));
    return {
      dest: destination,
      destName: fileName,
      destDir: appendTrailingSlash(path.dirname(destination)),
      mapFileName: fileName + '.js.map'
    };
  };

  var appendTrailingSlash = function(dirname) {
    if (dirname.length > 0 && dirname.slice(-1) !== path.sep) {
      return dirname + path.sep;
    }
    return dirname;
  };

  var compileWithMaps = function(files, options, paths) {
    if (!hasUniformExtensions(files)) {
      return;
    }

    var mapOptions, filepath;

    if (files.length > 1) {
      mapOptions = createOptionsForJoin(files, paths, options.separator, options.joinExt);
    } else {
      mapOptions = createOptionsForFile(files[0], paths, options);
      filepath = files[0];
    }

    options = _.extend({
      generatedFile: path.basename(paths.dest),
      sourceRoot: uriPath(mapOptions.sourceRoot),
      sourceFiles: mapOptions.sourceFiles
    }, options);

    var output = compileCoffee(mapOptions.code, options, filepath);
    appendFooter(output, paths, options);
    return output;
  };

  var hasUniformExtensions = function(files) {
    // get all extensions for input files
    var extensions = _.uniq(files.map(path.extname));

    if (extensions.length > 1) {
      grunt.fail.warn('Join and sourceMap options require input files share the same extension (found ' + extensions.join(', ') + ').');
      return false;
    }
    return true;
  };

  var createOptionsForJoin = function (files, paths, separator, joinExt) {
    var code = concatFiles(files, separator);
    var targetFileName = paths.destName + joinExt;
    grunt.file.write(paths.destDir + targetFileName, code);

    return {
      code: code,
      sourceFiles: [targetFileName],
      sourceRoot: ''
    };
  };

  var concatFiles = function(files, separator) {
    return files.map(grunt.file.read).join(separator);
  };

  var createOptionsForFile = function(file, paths, options) {
    return {
      code: grunt.file.read(file),
      sourceFiles: [path.basename(file)],
      sourceRoot: appendTrailingSlash(path.relative(options.sourceMapDir, path.dirname(file)))
    };
  };

  var appendFooter = function(output, paths, options) {
    // We need the sourceMappingURL to be relative to the JS path
    var sourceMappingDir = appendTrailingSlash(path.relative(paths.destDir, options.sourceMapDir));
    // Add sourceMappingURL to file footer
    output.js = output.js + '\n//# sourceMappingURL=' + uriPath(sourceMappingDir) + paths.mapFileName + '\n';
  };

  var concatInput = function(files, options) {
    if (hasUniformExtensions(files)) {
      var code = concatFiles(files, options.separator);
      return compileCoffee(code, options);
    }
  };

  var concatOutput = function(files, options) {
    return files.map(function(filepath) {
      var code = grunt.file.read(filepath);
      return compileCoffee(code, options, filepath);
    }).join(options.separator);
  };

  var compileCoffee = function(code, options, filepath) {
    var coffeeOptions = _.clone(options);
    if (filepath) {
      coffeeOptions.filename = filepath;
      coffeeOptions.literate = isLiterate(path.extname(filepath));
    } else {
      coffeeOptions.literate = isLiterate(path.extname(options.joinExt));
    }

    try {
      return require('coffee-script').compile(code, coffeeOptions);
    } catch (e) {
      if (e.location == null ||
          e.location.first_column == null ||
          e.location.first_line == null) {
        grunt.log.error('Got an unexpected exception ' +
                        'from the coffee-script compiler. ' +
                        'The original exception was: ' +
                        e);
        grunt.log.error('(The coffee-script compiler should not raise *unexpected* exceptions. ' +
                        'You can file this error as an issue of the coffee-script compiler: ' +
                        'https://github.com/jashkenas/coffee-script/issues)');
      } else {
        var firstColumn = e.location.first_column;
        var firstLine = e.location.first_line;
        var codeLine = code.split('\n')[firstLine];
        var errorArrows = chalk.red('>>') + ' ';
        var offendingCharacter;

        if (firstColumn < codeLine.length) {
          offendingCharacter = chalk.red(codeLine[firstColumn]);
        } else {
          offendingCharacter = '';
        }

        grunt.log.error(e);
        grunt.log.error('In file: ' + filepath);
        grunt.log.error('On line: ' + firstLine);
        // log erroneous line and highlight offending character
        // grunt.log.error trims whitespace so we have to use grunt.log.writeln
        grunt.log.writeln(errorArrows + codeLine.substring(0, firstColumn) +
                          offendingCharacter + codeLine.substring(firstColumn + 1));
        grunt.log.writeln(errorArrows + grunt.util.repeat(firstColumn, ' ') +
                          chalk.red('^'));
      }
      grunt.fail.warn('CoffeeScript failed to compile.');
    }
  };

  var writeFileAndMap = function(paths, output, options) {
    if (!output || output.js.length === 0) {
      warnOnEmptyFile(paths.dest);
      return;
    }

    var createdFile = writeCompiledFile(paths.dest, output.js);
    options.sourceMapDir = appendTrailingSlash(options.sourceMapDir);
    var createdMap = writeSourceMapFile(options.sourceMapDir + paths.mapFileName, output.v3SourceMap);

    return {
      createdFile: createdFile,
      createdMap: createdMap
    };
  };

  var warnOnEmptyFile = function(path) {
    grunt.log.warn('Destination "' + path + '" not written because compiled files were empty.');
  };

  var writeFile = function(path, output) {
    if (output.length < 1) {
      warnOnEmptyFile(path);
      return false;
    }
    grunt.file.write(path, output);
    return true;
  };

  var writeCompiledFile = function(path, output) {
    if (writeFile(path, output)) {
      grunt.verbose.writeln('File ' + chalk.cyan(path) + ' created.');
      return 1;
    }
    return 0;
  };
  var writeSourceMapFile = function(path, output) {
    if (writeFile(path, output)) {
      grunt.verbose.writeln('File ' + chalk.cyan(path) + ' created (source map).');
      return 1;
    }
    return 0;
  };
};
