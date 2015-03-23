describe('Set', function () {
    var set;

    beforeEach(function () {
        set = new buckets.Set();
    });

    it('size gives the right value', function () {
        set.add("a");
        set.add("b");
        set.add("c");
        expect(set.size()).toEqual(3);
        set.add('d');
        expect(set.size()).toEqual(4);
        set.remove('d');
        expect(set.size()).toEqual(3);
        set.clear();

        set.add("a");
        set.add("b");
        set.add("c");
        expect(set.size()).toEqual(3);
        set.add('d');
        expect(set.size()).toEqual(4);
        set.remove('d');
        expect(set.size()).toEqual(3);
        set.add("c");
        expect(set.size()).toEqual(3);
    });

    it('contains returns true for inserted elements', function () {
        var fn1, fn2;
        set.add("a");
        set.add("b");
        set.add("c");
        set.add('d');

        expect(set.contains('a')).toBeTruthy();
        expect(set.contains('b')).toBeTruthy();
        expect(set.contains('c')).toBeTruthy();
        expect(set.contains('d')).toBeTruthy();
        expect(set.contains('e')).toBeFalsy();

        set.clear();
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        expect(set.contains(1)).toBeTruthy();
        expect(set.contains(2)).toBeTruthy();
        expect(set.contains(3)).toBeTruthy();
        expect(set.contains(4)).toBeTruthy();
        expect(set.contains(5)).toBeFalsy();

        var toStringF = function (f) {
            return f.description;
        };

        set = new buckets.Set(toStringF);
        fn1 = function () {};
        fn1.description = "fn1";
        expect(set.contains(fn1)).toBeFalsy();
        set.add(fn1);
        expect(set.contains(fn1)).toBeTruthy();
        fn2 = function () {};
        fn2.description = "fn2";
        expect(set.contains(fn2)).toBeFalsy();
        set.add(fn2);
        expect(set.contains(fn2)).toBeTruthy();
        expect(set.size()).toEqual(2);
    });

    it('isEmpty returns true only if set has no elements', function () {
        expect(set.isEmpty()).toBeTruthy();
        set.add(1);
        expect(set.isEmpty()).toBeFalsy();
    });

    it('intersection is commutative', function () {
        var s1, s2, set2;
        //Two empty sets
        set2 = new buckets.Set();
        set.intersection(set2);
        expect(set.isEmpty()).toBeTruthy();
        set2.intersection(set);
        expect(set2.isEmpty()).toBeTruthy();

        // non empty with empty
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.intersection(set2);
        expect(set.isEmpty()).toBeTruthy();
        set2.intersection(set);
        expect(set2.isEmpty()).toBeTruthy();

        // non empty sets with common elements
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set2.add(1);
        set2.add(2);
        set2.add(3);

        set.intersection(set2);
        s1 = set.toArray().sort();
        expect(s1).toEqual([1, 2]);
        set = new buckets.Set();
        set.add(1);
        set.add(2);

        set2.intersection(set);
        s2 = set2.toArray().sort();
        expect(s2).toEqual([1, 2]);

        // non empty sets with  no common elements
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set2.add(3);
        set2.add(4);
        set2.add(5);

        set.intersection(set2);
        expect(set.isEmpty()).toBeTruthy();
        set.add(1);
        set.add(2);
        set2.intersection(set);
        expect(set2.isEmpty()).toBeTruthy();
    });

    it('union is commutative', function () {

        var set2 = new buckets.Set(),
            s1, s2;
        set.add(1);
        set.add(2);
        set2.add(2);
        set2.add(4);
        set2.add(5);
        set.union(set2);
        s1 = set.toArray().sort();
        expect(s1).toEqual([1, 2, 4, 5]);
        set.clear()
        set.add(1);
        set.add(2);
        set2.union(set);
        s2 = set2.toArray().sort();
        expect(s2).toEqual([1, 2, 4, 5]);
    });

    it('difference removes elements', function () {

        //Two empty sets
        var set2 = new buckets.Set(),
            s1;
        set.difference(set2);
        expect(set.isEmpty()).toBeTruthy();

        //Non empty and empty set
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set.difference(set2);
        s1 = set.toArray().sort();
        expect(s1).toEqual([1, 2]);

        //Non empty sets with common elements
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        set2.add(2);
        set2.add(3);
        set.difference(set2);
        s1 = set.toArray().sort();
        expect(s1).toEqual([1, 4]);

        // Two equal sets
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set2.add(1);
        set2.add(3);
        set2.add(2);
        set.difference(set2);
        expect(set.isEmpty()).toBeTruthy();

        //Non empty sets with no common elements
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        set2.add(6);
        set2.add(9);
        set.difference(set2);
        s1 = set.toArray().sort();
        expect(s1).toEqual([1, 2, 3, 4]);
    });

    it('isSubsetOf returns true for super sets only', function () {

        //Two empty sets
        var set2 = new buckets.Set();
        expect(set.isSubsetOf(set2)).toBeTruthy();

        // Two equal sets
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set2.add(2);
        set2.add(1);
        expect(set.isSubsetOf(set2)).toBeTruthy();
        expect(set2.isSubsetOf(set)).toBeTruthy();

        //Non empty sets with common elements
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        set2.add(2);
        set2.add(3);
        expect(set2.isSubsetOf(set)).toBeTruthy();
        expect(set.isSubsetOf(set2)).toBeFalsy();

        //Non empty sets with no common elements
        set = new buckets.Set();
        set2 = new buckets.Set();
        set.add(3);
        set2.add(4);
        expect(set.isSubsetOf(set2)).toBeFalsy();
        expect(set2.isSubsetOf(set)).toBeFalsy();
    });

    it('add inserts elements if not present', function () {
        expect(set.add('a')).toBeTruthy();
        expect(set.add('b')).toBeTruthy();
        expect(set.contains('a')).toBeTruthy();
        expect(set.contains('b')).toBeTruthy();
        expect(set.add('b')).toBeFalsy();
        expect(set.contains('b')).toBeTruthy();
        expect(set.add(null)).toBeTruthy();
        expect(set.contains(null)).toBeTruthy();
        expect(set.add(null)).toBeFalsy();
    });

    it('add can not insert undefined', function () {
        expect(set.add(undefined)).toBeFalsy();
        expect(set.contains(undefined)).toBeFalsy();
    });

    it('forEach returns all elements', function () {
        var i, values;
        set.forEach(function (e) {
            expect(false).toBeTruthy();
        });
        for (i = 0; i < 100; i += 1) {
            set.add(i);
        }
        values = set.toArray();
        expect(values.length).toEqual(100);
        set.forEach(function (e) {
            expect(buckets.arrays.remove(values, e)).toBeTruthy();
        });
        expect(values.length).toEqual(0);
    });

    it('forEach can be interrupted', function () {
        var i, t;
        for (i = 0; i < 5; i += 1) {
            set.add(i);
        }
        t = 0;
        set.forEach(function (e) {
            t += 1;
            return false;
        });
        expect(t).toEqual(1);
    });

    it('equals returns true only if sets have the same elements', function () {
        var set2 = new buckets.Set();
        set.add(1);
        set.add(2);
        set2.add(2);
        set2.add(1);

        expect(set.equals(set2)).toBeTruthy();
        set2.clear();
        set2.add(3);
        set2.add(1);
        expect(set.equals(set2)).toBeFalsy();
        expect(set.equals([1, 2])).toBeFalsy();
    });
});
