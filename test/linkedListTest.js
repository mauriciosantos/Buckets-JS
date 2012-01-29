describe('Linked List',
function() {

    var list = null;
    var elems = 100;
	
	var equals = function(a, b) {
        return a.el === b.el;
    };

    beforeEach(function() {
        list = new buckets.LinkedList();
    });

    it('Inserts elements',
    function() {
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
        expect(list.size()).toEqual(0);
        for (var i = 0; i < elems; i++) {
            list.add(i);
            expect(list.first()).toEqual(0);
            expect(list.last()).toEqual(i);

            if (i === 0) {
                expect(list.first()).toEqual(list.last());
            }
            expect(list.size()).toEqual(i + 1);
        }
    });

	it('Reverses the list 1',
    function() {
		list.add(1);
		list.add(2);
		list.add(3);
		list.reverse();
		expect(list.elementAtIndex(0)).toEqual(3);
		expect(list.elementAtIndex(1)).toEqual(2);
		expect(list.elementAtIndex(2)).toEqual(1);
    });

	it('Reverses the list 2',
    function() {
		list.add(1);
		list.add(2);
		list.reverse();
		expect(list.elementAtIndex(0)).toEqual(2);
		expect(list.elementAtIndex(1)).toEqual(1);
    });

	it('Reverses the list 2',
    function() {
		list.add(1);
		list.reverse();
		expect(list.elementAtIndex(0)).toEqual(1);
		expect(list.elementAtIndex(1)).toBeUndefined();
    });

	it('Clear removes all elements',
    function() {
		for (var i = 0; i < elems; i++) {
            list.add(i);
		}
		list.clear();
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
        expect(list.size()).toEqual(0);
    });

	it('Gives the right size',
    function() {
        expect(list.size()).toEqual(0);
		list.add(1);
		expect(list.size()).toEqual(1);
		list.add(1);
		expect(list.size()).toEqual(2);
    });

    it('Inserts an element to specified index',
    function() {
        expect(list.elementAtIndex( - 1)).toBeUndefined();
        expect(list.elementAtIndex(0)).toBeUndefined();
        expect(list.elementAtIndex(1)).toBeUndefined();

        for (var i = 0; i < elems; i++) {
            list.add(i);
            expect(list.elementAtIndex(list.size() - 1)).toEqual(i);
            expect(list.elementAtIndex(i)).toEqual(i);

            for (var j = 0; j < i; j++) {
                expect(list.elementAtIndex(j)).toEqual(j);
            }
        }
    });

	it('Two equal lists are equal',
    function() {
		list.add(1);
		list.add(2);
		
		var list2 = new buckets.LinkedList();
		list2.add(1);
		list2.add(2);

        expect(list.equals(list2)).toBeTruthy();
		list2.clear();
		list2.add(2);
		list2.add(1);
		expect(list.equals(list2)).toBeFalsy();
		expect(list.equals([1,2])).toBeFalsy();
    });


    it("Doesn't insert elements to invalid indexes",
    function() {
        expect(list.add(0, 1)).toBeFalsy();
        expect(list.size() === 0).toBeTruthy();
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
    });


    it('Inserts elements to the last index',
    function() {
        for (var i = 0; i < elems; i++) {
            expect(list.add(i, i)).toBeTruthy();
            expect(list.elementAtIndex(i)).toEqual(i);
            expect(list.first()).toEqual(0);
            expect(list.last()).toEqual(i);
            if (i === 0) {
                expect(list.first()).toEqual(list.last());
            }
            expect(list.size()).toEqual(i + 1);
        }
    });

    it('Inserts elements at the first index',
    function() {
        for (var j = 0; j < elems; j++) {

            for (var i = 0; i < j; i++) {
                list.add(i);
            }
            list.add( - i, 0);
            expect(list.elementAtIndex(0)).toEqual( - i);
            expect(list.first()).toEqual( - i);
        }
    });

    it('Inserts elements to custom index',
    function() {
        for (var j = 0; j < elems; j++) {
            list.add(j);
        }

        list.add( - 100, elems / 2);
        expect(list.elementAtIndex(elems / 2)).toEqual( - 100);
    });


    it('Finds elements with indexOf',
    function() {
        expect(list.indexOf(0)).toEqual( - 1);
        for (var j = 0; j < elems; j++) {
            list.add(j + 1);
            expect(list.indexOf(j + 1)).toEqual(j);
            expect(list.indexOf( - 100)).toEqual( - 1);
        }
        for (var j = 0; j < elems; j++) {
            expect(list.indexOf(j + 1)).toEqual(j);
            expect(list.indexOf( - 100)).toEqual( - 1);
        }
    });

    it('Finds elements with indexOf and custom equals function',
    function() {
        expect(list.indexOf({
            el: 1
        },equals)).toEqual( - 1);
        for (var j = 0; j < elems; j++) {
            list.add({
                el: j + 1
            });
            expect(list.indexOf({
                el: j + 1
            },equals)).toEqual(j);
            expect(list.indexOf({
                el: -200
            },equals)).toEqual( - 1);
        }
        for (var j = 0; j < elems; j++) {
            expect(list.indexOf({
                el: j + 1
            },equals)).toEqual(j);
            expect(list.indexOf({
                el: -200
            },equals)).toEqual( - 1);
        }
    });

    it('Removes elements',
    function() {
        expect(list.remove(1)).toBeFalsy();
        expect(list.size() === 0).toBeTruthy();
        expect(list.last()).toBeUndefined();
        expect(list.first()).toBeUndefined();

        for (var i = 0; i < elems; i++) {
            list.add(i);
            expect(list.remove(i)).toBeTruthy();
            expect(list.size() === 0).toBeTruthy();
            expect(list.last()).toBeUndefined();
            expect(list.first()).toBeUndefined();
        }

        list.add(1);
        list.add(2);
        expect(list.remove(1)).toBeTruthy();
        expect(list.size() === 1).toBeTruthy();
        expect(list.first()).toEqual(2);
        expect(list.last()).toEqual(2);
        list.clear();

		list.add(1);
        list.add(2);
		list.add(3);
		list.add(4);
        expect(list.remove(2)).toBeTruthy();
        expect(list.size() === 3).toBeTruthy();
        expect(list.first()).toEqual(1);
        expect(list.last()).toEqual(4);
		expect(list.elementAtIndex(0)).toEqual(1);
		expect(list.elementAtIndex(1)).toEqual(3);
		expect(list.elementAtIndex(2)).toEqual(4);
		expect(list.elementAtIndex(3)).toEqual(undefined);
        list.clear();

        for (var i = 0; i < elems; i++) {
            list.add(i);
        }
        var half = elems / 2;
        list.remove(elems / 2);
        for (var i = 0; i < elems; i++) {
            if (i === (half)) {
                expect(list.indexOf(i)).toEqual( - 1);
            }
            else if (i < half) {
                expect(list.indexOf(i)).toEqual(i);
            }
            else if (i > half) {
                expect(list.indexOf(i)).toEqual(i - 1);
            }
        }
        expect(list.size() === (elems - 1)).toBeTruthy();
    });

	it("Doesn't remove non existing elements",
    function() {
		expect(list.remove(5)).toBeFalsy();
		expect(list.size()).toEqual(0);
		list.add(1);
        list.add(2);
		list.add(3);
		list.add(4);
		expect(list.remove(5)).toBeFalsy();
		expect(list.size()).toEqual(4);
    });

	it('Removes elements with custom equals',
    function() {
		expect(list.remove({el:1})).toBeFalsy();
		for (var i = 0; i < elems; i++) {
			list.add({el:i});
		}
		for (var i = 0; i < elems; i++) {
			expect(list.remove({el:i})).toBeFalsy();
			expect(list.remove({el:i},equals)).toBeTruthy();
		}
       
    });

    it('Removes elements at specified index',
    function() {
        expect(list.removeElementAtIndex(0)).toBeUndefined();
        expect(list.removeElementAtIndex( - 1)).toBeUndefined();
        expect(list.removeElementAtIndex(1)).toBeUndefined();
        expect(list.size() === 0).toBeTruthy();

        list.add(1);

        expect(list.removeElementAtIndex( - 1)).toBeUndefined();
        expect(list.removeElementAtIndex(1)).toBeUndefined();
        expect(list.size() === 1).toBeTruthy();

        expect(list.removeElementAtIndex(0)).toEqual(1);
        expect(list.size() === 0).toBeTruthy();
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
        expect(list.elementAtIndex(0)).toBeUndefined();

        list.add(1);
        list.add(2);
        expect(list.removeElementAtIndex(0)).toEqual(1);
        expect(list.size() === 1).toBeTruthy();
        expect(list.first()).toEqual(2);

        list.clear();
        list.add(1);
        list.add(2);
        list.add(3);
        expect(list.removeElementAtIndex(2)).toEqual(3);
        expect(list.size() === 2).toBeTruthy();
        expect(list.first()).toEqual(1);
        expect(list.last()).toEqual(2);
        list.clear();

        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);

        expect(list.removeElementAtIndex(2)).toEqual(3);
        expect(list.size() === 4).toBeTruthy();
        expect(list.first()).toEqual(1);
        expect(list.last()).toEqual(5);

        expect(list.elementAtIndex(0)).toEqual(1);
        expect(list.elementAtIndex(1)).toEqual(2);
        expect(list.elementAtIndex(2)).toEqual(4);
        expect(list.elementAtIndex(3)).toEqual(5);
    });

    it('Converts the list to an array',
    function() {
        expect(list.toArray().length).toEqual(0);

        list.add(5);
        var arr = list.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr.length).toEqual(1);

        list.add(8);
        arr = list.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr[1]).toEqual(8);
        expect(arr.length).toEqual(2);
    });

    it('Two identical linked lists are equal',
    function() {
        var list2 = new buckets.LinkedList();
		expect(list.equals(list2)).toBeTruthy();
		
		list.add(1);
		list.add(2);
		expect(list.equals(list2)).toBeFalsy();
		list2.add(2);
		list2.add(1);
		expect(list.equals(list2)).toBeFalsy();
		list2.clear();
		list2.add(1);
		list2.add(2);
		expect(list.equals(list2)).toBeTruthy();	
    });

    it('For each gives the right ordering',
    function() {

        list.forEach(function(e) {
			expect(true).toEqual(false); // should not enter here
		});

        for (var i = 0; i < elems; i++) {
            list.add(i);
        }

        var i = 0;
		list.forEach(function(e) {
			expect(e).toEqual(i);
            i++;
		});
    });

	it('For each can be interrupted',
    function() {
		var array = [0,1,2,3,4];
		var b =[];
        for (var i = 0; i < elems; i++) {
	            list.add(i);
	    }
		list.forEach(function(e) {
			b.push(e);
            if(e===4){
				return false;
			}
		});
		
     	expect(array).toEqual(b);
    });

});