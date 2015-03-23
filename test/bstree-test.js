describe('Binary Search Tree', function () {

    var tree;

    function createTree1() {
        tree = new buckets.BSTree();
        tree.add('b');
        tree.add('a');
        tree.add('c');
    }

    function createTree2() {
        tree = new buckets.BSTree();
        tree.add('f');
        tree.add('b');
        tree.add('a');
        tree.add('d');
        tree.add('c');
        tree.add('e');
        tree.add('g');
        tree.add('i');
        tree.add('h');
    }

    beforeEach(function () {
        tree = new buckets.BSTree();
    });


    it('size gives the right value', function () {
        createTree1();
        expect(tree.size()).toEqual(3);
        tree.add('d');
        expect(tree.size()).toEqual(4);
        tree.remove('d');
        tree.remove('d');
        expect(tree.size()).toEqual(3);
        tree.remove('b');
        tree.remove('b');
        expect(tree.size()).toEqual(2);
        tree.remove('c');
        tree.remove('c');
        expect(tree.size()).toEqual(1);
        tree.remove('a');
        tree.remove('a');
        expect(tree.size()).toEqual(0);

        tree.clear();
        expect(tree.size()).toEqual(0);
        createTree1();
        expect(tree.size()).toEqual(3);
        tree.add('d');
        expect(tree.size()).toEqual(4);
        tree.remove('d');
        expect(tree.size()).toEqual(3);
        tree.add('c');
        expect(tree.size()).toEqual(3);
    });

    it('clear removes all elements', function () {
        createTree1();
        tree.clear();
        expect(tree.contains('a')).toBeFalsy();
    });

    it('height gives the right value', function () {
        createTree1();
        expect(tree.height()).toEqual(1);
        createTree2();
        expect(tree.height()).toEqual(3);
    });

    it('height returns -1 for empty tree', function () {
        expect(tree.height()).toEqual(-1);
    });

    it('maximum returns the right value', function () {
        createTree1();
        expect(tree.maximum()).toEqual('c');
        createTree2();
        expect(tree.maximum()).toEqual('i');
    });

    it('maximum returns undefined for empty tree', function () {
        expect(tree.maximum()).toBeUndefined();
    });

    it('minimum returns the right value', function () {
        createTree1();
        expect(tree.minimum()).toEqual('a');
        createTree2();
        expect(tree.minimum()).toEqual('a');
    });

    it('minimum returns undefined for empty tree', function () {
        expect(tree.minimum()).toBeUndefined();
    });

    it('contains returns true for existing elements', function () {
        createTree1();

        expect(tree.contains('a')).toBeTruthy();
        expect(tree.contains('b')).toBeTruthy();
        expect(tree.contains('c')).toBeTruthy();
        tree.remove('a');
        expect(tree.contains('b')).toBeTruthy();
        expect(tree.contains('c')).toBeTruthy();
    });

    it('contains returns false for non-existing elements', function () {
        createTree1();
        expect(tree.contains('e')).toBeFalsy();
        tree.remove('a');
        expect(tree.contains('a')).toBeFalsy();
    });

    it('isEmpty returns true only if the tree contains no elements', function () {
        expect(tree.isEmpty()).toBeTruthy();
        tree.add(1);
        expect(tree.isEmpty()).toBeFalsy();
        tree.remove(1);
        expect(tree.isEmpty()).toBeTruthy();
    });


    it('add inserts non-existing elements into the tree', function () {
        expect(tree.add('b')).toBeTruthy();
        expect(tree.add('a')).toBeTruthy();
        expect(tree.contains('a')).toBeTruthy();
        expect(tree.contains('b')).toBeTruthy();
        expect(tree.add(null)).toBeTruthy();
        expect(tree.contains(null)).toBeTruthy();
    });

    it('add can not insert existing elements into the tree', function () {
        expect(tree.add('b')).toBeTruthy();
        expect(tree.add('b')).toBeFalsy();
    });

    it('add can not insert undefined', function () {
        expect(tree.add(undefined)).toBeFalsy();
        expect(tree.contains(undefined)).toBeFalsy();
    });

    it('remove deletes leaf element', function () {
        var array = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i'],
            b = [];
        createTree2();
        tree.remove('c');

        tree.inorderTraversal(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('remove deletes a node with one child', function () {
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            b = [];
        createTree2();
        tree.remove('i');
        tree.inorderTraversal(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('remove deletes a node with two children', function () {
        var array = ['a', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
            b = [];

        createTree2();
        tree.remove('b');

        tree.inorderTraversal(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('remove deletes root node', function () {
        var array = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i'],
            b = [];
        createTree2();
        tree.remove('f');

        tree.inorderTraversal(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('inorderTraversal returns elements in the right order', function () {
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
            b = [];
        createTree2();
        tree.inorderTraversal(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('inorderTraversal can be interrupted', function () {
        var array = ['a', 'b', 'c', 'd'],
            b = [];
        createTree2();
        tree.inorderTraversal(function (element) {
            b.push(element);
            if (element === 'd') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('preorderTraversal returns elements in the right order', function () {
        var array = ['f', 'b', 'a', 'd', 'c', 'e', 'g', 'i', 'h'],
            b = [];
        createTree2();

        tree.preorderTraversal(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('preorderTraversal can be interrupted', function () {
        var array = ['f', 'b', 'a'],
            b = [];
        createTree2();
        tree.preorderTraversal(function (element) {
            b.push(element);
            if (element === 'a') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('levelTraversal returns elements in the right order', function () {
        var array = ['f', 'b', 'g', 'a', 'd', 'i', 'c', 'e', 'h'],
            b = [];
        createTree2();
        tree.levelTraversal(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('levelTraversal can be interrupted', function () {
        var array = ['f', 'b', 'g', 'a', 'd', 'i'],
            b = [];
        createTree2();

        tree.levelTraversal(function (element) {
            b.push(element);
            if (element === 'i') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('postorderTraversal returns elements in the right order', function () {
        var array = ['a', 'c', 'e', 'd', 'b', 'h', 'i', 'g', 'f'],
            b = [];
        createTree2();

        tree.postorderTraversal(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('postorderTraversal can be interrupted', function () {
        var array = ['a', 'c', 'e', 'd', 'b'],
            b = [];
        createTree2();
        tree.postorderTraversal(function (element) {
            b.push(element);
            if (element === 'b') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('forEach returns elements in the right order', function () {
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
            b = [];
        createTree2();
        tree.forEach(function (element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('forEach can be interrupted', function () {
        var array = ['a', 'b', 'c', 'd'],
            b = [];
        createTree2();
        tree.forEach(function (element) {
            b.push(element);
            if (element === 'd') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('toArray gives a new in-order array', function () {
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
            b;
        createTree2();
        b = tree.toArray();
        expect(array).toEqual(b);
    });

    it('toArray returns an empty array for empty tree', function () {
        expect(tree.toArray()).toEqual([]);
    });

    it('equals returns true only if trees have the same elements', function () {
        var tree2 = new buckets.BSTree();
        tree.add(1);
        tree.add(2);

        tree2.add(2);
        tree2.add(1);

        expect(tree.equals(tree2)).toBeTruthy();
        tree2.clear();
        tree2.add(3);
        tree2.add(1);
        expect(tree.equals(tree2)).toBeFalsy();
        expect(tree.equals([1, 2])).toBeFalsy();
    });
});
