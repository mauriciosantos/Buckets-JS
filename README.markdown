[Buckets](github.com/mauriciosantos/buckets/)
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

How to use?
--------------------

Download

- [buckets.js](https://rawgithub.com/mauriciosantos/buckets/master/buckets.js) (for development) or
- [buckets-minified.js](https://rawgithub.com/mauriciosantos/buckets/master/buckets-minified.js) (for production)

Include the script and start coding. For NodeJS: `var buckets = require('buckets.js')`.

Example

```javascript
var setA = new buckets.Set();
var setB = new buckets.Set();
setA.add(1);
setB.add(2);
setA.union(setB); // {1,2}
```
Read the [documentation](https://rawgithub.com/mauriciosantos/buckets/master/doc/index.html).

Support
--------------------

Mauricio Santos, [mauriciosantoss@gmail.com](mailto:mauriciosantoss@gmail.com)
