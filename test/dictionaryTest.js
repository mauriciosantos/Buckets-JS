describe('Dictionary',
function() {

    var dict;
    var elems = 100;
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(needle) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === needle) {
                    return i;
                }
            }
            return - 1;
        };
    }

    beforeEach(function() {
        dict = new buckets.Dictionary();
    });

    it('Maps keys to values correctly',
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

        dict.clear();
        // test with number keys
        for (var i = 0; i < elems; i++) {
            expect(dict.set(i, i + 1)).toBeUndefined();
        }

        for (var i = 0; i < elems; i++) {
            expect(dict.get(i)).toEqual(i + 1);
        }
    });

    it('Maps keys to values correctly with cutom toString function',
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

    it('Gives all the stored keys',
    function() {
        var k = [];
        for (var i = 0; i < elems; i++) {
            var keys = dict.keys();
            expect(k.length).toEqual(keys.length);
            for (var j = 0; j < keys.length; j++) {
                expect(k.indexOf(keys[j])>=0).toBeTruthy();
            }
            for (var j = 0; j < k.length; j++) {
                expect(keys.indexOf(k[j]) >= 0).toBeTruthy();
            }
            dict.set("" + i, i);
            k.push("" + i);
        }
    });

	it('Gives all the stored values',
    function() {
        var v = [];
		for(var i = 0; i < elems; i++){
			var values = dict.values();
			expect(v.length).toEqual(values.length);

			for(var j=0;j<values.length;j++){
				expect(v.indexOf(values[j])>=0).toBeTruthy();
			}
			for(var j=0;j<v.length;j++){
				expect(values.indexOf(v[j])>=0).toBeTruthy();
			}
			dict.set("" + i,i);
			v.push(i);
		 }
    });

});