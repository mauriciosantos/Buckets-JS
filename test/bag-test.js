describe('Bag', function () {

    var toStringF = function (f) {
            return f.description;
        },
        bag;

    beforeEach(function () {
        bag = new buckets.Bag();
    });

    it('size gives the right value without duplicated elements', function () {
        bag.add('a');
        bag.add('b');
        bag.add('c');
        expect(bag.size()).toEqual(3);
        bag.add('d');
        expect(bag.size()).toEqual(4);
        bag.remove('d');
        expect(bag.size()).toEqual(3);
        bag.clear();

        bag.add('a');
        bag.add('b');
        bag.add('c');
        expect(bag.size()).toEqual(3);
        bag.add('d');
        expect(bag.size()).toEqual(4);
        bag.remove('d');
        expect(bag.size()).toEqual(3);
    });

    it('size gives the right value with duplicated elements', function () {
        bag.add('a');
        bag.add('a');
        bag.add('b');
        bag.add('b');
        bag.add('c');
        expect(bag.size()).toEqual(5);
        bag.remove('b');
        bag.remove('a');
        expect(bag.size()).toEqual(3);
        bag.remove('a');
        bag.remove('b');
        bag.remove('c');
        expect(bag.size()).toEqual(0);
    });

    it('contains returns true for existing elements', function () {
        bag.add('a');
        bag.add('c');
        bag.add('c');

        expect(bag.contains('a')).toBeTruthy();
        expect(bag.contains('c')).toBeTruthy();
        bag.remove('c');
        expect(bag.contains('c')).toBeTruthy();
    });

    it('contains returns false for non-existing elements', function () {
        bag.add('c');
        bag.add('c');
        expect(bag.contains('e')).toBeFalsy();
        bag.remove('c');
        bag.remove('c');
        expect(bag.contains('c')).toBeFalsy();
    });

    it('contains returns true for existing elements with custom toString', function () {
        bag = new buckets.Bag(toStringF);
        var fn1 = function () {};
        fn1.description = 'fn1';
        bag.add(fn1);
        expect(bag.contains(fn1)).toBeTruthy();
        var fn2 = function () {};
        fn2.description = 'fn2';
        bag.add(fn2);
        bag.add(fn2);
        expect(bag.contains(fn2)).toBeTruthy();
        expect(bag.size()).toEqual(3);
        bag.remove(fn2);
        expect(bag.contains(fn2)).toBeTruthy();
    });

    it('contains returns false for non-existing elements with custom toString', function () {
        bag = new buckets.Bag(toStringF);
        var fn1 = function () {};
        fn1.description = 'fn1';
        expect(bag.contains(fn1)).toBeFalsy();
        bag.add(fn1);
        var fn2 = function () {};
        fn2.description = 'fn2';
        expect(bag.contains(fn2)).toBeFalsy();
    });

    it('isEmpty returns true only if the bag contains no elements', function () {
        expect(bag.isEmpty()).toBeTruthy();
        bag.add(1);
        bag.add(1);
        expect(bag.isEmpty()).toBeFalsy();
        bag.remove(1);
        expect(bag.isEmpty()).toBeFalsy();
        bag.remove(1);
        expect(bag.isEmpty()).toBeTruthy();
    });

    it('add inserts elements into the bag and returns true', function () {
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('b')).toBeTruthy();
        expect(bag.contains('a')).toBeTruthy();
        expect(bag.contains('b')).toBeTruthy();
        expect(bag.add('b')).toBeTruthy();
        expect(bag.contains('b')).toBeTruthy();
        expect(bag.add(null)).toBeTruthy();
        expect(bag.contains(null)).toBeTruthy();
        expect(bag.add(null)).toBeTruthy();
    });

    it('add can not insert undefined', function () {
        expect(bag.contains(undefined)).toBeFalsy();
        expect(bag.add(undefined)).toBeFalsy();
        expect(bag.contains(undefined)).toBeFalsy();
    });

    it('add inserts multiple copies', function () {
        expect(bag.add('a', 1)).toBeTruthy();
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('b', 3)).toBeTruthy();
        expect(bag.contains('a')).toBeTruthy();
        expect(bag.contains('b')).toBeTruthy();
        expect(bag.add('b')).toBeTruthy();
        expect(bag.count('a')).toEqual(2);
        expect(bag.count('b')).toEqual(4);
        bag.remove('a');
        bag.remove('a');
        expect(bag.count('a')).toEqual(0);
    });

    it('remove deletes a single copy', function () {
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('b')).toBeTruthy();
        expect(bag.remove('a')).toBeTruthy();
        expect(bag.remove('a')).toBeTruthy();
        expect(bag.size()).toEqual(1);
        expect(bag.remove('b')).toBeTruthy();
        expect(bag.size()).toEqual(0);
    });

    it('remove deletes multiple copies', function () {
        expect(bag.add('a', 1)).toBeTruthy();
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('b', 3)).toBeTruthy();
        expect(bag.remove('b', 2)).toBeTruthy();
        expect(bag.count('b')).toEqual(1);
        expect(bag.remove('b', 1)).toBeTruthy();
        expect(bag.count('b')).toEqual(0);
        expect(bag.remove('a', 2)).toBeTruthy();
        expect(bag.count('a')).toEqual(0);
        expect(bag.add('c', 3)).toBeTruthy();
        expect(bag.remove('c', 5)).toBeTruthy();
        expect(bag.count('a')).toEqual(0);
        expect(bag.size()).toEqual(0);
    });

    it('clear removes all elements', function () {
        expect(bag.add('b', 3)).toBeTruthy();
        bag.clear();
        expect(bag.count('b')).toEqual(0);
        expect(bag.size()).toEqual(0);
    });

    it('toArray includes multiple copies', function () {
        var arr = bag.toArray();
        expect(arr.length).toEqual(0);
        expect(bag.add('b', 3)).toBeTruthy();
        expect(bag.add('a', 2)).toBeTruthy();
        expect(bag.add('c')).toBeTruthy();
        arr = bag.toArray();
        expect(buckets.arrays.frequency(arr, 'b')).toEqual(3);
        expect(buckets.arrays.frequency(arr, 'a')).toEqual(2);
        expect(buckets.arrays.frequency(arr, 'c')).toEqual(1);
    });

    it('toSet includes a single copy per element', function () {
        var set = bag.toSet();
        expect(set.size()).toEqual(0);
        expect(bag.add('b', 3)).toBeTruthy();
        expect(bag.add('a', 2)).toBeTruthy();
        expect(bag.add('c')).toBeTruthy();
        set = bag.toSet();
        expect(set.contains('b')).toBeTruthy();
        expect(set.contains('a')).toBeTruthy();
        expect(set.contains('c')).toBeTruthy();
    });

    it('forEeach gives all the elements', function () {
        var a = [1, 5, 5, 6],
            count = 0;
        bag.forEach(function (e) {
            expect(false).toBeTruthy();
        });

        bag.add(1);
        bag.add(5);
        bag.add(5);
        bag.add(6);
        bag.forEach(function (e) {
            expect(buckets.arrays.contains(a, e)).toBeTruthy();
        });

        bag.forEach(function (e) {
            expect(buckets.arrays.contains(a, e)).toBeTruthy();
            if (e === 5) {
                count += 1;
                bag.remove(e);
            }
        });
        expect(count).toEqual(2);
        expect(bag.contains(5)).toBeFalsy();
        expect(bag.contains(1)).toBeTruthy();
        expect(bag.contains(6)).toBeTruthy();
    });

    it('forEach can be interrupted', function () {
        var t = 0,
            i;
        for (i = 0; i < 5; i += 1) {
            bag.add(i);
        }
        bag.forEach(function (e) {
            t += 1;
            return false;
        });
        expect(t).toEqual(1);
    });

    it('equals returns true only if bags have the same copies per element', function () {
        var bag2 = new buckets.Bag();

        bag.add(1);
        bag.add(2);

        bag2.add(2);
        bag2.add(1);

        expect(bag.equals(bag2)).toBeTruthy();
        bag2.clear();
        bag2.add(2);
        bag2.add(2);
        bag2.add(1);
        expect(bag.equals(bag2)).toBeFalsy();
        expect(bag.equals([1, 2])).toBeFalsy();
    });
});
