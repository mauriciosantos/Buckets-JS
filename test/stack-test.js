describe('Stack', function () {

    var stack;

    beforeEach(function () {
        stack = new buckets.Stack();
    });

    it('pop returns and removes the top element or undefined', function () {
        expect(stack.pop()).toBeUndefined();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.pop()).toEqual(3);
        expect(stack.pop()).toEqual(2);
        expect(stack.pop()).toEqual(1);
        expect(stack.pop()).toBeUndefined();

    });

    it('peek returns the top element', function () {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.peek()).toEqual(3);
        stack.pop();
        expect(stack.peek()).toEqual(2);
        stack.pop();
        expect(stack.peek()).toEqual(1);
        stack.pop();
        expect(stack.peek()).toBeUndefined();
    });

    it('size gives the right value', function () {
        expect(stack.size()).toEqual(0);
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.size()).toEqual(3);
        stack.peek();
        expect(stack.size()).toEqual(3);
        stack.pop();
        stack.pop();
        stack.pop();
        expect(stack.size()).toEqual(0);
    });

    it('forEach gives the elements in LIFO order', function () {
        var i;
        stack.forEach(function (e) {
            expect(true).toEqual(false); // should not enter here
        });

        for (i = 0; i < 10; i += 1) {
            stack.add(i);
        }

        i = 10 - 1;
        stack.forEach(function (e) {
            expect(e).toEqual(i);
            i -= 1;
        });
    });

    it('forEach can be interrupted', function () {
        var array = [0, 1, 2, 3, 4],
            b = [],
            i;
        for (i = 0; i < 5; i++) {
            stack.add(i);
        }
        stack.forEach(function (e) {
            b.push(e);
            if (e === 4) {
                return false;
            }
        });

        expect([4]).toEqual(b);
    });

    it('toArray gives the elements in LIFO order', function () {
        var arr;
        expect(stack.toArray().length).toEqual(0);

        stack.push(5);
        arr = stack.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr.length).toEqual(1);

        stack.push(8);
        arr = stack.toArray();
        expect(arr[1]).toEqual(5);
        expect(arr[0]).toEqual(8);
        expect(arr.length).toEqual(2);
    });

    it('equals returns true only if stacks have elements in the same order', function () {
        var stack2 = new buckets.Stack();
        stack.push(1);
        stack.push(2);

        stack2.push(1);
        stack2.push(2);

        expect(stack.equals(stack2)).toBeTruthy();
        stack2.clear();
        stack2.push(2);
        stack2.push(1);
        expect(stack.equals(stack2)).toBeFalsy();
        expect(stack.equals([1, 2])).toBeFalsy();
    });
});
