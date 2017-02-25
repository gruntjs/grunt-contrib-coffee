# grunt-contrib-coffee v1.0.0 [![Build Status: Linux](https://travis-ci.org/gruntjs/grunt-contrib-coffee.svg?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-coffee) [![Build Status: Windows](https://ci.appveyor.com/api/projects/status/ns3waxwcw8ddcr3f/branch/master?svg=true)](https://ci.appveyor.com/project/gruntjs/grunt-contrib-coffee/branch/master)

> Compile CoffeeScript files to JavaScript



## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-coffee --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-coffee');
```

*This plugin was designed to work with Grunt >= 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*



## Coffee task
_Run this task with the `grunt coffee` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### separator
Type: `String`  
Default: linefeed

Concatenated files will be joined on this string.

#### bare
Type: `Boolean`

Compile the JavaScript without the top-level function safety wrapper.

#### join
Type: `Boolean`  
Default: `false`

When compiling multiple .coffee files into a single .js file, concatenate first.

#### sourceMap
Type: `Boolean`  
Default: `false`

Compile JavaScript and create a .map file linking it to the CoffeeScript source. When compiling multiple .coffee files to a single .js file, concatenation occurs as though the 'join' option is enabled

#### sourceMapDir
Type: `String`  
Default: (same path as your compiled js files)

Generated source map files will be created here.

#### joinExt
Type: `String`  
Default: '.src.coffee'

Resulting extension when joining multiple CoffeeScript files.

### Usage Examples

```js
coffee: {
  compile: {
    files: {
      'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
      'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
    }
  },

  compileBare: {
    options: {
      bare: true
    },
    files: {
      'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
      'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
    }
  },

  compileJoined: {
    options: {
      join: true
    },
    files: {
      'path/to/result.js': 'path/to/source.coffee', // 1:1 compile, identical output to join = false
      'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // concat then compile into single file
    }
  },

  compileWithMaps: {
    options: {
      sourceMap: true
    },
    files: {
      'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
      'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // concat then compile into single file
    }
  },

  compileWithMapsDir: {
    options: {
      sourceMap: true,
      sourceMapDir: 'path/to/maps/' // source map files will be created here
    },
    files: {
      'path/to/result.js': 'path/to/source.coffee'
    }
  },

  glob_to_multiple: {
    expand: true,
    flatten: true,
    cwd: 'path/to',
    src: ['*.coffee'],
    dest: 'path/to/dest/',
    ext: '.js'
  }

}
```

For more examples on how to use the `expand` API to manipulate the default dynamic path construction in the `glob_to_multiple` examples, see "[Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically)" in the grunt wiki entry [Configuring Tasks](http://gruntjs.com/configuring-tasks).


## Release History

 * 2017-02-24   v1.1.0   Updates to CoffeeScript 1.12.4.
 * 2016-02-15   v1.0.0   Updates to CoffeeScript 1.10.0. Update other dependencies. Use `options.sourceMapDir` when creating `sourceRoot`. Logs information if no valid files were matched.
 * 2015-02-20   v0.13.0   Updates to CoffeeScript 1.9.1.
 * 2014-10-04   v0.12.0   Fixes litcoffee sourcemaps. Updates to CoffeeScript 1.8.0.
 * 2014-08-15   v0.11.1   Fixes summary logging.
 * 2014-08-06   v0.11.0   Adds summary containing number of files created. Move file creation logging to `grunt.verbose`. Updates chalk to 0.5.
 * 2014-02-07   v0.10.0   `sourceMappingURL` calculated correctly.
 * 2014-01-29   v0.9.0   Source mapping fixes. Update CoffeeScript to 1.7.0. Use lodash directly instead of deprecated `grunt.util._`.
 * 2014-01-17   v0.8.2   Force CoffeeScript 1.6.3. Use new `sourceMappingUrl` syntax.
 * 2014-01-17   v0.8.1   Fix sourcemap regression.
 * 2013-12-24   v0.8.0   Support `sourceMapDir`.
 * 2013-04-19   v0.7.0   Place source maps at bottom of file. Change extension for source maps from .maps to .js.map.
 * 2013-04-18   v0.6.7   Improved error reporting.
 * 2013-04-08   v0.6.6   Fix regression with single-file compilation.
 * 2013-04-05   v0.6.5   Improved error reporting.
 * 2013-03-22   v0.6.4   Sourcemap support.
 * 2013-03-19   v0.6.3   Increase error logging verbosity.
 * 2013-03-18   v0.6.2   Bump to CoffeeScript 1.6.2.
 * 2013-03-18   v0.6.1   Support `join` option.
 * 2013-03-06   v0.6.0   Bump to CoffeeScript 1.6. Support literate CoffeeScript extension coffee.md.
 * 2013-02-25   v0.5.0   Bump to CoffeeScript 1.5. Support literate CoffeeScript (.litcoffee).
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-23   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions. Bump coffeescript dependency to 1.4.
 * 2013-01-09   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Switching to `this.filesSrc` API.
 * 2012-12-15   v0.4.0a   Conversion to grunt v0.4 conventions. Remove experimental destination wildcards.
 * 2012-10-12   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-25   v0.3.1   Don't fail when there are no files.
 * 2012-09-24   v0.3.0   Global options depreciated.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Eric Woroshow](http://ericw.ca/)

*This file was generated on Fri Mar 18 2016 19:15:25.*
