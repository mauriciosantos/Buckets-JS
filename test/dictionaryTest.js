describe('Dictionary',
function() {

    var dict = null;
    var elems = 100;

    beforeEach(function() {
        dict = new buckets.Dictionary();
    });

    it('Maps keys to values with string keys',
    function() {

        expect(dict.get("sd")).toBeUndefined();

        // test with string keys
        for (var i = 0; i < elems; i++) {
            expect(dict.set("" + i, i + 1)).toBeUndefined();
        }
        expect(dict.size()).toEqual(elems);

        for (var i = 0; i < elems; i++) {
            expect(dict.get("" + i)).toEqual(i + 1);
        }

        dict.set("a", 5);
        expect(dict.get("a")).toEqual(5);
        expect(dict.set("a", 21)).toEqual(5);
        expect(dict.size()).toEqual(elems + 1);
        expect(dict.get("a")).toEqual(21);

    });

    it('Maps keys to values with number keys',
    function() {

        // test with number keys
        for (var i = 0; i < elems; i++) {
            expect(dict.set(i, i + 1)).toBeUndefined();
        }

        for (var i = 0; i < elems; i++) {
            expect(dict.get(i)).toEqual(i + 1);
        }
    });

    it('Maps keys to values with custom keys',
    function() {

        var ts = function(obj) {
            return obj.s;
        };
        dict = new buckets.Dictionary(ts);
        expect(dict.get("sd")).toBeUndefined();

        for (var i = 0; i < elems; i++) {
            var o = {};
            o.s = "" + i;
            expect(dict.set(o, i + 1)).toBeUndefined();
        }

        for (var i = 0; i < elems; i++) {
            var d = {};
            d.s = "" + i;
            expect(dict.get(d)).toEqual(i + 1);
        }
    });

    it('Removes existing elements from the dictionary',
    function() {

        expect(dict.remove("1")).toBeUndefined();
        for (var i = 0; i < elems; i++) {
            expect(dict.set("" + i, i + 1)).toBeUndefined();
        }
        expect(dict.size()).toEqual(elems);

        for (var i = 0; i < elems; i++) {
            expect(dict.remove("" + i)).toEqual(i + 1);
            expect(dict.get("" + i)).toBeUndefined();
            expect(dict.remove("" + i)).toBeUndefined();
        }
        expect(dict.size()).toEqual(0);
    });

    it('An empty dictionary is empty',
    function() {

        expect(dict.isEmpty()).toBeTruthy();
        dict.set("1", 1);
        expect(dict.isEmpty()).toBeFalsy();
        dict.remove("1");
        expect(dict.isEmpty()).toBeTruthy();
    });

	it('Clear removes all elements',
    function() {
		dict.clear();
		dict.set(1,1);
		dict.clear();
		expect(dict.isEmpty()).toBeTruthy();
		expect(dict.get(1)).toBeUndefined();
    });

    it('Contains existing keys',
    function() {

        expect(dict.containsKey(0)).toBeFalsy();
        for (var i = 0; i < 10; i++) {
            dict.set(i, i);
            expect(dict.containsKey(i)).toBeTruthy();
        };
        for (var i = 0; i < 10; i++) {
            dict.remove(i);
            expect(dict.containsKey(i)).toBeFalsy();
        };
    });

    it('Gives the right size',
    function() {

        expect(dict.size()).toEqual(0);
        for (var i = 0; i < 10; i++) {
            dict.set(i, i);
            expect(dict.size()).toEqual(i + 1);
        };

    });

    it('Gives all the stored keys',
    function() {
        var k = [];
        for (var i = 0; i < elems; i++) {
            var keys = dict.keys();
            k.sort();
            keys.sort();
            expect(buckets.arrays.equals(k, keys)).toBeTruthy();
            dict.set("" + i, i);
            k.push("" + i);
        }
    });

    it('Gives all the stored values',
    function() {
        var v = [];
        for (var i = 0; i < elems; i++) {
            var values = dict.values();
            v.sort();
            values.sort();
            expect(buckets.arrays.equals(v, values)).toBeTruthy();
            dict.set("" + i, i);
            v.push(i);
        }
    });
	
	it('For each gives all the pairs',
    function() {
        for (var i = 0; i < elems; i++) {
            dict.set("" + i, i);
        }
		var keys = dict.keys();
		var values = dict.values();
		dict.forEach(function(k,v) {
			expect(buckets.arrays.remove(keys, k)).toBeTruthy();
			expect(buckets.arrays.remove(values, v)).toBeTruthy();
		});
		expect(keys.length).toEqual(0);
		expect(values.length).toEqual(0);
    });
	
	
	it('For each can be interrupted',
    function() {
        for (var i = 0; i < elems; i++) {
            dict.set("" + i, i);
        }
		var t = 0;
		dict.forEach(function(k,v) {
			t++;
			return false;
		});
		expect(t).toEqual(1);
    });

});