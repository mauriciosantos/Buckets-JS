describe('Heap',
function() {
	    
	var heap=null;
	
    beforeEach(function() {
        heap = new buckets.Heap();
    });

    function Heap1() {
        heap.add(0);
        heap.add(1);
        heap.add(2);
        heap.add(3);
    };

	function Heap2() {
		heap.add(1);
		heap.add(3);
		heap.add(0);
		heap.add(2);
	};
	
	function Heap3() {
		heap.add("a");
		heap.add("b");
		heap.add('c');
		heap.add('d');
	};
	
	function Heap4() {
	    heap.add("b");
		heap.add('d');
		heap.add("a");
		heap.add('c');
	};
	
	function Heap5() {
	    heap.add({val:"b"});
		heap.add({val:"d"});
		heap.add({val:"a"});
		heap.add({val:"c"});
	};
	
	function customCompare(a,b){
		if(a.val<b.val){
			return -1;
		} else if(a.val===b.val){
				return 0;
		} else{
			return 1;
		}
	}
	
    it('Gives the right size 1',
    function() {
        Heap1();
        expect(heap.size()).toEqual(4);
        heap.removeRoot();
        expect(heap.size()).toEqual(3);
    });

    it('Gives the right size 2',
    function() {
        Heap1();
		heap.removeRoot();
		heap.removeRoot();
		heap.removeRoot();
		heap.removeRoot();
		expect(heap.size()).toEqual(0);
    });

    it('Gives the right size with strings',
    function() {
        Heap3();
		heap.removeRoot();
		heap.removeRoot();
		heap.removeRoot();
		heap.removeRoot();
		expect(heap.size()).toEqual(0);
    });

	it('Peeks the lowest element',
    function() {
 		Heap1();
		expect(heap.peek()).toEqual(0);
		heap.clear();
		expect(heap.peek()).toBeUndefined();
    });

	it('Peeks the lowest element 2',
    function() {
 		Heap2();
		expect(heap.peek()).toEqual(0);
    });

	it('Peeks the lowest element with strings',
    function() {
 		Heap3();
		expect(heap.peek()).toEqual('a');
    });

	it('Peeks the lowest element with strings 2',
    function() {
 		Heap4();
		expect(heap.peek()).toEqual('a');
    });

	it('Peeks the lowest element with custom objects',
    function() {
		heap = new buckets.Heap(customCompare)
 		Heap5();
		expect(heap.peek().val).toEqual('a');
    });

	it('Removes root',
    function() {
		Heap1();
		expect(heap.removeRoot()).toEqual(0);
		expect(heap.removeRoot()).toEqual(1);
		expect(heap.removeRoot()).toEqual(2);
		expect(heap.removeRoot()).toEqual(3);
    });

	it('Removes root 2',
    function() {
		Heap2();
		heap.add(1);
		expect(heap.removeRoot()).toEqual(0);
		expect(heap.removeRoot()).toEqual(1);
		expect(heap.removeRoot()).toEqual(1);
		expect(heap.removeRoot()).toEqual(2);
		expect(heap.removeRoot()).toEqual(3);
    });

	it('Removes root with custom objects',
    function() {
		heap = new buckets.Heap(customCompare);
 		Heap5();
		expect(heap.removeRoot().val).toEqual("a");
		expect(heap.removeRoot().val).toEqual("b");
		expect(heap.removeRoot().val).toEqual("c");
		expect(heap.removeRoot().val).toEqual("d");
    });

	it('Adds and peeks',
    function() {
		heap.add(3);
		expect(heap.peek()).toEqual(3);
		heap.add(2);
		expect(heap.peek()).toEqual(2);
		heap.add(1);
		expect(heap.peek()).toEqual(1);
		heap.add(0);
		expect(heap.peek()).toEqual(0);
    });

	it('Adds and peeks 2',
    function() {
		heap.add(1);
		expect(heap.peek()).toEqual(1);
		heap.add(3);
		expect(heap.peek()).toEqual(1);
		heap.add(0);
		expect(heap.peek()).toEqual(0);
		heap.add(2);
		expect(heap.peek()).toEqual(0);
    });

	it('An empty heap is empty',
    function() {
		expect(heap.isEmpty()).toBeTruthy();
		Heap1();
		for (var i=0; i < heap.size(); i++) {
				expect(heap.isEmpty()).toBeFalsy();
				heap.removeRoot();
		};
	
    });

	it('Clear removes all elements',
    function() {
		heap.clear();
		Heap1();
		heap.clear();
		expect(heap.isEmpty()).toBeTruthy();
		expect(heap.peek()).toBeUndefined();
    });

	it('Contains inserted elements',
    function() {
		Heap1();
		for (var i = 0; i < 4; i++) {
		  expect(heap.contains(i)).toBeTruthy();
		}
		expect(heap.contains(i)).toBeFalsy();
    });
});