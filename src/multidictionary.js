/**
 * Creates an empty multi dictionary.
 * @class <p>A multi dictionary is a special kind of dictionary that holds
 * multiple values against each key. Setting a value into the dictionary will
 * add the value to a list at that key. Getting a key will return a list
 * holding all the values associated with that key.
 * This implementation accepts any kind of objects as keys.</p>
 *
 * <p>If the keys are custom objects, a function that converts keys to unique strings must be
 * provided at construction time.</p>
 * <p>Example:</p>
 * <pre>
 * function petToString(pet) {
 *  return pet.type + ' ' + pet.name;
 * }
 * </pre>
 * <p>If the values are custom objects, a function to check equality between values
 * must be provided.</p>
 * <p>Example:</p>
 * <pre>
 * function petsAreEqualByAge(pet1,pet2) {
 *  return pet1.age===pet2.age;
 * }
 * </pre>
 * @constructor
 * @param {function(Object):string=} toStrFunction optional function
 * to convert keys to strings. If the keys aren't strings or if toString()
 * is not appropriate, a custom function which receives a key and returns a
 * unique string must be provided.
 * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
 * function to check if two values are equal.
 *
 */
buckets.MultiDictionary = function (toStrFunction, valuesEqualsFunction) {

    /** 
     * @exports multiDict as buckets.MultiDictionary
     * @private
     */
    var multiDict = {},
        // Call the parent constructor
        parent = new buckets.Dictionary(toStrFunction),
        equalsF = valuesEqualsFunction || buckets.defaultEquals;

    /**
     * Returns an array holding the values associated with
     * the specified key.
     * @param {Object} key The key.
     * @return {Array} An array holding the values or an 
     * empty array if the dictionary contains no 
     * mappings for the provided key.
     */
    multiDict.get = function (key) {
        var values = parent.get(key);
        if (buckets.isUndefined(values)) {
            return [];
        }
        return buckets.arrays.copy(values);
    };

    /**
     * Associates the specified value with the specified key if
     * it's not already present.
     * @param {Object} key The Key.
     * @param {Object} value The value to associate.
     * @return {boolean} True if the value was not already associated with that key.
     */
    multiDict.set = function (key, value) {
        var array;
        if (buckets.isUndefined(key) || buckets.isUndefined(value)) {
            return false;
        }
        if (!multiDict.containsKey(key)) {
            parent.set(key, [value]);
            return true;
        }
        array = parent.get(key);
        if (buckets.arrays.contains(array, value, equalsF)) {
            return false;
        }
        array.push(value);
        return true;
    };

    /**
     * Removes the specified value from the list of values associated with the
     * provided key. If a value isn't given, all values associated with the specified
     * key are removed.
     * @param {Object} key The key.
     * @param {Object=} value Optional argument to specify the element to remove
     * from the list of values associated with the given key.
     * @return {*} True if the dictionary changed, false if the key doesn't exist or
     * if the specified value isn't associated with the given key.
     */
    multiDict.remove = function (key, value) {
        var v, array;
        if (buckets.isUndefined(value)) {
            v = parent.remove(key);
            if (buckets.isUndefined(v)) {
                return false;
            }
            return true;
        }
        array = parent.get(key);
        if (buckets.isUndefined(array)) {
            return false;
        }
        if (buckets.arrays.remove(array, value, equalsF)) {
            if (array.length === 0) {
                parent.remove(key);
            }
            return true;
        }
        return false;
    };

    /**
     * Returns an array containing all the keys in the dictionary.
     * @return {Array} An array containing all the keys in the dictionary.
     */
    multiDict.keys = function () {
        return parent.keys();
    };

    /**
     * Returns an array containing all the values in the dictionary.
     * @return {Array} An array containing all the values in the dictionary.
     */
    multiDict.values = function () {
        var values = parent.values(),
            array = [],
            i,
            j,
            v;
        for (i = 0; i < values.length; i += 1) {
            v = values[i];
            for (j = 0; j < v.length; j += 1) {
                array.push(v[j]);
            }
        }
        return array;
    };

    /**
     * Returns true if the dictionary has at least one value associatted with the specified key.
     * @param {Object} key The key.
     * @return {boolean} True if the dictionary has at least one value associatted
     * the specified key.
     */
    multiDict.containsKey = function (key) {
        return parent.containsKey(key);
    };

    /**
     * Removes all keys and values from the dictionary.
     */
    multiDict.clear = function () {
        return parent.clear();
    };

    /**
     * Returns the number of keys in the dictionary.
     * @return {number} The number of keys in the dictionary.
     */
    multiDict.size = function () {
        return parent.size();
    };

    /**
     * Returns true if the dictionary contains no mappings.
     * @return {boolean} True if the dictionary contains no mappings.
     */
    multiDict.isEmpty = function () {
        return parent.isEmpty();
    };

    /**
     * Executes the provided function once per key
     * present in the multi dictionary.
     * @param {function(Object, Array):*} callback Function to execute. Receives
     * 2 arguments: key and an array of values. To break the iteration you can
     * optionally return false inside the callback.
     */
    multiDict.forEach = function (callback) {
        return parent.forEach(callback);
    };

    /**
     * Returns true if the multi dictionary is equal to another multi dictionary.
     * Two dictionaries are equal if they have the same keys and the same values per key.
     * @param {buckets.MultiDictionary} other The other dictionary.
     * @return {boolean} True if the dictionary is equal to the given dictionary.
     */
    multiDict.equals = function (other) {
        var isEqual = true,
            thisValues;

        if (buckets.isUndefined(other) || typeof other.values !== 'function') {
            return false;
        }
        if (multiDict.size() !== other.size()) {
            return false;
        }

        other.forEach(function (key, otherValues) {
            thisValues = multiDict.get(key) || [];
            if (thisValues.length !== otherValues.length) {
                isEqual = false;
            } else {
                buckets.arrays.forEach(thisValues, function (value) {
                    isEqual = buckets.arrays.contains(otherValues, value, equalsF);
                    return isEqual;
                });
            }
            return isEqual;
        });
        return isEqual;
    };

    return multiDict;
};
