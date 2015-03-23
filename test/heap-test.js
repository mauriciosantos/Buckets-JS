describe('Heap', function () {

    var heap;

    function createHeap1() {
        heap = new buckets.Heap();
        heap.add(0);
        heap.add(1);
        heap.add(2);
        heap.add(3);
    }

    function createHeap2() {
        heap = new buckets.Heap();
        heap.add(1);
        heap.add(3);
        heap.add(0);
        heap.add(2);
    }

    function createHeap3() {
        heap = new buckets.Heap();
        heap.add('a');
        heap.add('b');
        heap.add('c');
        heap.add('d');
    }

    function createHeap4() {
        heap = new buckets.Heap();
        heap.add('b');
        heap.add('d');
        heap.add('a');
        heap.add('c');
    }

    function createHeap5() {
        heap = new buckets.Heap(customCompare);
        heap.add({
            val: 'b'
        });
        heap.add({
            val: 'd'
        });
        heap.add({
            val: 'a'
        });
        heap.add({
            val: 'c'
        });
    }

    function customCompare(a, b) {
        if (a.val < b.val) {
            return -1;
        } else if (a.val === b.val) {
            return 0;
        } else {
            return 1;
        }
    }

    beforeEach(function () {
        heap = new buckets.Heap();
    });

    it('size returns the right value', function () {
        createHeap1();
        expect(heap.size()).toEqual(4);
        heap.removeRoot();
        expect(heap.size()).toEqual(3);

        createHeap1();
        heap.removeRoot();
        heap.removeRoot();
        heap.removeRoot();
        heap.removeRoot();
        expect(heap.size()).toEqual(0);

        createHeap3();
        heap.removeRoot();
        heap.removeRoot();
        heap.removeRoot();
        heap.removeRoot();
        expect(heap.size()).toEqual(0);
    });

    it('peek returns the lowest element with numbers', function () {
        createHeap1();
        expect(heap.peek()).toEqual(0);
        heap.clear();
        expect(heap.peek()).toBeUndefined();
        createHeap2();
        expect(heap.peek()).toEqual(0);
    });

    it('peek returns the lowest element with strings', function () {
        createHeap3();
        expect(heap.peek()).toEqual('a');
        createHeap4();
        expect(heap.peek()).toEqual('a');
    });

    it('peek returns the lowest element with custom equals function', function () {
        createHeap5();
        expect(heap.peek().val).toEqual('a');
    });

    it('removeRoot deletes root node with numbers', function () {
        createHeap1();
        expect(heap.removeRoot()).toEqual(0);
        expect(heap.removeRoot()).toEqual(1);
        expect(heap.removeRoot()).toEqual(2);
        expect(heap.removeRoot()).toEqual(3);

        createHeap2();
        heap.add(1);
        expect(heap.removeRoot()).toEqual(0);
        expect(heap.removeRoot()).toEqual(1);
        expect(heap.removeRoot()).toEqual(1);
        expect(heap.removeRoot()).toEqual(2);
        expect(heap.removeRoot()).toEqual(3);
    });

    it('removeRoot deletes root node with custom objects', function () {
        createHeap5();
        expect(heap.removeRoot().val).toEqual('a');
        expect(heap.removeRoot().val).toEqual('b');
        expect(heap.removeRoot().val).toEqual('c');
        expect(heap.removeRoot().val).toEqual('d');
    });

    it('add interts lower element into the top', function () {
        heap.add(3);
        expect(heap.peek()).toEqual(3);
        heap.add(2);
        expect(heap.peek()).toEqual(2);
        heap.add(1);
        expect(heap.peek()).toEqual(1);
        heap.add(0);
        expect(heap.peek()).toEqual(0);
    });

    it('add interts higher element beneath the top', function () {
        heap.add(1);
        expect(heap.peek()).toEqual(1);
        heap.add(3);
        expect(heap.peek()).toEqual(1);
        heap.add(0);
        expect(heap.peek()).toEqual(0);
        heap.add(2);
        expect(heap.peek()).toEqual(0);
    });

    it('isEmpty returns true only if the heap contains no elements', function () {
        var i;
        expect(heap.isEmpty()).toBeTruthy();
        createHeap1();
        for (i = 0; i < heap.size(); i++) {
            expect(heap.isEmpty()).toBeFalsy();
            heap.removeRoot();
        }
    });

    it('clear removes all elements', function () {
        heap.clear();
        createHeap1();
        heap.clear();
        expect(heap.isEmpty()).toBeTruthy();
        expect(heap.peek()).toBeUndefined();
    });

    it('contains returns true for existing elements only', function () {
        var i;
        createHeap1();
        for (i = 0; i < 4; i++) {
            expect(heap.contains(i)).toBeTruthy();
        }
        expect(heap.contains(i)).toBeFalsy();
    });

    it('forEeach gives all the elements', function () {
        var elements = [];
        heap.forEach(function (e) {
            expect(true).toEqual(false); // should not enter here
        });
        createHeap1();


        heap.forEach(function (e) {
            elements.push(e);
        });

        expect(buckets.arrays.contains(elements, 0)).toBeTruthy();
        expect(buckets.arrays.contains(elements, 1)).toBeTruthy();
        expect(buckets.arrays.contains(elements, 2)).toBeTruthy();
        expect(buckets.arrays.contains(elements, 3)).toBeTruthy();
        expect(buckets.arrays.contains(elements, 4)).toBeFalsy();
    });

    it('forEeach can be interrupted', function () {
        var elements = [];
        createHeap1();
        heap.forEach(function (e) {
            elements.push(e);
            return false;
        });
        expect(elements.length).toEqual(1);
    });

    it('toArray returns an array with all the elements', function () {
        expect(heap.toArray().length).toEqual(0);

        heap.add(5);
        var arr = heap.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr.length).toEqual(1);

        heap.add(8);
        arr = heap.toArray();
        expect(buckets.arrays.contains(arr, 8)).toBeTruthy();
        expect(buckets.arrays.contains(arr, 5)).toBeTruthy();
        expect(arr.length).toEqual(2);
    });

    it('equals returns true only if heaps have the same elements', function () {
        var heap2 = new buckets.Heap();
        heap.add(1);
        heap.add(2);

        heap2.add(2);
        heap2.add(1);

        expect(heap.equals(heap2)).toBeTruthy();
        heap2.clear();
        heap2.add(2);
        heap2.add(2);
        heap2.add(1);
        expect(heap.equals(heap2)).toBeFalsy();
        expect(heap.equals([1, 2])).toBeFalsy();
    });
});
