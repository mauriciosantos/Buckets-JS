// Copyright 2012 Mauricio Santos. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//
// Some documentation is borrowed from the Officieal Java API
// as it serves the same porpose.
/**
 * @namespace Top level namespace for Buckets, a JavaScript data structure library.
 */
var buckets = {};

/**
 * @namespace Contains functions used by several data structures.
 * @private
 */
buckets.common = {};

/**
 * Default function to compare element order.
 * @function
 * @private
 */
buckets.common.defaultCompare = function(a, b) {

    if (a < b) {
        return - 1;
    } else if (a === b) {
        return 0;
    } else {
        return 1;
    }
};
/**
 * Default function to test equality.
 * @function
 * @private
 */
buckets.common.defaultEquals = function(a, b) {
    return a === b;
};
/**
 * Default function to convert an object to a string.
 * @function
 * @private
 */
buckets.common.defaultToString = function(obj) {

    if (Object.prototype.toString.call(obj) === '[object String]') {
        return obj;
    } else if (obj === null) {
        return 'BUCKETS_NULL_OBJECT';
    } else if (obj === undefined) {
        return 'BUCKETS_UNDEFINED_OBJECT';
    } else {
        return obj.toString();
    }
};
/**
 * Reverses a compare function.
 * @function
 * @private
 */
buckets.common.reverseCompareFunction = function(compareFunction) {

    if (compareFunction === null || compareFunction === undefined) {

        return function(a, b) {
            if (a < b) {
                return 1;
            } else if (a === b) {
                return 0;
            } else {
                return - 1;
            }
        };
    } else {
        return function(d, v) {
            return compareFunction(d, v) * -1;
        };
    }
};

/**
 * Returns an equal function given a compare function.
 * @function
 * @private
 */
buckets.common.compareToEquals = function(compareFunction) {
    return function(a, b) {
        return compareFunction(a, b) === 0;
    };
};


/**
 * @namespace Contains various functions for manipulating arrays.
 */
buckets.arrays = {};

/**
 * Returns the position of the first occurrence of the specified element
 * within the specified array.
 * @param {Array} array the array in which to search element.
 * @param {Object} element the element to search.
 * @param {Function=} equalsFunction optional function used to 
 * check equality between 2 elements.
 * @return {number} the position of the first occurrence of the specified element
 * within the specified array.
 */
buckets.arrays.indexOf = function(array, element, equalsFunction) {
    var equals = equalsFunction || buckets.common.defaultEquals;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], element)) {
            return i;
        }
    }
    return - 1;
};

/**
 * Returns the position of the last occurrence of the specified element
 * within the specified array.
 * @param {Array} array the array in which to search element.
 * @param {Object} element the element to search.
 * @param {Function=} equalsFunction optional function used to 
 * check equality between 2 elements.
 * @return {number} the position of the last occurrence of the specified element
 * within the specified array.
 */
buckets.arrays.lastIndexOf = function(array, element, equalsFunction) {
    var equals = equalsFunction || buckets.common.defaultEquals;
    var length = array.length;
    var index = -1;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], element)) {
            index = i;
        }
    }
    return index;
};

/**
 * Returns true if the specified array contains the specified element.
 * @param {Array} array the array in which to search element.
 * @param {Object} element the element to search.
 * @param {Function=} equalsFunction optional function used to 
 * check equality between 2 elements.
 * @return {boolean} true if the specified array contains the specified element.
 */
buckets.arrays.contains = function(array, element, equalsFunction) {
    return buckets.arrays.indexOf(array, element, equalsFunction) >= 0;
};

/**
 * Returns the number of elements in the specified array equal
 * to the specified object.
 * @param {Array} array the array in which to determine the frequency of element.
 * @param {Object} element the element whose frequency is to be determined.
 * @param {Function=} equalsFunction optional function used to 
 * check equality between 2 elements.
 * @return {number} the number of elements in the specified array 
 * equal to the specified object or -1 if the array or element are undefined.
 */
buckets.arrays.frequency = function(array, element, equalsFunction) {
    var equals = equalsFunction || buckets.common.defaultEquals;
    var length = array.length;
    var freq = 0;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], element)) {
            freq++;
        }
    }
    return freq;
};

/**
 * Returns true if the two specified arrays of booleans are equal to one another.
 * Two arrays are considered equal if both arrays contain the same number
 * of elements, and all corresponding pairs of elements in the two 
 * arrays are equal and are in the same order. 
 * @param {Array} array1 one array to be tested for equality.
 * @param {Array} array2 the other array to be tested for equality.
 * @param {Function=} equalsFunction optional function used to 
 * check equality between elemements in the arrays.
 * @return {boolean} true if the two arrays are equal
 */
buckets.arrays.equals = function(array1, array2, equalsFunction) {
    var equals = equalsFunction || buckets.common.defaultEquals;
    if (array1 === array2) {
        return true;
    }
    if (array1.length !== array2.length) {
        return false;
    }
    var length = array1.length;
    for (var i = 0; i < length; i++) {
        if (!equals(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
};

/**
 * Returns a copy of the specified array.
 * @param {Array} array the array to copy.
 * @return {Array} a copy of the specified array
 */
buckets.arrays.copy = function(array) {
    return array.concat();
};

/**
 * Swaps the elements at the specified positions in the specified array.
 * @param {Array} array The array in which to swap elements.
 * @param {number} i the index of one element to be swapped.
 * @param {number} j the index of the other element to be swapped.
 * @return {boolean} true if the array is defined and the indexes are valid.
 */
buckets.arrays.swap = function(array, i, j) {
    if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
        return false;
    }
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return true;
};

/**
 * Creates an empty Linked List.
 * @class A linked list is a data structure consisting of a group of nodes
 * which together represent a sequence.
 * @constructor
 */
buckets.LinkedList = function() {

    /**
     * First node in the list
     * @type {Object}
     * @private
     */
    this.firstNode = null;

    /**
     * Last node in the list
     * @type {Object}
     * @private
     */
    this.lastNode = null;

    /**
     * Number of elements in the list
     * @type {number}
     * @private
     */
    this.nElements = 0;
};


/**
 * Adds the given object to the end of this list.
 * @param {Object} element Object to be added.
 * @return {boolean} true if the element was inserted or false if the element is undefined.
 */
buckets.LinkedList.prototype.add = function(element) {
    return this.addElementAtIndex(element, this.nElements);
};


/**
 * Adds the given object at the specified position in this list.
 * @param {Object} elem object to be added.
 * @param {number} index index to add the element.
 * @return {boolean} true if the element was added or false if index < 0 ||
 * index > this.size() || elem===undefined.
 */
buckets.LinkedList.prototype.addElementAtIndex = function(elem, index) {

    if (index < 0 || index > this.nElements || elem === undefined) {
        return false;
    }
    var newNode = {
        element: elem,
        next: null
    };
    if (this.nElements === 0) {
        // First node in the list.
        this.firstNode = newNode;
        this.lastNode = newNode;
    } else if (index === this.nElements) {
        // Change this.lastNode node.
        this.lastNode.next = newNode;
        this.lastNode = newNode;
    } else if (index === 0) {
        // Change this.firstNode node.
        newNode.next = this.firstNode;
        this.firstNode = newNode;
    } else {
        var currentNode = this.firstNode;
        var i = 0;
        for (; i < (index - 1); i++) {
            currentNode = currentNode.next;
        }
        newNode.next = currentNode.next;
        currentNode.next = newNode;
    }
    this.nElements++;
    return true;
};


/**
 * Returns the first element in this list.
 * @return {*} the first element of the list or undefined if the list is
 * empty.
 */
buckets.LinkedList.prototype.first = function() {

    if (this.firstNode !== null) {
        return this.firstNode.element;
    }
    return undefined;
};

/**
 * Returns the last element in this list.
 * @return {*} the last element of the list or undefined if the list is
 * empty.
 */
buckets.LinkedList.prototype.last = function() {

    if (this.lastNode !== null) {
        return this.lastNode.element;
    }
    return undefined;
};


/**
 * Returns the element at the specified position in this list.
 * @param {number} index desired index.
 * @return {*} the element at the given index or undefined if index < 0 ||
 * index >= this.nElements.
 */
buckets.LinkedList.prototype.elementAtIndex = function(index) {

    if (index < 0 || index >= this.nElements) {
        return undefined;
    }
    if (index === (this.nElements - 1)) {
        return this.lastNode.element;
    }

    var currentNode = this.firstNode;
    for (var i = 0; i < index; i++) {
        currentNode = currentNode.next;
    }
    return currentNode.element;
};

/**
 * Returns the index in this list of the this.firstNode occurrence of the
 * specified element, or -1 if the List does not contain this element.
 * <p>If the elements inside the list are
 * not comparable with the === operator a custom equals function should be
 * provided to perform searches, the function must receive two arguments and
 * return true if they are equal, false otherwise. Example:</p>
 *
 * <pre>
 * var petsAreEqualByName = function(pet1, pet2) {
 *  return pet1.name === pet2.name;
 * }
 * </pre>
 * @param {Object} element element to search for.
 * @param {function(Object,Object):boolean=} equalsFunction Optional
 * function used to check if two elements are equal.
 * @return {number} the index in this list of the this.firstNode occurrence
 * of the specified element, or -1 if the list does not contain this
 * element.
 */
buckets.LinkedList.prototype.indexOf = function(element, equalsFunction) {

    var equalsF = equalsFunction || buckets.common.defaultEquals;

    if (element === undefined) {
        return - 1;
    }

    var currentNode = this.firstNode;
    var index = 0;
    while (currentNode !== null) {

        if (equalsF(currentNode.element, element)) {
            return index;
        }
        index++;
        currentNode = currentNode.next;
    }

    return - 1;
};

/**
 * Returns true if this list contains the specified element.
 * <p>If the elements inside the list are
 * not comparable with the === operator a custom equals function should be
 * provided to perform searches, the function must receive two arguments and
 * return true if they are equal, false otherwise. Example:</p>
 *
 * <pre>
 * var petsAreEqualByName = function(pet1, pet2) {
 *  return pet1.name === pet2.name;
 * }
 * </pre>
 * @param {Object} element element to search for.
 * @param {function(Object,Object):boolean=} equalsFunction Optional
 * function used to check if two elements are equal.
 * @return {boolean} true if this list contains the specified element, false
 * otherwise.
 */
buckets.LinkedList.prototype.contains = function(element, equalsFunction) {
    return (this.indexOf(element, equalsFunction) >= 0);
};


/**
 * Removes the first occurrence of the specified element in this list.
 * <p>If the elements inside the list are
 * not comparable with the === operator a custom equals function should be
 * provided to perform searches, the function must receive two arguments and
 * return true if they are equal, false otherwise. Example:</p>
 *
 * <pre>
 * var petsAreEqualByName = function(pet1, pet2) {
 *  return pet1.name === pet2.name;
 * }
 * </pre>
 * @param {Object} element element to be removed from this list, if present.
 * @return {boolean} true if the list contained the specified element.
 */
buckets.LinkedList.prototype.remove = function(element, equalsFunction) {
    var equalsF = equalsFunction || buckets.common.defaultEquals;
    if (this.nElements < 1 || element === undefined) {
        return false;
    }
    var previous = null;
    var currentNode = this.firstNode;
    while (currentNode !== null) {

        if (equalsF(currentNode.element, element)) {

            if (currentNode === this.firstNode) {
                this.firstNode = this.firstNode.next;
                if (currentNode === this.lastNode) {
                    this.lastNode = null;
                }
            } else if (currentNode === this.lastNode) {
                this.lastNode = previous;
				previous.next = currentNode.next;
	            currentNode.next = null;
            } else{
			  	previous.next = currentNode.next;
	            currentNode.next = null;
			}
            this.nElements--;
            return true;
        }
        previous = currentNode;
        currentNode = currentNode.next;
    }
    return false;
};

/**
 * Removes all of the elements from this list.
 */
buckets.LinkedList.prototype.clear = function() {
    this.firstNode = null;
    this.lastNode = null;
    this.nElements = 0;
};

/**
 * Removes the element at the specified position in this list.
 * @param {number} index given index.
 * @return {*} removed element or undefined if index < 0 || index >=
 * this.nElements.
 */
buckets.LinkedList.prototype.removeElementAtIndex = function(index) {

    if (index < 0 || index >= this.nElements) {
        return undefined;
    }
    var r;
    if (this.nElements === 1) {
        //First node in the list.
        r = this.firstNode.element;
        this.firstNode = null;
        this.lastNode = null;
    } else {

        var previous = null;
        var current = this.firstNode;

        for (var i = 0; i < index; i++) {
            previous = current;
            current = current.next;
        }
        r = current.element;
        if (current === this.lastNode) {
            this.lastNode = previous;
        } else if (current === this.firstNode) {
            this.firstNode = current.next;
        }
        if (previous !== null) {
            previous.next = current.next;
            current.next = null;
        }
    }
    this.nElements--;
    return r;
};


/**
 * Returns an iterator over the elements in this list (in proper sequence).<br>
 * <br>
 * The iterator has the following operations:<br>
 * <br>
 * hasNext() Returns true if this list iterator has more elements when
 * traversing the list in the forward direction.<br>
 * next() Returns the next element in the list.<br>
 * remove() Removes from the list the last element that was returned by
 * next.<br>
 * replace() Replaces the this.lastNode element returned by next.
 * @return {Object} an iterator over the elements in this list.
 */
buckets.LinkedList.prototype.iterator = function() {

    var previous = null;
    var current = null;
    var next = this.firstNode;
    var it = {};

    it.hasNext = function() {
        return next !== null;
    };
    it.next = function() {

        if (next === null) {
            return undefined;
        }
        previous = current;
        current = next;
        next = current.next;
        return current.element;
    };
    it.remove = function() {
        if (current === null) {
            return undefined;
        }
        var r = current.element;
        if (current === this.firstNode) {
            if (current === this.lastNode) {
                this.firstNode = null;
                this.lastNode = null;
            } else {
                this.firstNode = next;
            }
        } else if (current === this.lastNode) {
            this.lastNode = previous;
            previous.next = null;
        } else {
            previous.next = current.next;
        }
        this.nElements--;
        return r;
    };
    it.replace = function(elem) {
        if (current !== null) {
            var temp = current.element;
            current.element = elem;
            return temp;
        }
        return undefined;
    };
    return it;
};

buckets.LinkedList.prototype.reverse = function() {

    var previous = null;
    var current = this.firstNode;
    var temp = null;
    while (current !== null) {
        temp = current.next;
        current.next = previous;
        previous = current;
        current = temp;
    }
    temp = this.firstNode;
    this.firstNode = this.lastNode;
    this.lastNode = temp;
};


/**
 * Returns an array containing all of the elements in this list in proper
 * sequence.
 * @return {Array.<*>} an array containing all of the elements in this list
 * in proper sequence.
 */
buckets.LinkedList.prototype.toArray = function() {
    var array = [];
    var currentNode = this.firstNode;
    while (currentNode !== null) {
        array.push(currentNode.element);
        currentNode = currentNode.next;
    }
    return array;
};
/**
 * Returns the number of elements in this list.
 * @return {number} the number of elements in this list.
 */
buckets.LinkedList.prototype.size = function() {
    return this.nElements;
};

/**
 * Returns true if this list contains no elements.
 * @return {boolean} true if this list contains no elements.
 */
buckets.LinkedList.prototype.isEmpty = function() {
    return this.nElements <= 0;
};

/**
 * Creates an empty dictionary. 
 * @class <p>Dictionaries map keys to values; each key can map to at most one value.
 * This implementation accepts any kind of objects as keys.</p>
 *
 * <p>If the keys are custom objects a function which converts keys to strings must be
 * provided. Example:</p>
 *
 * <pre>
 * function petToString(pet) {
 *  return pet.name;
 * }
 * </pre>
 * @constructor
 * @param {function(Object):string=} toStringFunction optional function used
 * to convert keys to strings. If the keys aren't strings or if toString()
 * is not appropriate, a custom function which receives a key and returns a
 * unique string must be provided.
 */
buckets.Dictionary = function(toStringFunction) {

    /**
     * Object holding the key-value pairs.
     * @type {Object}
     * @private
     */
    this.table = {};

    /**
     * Number of elements in the list.
     * @type {number}
     * @private
     */
    this.nElements = 0;

    /**
     * Function used to convert keys to strings.
     * @type {function(Object):string}
     * @private
     */
    this.toStr = toStringFunction || buckets.common.defaultToString;
};

/**
 * Returns the value to which this dictionary maps the specified key.
 * Returns undefined if the map contains no mapping for this key.
 * @param {Object} key key whose associated value is to be returned.
 * @return {*} the value to which this dictionary maps the specified key or
 * undefined if the map contains no mapping for this key.
 */
buckets.Dictionary.prototype.get = function(key) {

    var pair = this.table[this.toStr(key)];
    if (pair === undefined) {
        return undefined;
    }
    return pair.value;
};
/**
 * Associates the specified value with the specified key in this dictionary.
 * If the dictionary previously contained a mapping for this key, the old
 * value is replaced by the specified value.
 * @param {Object} key key with which the specified value is to be
 * associated.
 * @param {Object} value value to be associated with the specified key.
 * @return {*} previous value associated with specified key, or undefined if
 * there was no mapping for the key or if the key||value are undefined.
 */
buckets.Dictionary.prototype.set = function(key, value) {

    if (key === undefined || value === undefined) {
        return undefined;
    }

    var ret;
    var k = this.toStr(key);
    var previousElement = this.table[k];
    if (previousElement === undefined) {
        this.nElements++;
        ret = undefined;
    } else {
        ret = previousElement.value;
    }
    this.table[k] = {
        key: key,
        value: value
    };
    return ret;
};
/**
 * Removes the mapping for this key from this dictionary if it is present.
 * @param {Object} key key whose mapping is to be removed from the
 * dictionary.
 * @return {*} previous value associated with specified key, or undefined if
 * there was no mapping for key.
 */
buckets.Dictionary.prototype.remove = function(key) {
    var k = this.toStr(key);
    var previousElement = this.table[k];
    if (previousElement !== undefined) {
        delete this.table[k];
        this.nElements--;
        return previousElement.value;
    }
    return undefined;
};
/**
 * Returns an array containing all of the keys in this dictionary.
 * @return {Array} an array containing all of the keys in this dictionary.
 */
buckets.Dictionary.prototype.keys = function() {
    var array = [];
    for (var name in this.table) {
        if (this.table.hasOwnProperty(name)) {
            array.push(this.table[name].key);
        }
    }
    return array;
};
/**
 * Returns an array containing all of the values in this dictionary.
 * @return {Array} an array containing all of the values in this dictionary.
 */
buckets.Dictionary.prototype.values = function() {
    var array = [];
    for (var name in this.table) {
        if (this.table.hasOwnProperty(name)) {
            array.push(this.table[name].value);
        }
    }
    return array;
};

/**
 * Returns true if this dictionary contains a mapping for the specified key.
 * @param {Object} key key whose presence in this dictionary is to be
 * tested.
 * @return {boolean} true if this dictionary contains a mapping for the
 * specified key.
 */
buckets.Dictionary.prototype.containsKey = function(key) {
    return this.get(key) !== undefined;
};
/**
 * Removes all mappings from this dictionary.
 * @this {buckets.Dictionary}
 */
buckets.Dictionary.prototype.clear = function() {

    this.table = {};
    this.nElements = 0;
};
/**
 * Returns the number of key-value mappings in this dictionary.
 * @return {number} the number of key-value mappings in this dictionary.
 */
buckets.Dictionary.prototype.size = function() {
    return this.nElements;
};
/**
 * Returns true if this dictionary contains no mappings.
 * @return {boolean} true if this dictionary contains no mappings.
 */
buckets.Dictionary.prototype.isEmpty = function() {
    return this.nElements <= 0;
};


/**
 * Creates an empty Heap.
 * @class 
 * <p>A heap is a binary tree, where the nodes maintain the heap property: 
 * each node is smaller than each of its children. 
 * This implementation uses an array to store elements.</p>
 * <p>If the inserted elements are custom objects a compare function must be provided, 
 *  at construction time, otherwise the <=, === and >= operators are 
 * used to compare elements. Example:</p>
 *
 * <pre>
 * function comparePetsByAge(pet1, pet2) {
 *  if (pet1.age &lt; pet2.age) {
 *      return -1;
 *  }
 *  else if (pet1.age &gt; pet2.age) {
 *      return 1;
 *  }
 *  else {
 *      return 0;
 *  }
 * }
 * </pre>
 *
 * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
 * reverse compare function to accomplish this behavior. Example:</p>
 *
 * <pre>
 * function reverseCompareNumbers(a, b) {
 *  if (a &lt; b) {
 *      return 1;
 *  }
 *  else if (a &gt; b) {
 *      return -1;
 *  }
 *  else {
 *      return 0;
 *  }
 * }
 * </pre>
 *
 * @constructor
 * @param {function(Object,Object):number=} compareFunction optional
 * function used to compare two elements. Must return a negative integer,
 * zero, or a positive integer as the first argument is less than, equal to,
 * or greater than the second.
 */
buckets.Heap = function(compareFunction) {

    /**
     * Array used to store the elements od the heap.
     * @type {Array.<Object>}
     * @private
     */
    this.data = [];

    /**
     * Function used to compare elements.
     * @type {function(Object,Object):number}
     * @private
     */
    this.compare = compareFunction || buckets.common.defaultCompare;
};
/**
 * Returns the index of the left child of the node at the given index.
 * @param {number} nodeIndex The index of the node to get the left child
 * for.
 * @return {number} The index of the left child.
 * @private
 */
buckets.Heap.prototype.leftChildIndex = function(nodeIndex) {
    return (2 * nodeIndex) + 1;
};
/**
 * Returns the index of the right child of the node at the given index.
 * @param {number} nodeIndex The index of the node to get the right child
 * for.
 * @return {number} The index of the right child.
 * @private
 */
buckets.Heap.prototype.rightChildIndex = function(nodeIndex) {
    return (2 * nodeIndex) + 2;
};
/**
 * Returns the index of the parent of the node at the given index.
 * @param {number} nodeIndex The index of the node to get the parent for.
 * @return {number} The index of the parent.
 * @private
 */
buckets.Heap.prototype.parentIndex = function(nodeIndex) {
    return Math.floor((nodeIndex - 1) / 2);
};
/**
 * Returns the index of the smaller child node (if it exists).
 * @param {number} leftChild left child index.
 * @param {number} rightChild right child index.
 * @return {number} the index with the minimum value or -1 if it doesn't
 * exists.
 * @private
 */
buckets.Heap.prototype.minIndex = function(leftChild, rightChild) {

    if (rightChild >= this.data.length) {
        if (leftChild >= this.data.length) {
            return - 1;
        } else {
            return leftChild;
        }
    } else {
        if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
            return leftChild;
        } else {
            return rightChild;
        }
    }
};
/**
 * Moves the node at the given index up to its proper place in the heap.
 * @param {number} index The index of the node to move up.
 * @private
 */
buckets.Heap.prototype.siftUp = function(index) {

    var value = this.data[index];
    while (index > 0) {
        var parent = this.parentIndex(index);
        if (this.compare(this.data[parent], value) > 0) {
            this.data[index] = this.data[parent];
            index = parent;
        } else {
            break;
        }
    }
    this.data[index] = value;
};
/**
 * Moves the node at the given index down to its proper place in the heap.
 * @param {number} nodeIndex The index of the node to move down.
 * @private
 */
buckets.Heap.prototype.siftDown = function(nodeIndex) {

    var min = this.minIndex(this.leftChildIndex(nodeIndex),
    this.rightChildIndex(nodeIndex));

    while (min >= 0 && this.compare(this.data[nodeIndex],
    this.data[min]) > 0) {
        var tmp = this.data[min];
        this.data[min] = this.data[nodeIndex];
        this.data[nodeIndex] = tmp;
        nodeIndex = min;
        min = this.minIndex(this.leftChildIndex(nodeIndex),
        this.rightChildIndex(nodeIndex));
    }
};
/**
 * Retrieves but does not remove the root element of this heap.
 * @return {*} The value at the root of the heap. Returns undefined if the
 * heap is empty.
 */
buckets.Heap.prototype.peek = function() {

    if (this.data.length > 0) {
        return this.data[0];
    } else {
        return undefined;
    }
};
/**
 * Adds the given element into the heap.
 * @param {*} element the element.
 * @return true if the element was added or fals if it is undefined.
 */
buckets.Heap.prototype.add = function(element) {
    if (element === undefined) {
        return undefined;
    }
    this.data.push(element);
    this.siftUp(this.data.length - 1);
    return true;
};

/**
 * Retrieves and removes the root element of this heap.
 * @return {*} The value removed from the root of the heap. Returns
 * undefined if the heap is empty.
 */
buckets.Heap.prototype.removeRoot = function() {

    if (this.data.length > 0) {
        var obj = this.data[0];
        this.data[0] = this.data[this.data.length - 1];
        this.data.splice(this.data.length - 1, 1);
        if (this.data.length > 0) {
            this.siftDown(0);
        }
        return obj;
    }
    return undefined;
};
/**
 * Returns true if this heap contains the specified element.
 * @param {Object} element element to search for.
 * @return {boolean} true if this Heap contains the specified element, false
 * otherwise.
 */
buckets.Heap.prototype.contains = function(element) {
    var equF = buckets.common.compareToEquals(this.compare);
    return buckets.arrays.contains(this.data, element, equF);
};
/**
 * Returns the number of elements in this heap.
 * @return {number} the number of elements in this heap.
 */
buckets.Heap.prototype.size = function() {
    return this.data.length;
};
/**
 * Checks if this heap is empty.
 * @return {boolean} true if and only if this heap contains no items; false
 * otherwise.
 */
buckets.Heap.prototype.isEmpty = function() {
    return this.data.length <= 0;
};
/**
 * Removes all of the elements from this heap.
 */
buckets.Heap.prototype.clear = function() {
    this.data.length = 0;
};
/**
 * Creates an empty Stack.
 * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
 * element added to the stack will be the first one to be removed. This
 * implementation uses a linked list as a container.
 * @constructor
 */
buckets.Stack = function() {

    /**
     * List containing the elements.
     * @type buckets.LinkedList
     * @private
     */
    this.list = new buckets.LinkedList();
};
/**
 * Pushes an item onto the top of this stack.
 * @param {Object} elem the element to be pushed onto this stack.
 * @return {boolean} true if the element was pushed or false if it is undefined.
 */
buckets.Stack.prototype.push = function(elem) {
    return this.list.addElementAtIndex(elem, 0);
};
/**
 * Pushes an item onto the top of this stack.
 * @param {Object} elem the element to be pushed onto this stack.
 * @return {boolean} true if the element was pushed or false if it is undefined.
 */
buckets.Stack.prototype.add = function(elem) {
    return this.list.addElementAtIndex(elem, 0);
};
/**
 * Removes the object at the top of this stack and returns that object.
 * @return {*} the object at the top of this stack or undefined if the
 * stack is empty.
 */
buckets.Stack.prototype.pop = function() {
    return this.list.removeElementAtIndex(0);
};
/**
 * Looks at the object at the top of this stack without removing it from the
 * stack.
 * @return {*} the object at the top of this stack or undefined if the
 * stack is empty.
 */
buckets.Stack.prototype.peek = function() {
    return this.list.first();
};
/**
 * Returns the number of elements in this stack.
 * @return {number} the number of elements in this stack.
 */
buckets.Stack.prototype.size = function() {
    return this.list.size();
};

/**
 * Returns true if this stack contains the specified element.
 * <p>If the elements inside this stack are
 * not comparable with the === operator, a custom equals function should be
 * provided to perform searches, the function must receive two arguments and
 * return true if they are equal, false otherwise. Example:</p>
 *
 * <pre>
 * var petsAreEqualByName = function(pet1, pet2) {
 *  return pet1.name === pet2.name;
 * }
 * </pre>
 * @param {Object} elem element to search for.
 * @param {function(Object,Object):boolean=} equalsFunction optional
 * function to check if two elements are equal.
 * @return {boolean} true if this stack contains the specified element,
 * false otherwise.
 */
buckets.Stack.prototype.contains = function(elem, equalsFunction) {
    return this.list.contains(elem, equalsFunction);
};
/**
 * Checks if this stack is empty.
 * @return {boolean} true if and only if this stack contains no items; false
 * otherwise.
 */
buckets.Stack.prototype.isEmpty = function() {
    return this.list.isEmpty();
};
/**
 * Removes all of the elements from this stack.
 */
buckets.Stack.prototype.clear = function() {
    this.list.clear();
};

/**
 * Creates an empty queue.
 * @class A queue is a First-In-First-Out (FIFO) data structure, the first
 * element added to the queue will be the first one to be removed. This
 * implementation uses a linked list as a container.
 * @constructor
 */
buckets.Queue = function() {

    /**
     * List containing the elements.
     * @type buckets.LinkedList
     * @private
     */
    this.list = new buckets.LinkedList();
};
/**
 * Inserts the specified element into the end of this queue.
 * @param {Object} elem the element to insert.
 * @return {boolean} true if the element was inserted, or false if it is undefined.
 */
buckets.Queue.prototype.enqueue = function(elem) {
    return this.list.add(elem);
};
/**
 * Inserts the specified element into the end of this queue.
 * @param {Object} elem the element to insert.
 * @return {boolean} true if the element was inserted, or false if it is undefined.
 */
buckets.Queue.prototype.add = function(elem) {
    return this.list.add(elem);
};
/**
 * Retrieves and removes the head of this queue.
 * @return {*} the head of this queue, or undefined if this queue is empty.
 */
buckets.Queue.prototype.dequeue = function() {
    if (this.list.size() !== 0) {
        var el = this.list.first();
        this.list.removeElementAtIndex(0);
        return el;
    }
    return undefined;
};
/**
 * Retrieves, but does not remove, the head of this queue.
 * @return {*} the head of this queue, or undefined if this queue is empty.
 */
buckets.Queue.prototype.peek = function() {

    if (this.list.size() !== 0) {
        return this.list.first();
    }
    return undefined;
};

/**
 * Returns the number of elements in this queue.
 * @return {number} the number of elements in this queue.
 */
buckets.Queue.prototype.size = function() {
    return this.list.size();
};

/**
 * Returns true if this queue contains the specified element.
 * <p>If the elements inside this stack are
 * not comparable with the === operator, a custom equals function should be
 * provided to perform searches, the function must receive two arguments and
 * return true if they are equal, false otherwise. Example:</p>
 *
 * <pre>
 * var petsAreEqualByName = function(pet1, pet2) {
 *  return pet1.name === pet2.name;
 * }
 * </pre>
 * @param {Object} elem element to search for.
 * @param {function(Object,Object):boolean=} equalsFunction optional
 * function to check if two elements are equal.
 * @return {boolean} true if this queue contains the specified element,
 * false otherwise.
 */
buckets.Queue.prototype.contains = function(elem, equalsFunction) {
    return this.list.contains(elem, equalsFunction);
};

/**
 * Checks if this queue is empty.
 * @return {boolean} true if and only if this queue contains no items; false
 * otherwise.
 */
buckets.Queue.prototype.isEmpty = function() {
    return this.list.size() <= 0;
};

/**
 * Removes all of the elements from this queue.
 */
buckets.Queue.prototype.clear = function() {
    this.list.clear();
};

/**
 * Creates an empty priority queue.
 * @class <p>In a priority queue each element is associated with a "priority",
 * elements are dequeued in highest-priority-first order (the elements with the 
 * highest priority are dequeued first). Priority Queues are implemented as heaps. 
 * If the inserted elements are custom objects a compare function must be provided, 
 * otherwise the <=, === and >= operators are used to compare object priority.</p>
 * @constructor
 * @param {function(Object,Object):number=} compareFunction optional
 * function used to compare two element priorities. Must return a negative integer,
 * zero, or a positive integer as the first argument is less than, equal to,
 * or greater than the second.
 */
buckets.PriorityQueue = function(compareFunction) {
    this.heap = new buckets.Heap(buckets.common.reverseCompareFunction(compareFunction));
};

/**
 * Inserts the specified element into this priority queue.
 * @param {Object} element the element to insert.
 * @return {boolean} true if the element was inserted, or false if it is undefined.
 */
buckets.PriorityQueue.prototype.enqueue = function(element) {
    return this.heap.add(element);
};

/**
 * Inserts the specified element into this priority queue.
 * @param {Object} element the element to insert.
 * @return {boolean} true if the element was inserted, or false if it is undefined.
 */
buckets.PriorityQueue.prototype.add = function(element) {
    return this.heap.add(element);
};

/**
 * Retrieves and removes the highest priority element of this queue.
 * @return {*} the the highest priority element of this queue, 
or undefined if this queue is empty.
 */
buckets.PriorityQueue.prototype.dequeue = function() {
    if (this.heap.size() !== 0) {
        var el = this.heap.peek();
        this.heap.removeRoot();
        return el;
    }
    return undefined;
};

/**
 * Retrieves, but does not remove, the highest priority element of this queue.
 * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
 */
buckets.PriorityQueue.prototype.peek = function() {
    return this.heap.peek();
};

/**
 * Returns true if this priority queue contains the specified element.
 * @param {Object} element element to search for.
 * @return {boolean} true if this priority queue contains the specified element,
 * false otherwise.
 */
buckets.PriorityQueue.prototype.contains = function(element) {
    return this.heap.contains(element);
};

/**
 * Checks if this priority queue is empty.
 * @return {boolean} true if and only if this priority queue contains no items; false
 * otherwise.
 */
buckets.PriorityQueue.prototype.isEmpty = function() {
    return this.heap.isEmpty();
};

/**
 * Returns the number of elements in this priority queue.
 * @return {number} the number of elements in this priority queue.
 */
buckets.PriorityQueue.prototype.size = function() {
    return this.heap.size();
};

/**
 * Removes all of the elements from this priority queue.
 */
buckets.PriorityQueue.prototype.clear = function() {
    this.heap.clear();
};


/**
 * Creates an empty set.
 * @class <p>A set is a data structure that contains no duplicate items.</p>
 * <p>If the inserted elements are custom objects a function 
 * which converts elements to strings must be provided. Example:</p>
 *
 * <pre>
 * function petToString(pet) {
 *  return pet.name;
 * }
 * </pre>
 *
 * @constructor
 * @param {function(Object):string=} toStringFunction optional function used
 * to convert elements to strings. If the elements aren't strings or if toString()
 * is not appropriate, a custom function which receives a key and returns a
 * unique string must be provided.
 */
buckets.Set = function(toStringFunction) {
    this.dictionary = new buckets.Dictionary(toStringFunction);
};

/**
 * Returns true if this set contains the specified element.
 * @param {Object} element element to search for.
 * @return {boolean} true if this set contains the specified element,
 * false otherwise.
 */
buckets.Set.prototype.contains = function(element) {
    return this.dictionary.containsKey(element);
};

/**
 * Adds the specified element to this set if it is not already present.
 * @param {Object} element the element to insert.
 * @return {boolean} true if this set did not already contain the specified element.
 */
buckets.Set.prototype.add = function(element) {
    if (this.contains(element) || element === undefined) {
        return false;
    } else {
        this.dictionary.set(element, element);
        return true;
    }
};

/**
 * Removes the specified element from this set if it is present.
 * @return {boolean} true if this set contained the specified element.
 */
buckets.Set.prototype.remove = function(element) {
    if (!this.contains(element)) {
        return false;
    } else {
        this.dictionary.remove(element);
        return true;
    }
};

/**
 * Returns an iterator over the elements in this set. 
 * The elements are returned in no particular order.<br>
 * <br>
 * The iterator has the following operations:<br>
 * <br>
 * hasNext() Returns true if this set iterator has more elements.
 * next() Returns the next element in the set.<br>
 * remove() Removes from the set the last element that was returned by
 * next().<br>
 * @return {Object} an iterator over the elements in this set.
 */
buckets.Set.prototype.iterator = function() {

    var keys = this.dictionary.keys();
    var set = this;
    var current = -1;
    var next = 0;
    var it = {};

    it.hasNext = function() {
        return next < keys.length;
    };
    it.next = function() {
        if (next >= keys.length) {
            return undefined;
        }
        current = next;
        next = current + 1;
        return set.dictionary.get(keys[current]);
    };
    it.remove = function() {
        if (current < keys.length && current >= 0) {
            return set.dictionary.remove(keys[current]);
        }
    };
    return it;
};

/**
 * Returns an array containing all of the elements in this set in arbitrary order.
 * @return {Array} an array containing all of the elements in this set.
 */
buckets.Set.prototype.toArray = function() {
    return this.dictionary.values();
};

/**
 * Returns true if this set contains no elements.
 * @return {boolean} true if this set contains no elements.
 */
buckets.Set.prototype.isEmpty = function() {
    return this.dictionary.isEmpty();
};

/**
 * Returns the number of elements in this set.
 * @return {number} the number of elements in this set.
 */
buckets.Set.prototype.size = function() {
    return this.dictionary.size();
};

/**
 * Removes all of the elements from this set.
 */
buckets.Set.prototype.clear = function() {
    this.dictionary.clear();
};


buckets.Bag = function(toStringFunction) {
    this.dictionary = new buckets.Dictionary(toStringFunction);
    this.nElements = 0;
};



buckets.Bag.prototype.add = function(element, nCopies) {

    if (isNaN(nCopies) || nCopies === undefined) {
        nCopies = 1;
    }
    if (element === undefined || nCopies <= 0) {
        return false;
    }

    if (!this.contains(element)) {
        var node = {
            value: element,
            copies: nCopies
        };
        this.dictionary.set(element, node);
    } else {
        this.dictionary.get(element).copies += nCopies;
    }
    this.nElements += nCopies;
    return true;
};

buckets.Bag.prototype.contains = function(element) {
    return this.dictionary.containsKey(element);
};

buckets.Bag.prototype.remove = function(element, nCopies) {

    if (isNaN(nCopies) || nCopies === undefined) {
        nCopies = 1;
    }
    if (element === undefined || nCopies <= 0) {
        return false;
    }

    if (!this.contains(element)) {
        return false;
    } else {
        var node = this.dictionary.get(element);
        if (nCopies > node.copies) {
            this.nElements -= node.copies;
        } else {
            this.nElements -= nCopies;
        }
        node.copies -= nCopies;
        if (node.copies <= 0) {
            this.dictionary.remove(element);
        }
        return true;
    }
};

buckets.Bag.prototype.toArray = function() {
    var a = [];
    var values = this.dictionary.values();
    var vl = values.length;
    for (var i = 0; i < vl; i++) {
        var node = values[i];
        var element = node.value;
        var copies = node.copies;
        for (var j = 0; j < copies; j++) {
            a.push(element);
        }
    }
    return a;
};

buckets.Bag.prototype.iterator = function() {

    var values = this.dictionary.values();
    var bag = this;
    var copies = 0;
    var current = -1;
    var next = 0;
    var it = {};

    it.hasNext = function() {
        return copies > 0 || next < values.length;
    };
    it.next = function() {
        if (copies <= 0 || next >= values.length) {
            return undefined;
        }
        if (copies <= 0) {
            current = next;
            next = current + 1;
            copies = values[current].copies - 1;
            return values[current].value;
        } else {
            copies--;
            return values[current].value;
        }
    };
    it.remove = function() {
        if (current < values.length && current >= 0) {
            return bag.remove(values[current].value);
        }
    };
    return it;
};

buckets.Bag.prototype.size = function() {
    return this.nElements;
};

buckets.Bag.prototype.isEmpty = function() {
    return this.nElements === 0;
};

buckets.Bag.prototype.clear = function() {
    this.nElements = 0;
    this.dictionary.clear();
};