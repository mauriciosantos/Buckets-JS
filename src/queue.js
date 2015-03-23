/**
 * Creates an empty queue.
 * @class A queue is a First-In-First-Out (FIFO) data structure, the first
 * element added to the queue will be the first one to be removed. This
 * implementation uses a linked list as the underlying storage.
 * @constructor
 */
buckets.Queue = function () {

    /** 
     * @exports queue as buckets.Queue
     * @private
     */
    var queue = {},
        // Underlying list containing the elements.
        list = new buckets.LinkedList();

    /**
     * Inserts the specified element into the end of the queue.
     * @param {Object} elem The element to insert.
     * @return {boolean} True if the element was inserted, or false if it's undefined.
     */
    queue.enqueue = function (elem) {
        return list.add(elem);
    };

    /**
     * Inserts the specified element into the end of the queue. Equivalent to enqueue.
     * @param {Object} elem The element to insert.
     * @return {boolean} True if the element was inserted, or false if it's undefined.
     */
    queue.add = function (elem) {
        return list.add(elem);
    };

    /**
     * Retrieves and removes the head of the queue.
     * @return {*} The head of the queue, or undefined if the queue is empty.
     */
    queue.dequeue = function () {
        var elem;
        if (list.size() !== 0) {
            elem = list.first();
            list.removeElementAtIndex(0);
            return elem;
        }
        return undefined;
    };

    /**
     * Retrieves, but does not remove, the head of the queue.
     * @return {*} The head of the queue, or undefined if the queue is empty.
     */
    queue.peek = function () {
        if (list.size() !== 0) {
            return list.first();
        }
        return undefined;
    };

    /**
     * Returns the number of elements in the queue.
     * @return {number} The number of elements in the queue.
     */
    queue.size = function () {
        return list.size();
    };

    /**
     * Returns true if the queue contains the specified element.
     * <p>If the elements inside the queue are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * var petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem Element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function to check if two elements are equal.
     * @return {boolean} True if the queue contains the specified element,
     * false otherwise.
     */
    queue.contains = function (elem, equalsFunction) {
        return list.contains(elem, equalsFunction);
    };

    /**
     * Checks if the queue is empty.
     * @return {boolean} True if and only if the queue contains no items.
     */
    queue.isEmpty = function () {
        return list.size() <= 0;
    };

    /**
     * Removes all the elements from the queue.
     */
    queue.clear = function () {
        list.clear();
    };

    /**
     * Executes the provided function once per each element present in the queue in
     * FIFO order.
     * @param {function(Object):*} callback Function to execute, it's
     * invoked an element as argument, to break the iteration you can
     * optionally return false inside the callback.
     */
    queue.forEach = function (callback) {
        list.forEach(callback);
    };

    /**
     * Returns an array containing all the elements in the queue in FIFO
     * order.
     * @return {Array.<*>} An array containing all the elements in the queue
     * in FIFO order.
     */
    queue.toArray = function () {
        return list.toArray();
    };

    /**
     * Returns true if the queue is equal to another queue.
     * Two queues are equal if they have the same elements in the same order.
     * @param {buckets.Queue} other The other queue.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function to check if two elements are equal. If the elements in the queues
     * are custom objects you should provide a custom equals function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} True if the queue is equal to the given queue.
     */
    queue.equals = function (other, equalsFunction) {
        var eqf, isEqual, thisElement;
        if (buckets.isUndefined(other) || typeof other.dequeue !== 'function') {
            return false;
        }
        if (queue.size() !== other.size()) {
            return false;
        }
        eqf = equalsFunction || buckets.defaultEquals;
        isEqual = true;
        other.forEach(function (element) {
            thisElement = queue.dequeue();
            queue.enqueue(thisElement);
            isEqual = eqf(thisElement, element);
            return isEqual;
        });
        return isEqual;
    };

    return queue;
};
