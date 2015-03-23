describe('Priority Queue', function () {

    var queue = null;

    function createPriorityQueue1() {
        queue = new buckets.PriorityQueue();
        queue.enqueue(0);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        return queue;
    }

    function createPriorityQueue2() {
        queue = new buckets.PriorityQueue();
        queue.enqueue(1);
        queue.enqueue(3);
        queue.enqueue(0);
        queue.enqueue(2);
        return queue;
    }

    beforeEach(function () {
        queue = new buckets.PriorityQueue();
    });

    it('size return the right value', function () {
        createPriorityQueue1();
        expect(queue.size()).toEqual(4);
        queue.dequeue();
        expect(queue.size()).toEqual(3);
        createPriorityQueue2();
        expect(queue.size()).toEqual(4);
        queue.dequeue();
        expect(queue.size()).toEqual(3);
        createPriorityQueue1();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        expect(queue.size()).toEqual(0);
    });

    it('contains returns true for inserted elements', function () {
        createPriorityQueue1();
        for (var i = 0; i < 4; i++) {
            expect(queue.contains(i)).toBeTruthy();
        }
        expect(queue.contains(5)).toBeFalsy();
    });

    it('contains returns false for invalid elements', function () {
        createPriorityQueue1();
        expect(queue.contains(5)).toBeFalsy();
    });

    it('isEmpty returns true only if the queue contains no elements', function () {
        createPriorityQueue1();
        expect(queue.isEmpty()).toBeFalsy();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        expect(queue.isEmpty()).toBeFalsy();
        queue.dequeue();
        expect(queue.isEmpty()).toBeTruthy();
    });

    it('peek returns the highest priority item', function () {
        createPriorityQueue1();
        expect(queue.peek()).toEqual(3);
        createPriorityQueue2();
        expect(queue.peek()).toEqual(3);
    });

    it('peek on empty queue returns undefined', function () {
        expect(queue.peek()).toEqual(undefined);
    });

    it('Dequeues returns and removes the highest priority item', function () {
        createPriorityQueue1();
        expect(queue.dequeue()).toEqual(3);
        expect(queue.dequeue()).toEqual(2);
        expect(queue.dequeue()).toEqual(1);
        expect(queue.dequeue()).toEqual(0);
        createPriorityQueue2();
        expect(queue.dequeue()).toEqual(3);
        expect(queue.dequeue()).toEqual(2);
        expect(queue.dequeue()).toEqual(1);
        expect(queue.dequeue()).toEqual(0);
    });


    it('peek is consistent with enqueue', function () {
        queue.enqueue(0);
        expect(queue.peek()).toEqual(0);
        queue.enqueue(1);
        expect(queue.peek()).toEqual(1);
        queue.enqueue(2);
        expect(queue.peek()).toEqual(2);
        queue.enqueue(3);
        expect(queue.peek()).toEqual(3);
    });

    it('forEach returns all elements', function () {
        var elements = [];
        queue.forEach(function (e) {
            expect(true).toEqual(false); // should not enter here
        });
        createPriorityQueue1();
        queue.forEach(function (e) {
            elements.push(e);
        });

        expect(buckets.arrays.contains(elements, 0)).toBeTruthy();
        expect(buckets.arrays.contains(elements, 1)).toBeTruthy();
        expect(buckets.arrays.contains(elements, 2)).toBeTruthy();
        expect(buckets.arrays.contains(elements, 3)).toBeTruthy();
    });

    it('forEach can be interrupted', function () {
        var i = 0;
        createPriorityQueue1();
        queue.forEach(function (e) {
            i += 1;
            return false;
        });
        expect(i).toEqual(1);
    });

    it('toArray gives all the elements', function () {
        var arr;
        expect(queue.toArray().length).toEqual(0);

        queue.add(5);
        arr = queue.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr.length).toEqual(1);

        queue.add(8);
        queue.add(8);
        arr = queue.toArray();
        expect(buckets.arrays.contains(arr, 8)).toBeTruthy();
        expect(buckets.arrays.contains(arr, 5)).toBeTruthy();
        expect(arr.length).toEqual(3);
    });

    it('equals returns true only if queues have the same elements', function () {
        var queue2 = new buckets.PriorityQueue();
        queue.add(1);
        queue.add(2);

        queue2.add(2);
        queue2.add(1);

        expect(queue.equals(queue2)).toBeTruthy();
        queue2.clear();
        queue2.add(2);
        queue2.add(2);
        queue2.add(1);
        expect(queue.equals(queue2)).toBeFalsy();
        expect(queue.equals([1, 2])).toBeFalsy();
    });
});
