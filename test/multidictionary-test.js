describe('Multi Dictionary', function () {

    var elems = 100,
        dict;

    beforeEach(function () {
        dict = new buckets.MultiDictionary();
    });

    it('set and get value with string key', function () {

        expect(dict.get("sd")).toEqual([]);
        dict.set("a", 5);
        expect(dict.get("a")).toEqual([5]);
        expect(dict.set("a", 21)).toBeTruthy();
        expect(dict.size()).toEqual(1);
        expect(dict.get("a")).toEqual([5, 21]);

    });

    it('set and get value with number key', function () {
        expect(dict.get(1)).toEqual([]);
        dict.set(1, 5);
        expect(dict.get(1)).toEqual([5]);
    });

    it('set and get value with custom key', function () {
        var ts = function (obj) {
                return obj.s;
            },
            o;
        dict = new buckets.MultiDictionary(ts);
        o = {
            s: "1"
        };
        expect(dict.set(o, 2)).toBeTruthy();
        expect(dict.get(o)).toEqual([2]);
    });

    it('set associates multiple values with single key', function () {
        dict.set("a", 5);
        expect(dict.get("a")).toEqual([5]);
        expect(dict.set("a", 21)).toBeTruthy();
        expect(dict.size()).toEqual(1);
        expect(dict.get("a")).toEqual([5, 21]);
        expect(dict.size()).toEqual(1);
        expect(dict.set("a", 31)).toBeTruthy();
        expect(dict.size()).toEqual(1);
        expect(dict.get("a")).toEqual([5, 21, 31]);
        expect(dict.size()).toEqual(1);

    });

    it('remove deletes existing keys', function () {
        var i;
        expect(dict.remove("1")).toBeFalsy();
        for (i = 0; i < elems; i += 1) {
            expect(dict.set("" + i, i + 1)).toBeTruthy();
        }
        expect(dict.size()).toEqual(elems);

        for (i = 0; i < elems; i += 1) {
            expect(dict.remove("" + i)).toBeTruthy();
            expect(dict.get("" + i)).toEqual([]);
            expect(dict.remove("" + i)).toBeFalsy();
        }
        expect(dict.size()).toEqual(0);
    });

    it('remove deletes multiple values per key', function () {
        dict.set("a", 1);
        dict.remove("a");
        expect(dict.containsKey("a")).toBeFalsy();
        expect(dict.get("a")).toEqual([]);
        dict.set("a", 2);
        dict.set("a", 3);
        dict.remove("a");
        expect(dict.containsKey("a")).toBeFalsy();
        expect(dict.get("a")).toEqual([]);
    });

    it('remove deletes a single value from key', function () {
        dict.set("a", 1);
        dict.remove("a", 1);
        expect(dict.containsKey("a")).toBeFalsy();
        expect(dict.get("a")).toEqual([]);
        dict.set("a", 2);
        dict.set("a", 3);
        dict.remove("a", 3);
        expect(dict.containsKey("a")).toBeTruthy();
        expect(dict.get("a")).toEqual([2]);
        dict.remove("a", 2);
        expect(dict.containsKey("a")).toBeFalsy();
        expect(dict.get("a")).toEqual([]);
    });

    it('isEmpty returns true only if there are no key-value pairs', function () {
        expect(dict.isEmpty()).toBeTruthy();
        dict.set("1", 1);
        expect(dict.isEmpty()).toBeFalsy();
        dict.remove("1");
        expect(dict.isEmpty()).toBeTruthy();
    });

    it('clear removes all elements', function () {
        dict.clear();
        dict.set(1, 1);
        dict.clear();
        expect(dict.isEmpty()).toBeTruthy();
        expect(dict.get(1)).toEqual([]);
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

    it('keys returns all inserted keys', function () {
        var k = [],
            i, keys;
        for (i = 0; i < elems; i += 1) {
            keys = dict.keys();
            k.sort();
            keys.sort();
            expect(k).toEqual(keys);
            dict.set("" + i, i);
            k.push("" + i);
        }
    });

    it('values returns all inserted values', function () {
        var v = [],
            i, values;
        for (i = 0; i < elems; i += 1) {
            values = dict.values();
            v.sort();
            values.sort();
            expect(v).toEqual(values);
            dict.set("" + i, i);
            v.push(i);
        }
    });

    it('forEeach returns all the key value pairs', function () {
        var i;
        dict.forEach(function (e) {
            expect(false).toBeTruthy();
        });

        for (i = 0; i < elems; i += 1) {
            dict.set(i, i);
            dict.set(i, i + 1);
        }
        i = 0;
        dict.forEach(function (k, v) {
            expect(dict.get(k)).toEqual([k, k + 1]);
            i += 1
        });
        expect(i).toEqual(elems);
    });

    it('forEeach can be interrupted', function () {
        var i = 0;
        dict.set(1, 1);
        dict.set(2, 1);
        dict.forEach(function (key, values) {
            i += 1;
            return false;
        });
        expect(i).toEqual(1);
    });

    it('equals returns true only if they have the same key-values pairs', function () {
        var dict2 = new buckets.MultiDictionary();
        dict.set('a', 1);
        dict.set('b', 2);

        dict2.set('a', 1);
        dict2.set('b', 2);

        expect(dict.equals(dict2)).toBeTruthy();
        dict2.clear();
        dict2.set('a', 1);
        dict2.set('b', 2);
        dict2.set('b', 3);
        expect(dict.equals(dict2)).toBeFalsy();
        expect(dict.equals([1, 2])).toBeFalsy();
    });
});
