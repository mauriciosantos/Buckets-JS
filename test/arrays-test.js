describe('Arrays', function () {

    var eq = function (arg1, arg2) {
            return arg1.val === arg2.val;
        },
        customObjectArray, numberArray;

    beforeEach(function () {
        var a = {
                val: 1
            },
            b = {
                val: 8
            },
            c = {
                val: 10
            };
        customObjectArray = [a, a, b, c];
        numberArray = [1, 8, 8, 8, 10, 10];
    });

    it('indexOf gives the right index for valid numbers', function () {
        expect(buckets.arrays.indexOf(numberArray, 1)).toEqual(0);
        expect(buckets.arrays.indexOf(numberArray, 8)).toEqual(1);
        expect(buckets.arrays.indexOf(numberArray, 10)).toEqual(4);
    });

    it('indexOf returns -1 when not found in number array', function () {
        expect(buckets.arrays.indexOf(numberArray, 11)).toEqual(-1);
        expect(buckets.arrays.indexOf([], 8)).toEqual(-1);
    });

    it('indexOf with custom equals gives the right index for valid objects', function () {
        var test = {
            val: 1
        };

        expect(buckets.arrays.indexOf(customObjectArray, test, eq)).toEqual(0);
        test.val = 8;
        expect(buckets.arrays.indexOf(customObjectArray, test, eq)).toEqual(2);
        test.val = 10;
        expect(buckets.arrays.indexOf(customObjectArray, test, eq)).toEqual(3);
    });

    it('indexOf with custom equals returns -1 when not found', function () {
        var test = {
            val: -1000
        };
        expect(buckets.arrays.indexOf(customObjectArray, test)).toEqual(-1);
        expect(buckets.arrays.indexOf(customObjectArray, test, eq)).toEqual(-1);
        expect(buckets.arrays.indexOf([], test)).toEqual(-1);
    });

    it('lastIndexOf returns the right position using numbers', function () {
        expect(buckets.arrays.lastIndexOf(numberArray, 1)).toEqual(0);
        expect(buckets.arrays.lastIndexOf(numberArray, 8)).toEqual(3);
        expect(buckets.arrays.lastIndexOf(numberArray, 10)).toEqual(5);
        expect(buckets.arrays.lastIndexOf(numberArray, 11)).toEqual(-1);
        expect(buckets.arrays.lastIndexOf([], 8)).toEqual(-1);
    });

    it('lastIndexOf with custom equals returns the right position', function () {
        var test = {
            val: 1
        };
        expect(buckets.arrays.lastIndexOf(customObjectArray, test, eq)).toEqual(1);
    });

    it('lastIndexOf with custom equals returns -1 when not found', function () {
        var test = {
            val: -1000
        };
        expect(buckets.arrays.lastIndexOf(customObjectArray, test)).toEqual(-1);
    });

    it('contains returns true for existing numbers', function () {
        expect(buckets.arrays.contains(numberArray, 1)).toBeTruthy();
        expect(buckets.arrays.contains(numberArray, 8)).toBeTruthy();
        expect(buckets.arrays.contains(numberArray, 10)).toBeTruthy();
    });

    it('contains returns false for non exixsting numbers', function () {
        expect(buckets.arrays.contains(numberArray, 11)).toBeFalsy();
        expect(buckets.arrays.contains([], 8)).toBeFalsy();
    });

    it('contains returns true for existing objects with custom equals', function () {
        var test = {
            val: 1
        };

        expect(buckets.arrays.contains(customObjectArray, test, eq)).toBeTruthy();
        test.val = 8;
        expect(buckets.arrays.contains(customObjectArray, test, eq)).toBeTruthy();
    });

    it('contains returns false for non existing objects with custom equals', function () {
        var test = {
            val: 1
        };

        expect(buckets.arrays.contains(customObjectArray, test)).toBeFalsy();
        test.val = 1000;
        expect(buckets.arrays.contains(customObjectArray, test, eq)).toBeFalsy();
        expect(buckets.arrays.contains([], test, eq)).toBeFalsy();
    });

    it('frequency returns the right value with number array', function () {
        expect(buckets.arrays.frequency(numberArray, 1)).toEqual(1);
        expect(buckets.arrays.frequency(numberArray, 8)).toEqual(3);
        expect(buckets.arrays.frequency(numberArray, 10)).toEqual(2);
        expect(buckets.arrays.frequency(numberArray, 11)).toEqual(0);
    });

    it('frequency returns the right value with custom equals function', function () {
        var test = {
            val: 1000
        };
        expect(buckets.arrays.frequency(customObjectArray, test)).toEqual(0);
        test.val = 1;
        expect(buckets.arrays.frequency(customObjectArray, test, eq)).toEqual(2);
        test.val = 8;
        expect(buckets.arrays.frequency(customObjectArray, test, eq)).toEqual(1);
    });

    it('equals returns true for matching number arrays', function () {
        var a = [1, 8, 8, 8, 10, 10],
            b = [1, 8, 8, 8, 10, 10];

        expect(buckets.arrays.equals(a, a)).toBeTruthy();
        expect(buckets.arrays.equals(a, b)).toBeTruthy();;
    });

    it('equals returns false for non-matching number arrays', function () {
        var a = [1, 8, 8, 8, 10, 10],
            c = [1, 8, 5, 8, 10, 10],
            d = [1, 8, 8, 8, 10];

        expect(buckets.arrays.equals(a, [])).toBeFalsy();
        expect(buckets.arrays.equals(a, c)).toBeFalsy();
        expect(buckets.arrays.equals(a, d)).toBeFalsy();
        expect(buckets.arrays.equals(a, [])).toBeFalsy();
    });

    it('equals returns true for matching object arrays using custom equals', function () {
        var a = [{
                val: 8
            }],
            b = [{
                val: 8
            }];

        expect(buckets.arrays.equals(a, a)).toBeTruthy();
        expect(buckets.arrays.equals(a, a, eq)).toBeTruthy();
        expect(buckets.arrays.equals(a, b, eq)).toBeTruthy();
    });

    it('equals returns false for non-matching arrays using custom equals', function () {
        var a = [{
                val: 10
            }],
            b = [{
                val: 8
            }];
        expect(buckets.arrays.equals(a, b)).toBeFalsy();
        expect(buckets.arrays.equals(a, [])).toBeFalsy();
    });

    it('remove can delete existing elements from number array', function () {
        var a = [4, 9, 9, 10];
        expect(buckets.arrays.remove(a, 9)).toBeTruthy();
        expect(buckets.arrays.indexOf(a, 9)).toEqual(1);
        expect(buckets.arrays.indexOf(a, 10)).toEqual(2);
    });

    it('remove can not delete non-existing elements from number array', function () {
        var a = [];
        expect(buckets.arrays.remove(a, 1)).toBeFalsy();
        a = [4, 9, 9, 10];
        expect(buckets.arrays.remove(a, 9)).toBeTruthy();
        expect(buckets.arrays.remove(a, 9)).toBeTruthy();
        expect(buckets.arrays.remove(a, 9)).toBeFalsy();
    });

    it('remove can delete existing elements using custom equals', function () {
        var c = {
                val: 8
            },
            d = {
                val: 10
            },
            a = [c, d],
            test = {
                val: 10
            };

        expect(buckets.arrays.remove(a, test)).toBeFalsy();
        expect(buckets.arrays.remove(a, test, eq)).toBeTruthy();
    });

    it('forEach returns elements in the right order', function () {
        var a = [],
            i;

        buckets.arrays.forEach(a, function (e) {
            expect(true).toEqual(false); // should not enter here
        });

        for (i = 0; i < 10; i += 1) {
            a.push(i);
        }

        i = 0;
        buckets.arrays.forEach(a, function (e) {
            expect(e).toEqual(i);
            i += 1;
        });
    });

    it('forEach can be interrupted', function () {
        var a = [],
            b = [],
            i;
        for (i = 0; i < 5; i += 1) {
            a.push(i);
        }
        buckets.arrays.forEach(a, function (e) {
            b.push(e);
            if (e === 3) {
                return false;
            }
        });

        expect([0, 1, 2, 3]).toEqual(b);
    });

    it('copy creates a new array', function () {
        var a = buckets.arrays.copy(numberArray);
        expect(a).toEqual(numberArray);
        expect(a).not.toBe(numberArray);
    });

    it('swap only accepts valid positions', function () {
        expect(buckets.arrays.swap(numberArray, 0, 5)).toEqual(true);
        expect(numberArray[0]).toEqual(10);
        expect(numberArray[5]).toEqual(1);
        expect(buckets.arrays.swap(numberArray, 0, 6)).toEqual(false);
        expect(buckets.arrays.swap(numberArray, 7, 2)).toEqual(false);
        expect(buckets.arrays.swap(numberArray, -1, 9)).toEqual(false);
    });
});
