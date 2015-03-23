describe('Linked List', function () {

    var elems = 100,
        list;

    function equals(a, b) {
        return a.el === b.el;
    }

    beforeEach(function () {
        list = new buckets.LinkedList();
    });

    it('add inserts elements in proper sequence', function () {
        var i;
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
        expect(list.size()).toEqual(0);
        for (i = 0; i < elems; i += 1) {
            list.add(i);
            expect(list.first()).toEqual(0);
            expect(list.last()).toEqual(i);

            if (i === 0) {
                expect(list.first()).toEqual(list.last());
            }
            expect(list.size()).toEqual(i + 1);
        }
    });

    it('reverse gives the right ordering with >2 elements', function () {
        list.add(1);
        list.add(2);
        list.add(3);
        list.reverse();
        expect(list.elementAtIndex(0)).toEqual(3);
        expect(list.elementAtIndex(1)).toEqual(2);
        expect(list.elementAtIndex(2)).toEqual(1);
    });

    it('reverse gives the right ordering with 2 elements', function () {
        list.add(1);
        list.add(2);
        list.reverse();
        expect(list.elementAtIndex(0)).toEqual(2);
        expect(list.elementAtIndex(1)).toEqual(1);
    });

    it('reverse gives the right ordering with 1 element', function () {
        list.add(1);
        list.reverse();
        expect(list.elementAtIndex(0)).toEqual(1);
        expect(list.elementAtIndex(1)).toBeUndefined();
    });

    it('clear removes all elements', function () {
        var i;
        for (i = 0; i < elems; i += 1) {
            list.add(i);
        }
        list.clear();
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
        expect(list.size()).toEqual(0);
    });

    it('size gives the right value', function () {
        expect(list.size()).toEqual(0);
        list.add(1);
        expect(list.size()).toEqual(1);
        list.add(1);
        expect(list.size()).toEqual(2);
    });

    it('elementAtIndex returns the correct value', function () {
        var i, J;
        expect(list.elementAtIndex(-1)).toBeUndefined();
        expect(list.elementAtIndex(0)).toBeUndefined();
        expect(list.elementAtIndex(1)).toBeUndefined();

        for (i = 0; i < elems; i += 1) {
            list.add(i);
            expect(list.elementAtIndex(list.size() - 1)).toEqual(i);
            expect(list.elementAtIndex(i)).toEqual(i);

            for (j = 0; j < i; j += 1) {
                expect(list.elementAtIndex(j)).toEqual(j);
            }
        }
    });

    it('equals returns true only if lists have the elements in the same order', function () {
        var list2 = new buckets.LinkedList();
        list.add(1);
        list.add(2);


        list2.add(1);
        list2.add(2);

        expect(list.equals(list2)).toBeTruthy();
        list2.clear();
        list2.add(2);
        list2.add(1);
        expect(list.equals(list2)).toBeFalsy();
        expect(list.equals([1, 2])).toBeFalsy();
    });


    it("add doesn't insert element into invalid index", function () {
        expect(list.add(0, 1)).toBeFalsy();
        expect(list.size() === 0).toBeTruthy();
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
    });


    it('add inserts elements to the last index', function () {
        var i;
        for (i = 0; i < elems; i += 1) {
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

    it('add inserts elements to the first index', function () {
        var i, j;
        for (j = 0; j < elems; j += 1) {
            for (i = 0; i < j; i += 1) {
                list.add(i);
            }
            list.add(-i, 0);
            expect(list.elementAtIndex(0)).toEqual(-i);
            expect(list.first()).toEqual(-i);
        }
    });

    it('add inserts elements to custom index', function () {
        var j;
        for (j = 0; j < elems; j += 1) {
            list.add(j);
        }

        list.add(-100, elems / 2);
        expect(list.elementAtIndex(elems / 2)).toEqual(-100);
    });


    it('indexOf finds inserted elements', function () {
        var j;
        expect(list.indexOf(0)).toEqual(-1);
        for (j = 0; j < elems; j += 1) {
            list.add(j + 1);
            expect(list.indexOf(j + 1)).toEqual(j);
            expect(list.indexOf(-100)).toEqual(-1);
        }
        for (j = 0; j < elems; j += 1) {
            expect(list.indexOf(j + 1)).toEqual(j);
            expect(list.indexOf(-100)).toEqual(-1);
        }
    });

    it('indexOf finds elements with custom equals function', function () {
        var j;
        expect(list.indexOf({
            el: 1
        }, equals)).toEqual(-1);
        for (j = 0; j < elems; j += 1) {
            list.add({
                el: j + 1
            });
            expect(list.indexOf({
                el: j + 1
            }, equals)).toEqual(j);
            expect(list.indexOf({
                el: -200
            }, equals)).toEqual(-1);
        }
        for (j = 0; j < elems; j += 1) {
            expect(list.indexOf({
                el: j + 1
            }, equals)).toEqual(j);
            expect(list.indexOf({
                el: -200
            }, equals)).toEqual(-1);
        }
    });

    it('remove deletes inserted elements', function () {
        var i, half;
        expect(list.remove(1)).toBeFalsy();
        expect(list.size() === 0).toBeTruthy();
        expect(list.last()).toBeUndefined();
        expect(list.first()).toBeUndefined();

        for (i = 0; i < elems; i += 1) {
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

        for (i = 0; i < elems; i += 1) {
            list.add(i);
        }
        half = elems / 2;
        list.remove(elems / 2);
        for (i = 0; i < elems; i += 1) {
            if (i === (half)) {
                expect(list.indexOf(i)).toEqual(-1);
            } else if (i < half) {
                expect(list.indexOf(i)).toEqual(i);
            } else if (i > half) {
                expect(list.indexOf(i)).toEqual(i - 1);
            }
        }
        expect(list.size() === (elems - 1)).toBeTruthy();
    });

    it("remove returns false for non-existing elements", function () {
        expect(list.remove(5)).toBeFalsy();
        expect(list.size()).toEqual(0);
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        expect(list.remove(5)).toBeFalsy();
        expect(list.size()).toEqual(4);
    });

    it('remove deletes elements with custom equals', function () {
        var i;
        expect(list.remove({
            el: 1
        })).toBeFalsy();
        for (i = 0; i < elems; i += 1) {
            list.add({
                el: i
            });
        }
        for (i = 0; i < elems; i += 1) {
            expect(list.remove({
                el: i
            })).toBeFalsy();
            expect(list.remove({
                el: i
            }, equals)).toBeTruthy();
        }

    });

    it('removeElementAtIndex deletes elements at specified index', function () {
        expect(list.removeElementAtIndex(0)).toBeUndefined();
        expect(list.removeElementAtIndex(-1)).toBeUndefined();
        expect(list.removeElementAtIndex(1)).toBeUndefined();
        expect(list.size() === 0).toBeTruthy();

        list.add(1);

        expect(list.removeElementAtIndex(-1)).toBeUndefined();
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

    it('toArray returns elements in proper order', function () {
        var arr;
        expect(list.toArray().length).toEqual(0);

        list.add(5);
        arr = list.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr.length).toEqual(1);

        list.add(8);
        arr = list.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr[1]).toEqual(8);
        expect(arr.length).toEqual(2);
    });


    it('forEeach gives all the elements in the right order', function () {
        var i;
        list.forEach(function (e) {
            expect(true).toEqual(false); // should not enter here
        });

        for (i = 0; i < elems; i += 1) {
            list.add(i);
        }

        i = 0;
        list.forEach(function (e) {
            expect(e).toEqual(i);
            i += 1;
        });
    });

    it('forEeach can be interrupted', function () {
        var array = [0, 1, 2, 3, 4],
            b = [],
            i;
        for (i = 0; i < elems; i += 1) {
            list.add(i);
        }
        list.forEach(function (e) {
            b.push(e);
            if (e === 4) {
                return false;
            }
        });

        expect(array).toEqual(b);
    });
});
