describe('Priority Queue',
function() {

    function getPriorityQueue() {
        var queue = new buckets.PriorityQueue();
        queue.enqueue(0);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        return queue;
    }
    function getPriorityQueue2() {
        var queue = new buckets.PriorityQueue();
        queue.enqueue(1);
        queue.enqueue(3);
        queue.enqueue(0);
        queue.enqueue(2);
        return queue;
    }

    it('Gives the right size',
    function() {
        var queue = getPriorityQueue();
        expect(queue.size()).toEqual(4);
        queue.dequeue();
        expect(queue.size()).toEqual(3);
    });

    it('Gives the right size 2',
    function() {
        var queue = getPriorityQueue2();
        expect(queue.size()).toEqual(4);
        queue.dequeue();
        expect(queue.size()).toEqual(3);
    });

    it('Gives the right size 3',
    function() {
        var queue = getPriorityQueue();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        expect(queue.size()).toEqual(0);
    });

    it('Contains inserted elements',
    function() {
        var queue = getPriorityQueue();
        for (var i = 0; i < 4; i++) {
            expect(queue.contains(i)).toBeTruthy();
        }
        expect(queue.contains(5)).toBeFalsy();
    });

    it('An empty queue is empty',
    function() {
        var queue = getPriorityQueue();
        expect(queue.isEmpty()).toBeFalsy();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        expect(queue.isEmpty()).toBeFalsy();
        queue.dequeue();
        expect(queue.isEmpty()).toBeTruthy();
    });

    it('Peeks the highest priority item',
    function() {
        var queue = getPriorityQueue();
        expect(queue.peek()).toEqual(3);
    });

    it('Peeks the highest priority item 2',
    function() {
        var queue = getPriorityQueue2();
        expect(queue.peek()).toEqual(3);
    });

	it('Peeking an empty queue returns undefined',
    function() {
        var queue = getPriorityQueue();
		queue.clear();
        expect(queue.peek()).toEqual(undefined);
    });

	it('Dequeues the highest priority item',
    function() {
        var queue = getPriorityQueue();
 		expect(queue.dequeue()).toEqual(3);
 		expect(queue.dequeue()).toEqual(2);
 		expect(queue.dequeue()).toEqual(1);
 		expect(queue.dequeue()).toEqual(0);
    });

	it('Dequeues the highest priority item 2',
    function() {
        var queue = getPriorityQueue2();
 		expect(queue.dequeue()).toEqual(3);
 		expect(queue.dequeue()).toEqual(2);
 		expect(queue.dequeue()).toEqual(1);
 		expect(queue.dequeue()).toEqual(0);
    });

	it('Peek and enqueue are consistent',
    function() {
        var queue = new buckets.PriorityQueue();
		queue.enqueue(0);
 		expect(queue.peek()).toEqual(0);
		queue.enqueue(1);
 		expect(queue.peek()).toEqual(1);
		queue.enqueue(2);
 		expect(queue.peek()).toEqual(2);
		queue.enqueue(3);
 		expect(queue.peek()).toEqual(3);
    });

	it('Peek and enqueue are consistent 2',
    function() {
        var queue = new buckets.PriorityQueue();
		queue.enqueue(1);
 		expect(queue.peek()).toEqual(1);
		queue.enqueue(3);
 		expect(queue.peek()).toEqual(3);
		queue.enqueue(0);
 		expect(queue.peek()).toEqual(3);
		queue.enqueue(2);
 		expect(queue.peek()).toEqual(3);
    });

});