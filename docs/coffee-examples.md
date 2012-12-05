# Usage Examples

``` javascript
coffee: {
  compile: {
    files: {
      'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
      'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
    }
  }
}
```

check out this [gist](https://gist.github.com/3703920) if your looking to compile each file in a directory individually. grunt may include such a utility in future versions but for now the gist allows any task that supports 1:1 compiling to support dynamic 1:1 compiling based on glob.
