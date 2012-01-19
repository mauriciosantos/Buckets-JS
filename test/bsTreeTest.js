describe('Binary Search Tree',
function() {

    var tree = null;

    beforeEach(function() {
        tree = new buckets.BSTree();
    });
    var createTree1 = function() {
        tree.add("b");
        tree.add("a");
        tree.add("c");
    };
    var createTree2 = function() {
        tree.add('f');
        tree.add('b');
        tree.add('a');
        tree.add('d');
        tree.add('c');
        tree.add('e');
        tree.add('g');
        tree.add('i');
        tree.add('h');
    };

    it('Gives the right size',
    function() {
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
        tree.add("c");
        expect(tree.size()).toEqual(3);
    });

    it('Clears removes all elements',
    function() {
        createTree1();
        tree.clear();
        expect(tree.contains('a')).toBeFalsy();
    });

    it('Gives the right height',
    function() {
        createTree1();
        expect(tree.height()).toEqual(1);
    });

    it('Gives the right height 2',
    function() {
        createTree2();
        expect(tree.height()).toEqual(3);
    });

    it('Gives the right height on empty tree',
    function() {
        expect(tree.height()).toEqual( - 1);
    });

    it('Gives the maximum element 1',
    function() {
        createTree1();
        expect(tree.maximum()).toEqual('c');
    });

    it('Gives the maximum element 2',
    function() {
        createTree2();
        expect(tree.maximum()).toEqual('i');
    });

    it('Gives the maximum element on empty tree',
    function() {
        expect(tree.maximum()).toBeUndefined();
    });

    it('Gives the minimum element 1',
    function() {
        createTree1();
        expect(tree.minimum()).toEqual('a');
    });

    it('Gives the minimum element 2',
    function() {
        createTree2();
        expect(tree.minimum()).toEqual('a');
    });

    it('Gives the minimum element on empty tree',
    function() {
        expect(tree.minimum()).toBeUndefined();
    });

    it('Contains existing elements',
    function() {
        createTree1();

        expect(tree.contains('a')).toBeTruthy();
        expect(tree.contains('b')).toBeTruthy();
        expect(tree.contains('c')).toBeTruthy();
        expect(tree.contains('e')).toBeFalsy();
        tree.remove('a');
        expect(tree.contains('a')).toBeFalsy();
        expect(tree.contains('b')).toBeTruthy();
        expect(tree.contains('c')).toBeTruthy();

        tree.clear();
        tree.add(3);
        tree.add(2);
        tree.add(4);
        tree.add(1);
        expect(tree.contains(1)).toBeTruthy();
        expect(tree.contains(2)).toBeTruthy();
        expect(tree.contains(3)).toBeTruthy();
        expect(tree.contains(4)).toBeTruthy();
        expect(tree.contains(5)).toBeFalsy();
    });

    it('An empty tree is empty',
    function() {
        expect(tree.isEmpty()).toBeTruthy();
        tree.add(1);
        expect(tree.isEmpty()).toBeFalsy();
        tree.remove(1);
        expect(tree.isEmpty()).toBeTruthy();
    });

    it('Adds',
    function() {
        expect(tree.add('b')).toBeTruthy();
        expect(tree.add('a')).toBeTruthy();
        expect(tree.contains('a')).toBeTruthy();
        expect(tree.contains('b')).toBeTruthy();
        expect(tree.add('b')).toBeFalsy();
        expect(tree.contains('b')).toBeTruthy();
        expect(tree.add(null)).toBeTruthy();
        expect(tree.contains(null)).toBeTruthy();
        expect(tree.add(null)).toBeFalsy();
        expect(tree.contains(undefined)).toBeFalsy();
        expect(tree.add(undefined)).toBeFalsy();
        expect(tree.contains(undefined)).toBeFalsy();
    });

    it('Removes a leaf',
    function() {
        createTree2();
        tree.remove('c');
        var array = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i'];
        var b = [];
        tree.inorderTraversal(function(element) {
            b.push(element);
        });
		expect(array).toEqual(b);
    });

    it('Removes a node with one children',
    function() {
        createTree2();
        tree.remove('i');
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        var b = [];
        tree.inorderTraversal(function(element) {
            b.push(element);
        });
		expect(array).toEqual(b);
    });

    it('Removes a node with two children',
    function() {
        createTree2();
        tree.remove('b');
        var array = ['a', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        var b = [];
        tree.inorderTraversal(function(element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('Removes root',
    function() {
        createTree2();
        tree.remove('f');
        var array = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i'];
        var b = [];
        tree.inorderTraversal(function(element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('Inorder traversal gives the right ordering',
    function() {
        createTree2();
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        var b = [];
        tree.inorderTraversal(function(element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('Inorder traversal cen be interrupted',
    function() {
        createTree2();
        var array = ['a', 'b', 'c', 'd'];
        var b = [];
        tree.inorderTraversal(function(element) {
            b.push(element);
            if (element === 'd') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('Preorder traversal gives the right ordering',
    function() {
        createTree2();
        var array = ['f', 'b', 'a', 'd', 'c', 'e', 'g', 'i', 'h'];
        var b = [];
        tree.preorderTraversal(function(element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('Preorder traversal can be interrupted',
    function() {
        createTree2();
        var array = ['f', 'b', 'a'];
        var b = [];
        tree.preorderTraversal(function(element) {
            b.push(element);
            if (element === 'a') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

	it('Level traversal gives the right ordering',
    function() {
        createTree2();
        var array = ['f', 'b', 'g', 'a', 'd', 'i', 'c', 'e', 'h'];
        var b = [];
        tree.levelTraversal(function(element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('Level traversal can be interrupted',
    function() {
        createTree2();
        var array = ['f', 'b', 'g', 'a', 'd', 'i'];
        var b = [];
        tree.levelTraversal(function(element) {
            b.push(element);
            if (element === 'i') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('Postorter traversal gives the right ordering',
    function() {
        createTree2();
        var array = ['a', 'c', 'e', 'd', 'b', 'h', 'i', 'g', 'f'];
        var b = [];
        tree.postorderTraversal(function(element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('Postorter traversal can be interrupted',
    function() {
        createTree2();
        var array = ['a', 'c', 'e', 'd', 'b'];
        var b = [];
        tree.postorderTraversal(function(element) {
            b.push(element);
            if (element === 'b') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('For each gives the right ordering',
    function() {
        createTree2();
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        var b = [];
        tree.forEach(function(element) {
            b.push(element);
        });
        expect(array).toEqual(b);
    });

    it('For each can be interrupted',
    function() {
        createTree2();
        var array = ['a', 'b', 'c', 'd'];
        var b = [];
        tree.forEach(function(element) {
            b.push(element);
            if (element === 'd') {
                return false;
            }
        });
        expect(array).toEqual(b);
    });

    it('toArray gives the right ordering',
    function() {
        createTree2();
        var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        var b = tree.toArray();
        expect(array).toEqual(b);
    });

    it('Empty tree returns an empty array',
    function() {
		expect(tree.toArray()).toEqual([]);
    });

});