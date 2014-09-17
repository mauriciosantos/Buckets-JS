describe('Heap',
function() {
	    
	var heap=null;
	
    beforeEach(function() {
        heap = new buckets.Heap();
    });

    var createHeap1 = function() {
        heap.add(0);
        heap.add(1);
        heap.add(2);
        heap.add(3);
    };

	var createHeap2 = function() {
		heap.add(1);
		heap.add(3);
		heap.add(0);
		heap.add(2);
	};
	
	var createHeap3 = function() {
		heap.add("a");
		heap.add("b");
		heap.add('c');
		heap.add('d');
	};
	
	var createHeap4 = function() {
	    heap.add("b");
		heap.add('d');
		heap.add("a");
		heap.add('c');
	};
	
	var createHeap5 = function() {
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
        createHeap1();
        expect(heap.size()).toEqual(4);
        heap.removeRoot();
        expect(heap.size()).toEqual(3);
    });

    it('Gives the right size 2',
    function() {
        createHeap1();
		heap.removeRoot();
		heap.removeRoot();
		heap.removeRoot();
		heap.removeRoot();
		expect(heap.size()).toEqual(0);
    });

    it('Gives the right size with strings',
    function() {
        createHeap3();
		heap.removeRoot();
		heap.removeRoot();
		heap.removeRoot();
		heap.removeRoot();
		expect(heap.size()).toEqual(0);
    });

	it('Peeks the lowest element',
    function() {
 		createHeap1();
		expect(heap.peek()).toEqual(0);
		heap.clear();
		expect(heap.peek()).toBeUndefined();
    });

	it('Peeks the lowest element 2',
    function() {
 		createHeap2();
		expect(heap.peek()).toEqual(0);
    });

	it('Peeks the lowest element with strings',
    function() {
 		createHeap3();
		expect(heap.peek()).toEqual('a');
    });

	it('Peeks the lowest element with strings 2',
    function() {
 		createHeap4();
		expect(heap.peek()).toEqual('a');
    });

	it('Peeks the lowest element with custom objects',
    function() {
		heap = new buckets.Heap(customCompare)
 		createHeap5();
		expect(heap.peek().val).toEqual('a');
    });

	it('Removes root',
    function() {
		createHeap1();
		expect(heap.removeRoot()).toEqual(0);
		expect(heap.removeRoot()).toEqual(1);
		expect(heap.removeRoot()).toEqual(2);
		expect(heap.removeRoot()).toEqual(3);
    });

	it('Removes root 2',
    function() {
		createHeap2();
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
 		createHeap5();
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
		createHeap1();
		for (var i=0; i < heap.size(); i++) {
				expect(heap.isEmpty()).toBeFalsy();
				heap.removeRoot();
		}
    });

	it('Clear removes all elements',
    function() {
		heap.clear();
		createHeap1();
		heap.clear();
		expect(heap.isEmpty()).toBeTruthy();
		expect(heap.peek()).toBeUndefined();
    });

	it('Contains inserted elements',
    function() {
		createHeap1();
		for (var i = 0; i < 4; i++) {
		  expect(heap.contains(i)).toBeTruthy();
		}
		expect(heap.contains(i)).toBeFalsy();
    });

	it('For each gives the right elements',
    function() {

        heap.forEach(function(e) {
			expect(true).toEqual(false); // should not enter here
		});
		createHeap1();
		
		var elements = [];
		heap.forEach(function(e) {
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
	    createHeap1();
		var elements = [];
		heap.forEach(function(e) {
			elements.push(e);
			return false;
		});
		expect(elements.length).toEqual(1);
	 });
});