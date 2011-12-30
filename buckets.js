// Copyright 2012 Mauricio Santos. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//


/**
 * Buckets (A Javascript Data Structure Library)
 * @author Mauricio Santos
 * @namespace Main namespace used to hold frequently used data structures.
 */
var buckets = {};

 (function() {
    "use strict";

    var common = {};
    common.DEFAULT_COMPARE = function(a, b) {

        if (a < b) {
            return - 1;
        }
        else if (a === b) {
            return 0;
        }
        else {
            return 1;
        }
    };

    common.DEFAULT_EQUALS = function(a, b) {
        return a === b;
    };

    common.DEFAULT_TO_STRING = function(obj) {
        if (Object.prototype.toString.call(obj) === '[object String]') {
            return obj;
        }
        else {
            return obj.toString();
        }
    };

    common.createReverseCompareFunction = function(compareFunction) {
        if (compareFunction === null || compareFunction === undefined) {

            return function(a, b) {
                if (a < b) {
                    return - 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return 1;
                }
            };
        }
        else {
            return function(d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    };

    //
    // Linked List implementation
    //
    /**
	 * Creates an empty Linked List.
	 * @class A linked list is a data structure consisting of a group of nodes
	 * which together represent a sequence. If the elements inside the list are
	 * not comparable with the === operator a custom equals function should be
	 * provided to perform searches, the function must receive two arguments and
	 * return true if they are equal, false otherwise. Example:
	 * 
	 * <pre>
	 * var petsAreEqualByName = function(pet1, pet2) {
	 * 	return pet1.name === pet2.name;
	 * }
	 * 
	 * var petList = new buckets.LinkedList(petsAreEqualByName);
	 * var numberList = new buckets.LinkedList();
	 * 
	 * </pre>
	 * 
	 * @constructor
	 * @this {buckets.LinkedList}
	 * @param {function(Object,Object):boolean=} equalsFunction Optional
	 * function used to check if two elements are equal.
	 */
    buckets.LinkedList = function(equalsFunction) {

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

        /**
		 * Function used to check if two elements are equal.
		 * @type {function(Object,Object):boolean}
		 * @private
		 */
        this.equalsF = equalsFunction || common.DEFAULT_EQUALS;
    };

    /**
	 * Adds the given object to the end of this list.
	 * @this {buckets.LinkedList}
	 * @param {Object} element Object to be added.
	 * @returns {boolean} always returns true.
	 */
    buckets.LinkedList.prototype.add = function add(element) {
        return this.addElementAtIndex(element, this.nElements);
    };

    /**
	 * Adds the given object at the specified position in this list.
	 * @this {buckets.LinkedList}
	 * @param {Object} elem object to be added.
	 * @param {number} index index to add the element.
	 * @returns {boolean} true if the element was added or false if index < 0 ||
	 * index > this.nElements.
	 */
    buckets.LinkedList.prototype.addElementAtIndex = function(elem, index) {

        if (index < 0 || index > this.nElements) {
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
        }
        else if (index === this.nElements) {
            // Change this.lastNode node.
            this.lastNode.next = newNode;
            this.lastNode = newNode;
        }
        else if (index === 0) {
            // Change this.firstNode node.
            newNode.next = this.firstNode;
            this.firstNode = newNode;
        }
        else {
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
	 * @this {buckets.LinkedList}
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
	 * @this {buckets.LinkedList}
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
	 * @this {buckets.LinkedList}
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
	 * @this {buckets.LinkedList}
	 * @param {Object} element element to search for.
	 * @return {number} the index in this list of the this.firstNode occurrence
	 * of the specified element, or -1 if the list does not contain this
	 * element.
	 */
    buckets.LinkedList.prototype.indexOf = function(element) {

        var currentNode = this.firstNode;
        var index = 0;
        while (currentNode !== null) {

            if (this.equalsF(currentNode.element, element)) {
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }

        return - 1;
    };

    /**
	 * Returns true if this list contains the specified element.
	 * @this {buckets.LinkedList}
	 * @param {Object} element element to search for.
	 * @return {boolean} true if this list contains the specified element, false
	 * otherwise.
	 */
    buckets.LinkedList.prototype.contains = function(element) {
        return (this.indexOf(element) >= 0);
    };

    /**
	 * Removes the first occurrence of the specified element in this list.
	 * @this {buckets.LinkedList}
	 * @param {Object} element element to be removed from this list, if present.
	 * @return {boolean} true if the list contained the specified element.
	 */
    buckets.LinkedList.prototype.remove = function(element) {

        if (this.nElements < 1) {
            return false;
        }
        else {

            var previous = null;
            var currentNode = this.firstNode;
            while (currentNode !== null) {

                if (this.equalsF(currentNode.element, element)) {

                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                        break;
                    }
                    else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                    }
                    previous.next = currentNode.next;
                    currentNode.next = null;
                    break;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
        }

        this.nElements--;
        return true;
    };

    /**
	 * Removes all of the elements from this list.
	 * @this {buckets.LinkedList}
	 */
    buckets.LinkedList.prototype.clear = function() {
        this.firstNode = null;
        this.lastNode = null;
        this.nElements = 0;
    };

    /**
	 * Removes the element at the specified position in this list.
	 * @this {buckets.LinkedList}
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
        }
        else {

            var previous = null;
            var current = this.firstNode;

            for (var i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            }
            r = current.element;
            if (current === this.lastNode) {
                this.lastNode = previous;
            }
            else if (current === this.firstNode) {
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
	 * Returns an iterator of the elements in this list (in proper sequence).<br>
	 * <br>
	 * The iterator has the following operations:<br>
	 * <br>
	 * hasNext() Returns true if this list iterator has more elements when
	 * traversing the list in the forward direction.<br>
	 * next() Returns the next element in the list.<br>
	 * remove() Removes from the list the last element that was returned by
	 * next.<br>
	 * replace() Replaces the this.lastNode element returned by next.
	 * @this {buckets.LinkedList}
	 * @return {*} an iterator of the elements in this list.
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
            var r = current.element;
            if (current === this.firstNode) {
                if (current === this.lastNode) {
                    this.firstNode = null;
                    this.lastNode = null;
                }
                else {
                    this.firstNode = next;
                }
            }
            else if (current === this.lastNode) {
                this.lastNode = previous;
                previous.next = null;
            }
            else {
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

    /**
	 * Returns an array containing all of the elements in this list in proper
	 * sequence.
	 * @this {buckets.LinkedList}
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
	 * @this {buckets.LinkedList}
	 * @return {number} the number of elements in this list.
	 */
    buckets.LinkedList.prototype.size = function() {
        return this.nElements;
    };

    /**
	 * Returns true if this list contains no elements.
	 * @this {buckets.LinkedList}
	 * @return {boolean} true if this list contains no elements.
	 */
    buckets.LinkedList.prototype.isEmpty = function() {
        return this.nElements <= 0;
    };

    //
    // Dictionary implementation
    //
    /**
	 * Creates an empty dictionary. A dictionary maps keys to values. A map
	 * cannot contain duplicate keys; each key can map to at most one value.
	 * This dictionary accepts any kind of objects as keys. If the keys are
	 * custom objects a function which converts keys to strings must be
	 * provided. Example:
	 * 
	 * <pre>
	 * function petToString(pet) {
	 * 	return pet.name;
	 * }
	 * </pre>
	 * 
	 * @constructor
	 * @this {buckets.Dictionary}
	 * @param {function(Object):string} toStringFunction optional function used
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
        this.toStr = toStringFunction || common.DEFAULT_TO_STRING;
    };

    /**
	 * Returns the value to which this dictionary maps the specified key.
	 * Returns undefined if the map contains no mapping for this key.
	 * @this {buckets.Dictionary}
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
	 * @this {buckets.Dictionary}
	 * @param {Object} key key with which the specified value is to be
	 * associated.
	 * @param {Object} value value to be associated with the specified key.
	 * @return {*} previous value associated with specified key, or undefined if
	 * there was no mapping for key.
	 */
    buckets.Dictionary.prototype.set = function(key, value) {

        var ret;
        var k = this.toStr(key);
        var previousElement = this.table[k];
        if (previousElement === undefined) {
            this.nElements++;
            ret = undefined;
        }
        else {
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
	 * @this {buckets.Dictionary}
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
	 * Returns an array with the keys contained in this dictionary.
	 * @this {buckets.Dictionary}
	 * @return {Array} an array with the keys contained in this dictionary.
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
	 * Returns an array with the values contained in this dictionary.
	 * @this {buckets.Dictionary}
	 * @return {Array} an array with the values contained in this dictionary.
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
	 * @this {buckets.Dictionary}
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
	 * @this {buckets.Dictionary}
	 * @return {number} the number of key-value mappings in this dictionary.
	 */
    buckets.Dictionary.prototype.size = function() {
        return this.nElements;
    };

    /**
	 * Returns true if this dictionary contains no mappings.
	 * @this {buckets.Dictionary}
	 * @return {boolean} true if this dictionary contains no mappings.
	 */
    buckets.Dictionary.prototype.isEmpty = function() {
        return this.nElements <= 0;
    };

    //
    // Heap implementation
    //
    /**
	 * Creates an empty Heap.
	 * @class Smaller elements are on top. If the inserted elements are custom
	 * objects a compare function must be provided, otherwise the <=, === and >=
	 * operators are used to compare objects. Example:
	 * 
	 * <pre>
	 * function comparePetsByAge(pet1, pet2) {
	 * 	if (pet1.age &lt; pet2.age) {
	 * 		return -1;
	 * 	}
	 * 	else if (pet1.age &gt; pet2.age) {
	 * 		return 1;
	 * 	}
	 * 	else {
	 * 		return 0;
	 * 	}
	 * }
	 * </pre>
	 * 
	 * If a Max-Heap is wanted (greater elements on top) you can a provide a
	 * reverse compare function to accomplish this behavior. Example:
	 * 
	 * <pre>
	 * function reverseCompareNumbers(a, b) {
	 * 	if (a &lt; b) {
	 * 		return 1;
	 * 	}
	 * 	else if (a &gt; b) {
	 * 		return -1;
	 * 	}
	 * 	else {
	 * 		return 0;
	 * 	}
	 * }
	 * </pre>
	 * 
	 * @constructor
	 * @this {buckets.Heap}
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
        this.compare = compareFunction || common.DEFAULT_COMPARE;
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
	 * @this {buckets.Heap}
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
            }
            else {
                return leftChild;
            }
        }
        else {
            if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                return leftChild;
            }
            else {
                return rightChild;
            }
        }
    };

    /**
	 * Moves the node at the given index up to its proper place in the heap.
	 * @this {buckets.Heap}
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
            }
            else {
                break;
            }
        }
        this.data[index] = value;
    };

    /**
	 * Moves the node at the given index down to its proper place in the heap.
	 * @this {buckets.Heap}
	 * @param {number} nodeIndex The index of the node to move down.
	 * @private
	 */
    buckets.Heap.prototype.siftDown = function(nodeIndex) {

        var min = this.minIndex(this.leftChildIndex(nodeIndex), this
        .rightChildIndex(nodeIndex));

        while (min >= 0
        && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
            var tmp = this.data[min];
            this.data[min] = this.data[nodeIndex];
            this.data[nodeIndex] = tmp;
            nodeIndex = min;
            min = this.minIndex(this.leftChildIndex(nodeIndex), this
            .rightChildIndex(nodeIndex));
        }
    };

    /**
	 * Retrieves but does not remove the root element of this heap.
	 * @this {buckets.Heap}
	 * @return {*} The value at the root of the heap. Returns undefined if the
	 * heap is empty.
	 */
    buckets.Heap.prototype.peek = function() {

        if (this.data.length > 0) {
            return this.data[0];
        }
        else {
            return undefined;
        }
    };

    /**
	 * Adds the given element into the heap.
	 * @this {buckets.Heap}
	 * @param {*} element the element.
	 */
    buckets.Heap.prototype.add = function(element) {
        this.data.push(element);
        this.siftUp(this.data.length - 1);
    };

    /**
	 * Retrieves and removes the root element of this heap.
	 * @this {buckets.Heap}
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
	 * Returns true if this Heap contains the specified element.
	 * @this {buckets.Heap}
	 * @param {Object} element element to search for.
	 * @return {boolean} true if this Heap contains the specified element, false
	 * otherwise.
	 */
    buckets.Heap.prototype.contains = function(element) {

        var l = this.data.length;
        for (var i = 0; i < l; i++) {
            if (this.compare(this.data[i], element) === 0) {
                return true;
            }
        }
        return false;
    };

    /**
	 * Returns the number of elements in this heap.
	 * @this {buckets.Heap}
	 * @return {number} the number of elements in this heap.
	 */
    buckets.Heap.prototype.size = function() {
        return this.data.length;
    };

    /**
	 * Checks if this heap is empty.
	 * @this {buckets.Heap}
	 * @return {boolean} true if and only if this heap contains no items; false
	 * otherwise.
	 */
    buckets.Heap.prototype.isEmpty = function() {
        return this.data.length <= 0;
    };

    /**
	 * Removes all of the elements from this heap.
	 * @this {buckets.Heap}
	 */
    buckets.Heap.prototype.clear = function() {
        this.data.length = 0;
    };

    //
    // Stack implementation
    //
    /**
	 * Creates an empty Stack.
	 * @class A Stack is a Last-In-First-Out (FIFO) data structure, the last
	 * element added to the stack will be the first one to be removed. This
	 * implementation uses a linked list as a container. If the elements inside
	 * the stack are not comparable with the === operator, a custom equals
	 * function should be provided to perform searches with contains().
	 * @constructor
	 * @this {buckets.Stack}
	 * @param {function(Object,Object):boolean=} equalsFunction Optional
	 * function used to check if two elements are equal.
	 */
    buckets.Stack = function(equalsFunction) {

        /**
		 * List containing the elements.
		 * @type buckets.LinkedList
		 * @private
		 */
        this.list = new buckets.LinkedList(equalsFunction);
    };

    /**
	 * Pushes an item onto the top of this stack.
	 * @this {buckets.Stack}
	 * @param {Object} elem the element to be pushed onto this stack.
	 */
    buckets.Stack.prototype.push = function(elem) {
        this.list.addElementAtIndex(elem, 0);
    };

    /**
	 * Pushes an item onto the top of this stack.
	 * @this {buckets.Stack}
	 * @param {Object} elem the element to be pushed onto this stack.
	 */
    buckets.Stack.prototype.add = function(elem) {
        this.list.addElementAtIndex(elem, 0);
    };

    /**
	 * Removes the object at the top of this stack and returns that object.
	 * @this {buckets.Stack}
	 * @returns {*} the object at the top of this stack or undefined if the
	 * stack is empty.
	 */
    buckets.Stack.prototype.pop = function() {
        return this.list.removeElementAtIndex(0);
    };

    /**
	 * Looks at the object at the top of this stack without removing it from the
	 * stack.
	 * @this {buckets.Stack}
	 * @returns {*} the object at the top of this stack or undefined if the
	 * stack is empty.
	 */
    buckets.Stack.prototype.peek = function() {
        return this.list.first();
    };

    /**
	 * Returns the number of elements in this stack.
	 * @this {buckets.Stack}
	 * @return {number} the number of elements in this stack.
	 */
    buckets.Stack.prototype.size = function() {
        return this.list.size();
    };

    /**
	 * Returns true if this stack contains the specified element.
	 * @this {buckets.Stack}
	 * @param {Object} elem element to search for.
	 * @return {boolean} true if this stack contains the specified element,
	 * false otherwise.
	 */
    buckets.Stack.prototype.contains = function(elem) {
        return this.list.contains(elem);
    };

    /**
	 * Checks if this stack is empty.
	 * @this {buckets.Stack}
	 * @return {boolean} true if and only if this stack contains no items; false
	 * otherwise.
	 */
    buckets.Stack.prototype.isEmpty = function() {
        return this.list.isEmpty();
    };

    /**
	 * Removes all of the elements from this stack.
	 * @this {buckets.Stack}
	 */
    buckets.Stack.prototype.clear = function() {
        this.list.clear();
    };

    //
    // Queue implementation
    //
    /**
	 * Creates an empty Queue.
	 * @class A queue is a First-In-First-Out (FIFO) data structure, the first
	 * element added to the queue will be the first one to be removed. This
	 * implementation uses a linked list as a container. If the elements inside
	 * the queue are not comparable with the === operator a custom equals
	 * function should be provided to perform searches with contains().
	 * @constructor
	 * @this {buckets.Queue}
	 * @param {function(Object,Object):boolean=} equalsFunction Optional
	 * function used to check if two elements are equal.
	 */
    buckets.Queue = function(equalsFunction) {
        /**
		 * List containing the elements.
		 * @type buckets.LinkedList
		 * @private
		 */
        this.list = new buckets.LinkedList(equalsFunction);
    };

    /**
	 * Inserts the specified element into the end of this queue.
	 * @this {buckets.Queue}
	 * @param {Object} elem the element to insert.
	 */
    buckets.Queue.prototype.enqueue = function(elem) {
        this.list.add(elem);
    };

    /**
	 * Inserts the specified element into the end of this queue.
	 * @this {buckets.Queue}
	 * @param {Object} elem the element to insert.
	 */
    buckets.Queue.prototype.add = function(elem) {
        this.list.add(elem);
    };

    /**
	 * Retrieves and removes the head of this queue.
	 * @this {buckets.Queue}
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
	 * @this {buckets.Queue}
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
	 * @this {buckets.Queue}
	 * @return {number} the number of elements in this queue.
	 */
    buckets.Queue.prototype.size = function() {
        return this.list.size();
    };

    /**
	 * Returns true if this queue contains the specified element.
	 * @this {buckets.Queue}
	 * @param {Object} elem element to search for.
	 * @return {boolean} true if this queue contains the specified element,
	 * false otherwise.
	 */
    buckets.Queue.prototype.contains = function(elem) {
        return this.list.contains(elem);
    };

    /**
	 * Checks if this queue is empty.
	 * @this {buckets.Queue}
	 * @return {boolean} true if and only if this queue contains no items; false
	 * otherwise.
	 */
    buckets.Queue.prototype.isEmpty = function() {
        return this.list.size() <= 0;
    };

    /**
	 * Removes all of the elements from this queue.
	 * @this {buckets.Queue}
	 */
    buckets.Queue.prototype.clear = function() {
        this.list.clear();
    };


    // PriorityQueue implementation
    buckets.PriorityQueue = function(compareFunction) {
        this.heap = new buckets.Heap(compareFunction);
    };

    buckets.PriorityQueue.prototype.enqueue = function(element) {
        this.heap.add(element);
    };

    buckets.PriorityQueue.prototype.add = function(elem) {
        this.heap.add(elem);
    };

    buckets.PriorityQueue.prototype.dequeue = function() {
        if (this.heap.size() !== 0) {
            var el = this.heap.root();
            this.heap.removeRoot();
            return el;
        }
        return undefined;
    };
    buckets.PriorityQueue.prototype.peek = function() {
        return this.heap.root();
    };

    buckets.PriorityQueue.prototype.contains = function(element) {
        return this.heap.contains(element);
    };

    buckets.PriorityQueue.prototype.isEmpty = function() {
        return this.heap.isEmpty();
    };

    buckets.PriorityQueue.prototype.size = function() {
        return this.heap.size();
    };

    buckets.PriorityQueue.prototype.clear = function() {
        this.heap.clear();
    };

})();