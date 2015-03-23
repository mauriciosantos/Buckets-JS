/**
 * Creates an empty Linked List.
 * @class A linked list is a sequence of items arranged one after 
 * another. The size is not fixed and it can grow or shrink 
 * on demand. One of the main benefits of a linked list is that 
 * you can add or remove elements at both ends in constant time. 
 * One disadvantage of a linked list against an array is 
 * that it doesn’t provide constant time random access.
 * @constructor
 */
buckets.LinkedList = function () {

    /** 
     * @exports list as buckets.LinkedList
     * @private
     */
    var list = {},
        // Number of elements in the list
        nElements = 0,
        // First node in the list
        firstNode,
        // Last node in the list
        lastNode;

    // Returns the node at the specified index.
    function nodeAtIndex(index) {
        var node, i;
        if (index < 0 || index >= nElements) {
            return undefined;
        }
        if (index === (nElements - 1)) {
            return lastNode;
        }
        node = firstNode;
        for (i = 0; i < index; i += 1) {
            node = node.next;
        }
        return node;
    }

    /**
     * Adds an element to the list.
     * @param {Object} item Element to be added.
     * @param {number=} index Optional index to add the element. If no index is specified
     * the element is added to the end of the list.
     * @return {boolean} True if the element was added or false if the index is invalid
     * or if the element is undefined.
     */
    list.add = function (item, index) {
        var newNode, prev;

        if (buckets.isUndefined(index)) {
            index = nElements;
        }
        if (index < 0 || index > nElements || buckets.isUndefined(item)) {
            return false;
        }
        newNode = {
            element: item,
            next: undefined
        };
        if (nElements === 0) {
            // First node in the list.
            firstNode = newNode;
            lastNode = newNode;
        } else if (index === nElements) {
            // Insert at the end.
            lastNode.next = newNode;
            lastNode = newNode;
        } else if (index === 0) {
            // Change first node.
            newNode.next = firstNode;
            firstNode = newNode;
        } else {
            prev = nodeAtIndex(index - 1);
            newNode.next = prev.next;
            prev.next = newNode;
        }
        nElements += 1;
        return true;
    };

    /**
     * Returns the first element in the list.
     * @return {*} The first element in the list or undefined if the list is
     * empty.
     */
    list.first = function () {
        if (firstNode !== undefined) {
            return firstNode.element;
        }
        return undefined;
    };

    /**
     * Returns the last element in the list.
     * @return {*} The last element in the list or undefined if the list is
     * empty.
     */
    list.last = function () {
        if (lastNode !== undefined) {
            return lastNode.element;
        }
        return undefined;
    };

    /**
     * Returns the element at the specified position in the list.
     * @param {number} index Desired index.
     * @return {*} The element at the given index or undefined if the index is
     * out of bounds.
     */
    list.elementAtIndex = function (index) {
        var node = nodeAtIndex(index);
        if (node === undefined) {
            return undefined;
        }
        return node.element;
    };


    /**
     * Returns the index of the first occurrence of the
     * specified element, or -1 if the list does not contain the element.
     * <p>If the elements inside the list are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, that function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * var petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item Element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {number} The index in the list of the first occurrence
     * of the specified element, or -1 if the list does not contain the
     * element.
     */
    list.indexOf = function (item, equalsFunction) {
        var equalsF = equalsFunction || buckets.defaultEquals,
            currentNode = firstNode,
            index = 0;
        if (buckets.isUndefined(item)) {
            return -1;
        }

        while (currentNode !== undefined) {
            if (equalsF(currentNode.element, item)) {
                return index;
            }
            index += 1;
            currentNode = currentNode.next;
        }
        return -1;
    };

    /**
     * Returns true if the list contains the specified element.
     * <p>If the elements inside the list are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, that function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * var petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item Element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {boolean} True if the list contains the specified element, false
     * otherwise.
     */
    list.contains = function (item, equalsFunction) {
        return (list.indexOf(item, equalsFunction) >= 0);
    };

    /**
     * Removes the first occurrence of the specified element in the list.
     * <p>If the elements inside the list are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, that function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     * <pre>
     * var petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item Element to be removed from the list, if present.
     * @return {boolean} True if the list contained the specified element.
     */
    list.remove = function (item, equalsFunction) {
        var equalsF = equalsFunction || buckets.defaultEquals,
            currentNode = firstNode,
            previous;

        if (nElements < 1 || buckets.isUndefined(item)) {
            return false;
        }

        while (currentNode !== undefined) {

            if (equalsF(currentNode.element, item)) {

                if (currentNode === firstNode) {
                    firstNode = firstNode.next;
                    if (currentNode === lastNode) {
                        lastNode = undefined;
                    }
                } else if (currentNode === lastNode) {
                    lastNode = previous;
                    previous.next = currentNode.next;
                    currentNode.next = undefined;
                } else {
                    previous.next = currentNode.next;
                    currentNode.next = undefined;
                }
                nElements = nElements - 1;
                return true;
            }
            previous = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    };

    /**
     * Removes all the elements from the list.
     */
    list.clear = function () {
        firstNode = undefined;
        lastNode = undefined;
        nElements = 0;
    };

    /**
     * Returns true if the list is equal to another list.
     * Two lists are equal if they have the same elements in the same order.
     * @param {buckets.LinkedList} other The other list.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function to check if two elements are equal. If the elements in the lists
     * are custom objects you should provide a custom equals function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} true if the list is equal to the given list.
     */
    list.equals = function (other, equalsFunction) {
        var eqf = equalsFunction || buckets.defaultEquals,
            isEqual = true,
            node = firstNode;

        if (buckets.isUndefined(other) || typeof other.elementAtIndex !== 'function') {
            return false;
        }
        if (list.size() !== other.size()) {
            return false;
        }

        other.forEach(function (element) {
            isEqual = eqf(element, node.element);
            node = node.next;
            return isEqual;
        });

        return isEqual;
    };

    /**
     * Removes the element at the specified position in the list.
     * @param {number} index Given index.
     * @return {*} Removed element or undefined if the index is out of bounds.
     */
    list.removeElementAtIndex = function (index) {
        var element, previous;

        if (index < 0 || index >= nElements) {
            return undefined;
        }

        if (nElements === 1) {
            //First node in the list.
            element = firstNode.element;
            firstNode = undefined;
            lastNode = undefined;
        } else {
            previous = nodeAtIndex(index - 1);
            if (previous === undefined) {
                element = firstNode.element;
                firstNode = firstNode.next;
            } else if (previous.next === lastNode) {
                element = lastNode.element;
                lastNode = previous;
            }
            if (previous !== undefined) {
                element = previous.next.element;
                previous.next = previous.next.next;
            }
        }
        nElements -= 1;
        return element;
    };

    /**
     * Executes the provided function once per element present in the list in order.
     * @param {function(Object):*} callback Function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false inside the callback.
     */
    list.forEach = function (callback) {
        var currentNode = firstNode;
        while (currentNode !== undefined) {
            if (callback(currentNode.element) === false) {
                break;
            }
            currentNode = currentNode.next;
        }
    };

    /**
     * Reverses the order of the elements in the linked list (makes the last
     * element first, and the first element last).
     * @memberOf buckets.LinkedList
     */
    list.reverse = function () {
        var current = firstNode,
            previous,
            temp;
        while (current !== undefined) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
        }
        temp = firstNode;
        firstNode = lastNode;
        lastNode = temp;
    };


    /**
     * Returns an array containing all the elements in the list in proper
     * sequence.
     * @return {Array.<*>} An array containing all the elements in the list,
     * in proper sequence.
     */
    list.toArray = function () {
        var result = [];
        list.forEach(function (element) {
            result.push(element);
        });
        return result;
    };

    /**
     * Returns the number of elements in the list.
     * @return {number} The number of elements in the list.
     */
    list.size = function () {
        return nElements;
    };

    /**
     * Returns true if the list contains no elements.
     * @return {boolean} true if the list contains no elements.
     */
    list.isEmpty = function () {
        return nElements <= 0;
    };

    return list;
};
