describe('Dictionary', function () {
    var elems = 100,
        dict;

    beforeEach(function () {
        dict = new buckets.Dictionary();
    });

    it('set and get value with string key', function () {
        var i;
        expect(dict.get('sd')).toBeUndefined();

        // test with string keys
        for (i = 0; i < elems; i += 1) {
            expect(dict.set('' + i, i + 1)).toBeUndefined();
        }
        expect(dict.size()).toEqual(elems);

        for (i = 0; i < elems; i += 1) {
            expect(dict.get('' + i)).toEqual(i + 1);
        }

        dict.set('a', 5);
        expect(dict.get('a')).toEqual(5);
        expect(dict.set('a', 21)).toEqual(5);
        expect(dict.size()).toEqual(elems + 1);
        expect(dict.get('a')).toEqual(21);

    });

    it('set and get value with number key', function () {
        var i;
        // test with number keys
        for (i = 0; i < elems; i += 1) {
            expect(dict.set(i, i + 1)).toBeUndefined();
        }

        for (i = 0; i < elems; i += 1) {
            expect(dict.get(i)).toEqual(i + 1);
        }
    });

    it('set and get value with custom key', function () {

        var ts = function (obj) {
                return obj.s;
            },
            i;
        dict = new buckets.Dictionary(ts);
        expect(dict.get('sd')).toBeUndefined();

        for (i = 0; i < elems; i += 1) {
            var o = {};
            o.s = '' + i;
            expect(dict.set(o, i + 1)).toBeUndefined();
        }

        for (i = 0; i < elems; i += 1) {
            var d = {};
            d.s = '' + i;
            expect(dict.get(d)).toEqual(i + 1);
        }
    });

    it('set keys with special keywords', function () {

        var dict = new buckets.Dictionary();

        dict.set('toString', 42);
        expect(dict.size()).toEqual(1);
        dict.remove('toString');
        expect(dict.size()).toEqual(0);

        dict.set('hasOwnProperty', 'foo');
        try {
            dict.keys();
        } catch (e) {
            dict.remove('hasOwnProperty');
        }

        dict.set('__proto__', {
            value: 123
        });
    });

    it('remove deletes existing key from the dictionary', function () {
        var i;
        expect(dict.remove('1')).toBeUndefined();
        for (i = 0; i < elems; i += 1) {
            expect(dict.set('' + i, i + 1)).toBeUndefined();
        }
        expect(dict.size()).toEqual(elems);

        for (i = 0; i < elems; i += 1) {
            expect(dict.remove('' + i)).toEqual(i + 1);
            expect(dict.get('' + i)).toBeUndefined();
            expect(dict.remove('' + i)).toBeUndefined();
        }
        expect(dict.size()).toEqual(0);
    });

    it('isEmpty returns true only if the dictionary contains no keys', function () {
        expect(dict.isEmpty()).toBeTruthy();
        dict.set('1', 1);
        expect(dict.isEmpty()).toBeFalsy();
        dict.remove('1');
        expect(dict.isEmpty()).toBeTruthy();
    });

    it('clear removes all key-value pairs', function () {
        dict.clear();
        dict.set(1, 1);
        dict.clear();
        expect(dict.isEmpty()).toBeTruthy();
        expect(dict.get(1)).toBeUndefined();
    });

    it('contains returns true for existing keys', function () {
        var i;
        expect(dict.containsKey(0)).toBeFalsy();
        for (i = 0; i < 10; i += 1) {
            dict.set(i, i);
            expect(dict.containsKey(i)).toBeTruthy();
        }
        for (i = 0; i < 10; i += 1) {
            dict.remove(i);
            expect(dict.containsKey(i)).toBeFalsy();
        }
    });

    it('size gives the right value', function () {
        var i;
        expect(dict.size()).toEqual(0);
        for (i = 0; i < 10; i += 1) {
            dict.set(i, i);
            expect(dict.size()).toEqual(i + 1);
        }
    });

    it('keys returns all the stored keys', function () {
        var k = [],
            i, keys;
        for (i = 0; i < elems; i += 1) {
            keys = dict.keys();
            k.sort();
            keys.sort();
            expect(buckets.arrays.equals(k, keys)).toBeTruthy();
            dict.set('' + i, i);
            k.push('' + i);
        }
    });

    it('values returns all the stored values', function () {
        var v = [],
            i, values;
        for (i = 0; i < elems; i += 1) {
            values = dict.values();
            v.sort();
            values.sort();
            expect(buckets.arrays.equals(v, values)).toBeTruthy();
            dict.set('' + i, i);
            v.push(i);
        }
    });

    it('forEeach gives all key-value pairs', function () {
        var keys, values, i;
        for (i = 0; i < elems; i += 1) {
            dict.set('' + i, i);
        }
        keys = dict.keys();
        values = dict.values();
        dict.forEach(function (k, v) {
            expect(buckets.arrays.remove(keys, k)).toBeTruthy();
            expect(buckets.arrays.remove(values, v)).toBeTruthy();
        });
        expect(keys.length).toEqual(0);
        expect(values.length).toEqual(0);
    });

    it('forEeach can be interrupted', function () {
        var t = 0,
            i;
        for (i = 0; i < elems; i += 1) {
            dict.set('' + i, i);
        }
        dict.forEach(function (k, v) {
            t += 1;
            return false;
        });
        expect(t).toEqual(1);
    });

    it('equals returns true only if they have the same key-values pairs', function () {
        var dict2 = new buckets.Dictionary();

        dict.set('1', 1);
        dict.set('2', 2);

        dict2.set('2', 2);
        dict2.set('1', 1);

        expect(dict.equals(dict2)).toBeTruthy();
        dict2.clear();
        dict2.set(1, '1');
        dict2.set(2, '2');
        expect(dict.equals(dict2)).toBeFalsy();
        expect(dict.equals([1, 2])).toBeFalsy();
    });
});
