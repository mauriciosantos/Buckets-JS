describe('Queue',
function() {

    var queue=null;

    beforeEach(function() {
        queue = new buckets.Queue();
    });

    function createQueue() {
        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');
    }

    it('Gives the right size',
    function() {
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

    it('Enqueues',
    function() {
		createQueue();
		var head = queue.dequeue();
		expect(head).toEqual('a');
		queue.dequeue();
		head = queue.dequeue();
		expect(head).toEqual('c');
		expect(queue.isEmpty()).toBeTruthy();
		head = queue.dequeue();
		expect(head).toBeUndefined();
    });

    it('Peeks',
    function() {
		createQueue();
		var head = queue.peek();
		expect(head).toEqual('a');
		var head2 = queue.dequeue();
		expect(head).toEqual(head2);
		head = queue.peek();
		expect(head).toEqual('b');
		queue.clear();
		head = queue.peek();
		expect(head).toBeUndefined();
    });

	it('For each gives the right ordering',
    function() {

        queue.forEach(function(e) {
			expect(true).toEqual(false); // should not enter here
		});

        for (var i = 0; i < 10; i++) {
            queue.add(i);
        }

        var i = 0;
		queue.forEach(function(e) {
			expect(e).toEqual(i);
            i++;
		});
    });

	it('For each can be interrupted',
    function() {
		var array = [0,1,2,3,4];
		var b =[];
        for (var i = 0; i < 5; i++) {
	            queue.add(i);
	    }
		queue.forEach(function(e) {
			b.push(e);
            if(e===3){
				return false;
			}
		});
		
     	expect([0,1,2,3]).toEqual(b);
    });
    it('Contains previously added items',
    function() {
		createQueue();
		expect(queue.contains('a')).toBeTruthy();
		expect(queue.contains('z')).toBeFalsy();
		expect(queue.contains(undefined)).toBeFalsy();
    });

});