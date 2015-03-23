/**
 * Creates an empty bag.
 * @class <p>A bag is a special kind of set in which members are
 * allowed to appear more than once.</p>
 * <p>If the inserted elements are custom objects, a function
 * that maps elements to unique strings must be provided at construction time.</p>
 * <p>Example:</p>
 * <pre>
 * function petToUniqueString(pet) {
 *  return pet.type + ' ' + pet.name;
 * }
 * </pre>
 *
 * @constructor
 * @param {function(Object):string=} toStrFunction Optional function
 * to convert elements to unique strings. If the elements aren't strings or if toString()
 * is not appropriate, a custom function which receives an object and returns a
 * unique string must be provided.
 */
buckets.Bag = function (toStrFunction) {

    /** 
     * @exports bag as buckets.Bag
     * @private
     */
    var bag = {},
        // Function to convert elements to unique strings.
        toStrF = toStrFunction || buckets.defaultToString,
        // Underlying  Storage
        dictionary = new buckets.Dictionary(toStrF),
        // Number of elements in the bag, including duplicates.
        nElements = 0;
    /**
     * Adds nCopies of the specified element to the bag.
     * @param {Object} element Element to add.
     * @param {number=} nCopies The number of copies to add, if this argument is
     * undefined 1 copy is added.
     * @return {boolean} True unless element is undefined.
     */
    bag.add = function (element, nCopies) {
        var node;
        if (isNaN(nCopies) || buckets.isUndefined(nCopies)) {
            nCopies = 1;
        }
        if (buckets.isUndefined(element) || nCopies <= 0) {
            return false;
        }

        if (!bag.contains(element)) {
            node = {
                value: element,
                copies: nCopies
            };
            dictionary.set(element, node);
        } else {
            dictionary.get(element).copies += nCopies;
        }
        nElements += nCopies;
        return true;
    };

    /**
     * Counts the number of copies of the specified element in the bag.
     * @param {Object} element The element to search for.
     * @return {number} The number of copies of the element, 0 if not found.
     */
    bag.count = function (element) {
        if (!bag.contains(element)) {
            return 0;
        }
        return dictionary.get(element).copies;
    };

    /**
     * Returns true if the bag contains the specified element.
     * @param {Object} element Element to search for.
     * @return {boolean} True if the bag contains the specified element,
     * false otherwise.
     */
    bag.contains = function (element) {
        return dictionary.containsKey(element);
    };

    /**
     * Removes nCopies of the specified element from the bag.
     * If the number of copies to remove is greater than the actual number
     * of copies in the bag, all copies are removed.
     * @param {Object} element Element to remove.
     * @param {number=} nCopies The number of copies to remove, if this argument is
     * undefined 1 copy is removed.
     * @return {boolean} True if at least 1 copy was removed.
     */
    bag.remove = function (element, nCopies) {
        var node;
        if (isNaN(nCopies) || buckets.isUndefined(nCopies)) {
            nCopies = 1;
        }
        if (buckets.isUndefined(element) || nCopies <= 0) {
            return false;
        }

        if (!bag.contains(element)) {
            return false;
        }
        node = dictionary.get(element);
        if (nCopies > node.copies) {
            nElements -= node.copies;
        } else {
            nElements -= nCopies;
        }
        node.copies -= nCopies;
        if (node.copies <= 0) {
            dictionary.remove(element);
        }
        return true;
    };

    /**
     * Returns an array containing all the elements in the bag in no particular order,
     * including multiple copies.
     * @return {Array} An array containing all the elements in the bag.
     */
    bag.toArray = function () {
        var a = [],
            values = dictionary.values(),
            vl = values.length,
            node,
            element,
            copies,
            i,
            j;
        for (i = 0; i < vl; i += 1) {
            node = values[i];
            element = node.value;
            copies = node.copies;
            for (j = 0; j < copies; j += 1) {
                a.push(element);
            }
        }
        return a;
    };

    /**
     * Returns a set of unique elements in the bag.
     * @return {buckets.Set} A set of unique elements in the bag.
     */
    bag.toSet = function () {
        var set = new buckets.Set(toStrF),
            elements = dictionary.values(),
            l = elements.length,
            i;
        for (i = 0; i < l; i += 1) {
            set.add(elements[i].value);
        }
        return set;
    };

    /**
     * Executes the provided function once per element
     * present in the bag, including multiple copies.
     * @param {function(Object):*} callback Function to execute, it's
     * invoked with an element as argument. To break the iteration you can
     * optionally return false in the callback.
     */
    bag.forEach = function (callback) {
        dictionary.forEach(function (k, v) {
            var value = v.value,
                copies = v.copies,
                i;
            for (i = 0; i < copies; i += 1) {
                if (callback(value) === false) {
                    return false;
                }
            }
            return true;
        });
    };
    /**
     * Returns the number of elements in the bag, including duplicates.
     * @return {number} The number of elements in the bag.
     */
    bag.size = function () {
        return nElements;
    };

    /**
     * Returns true if the bag contains no elements.
     * @return {boolean} True if the bag contains no elements.
     */
    bag.isEmpty = function () {
        return nElements === 0;
    };

    /**
     * Removes all the elements from the bag.
     */
    bag.clear = function () {
        nElements = 0;
        dictionary.clear();
    };

    /**
     * Returns true if the bag is equal to another bag.
     * Two bags are equal if they have the same elements and
     * same number of copies per element.
     * @param {buckets.Bag} other The other bag.
     * @return {boolean} True if the bag is equal to the given bag.
     */
    bag.equals = function (other) {
        var isEqual;
        if (buckets.isUndefined(other) || typeof other.toSet !== 'function') {
            return false;
        }
        if (bag.size() !== other.size()) {
            return false;
        }

        isEqual = true;
        other.forEach(function (element) {
            isEqual = (bag.count(element) === other.count(element));
            return isEqual;
        });
        return isEqual;
    };

    return bag;
};
