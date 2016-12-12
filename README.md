# [Buckets](https://github.com/mauriciosantos/buckets/)

[![Build Status](https://travis-ci.org/mauriciosantos/Buckets-JS.svg?branch=master)](https://travis-ci.org/mauriciosantos/Buckets-JS)
[![NPM Version](https://img.shields.io/npm/v/buckets-js.svg)](https://img.shields.io/npm/v/buckets-js.svg)

**A JavaScript Data Structure Library**

Buckets is a complete, fully tested and documented data structure library written in pure JavaScript.

## Included data structures

- [Linked List](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.LinkedList.html)
- [Dictionary](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.Dictionary.html)
- [Multi Dictionary](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.MultiDictionary.html)
- [Binary Search Tree](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.BSTree.html)
- [Stack](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.Stack.html)
- [Queue](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.Queue.html)
- [Set](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.Set.html)
- [Bag](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.Bag.html)
- [Binary Heap](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.Heap.html)
- [Priority Queue](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.PriorityQueue.html)

Buckets also includes several functions for manipulating [arrays](http://mauriciosantos.github.io/Buckets-JS/symbols/buckets.arrays.html).

## Supported platforms

- Every desktop and mobile browser (including IE6)
- Node.js

If it supports JavaScript, it probably supports buckets.

## Downloading Buckets

Download directly

- [buckets.js](https://github.com/mauriciosantos/Buckets-JS/releases/latest) (for development) or
- [buckets.min.js](https://github.com/mauriciosantos/Buckets-JS/releases/latest) (for production)

Then, add it as a script tag to your page:

```html
<script src="buckets.js"></script>
<script>
  var aSet = new buckets.Set();
</script>
```

Or install `bucketsjs` using [bower](http://bower.io/)

```shell
bower install bucketsjs
```

Or use an [AMD](https://github.com/amdjs/amdjs-api) loader

```javascript
require(["./bower/bucketsjs/buckets.js"], function(buckets) {
  var hm = new buckets.Dictionary();
});
```

Or install `buckets-js` using [npm](https://www.npmjs.com/)

```shell
npm install buckets-js
```

In [Node.js](https://nodejs.org/): `var buckets = require('buckets-js');`.

## Usage

```javascript
var a = new buckets.Set();
var b = new buckets.Set();
a.add(1);
a.add(2);
b.add(2);
a.union(b); // {1,2}
```
Read the [documentation](http://mauriciosantos.github.io/Buckets-JS/).

## Building Buckets

There's nothing else you need to use buckets. However, this [guide](./BUILD.md) may help you if you wish to contribute to the project or modify it.
