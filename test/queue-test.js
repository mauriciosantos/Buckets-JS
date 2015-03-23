describe('Queue', function () {

    var queue = null;

    beforeEach(function () {
        queue = new buckets.Queue();
    });

    function createQueue() {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
    }

    it('size gives the right value', function () {
        expect(queue.size()).toEqual(0);
        createQueue();
        expect(queue.size()).toEqual(3);
        queue.enqueue('d');
        expect(queue.size()).toEqual(4);
        queue.dequeue();
        expect(queue.size()).toEqual(3);
        queue.clear();
        expect(queue.size()).toEqual(0);

    });

    it('enqueue inserts elements to the queue', function () {
        var head;
        createQueue();
        head = queue.dequeue();
        expect(head).toEqual('a');
        queue.dequeue();
        head = queue.dequeue();
        expect(head).toEqual('c');
        expect(queue.isEmpty()).toBeTruthy();
        head = queue.dequeue();
        expect(head).toBeUndefined();
    });

    it('peek returns the frst element or undefined', function () {
        var head, head2;
        createQueue();
        head = queue.peek();
        expect(head).toEqual('a');
        head2 = queue.dequeue();
        expect(head).toEqual(head2);
        head = queue.peek();
        expect(head).toEqual('b');
        queue.clear();
        head = queue.peek();
        expect(head).toBeUndefined();
    });

    it('forEeach gives the elements in order', function () {
        var i;
        queue.forEach(function (e) {
            expect(true).toEqual(false); // should not enter here
        });

        for (i = 0; i < 10; i += 1) {
            queue.add(i);
        }

        i = 0;
        queue.forEach(function (e) {
            expect(e).toEqual(i);
            i += 1;
        });
    });

    it('forEeach can be interrupted', function () {
        var array = [0, 1, 2, 3, 4],
            b = [],
            i;
        for (i = 0; i < 5; i += 1) {
            queue.add(i);
        }
        queue.forEach(function (e) {
            b.push(e);
            if (e === 3) {
                return false;
            }
        });

        expect([0, 1, 2, 3]).toEqual(b);
    });

    it('contains returns true for inserted items', function () {
        createQueue();
        expect(queue.contains('a')).toBeTruthy();
    });

    it('contains returns false for non-inserted items', function () {
        createQueue();
        expect(queue.contains('z')).toBeFalsy();
        expect(queue.contains(undefined)).toBeFalsy();
    });

    it('toArray gives the elements in order', function () {
        var arr;
        expect(queue.toArray().length).toEqual(0);

        queue.add(5);
        arr = queue.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr.length).toEqual(1);

        queue.add(8);
        arr = queue.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr[1]).toEqual(8);
        expect(arr.length).toEqual(2);
    });

    it('equals returns true only if queues have the same elements in order', function () {
        var queue2 = new buckets.Queue();
        queue.add(1);
        queue.add(2);

        queue2.add(1);
        queue2.add(2);

        expect(queue.equals(queue2)).toBeTruthy();
        queue2.clear();
        queue2.add(2);
        queue2.add(1);
        expect(queue.equals(queue2)).toBeFalsy();
        expect(queue.equals([1, 2])).toBeFalsy();
    });
});
