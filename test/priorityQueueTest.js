describe('Priority Queue',
function() {

	var queue = null;
	
	beforeEach(function() {
        queue = new buckets.PriorityQueue();
    });

    var createPriorityQueue1 = function () {
        queue.enqueue(0);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        return queue;
    };

    var createPriorityQueue2 = function() {
        queue.enqueue(1);
        queue.enqueue(3);
        queue.enqueue(0);
        queue.enqueue(2);
        return queue;
    };

    it('Gives the right size',
    function() {
        createPriorityQueue1();
        expect(queue.size()).toEqual(4);
        queue.dequeue();
        expect(queue.size()).toEqual(3);
    });

    it('Gives the right size 2',
    function() {
        createPriorityQueue2();
        expect(queue.size()).toEqual(4);
        queue.dequeue();
        expect(queue.size()).toEqual(3);
    });

    it('Gives the right size 3',
    function() {
        createPriorityQueue1();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        expect(queue.size()).toEqual(0);
    });

    it('Contains inserted elements',
    function() {
        createPriorityQueue1();
        for (var i = 0; i < 4; i++) {
            expect(queue.contains(i)).toBeTruthy();
        }
        expect(queue.contains(5)).toBeFalsy();
    });

    it('An empty queue is empty',
    function() {
        createPriorityQueue1();
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
        createPriorityQueue1();
        expect(queue.peek()).toEqual(3);
    });

    it('Peeks the highest priority item 2',
    function() {
        createPriorityQueue2();
        expect(queue.peek()).toEqual(3);
    });

	it('Peeking an empty queue returns undefined',
    function() {
        createPriorityQueue1();
		queue.clear();
        expect(queue.peek()).toEqual(undefined);
    });

	it('Dequeues the highest priority item',
    function() {
        createPriorityQueue1();
 		expect(queue.dequeue()).toEqual(3);
 		expect(queue.dequeue()).toEqual(2);
 		expect(queue.dequeue()).toEqual(1);
 		expect(queue.dequeue()).toEqual(0);
    });

	it('Dequeues the highest priority item 2',
    function() {
        createPriorityQueue2();
 		expect(queue.dequeue()).toEqual(3);
 		expect(queue.dequeue()).toEqual(2);
 		expect(queue.dequeue()).toEqual(1);
 		expect(queue.dequeue()).toEqual(0);
    });

	it('Peek and enqueue are consistent',
    function() {
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
		queue.enqueue(1);
 		expect(queue.peek()).toEqual(1);
		queue.enqueue(3);
 		expect(queue.peek()).toEqual(3);
		queue.enqueue(0);
 		expect(queue.peek()).toEqual(3);
		queue.enqueue(2);
 		expect(queue.peek()).toEqual(3);
    });

	it('For each gives the right elements',
    function() {

        queue.forEach(function(e) {
			expect(true).toEqual(false); // should not enter here
		});
		createPriorityQueue1();
		
		var elements = [];
		queue.forEach(function(e) {
			elements.push(e);
		});
		
		expect(buckets.arrays.contains(elements,0)).toBeTruthy();
		expect(buckets.arrays.contains(elements,1)).toBeTruthy();
		expect(buckets.arrays.contains(elements,2)).toBeTruthy();
		expect(buckets.arrays.contains(elements,3)).toBeTruthy();
		expect(buckets.arrays.contains(elements,4)).toBeFalsy();
    });

	it('For each can be interrupted',
	function() {
	    createPriorityQueue1();
		var elements = [];
		queue.forEach(function(e) {
			elements.push(e);
			return false;
		});
		expect(elements.length).toEqual(1);
	 });
});