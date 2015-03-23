/**
 * Creates an empty priority queue.
 * @class <p>In a priority queue each element is associated with a "priority",
 * elements are dequeued in highest-priority-first order (the elements with the
 * highest priority are dequeued first). This implementation uses a binary 
 * heap as the underlying storage.</p>
 *
 * <p>If the inserted elements are custom objects, a compare function must be provided,
 * otherwise the <=, === and >= operators are used to compare object priority.</p>
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
 * @constructor
 * @param {function(Object,Object):number=} compareFunction Optional
 * function used to compare two element priorities. Must return a negative integer,
 * zero, or a positive integer as the first argument is less than, equal to,
 * or greater than the second.
 */
buckets.PriorityQueue = function (compareFunction) {

    /** 
     * @exports pQueue as buckets.PriorityQueue
     * @private
     */
    var pQueue = {},
        // Reversed compare function
        compare = buckets.reverseCompareFunction(compareFunction),
        // Underlying storage
        heap = new buckets.Heap(compare);

    /**
     * Inserts the specified element into the priority queue.
     * @param {Object} element The element to insert.
     * @return {boolean} True if the element was inserted, or false if it's undefined.
     */
    pQueue.enqueue = function (element) {
        return heap.add(element);
    };

    /**
     * Inserts the specified element into the priority queue. It's equivalent to enqueue.
     * @param {Object} element The element to insert.
     * @return {boolean} True if the element was inserted, or false if it's undefined.
     */
    pQueue.add = function (element) {
        return heap.add(element);
    };

    /**
     * Retrieves and removes the highest priority element of the queue.
     * @return {*} The highest priority element of the queue,
     * or undefined if the queue is empty.
     */
    pQueue.dequeue = function () {
        var elem;
        if (heap.size() !== 0) {
            elem = heap.peek();
            heap.removeRoot();
            return elem;
        }
        return undefined;
    };

    /**
     * Retrieves, but does not remove, the highest priority element of the queue.
     * @return {*} The highest priority element of the queue, or undefined if the queue is empty.
     */
    pQueue.peek = function () {
        return heap.peek();
    };

    /**
     * Returns true if the priority queue contains the specified element.
     * @param {Object} element Element to search for.
     * @return {boolean} True if the priority queue contains the specified element,
     * false otherwise.
     */
    pQueue.contains = function (element) {
        return heap.contains(element);
    };

    /**
     * Checks if the priority queue is empty.
     * @return {boolean} True if and only if the priority queue contains no items, false
     * otherwise.
     */
    pQueue.isEmpty = function () {
        return heap.isEmpty();
    };

    /**
     * Returns the number of elements in the priority queue.
     * @return {number} The number of elements in the priority queue.
     */
    pQueue.size = function () {
        return heap.size();
    };

    /**
     * Removes all elements from the priority queue.
     */
    pQueue.clear = function () {
        heap.clear();
    };

    /**
     * Executes the provided function once per element present in the queue in
     * no particular order.
     * @param {function(Object):*} callback Function to execute, it's
     * invoked one element as argument. To break the iteration you can
     * optionally return false inside the callback.
     */
    pQueue.forEach = function (callback) {
        heap.forEach(callback);
    };

    /**
     * Returns an array containing all the elements in the queue in no
     * particular order.
     * @return {Array.<*>} An array containing all the elements in the queue
     * in no particular order.
     */
    pQueue.toArray = function () {
        return heap.toArray();
    };

    /**
     * Returns true if the queue is equal to another queue.
     * Two priority queues are equal if they have the same elements.
     * @param {buckets.PriorityQueue} other The other queue.
     * @return {boolean} True if the queue is equal to the given queue.
     */
    pQueue.equals = function (other) {
        var thisArray, otherArray, eqF;

        if (buckets.isUndefined(other) || typeof other.dequeue !== 'function') {
            return false;
        }
        if (pQueue.size() !== other.size()) {
            return false;
        }

        thisArray = pQueue.toArray();
        otherArray = other.toArray();
        eqF = buckets.compareToEquals(compare);
        thisArray.sort(compare);
        otherArray.sort(compare);

        return buckets.arrays.equals(thisArray, otherArray, eqF);
    };

    return pQueue;
};
