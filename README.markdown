[Buckets](github.com/mauriciosantos/buckets/)
====================
**A JavaScript Data Structure Library**

Buckets is a complete, fully tested and documented data structure library written in pure JavaScript.

Included data structures
---------------------

- [Linked List](http://mauriciosantos.github.com/buckets/symbols/buckets.LinkedList.html)
- [Dictionary](http://mauriciosantos.github.com/buckets/symbols/buckets.Dictionary.html)
- [Multi Dictionary](http://mauriciosantos.github.com/buckets/symbols/buckets.MultiDictionary.html)
- [Binary Search Tree](http://mauriciosantos.github.com/buckets/symbols/buckets.BSTree.html)
- [Stack](http://mauriciosantos.github.com/buckets/symbols/buckets.Stack.html)
- [Queue](http://mauriciosantos.github.com/buckets/symbols/buckets.Queue.html)
- [Set](http://mauriciosantos.github.com/buckets/symbols/buckets.Set.html)
- [Bag](http://mauriciosantos.github.com/buckets/symbols/buckets.Bag.html)
- [Binary Heap](http://mauriciosantos.github.com/buckets/symbols/buckets.Heap.html)
- [Priority Queue](http://mauriciosantos.github.com/buckets/symbols/buckets.PriorityQueue.html)

Buckets also includes several functions for manipulating [arrays](http://mauriciosantos.github.com/buckets/symbols/buckets.arrays.html).

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

Include the script and start coding.

Example

```javascript
var setA = new buckets.Set();
var setB = new buckets.Set();
setA.add(1);
setB.add(2);
setA.union(setB); // {1,2}
```
Read the [documentation](http://mauriciosantos.github.com/buckets/).

Support
--------------------

Mauricio Santos, [mauriciosantoss@gmail.com](mailto:mauriciosantoss@gmail.com)