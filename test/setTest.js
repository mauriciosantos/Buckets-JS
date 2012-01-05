describe('Set',
function() {

    var set = null;

    it('Gives the right size',
    function() {
        set = new buckets.Set();
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

    it('Contains existing elements',
    function() {
        set = new buckets.Set();
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

        var toStringF = function(f) {
            return f.description;
        };

        set = new buckets.Set(toStringF);
        var fn1 = function() {};
        fn1.description = "fn1";
        expect(set.contains(fn1)).toBeFalsy();
        set.add(fn1);
        expect(set.contains(fn1)).toBeTruthy();
        var fn2 = function() {};
        fn2.description = "fn2";
        expect(set.contains(fn2)).toBeFalsy();
        set.add(fn2);
        expect(set.contains(fn2)).toBeTruthy();
        expect(set.size()).toEqual(2);
    });

    it('An empty set is empty',
    function() {
        set = new buckets.Set();
        expect(set.isEmpty()).toBeTruthy();
        set.add(1);
        expect(set.isEmpty()).toBeFalsy();
    });

    it('Adds',
    function() {
        set = new buckets.Set();
        expect(set.add('a')).toBeTruthy();
        expect(set.add('b')).toBeTruthy();
        expect(set.contains('a')).toBeTruthy();
        expect(set.contains('b')).toBeTruthy();
        expect(set.add('b')).toBeFalsy();
        expect(set.contains('b')).toBeTruthy();
        expect(set.add(null)).toBeTruthy();
        expect(set.contains(null)).toBeTruthy();
        expect(set.add(null)).toBeFalsy();
        expect(set.contains(undefined)).toBeFalsy();
        expect(set.add(undefined)).toBeFalsy();
        expect(set.contains(undefined)).toBeFalsy();
    });

    it('Iterator works',
    function() {
        set = new buckets.Set();
        var a = [1, 5, 6];
        var it = set.iterator();
        expect(it.hasNext()).toBeFalsy();
        expect(it.next()).toBeUndefined();
        set.add(1);
        set.add(5);
        set.add(6);
        it = set.iterator();
        expect(it.hasNext()).toBeTruthy();
        while (it.hasNext()) {
            var next = it.next();
            expect(buckets.arrays.contains(a, next)).toBeTruthy();
        }

        it = set.iterator();
        expect(it.hasNext()).toBeTruthy();
        while (it.hasNext()) {
            var next = it.next();
            if (next == 5) {
                it.remove();
            }
        }
        expect(set.contains(5)).toBeFalsy();
        expect(set.contains(1)).toBeTruthy();
        expect(set.contains(6)).toBeTruthy();

        it = set.iterator();
        expect(it.hasNext()).toBeTruthy();
        while (it.hasNext()) {
            var next = it.next();
            expect(next !== 5).toBeTruthy();
        }
    });
});