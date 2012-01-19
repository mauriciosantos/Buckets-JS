describe('Stack',
function() {

    var stack=null;

    beforeEach(function() {
        stack = new buckets.Stack();
    });

    it('Pops',
    function() {
        expect(stack.pop()).toBeUndefined();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.pop()).toEqual(3);
        expect(stack.pop()).toEqual(2);
        expect(stack.pop()).toEqual(1);
        expect(stack.pop()).toBeUndefined();

    });

    it('Pushes and pops',
    function() {
        stack.push(1);
        expect(stack.pop()).toEqual(1);
        stack.push(2);
        expect(stack.pop()).toEqual(2);
        stack.push(3);
        expect(stack.pop()).toEqual(3);
        expect(stack.pop()).toBeUndefined();
    });

    it('Peeks',
    function() {
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

    it('Pushes and peeks',
    function() {
        expect(stack.peek()).toBeUndefined();
        stack.push(1);
        expect(stack.peek()).toEqual(1);
        stack.push(2);
        expect(stack.peek()).toEqual(2);
        stack.push(3);
        expect(stack.peek()).toEqual(3);
    });

    it('Gives the right size',
    function() {
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
});