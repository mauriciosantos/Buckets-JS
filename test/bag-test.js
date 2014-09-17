describe('Bag',
function() {

    var bag = null;

    beforeEach(function() {
        bag = new buckets.Bag();
    });

    var toStringF = function(f) {
        return f.description;
    };

    it('Gives the right size',
    function() {
        bag.add("a");
        bag.add("b");
        bag.add("c");
        expect(bag.size()).toEqual(3);
        bag.add('d');
        expect(bag.size()).toEqual(4);
        bag.remove('d');
        expect(bag.size()).toEqual(3);
        bag.clear();

        bag.add("a");
        bag.add("b");
        bag.add("c");
        expect(bag.size()).toEqual(3);
        bag.add('d');
        expect(bag.size()).toEqual(4);
        bag.remove('d');
        expect(bag.size()).toEqual(3);
    });

    it('Gives the right size with duplicated elements',
    function() {
        bag.add("a");
        bag.add("a");
        bag.add("b");
        bag.add("b");
        bag.add("c");
        expect(bag.size()).toEqual(5);
        bag.remove('b');
        bag.remove('a');
        expect(bag.size()).toEqual(3);
        bag.remove('a');
        bag.remove('b');
        bag.remove('c');
        expect(bag.size()).toEqual(0);
    });

    it('Contains existing elements',
    function() {
        bag.add("a");
        bag.add("b");
        bag.add("c");
        bag.add("c");
        bag.add('d');

        expect(bag.contains('a')).toBeTruthy();
        expect(bag.contains('b')).toBeTruthy();
        expect(bag.contains('c')).toBeTruthy();
        expect(bag.contains('d')).toBeTruthy();
        expect(bag.contains('e')).toBeFalsy();
        bag.remove("c");
        expect(bag.contains('c')).toBeTruthy();
        bag.remove("c");
        expect(bag.contains('c')).toBeFalsy();
        bag.clear();
        bag.add(1);
        bag.add(2);
        expect(bag.contains(1)).toBeTruthy();
        expect(bag.contains(2)).toBeTruthy();
        expect(bag.contains(3)).toBeFalsy();
    });

    it('Contains existing elements with custom toString function',
    function() {
        bag = new buckets.Bag(toStringF);
        var fn1 = function() {};
        fn1.description = "fn1";
        expect(bag.contains(fn1)).toBeFalsy();
        bag.add(fn1);
        expect(bag.contains(fn1)).toBeTruthy();
        var fn2 = function() {};
        fn2.description = "fn2";
        expect(bag.contains(fn2)).toBeFalsy();
        bag.add(fn2);
        bag.add(fn2);
        expect(bag.contains(fn2)).toBeTruthy();
        expect(bag.size()).toEqual(3);
        bag.remove(fn2);
        expect(bag.contains(fn2)).toBeTruthy();
        bag.remove(fn2)
        expect(bag.contains(fn2)).toBeFalsy();
    });

    it('An empty bag is empty',
    function() {
        expect(bag.isEmpty()).toBeTruthy();
        bag.add(1);
        bag.add(1);
        expect(bag.isEmpty()).toBeFalsy();
        bag.remove(1);
        expect(bag.isEmpty()).toBeFalsy();
        bag.remove(1);
        expect(bag.isEmpty()).toBeTruthy();
    });

    it('Adds',
    function() {
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('b')).toBeTruthy();
        expect(bag.contains('a')).toBeTruthy();
        expect(bag.contains('b')).toBeTruthy();
        expect(bag.add('b')).toBeTruthy();
        expect(bag.contains('b')).toBeTruthy();
        expect(bag.add(null)).toBeTruthy();
        expect(bag.contains(null)).toBeTruthy();
        expect(bag.add(null)).toBeTruthy();
        expect(bag.contains(undefined)).toBeFalsy();
        expect(bag.add(undefined)).toBeFalsy();
        expect(bag.contains(undefined)).toBeFalsy();
    });
    it('Adds multiple copies',
    function() {
        expect(bag.add('a', 1)).toBeTruthy();
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('b', 3)).toBeTruthy();
        expect(bag.contains('a')).toBeTruthy();
        expect(bag.contains('b')).toBeTruthy();
        expect(bag.add('b')).toBeTruthy();
        expect(bag.count("a")).toEqual(2);
        expect(bag.count("b")).toEqual(4);
        bag.remove('a');
        bag.remove('a');
        expect(bag.count("a")).toEqual(0);
    });

    it('Removes',
    function() {
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('a')).toBeTruthy();
        expect(bag.add('b')).toBeTruthy();
        expect(bag.remove('a')).toBeTruthy();
        expect(bag.remove('a')).toBeTruthy();
        expect(bag.size()).toEqual(1);
        expect(bag.remove('b')).toBeTruthy();
        expect(bag.size()).toEqual(0);
    });

    it('Removes multiple copies',
    function() {
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

    it('Clear removes all elements',
    function() {
        expect(bag.add('b', 3)).toBeTruthy();
        bag.clear();
        expect(bag.count('b')).toEqual(0);
        expect(bag.size()).toEqual(0);
    });

    it('Converts to an array',
    function() {
        var arr = bag.toArray();
        expect(arr.length).toEqual(0);
        expect(bag.add('b', 3)).toBeTruthy();
        expect(bag.add('a', 2)).toBeTruthy();
        expect(bag.add('c')).toBeTruthy();
        arr = bag.toArray();
        expect(buckets.arrays.frequency(arr, "b")).toEqual(3);
        expect(buckets.arrays.frequency(arr, "a")).toEqual(2);
        expect(buckets.arrays.frequency(arr, "c")).toEqual(1);
    });

    it('Converts to a set',
    function() {
        var set = bag.toSet();
        expect(set.size()).toEqual(0);
        expect(bag.add('b', 3)).toBeTruthy();
        expect(bag.add('a', 2)).toBeTruthy();
        expect(bag.add('c')).toBeTruthy();
        set = bag.toSet();
        expect(set.contains("b")).toBeTruthy();
        expect(set.contains("a")).toBeTruthy();
        expect(set.contains("c")).toBeTruthy();
    });

    it('For each gives all the elements',
    function() {
        bag.forEach(function(e) {
            expect(false).toBeTruthy();
        });
        var a = [1, 5, 5, 6];
        bag.add(1);
        bag.add(5);
        bag.add(5);
        bag.add(6);
        bag.forEach(function(e) {
            expect(buckets.arrays.contains(a, e)).toBeTruthy();
        });

        var count = 0;
        bag.forEach(function(e) {
            expect(buckets.arrays.contains(a, e)).toBeTruthy();
            if (e === 5) {
                count++;
                bag.remove(e);
            }
        });
        expect(count).toEqual(2);
        expect(bag.contains(5)).toBeFalsy();
        expect(bag.contains(1)).toBeTruthy();
        expect(bag.contains(6)).toBeTruthy();
    });

    it('For each can be interrupted',
    function() {
        for (var i = 0; i < 5; i++) {
            bag.add(i);
        }
        var t = 0;
        bag.forEach(function(e) {
            t++;
            return false;
        });
        expect(t).toEqual(1);
    });
});