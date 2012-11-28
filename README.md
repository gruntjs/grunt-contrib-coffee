# grunt-contrib-coffee [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-coffee.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-coffee)

> Compile CoffeeScript files to JavaScript.


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-coffee --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Coffee task
_Run this task with the `grunt coffee` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


### Options

#### bare
Type: ```boolean```

Compile the JavaScript without the top-level function safety wrapper.

##### basePath
Type: ```string``` (individual only)

As of v0.3.0, you can use *.{ext} as your destination filename to individually compile each file to the destination directory. Otherwise, when the source contains an array of multiple filepaths, the contents are concatenated in the order passed.  This option adjusts the folder structure when compiled to the destination directory. When not explicitly set, best effort is made to locate the basePath by comparing all source filepaths left to right for a common pattern.

#### flatten
Type: ```boolean``` (individual only)
Default: `false`

This option performs a flat compile that dumps all the files into the root of the destination directory, overwriting files if they exist.

### Usage Examples

``` javascript
coffee: {
  compile: {
    files: {
      'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
      'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'], // compile and concat into single file
      'path/to/*.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile individually into dest, maintaining folder structure
    }
  },
  flatten: {
    options: {
      flatten: true
    },
    files: {
      'path/to/*.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile individually into dest, flattening folder structure
    }
  }
}
```


## Release History

 * 2012-10-11   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-24   v0.3.1   Don't fail when there are no files.
 * 2012-09-23   v0.3.0   Global options depreciated.
 * 2012-09-09   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Eric Woroshow](http://ericw.ca/)

*This file was generated on Wed Nov 28 2012 08:27:39.*
