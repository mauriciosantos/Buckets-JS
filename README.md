[Buckets](https://github.com/mauriciosantos/buckets/)
====================
**A JavaScript Data Structure Library**

Buckets is a complete, fully tested and documented data structure library written in pure JavaScript.

Included data structures
---------------------

- [Linked List](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.LinkedList.html)
- [Dictionary](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.Dictionary.html)
- [Multi Dictionary](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.MultiDictionary.html)
- [Binary Search Tree](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.BSTree.html)
- [Stack](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.Stack.html)
- [Queue](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.Queue.html)
- [Set](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.Set.html)
- [Bag](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.Bag.html)
- [Binary Heap](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.Heap.html)
- [Priority Queue](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.PriorityQueue.html)

Buckets also includes several functions for manipulating [arrays](https://rawgithub.com/mauriciosantos/buckets/master/doc/symbols/buckets.arrays.html).

Supported platforms
--------------------

- Every desktop and mobile browser (including IE6)
- Node.js

If it supports JavaScript, it probably supports buckets.

Downloading Buckets
--------------------

Download directly

- [buckets.js](https://rawgithub.com/mauriciosantos/buckets/master/buckets.js) (for development) or
- [buckets.min.js](https://rawgithub.com/mauriciosantos/buckets/master/buckets.min.js) (for production)

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
  var hm = new buckets.Dictionary()
});
```

Or install `buckets-js` using [npm](https://www.npmjs.com/)

```shell
npm install buckets-js
```

In [Node.js](https://nodejs.org/): `var buckets = require('buckets-js');`.

Usage
--------------------

```javascript
var a = new buckets.Set();
var b = new buckets.Set();
a.add(1);
a.add(2);
b.add(2);
a.union(b); // {1,2}
```
Read the [documentation](https://rawgithub.com/mauriciosantos/buckets/master/doc/index.html).

Building guide
--------------------

There's nothing else you need to use buckets. However, this [guide](./BUILD.md) may help you if you wish to contribute to the project or modify it.

Support
--------------------

Mauricio Santos, [mauriciosantoss@gmail.com](mailto:mauriciosantoss@gmail.com)
