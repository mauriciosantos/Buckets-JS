This document is a guide to help you build buckets.js and buckets.min.js from scratch.
It may help you in case you modify the source files.

## Installing dependencies

1. Install [Node.js](https://nodejs.org/)
2. Install [Grunt CLI](http://gruntjs.com/getting-started#installing-the-cli): `npm install -g grunt-cli`
3. Run `npm install` from the current directory to download Grunt development dependencies.
	
## Building

Run `grunt` from the current directory.

This will read all the files inside `src/` and create buckets.js, buckets.min.js, run all tests inside `test/` and generate documentation.

## Generating documentation 

Run `grunt doc` from the current directory.

## Testing 

Run `grunt test` from the current directory.

## Bumping package version

Run `grunt bump` from the current directory. See [Grunt Bump](https://github.com/vojtajina/grunt-bump). This will update package.json, bower.json, commit, tag the version and push to the remote repository.

There are a few other commands defined in `Gruntfile.js`. Check them out.

## Additional information 

- [Grunt Task Runner](http://gruntjs.com/)