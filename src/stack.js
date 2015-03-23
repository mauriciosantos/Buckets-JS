/**
 * Creates an empty Stack.
 * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
 * element added to the stack will be the first one to be removed. This
 * implementation uses a linked list as the underlying storage.
 * @constructor
 */
buckets.Stack = function () {

    /** 
     * @exports stack as buckets.Stack
     * @private
     */
    var stack = {},
        // Underlying list containing the elements.
        list = new buckets.LinkedList();

    /**
     * Pushes an element onto the top of the stack.
     * @param {Object} elem The element.
     * @return {boolean} True if the element was pushed or false if it's undefined.
     */
    stack.push = function (elem) {
        return list.add(elem, 0);
    };

    /**
     * Pushes an element onto the top of the stack. Equivalent to push.
     * @param {Object} elem The element.
     * @return {boolean} true If the element was pushed or false if it's undefined.
     */
    stack.add = function (elem) {
        return list.add(elem, 0);
    };

    /**
     * Removes the element at the top of the stack and returns it.
     * @return {*} The element at the top of the stack or undefined if the
     * stack is empty.
     */
    stack.pop = function () {
        return list.removeElementAtIndex(0);
    };

    /**
     * Returns the element at the top of the stack without removing it.
     * @return {*} The element at the top of the stack or undefined if the
     * stack is empty.
     */
    stack.peek = function () {
        return list.first();
    };

    /**
     * Returns the number of elements in the stack.
     * @return {number} The number of elements in the stack.
     */
    stack.size = function () {
        return list.size();
    };

    /**
     * Returns true if the stack contains the specified element.
     * <p>If the elements inside the stack are
     * not comparable with the === operator, a custom equals function must be
     * provided to perform searches, that function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * var petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem Element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {boolean} True if the stack contains the specified element,
     * false otherwise.
     */
    stack.contains = function (elem, equalsFunction) {
        return list.contains(elem, equalsFunction);
    };

    /**
     * Checks if the stack is empty.
     * @return {boolean} True if and only if this stack contains no elements, false
     * otherwise.
     */
    stack.isEmpty = function () {
        return list.isEmpty();
    };

    /**
     * Removes all the elements from the stack.
     */
    stack.clear = function () {
        list.clear();
    };

    /**
     * Executes the provided function once per element present in the stack in
     * LIFO order.
     * @param {function(Object):*} callback Function to execute, it's
     * invoked with an element as argument. To break the iteration you can
     * optionally return false inside the callback.
     */
    stack.forEach = function (callback) {
        list.forEach(callback);
    };

    /**
     * Returns an array containing all the elements in the stack in LIFO
     * order.
     * @return {Array.<*>} An array containing all the elements in the stack
     * in LIFO order.
     */
    stack.toArray = function () {
        return list.toArray();
    };

    /**
     * Returns true if the stack is equal to another stack.
     * Two stacks are equal if they have the same elements in the same order.
     * @param {buckets.Stack} other The other stack.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function to check if two elements are equal. If the elements in the stacks
     * are custom objects you should provide a custom equals function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} True if the stack is equal to the given stack.
     */
    stack.equals = function (other, equalsFunction) {
        var eqf, isEqual, thisElement;
        if (buckets.isUndefined(other) || typeof other.peek !== 'function') {
            return false;
        }
        if (stack.size() !== other.size()) {
            return false;
        }

        eqf = equalsFunction || buckets.defaultEquals;
        isEqual = true;
        other.forEach(function (element) {
            thisElement = stack.pop();
            list.add(thisElement);
            isEqual = eqf(thisElement, element);
            return isEqual;
        });

        return isEqual;
    };

    return stack;
};
