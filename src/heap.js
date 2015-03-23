/**
 * Creates an empty binary heap.
 * @class
 * <p>A heap is a binary tree that maintains the heap property:
 * Every node is less than or equal to each of its children. 
 * This implementation uses an array as the underlying storage.</p>
 * <p>If the inserted elements are custom objects, a compare function must be provided 
 * at construction time, otherwise the <=, === and >= operators are
 * used to compare elements.</p>
 * <p>Example:</p>
 * <pre>
 * function compare(a, b) {
 *  if (a is less than b by some ordering criterion) {
 *     return -1;
 *  } if (a is greater than b by the ordering criterion) {
 *     return 1;
 *  }
 *  // a must be equal to b
 *  return 0;
 * }
 * </pre>
 *
 * <p>To create a Max-Heap (greater elements on top) you can a provide a
 * reverse compare function.</p>
 * <p>Example:</p>
 *
 * <pre>
 * function reverseCompare(a, b) {
 *  if (a is less than b by some ordering criterion) {
 *     return 1;
 *  } if (a is greater than b by the ordering criterion) {
 *     return -1;
 *  }
 *  // a must be equal to b
 *  return 0;
 * }
 * </pre>
 *
 * @constructor
 * @param {function(Object,Object):number=} compareFunction Optional
 * function used to compare two elements. Must return a negative integer,
 * zero, or a positive integer as the first argument is less than, equal to,
 * or greater than the second.
 */
buckets.Heap = function (compareFunction) {

    /** 
     * @exports heap as buckets.Heap
     * @private
     */
    var heap = {},
        // Array used to store the elements of the heap.
        data = [],
        // Function used to compare elements.
        compare = compareFunction || buckets.defaultCompare;

    // Moves the node at the given index up to its proper place in the heap.
    function siftUp(index) {
        var parent;
        // Returns the index of the parent of the node at the given index.
        function parentIndex(nodeIndex) {
            return Math.floor((nodeIndex - 1) / 2);
        }

        parent = parentIndex(index);
        while (index > 0 && compare(data[parent], data[index]) > 0) {
            buckets.arrays.swap(data, parent, index);
            index = parent;
            parent = parentIndex(index);
        }
    }

    // Moves the node at the given index down to its proper place in the heap.
    function siftDown(nodeIndex) {
        var min;
        // Returns the index of the left child of the node at the given index.
        function leftChildIndex(nodeIndex) {
            return (2 * nodeIndex) + 1;
        }

        // Returns the index of the right child of the node at the given index.
        function rightChildIndex(nodeIndex) {
            return (2 * nodeIndex) + 2;
        }

        // Returns the index of the smaller child node if it exists, -1 otherwise.
        function minIndex(leftChild, rightChild) {
            if (rightChild >= data.length) {
                if (leftChild >= data.length) {
                    return -1;
                }
                return leftChild;
            }
            if (compare(data[leftChild], data[rightChild]) <= 0) {
                return leftChild;
            }
            return rightChild;
        }

        // Minimum child index
        min = minIndex(leftChildIndex(nodeIndex), rightChildIndex(nodeIndex));

        while (min >= 0 && compare(data[nodeIndex], data[min]) > 0) {
            buckets.arrays.swap(data, min, nodeIndex);
            nodeIndex = min;
            min = minIndex(leftChildIndex(nodeIndex), rightChildIndex(nodeIndex));
        }
    }

    /**
     * Retrieves but does not remove the root (minimum) element of the heap.
     * @return {*} The value at the root of the heap. Returns undefined if the
     * heap is empty.
     */
    heap.peek = function () {
        if (data.length > 0) {
            return data[0];
        }
        return undefined;
    };

    /**
     * Adds the given element into the heap.
     * @param {*} element The element.
     * @return True if the element was added or false if it is undefined.
     */
    heap.add = function (element) {
        if (buckets.isUndefined(element)) {
            return undefined;
        }
        data.push(element);
        siftUp(data.length - 1);
        return true;
    };

    /**
     * Retrieves and removes the root (minimum) element of the heap.
     * @return {*} The removed element or
     * undefined if the heap is empty.
     */
    heap.removeRoot = function () {
        var obj;
        if (data.length > 0) {
            obj = data[0];
            data[0] = data[data.length - 1];
            data.splice(data.length - 1, 1);
            if (data.length > 0) {
                siftDown(0);
            }
            return obj;
        }
        return undefined;
    };

    /**
     * Returns true if the heap contains the specified element.
     * @param {Object} element Element to search for.
     * @return {boolean} True if the Heap contains the specified element, false
     * otherwise.
     */
    heap.contains = function (element) {
        var equF = buckets.compareToEquals(compare);
        return buckets.arrays.contains(data, element, equF);
    };

    /**
     * Returns the number of elements in the heap.
     * @return {number} The number of elements in the heap.
     */
    heap.size = function () {
        return data.length;
    };

    /**
     * Checks if the heap is empty.
     * @return {boolean} True if the heap contains no elements; false
     * otherwise.
     */
    heap.isEmpty = function () {
        return data.length <= 0;
    };

    /**
     * Removes all the elements from the heap.
     */
    heap.clear = function () {
        data.length = 0;
    };

    /**
     * Executes the provided function once per element present in the heap in
     * no particular order.
     * @param {function(Object):*} callback Function to execute,
     * invoked with an element as argument. To break the iteration you can
     * optionally return false.
     */
    heap.forEach = function (callback) {
        buckets.arrays.forEach(data, callback);
    };

    /**
     * Returns an array containing all the elements in the heap in no
     * particular order.
     * @return {Array.<*>} An array containing all the elements in the heap
     * in no particular order.
     */
    heap.toArray = function () {
        return buckets.arrays.copy(data);
    };

    /**
     * Returns true if the binary heap is equal to another heap.
     * Two heaps are equal if they have the same elements.
     * @param {buckets.Heap} other The other heap.
     * @return {boolean} True if the heap is equal to the given heap.
     */
    heap.equals = function (other) {
        var thisArray, otherArray, eqF;

        if (buckets.isUndefined(other) || typeof other.removeRoot !== 'function') {
            return false;
        }
        if (heap.size() !== other.size()) {
            return false;
        }

        thisArray = heap.toArray();
        otherArray = other.toArray();
        eqF = buckets.compareToEquals(compare);
        thisArray.sort(compare);
        otherArray.sort(compare);

        return buckets.arrays.equals(thisArray, otherArray, eqF);
    };

    return heap;
};
