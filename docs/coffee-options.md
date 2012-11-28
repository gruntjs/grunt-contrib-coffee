# Options

## bare
Type: ```boolean```

Compile the JavaScript without the top-level function safety wrapper.

### basePath
Type: ```string``` (individual only)

As of v0.3.0, you can use *.{ext} as your destination filename to individually compile each file to the destination directory. Otherwise, when the source contains an array of multiple filepaths, the contents are concatenated in the order passed.  This option adjusts the folder structure when compiled to the destination directory. When not explicitly set, best effort is made to locate the basePath by comparing all source filepaths left to right for a common pattern.

## flatten
Type: ```boolean``` (individual only)
Default: `false`

This option performs a flat compile that dumps all the files into the root of the destination directory, overwriting files if they exist.
