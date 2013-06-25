[Buckets](github.com/mauriciosantos/buckets/)
====================
**A JavaScript Data Structure Library**

Buckets is a complete, fully tested and documented data structure library written in pure JavaScript.

Included data structures
---------------------

- [Linked List](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.LinkedList.html)
- [Dictionary](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.Dictionary.html)
- [Multi Dictionary](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.MultiDictionary.html)
- [Binary Search Tree](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.BSTree.html)
- [Stack](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.Stack.html)
- [Queue](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.Queue.html)
- [Set](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.Set.html)
- [Bag](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.Bag.html)
- [Binary Heap](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.Heap.html)
- [Priority Queue](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.PriorityQueue.html)

Buckets also includes several functions for manipulating [arrays](http://htmlpreview.github.io/?https://raw.github.com/mauriciosantos/buckets/master/doc/symbols/buckets.arrays.html).

Supported platforms
--------------------

- Every desktop and mobile browser (including IE6)
- Node.js

If it supports JavaScript, it probably supports buckets.

How to use?
--------------------

Download

- [buckets.js](https://raw.github.com/mauriciosantos/buckets/master/buckets.js) (for development) or
- [buckets-minified.js](https://raw.github.com/mauriciosantos/buckets/master/buckets-minified.js) (for production)

Include the script and start coding. For NodeJS: `var buckets = require('buckets.js')`.

Example

```javascript
var setA = new buckets.Set();
var setB = new buckets.Set();
setA.add(1);
setB.add(2);
setA.union(setB); // {1,2}
```
Read the [documentation](http://htmlpreview.github.io/?https://github.com/mauriciosantos/buckets/blob/master/doc/index.html).

Support
--------------------

Mauricio Santos, [mauriciosantoss@gmail.com](mailto:mauriciosantoss@gmail.com)
