/**
 * Various test-methods with colorful and informative console-output.
 * For easy testing JavaScript in the console of an IDE, Browser-console or a terminal.
 */

// Helper constants and functions for the assertions:
// Note: Change of color happens as described here (this might not work everywhere):
//       http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/
const FG_RED = "\x1b[31m", FG_GREEN = "\x1b[32m", FG_CYAN = "\x1b[36m", FG_MAGENTA = "\x1b[35m",
    COLOR_RESET = "\x1b[0m";
const successMsg = (testName) => console.log(FG_GREEN + 'Test \''
    + FG_CYAN + (testName != null ? testName : '?') + FG_GREEN + '\' was successful.' + COLOR_RESET)
    === undefined;
const failMsg = (expected, actual, testName) => console.log(
    FG_RED + 'Test \'' + FG_MAGENTA + (testName != null ? testName : '?') + FG_RED + '\' failed! ',
    'Expected =', expected, COLOR_RESET, '\u27fa', FG_RED, 'Actual =', actual, COLOR_RESET)
    !== undefined;

/**
 * My custom assertion: Logs the output of an assertion (including a testID for easy test tracking).
 * Note 1: Usage of colors as described in
 *         http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/
 * Note 2: the '=== undefined' and '!== undefined' is just used as a simple trick to return true and false
 *         (in case this would be needed)
 * I chose JSON.stringify(...), because .toString() would throw an error, if there is a null-value or an undefined value!
 * I did many tests on various objects (nested arrays, objects, primitives) and it worked fine with one exception:
 *
 *
 * @param expected Expected value
 * @param actual   Actual value
 * @param testName Name of the test
 */
const assertEquals = (expected, actual, testName) => JSON.stringify(expected) === JSON.stringify(actual)
    ? successMsg(testName) : failMsg(expected, actual, testName);

const assertNotEquals = (expected, actual, testName) => JSON. stringify(expected) !== JSON.stringify(actual)
    ? successMsg(testName) : failMsg(expected, actual, testName);

const assertNull = (actual, testName) => actual === null
    ? successMsg(testName) : failMsg(null, actual, testName);

const assertNotNull = (actual, testName) => actual !== null
    ? successMsg(testName) : failMsg(`'not null`, actual, testName);




// ------------------------------------------------------//
// Testing the above methods all should be green and ok: //
// ------------------------------------------------------//
console.log('All the first tests should be ok:');
let a = 2;
let b = 2;
assertNotEquals(3, b); // with assertNotEquals
assertEquals(2, b, 'numbers2');

let undef = undefined;
let nullValue = null;
assertNotEquals(undef, nullValue, 'undefined and null');


// The following is the only flaw: once 'undefined' and 'null' are nested in an array, it doesn't recognize the
// difference. But this is in fact a quite small problem.
let nullArr = [undefined];
let nullArr2 = [null];
assertEquals(nullArr, nullArr2, 'arrays with null and undefined');


let arr1 = [3, 5, 2];
let arr1same = [3, 5, 2];
const arr1asFunc = function () { return [3, 5, 2]; };
let arr2 = [[34, 23, 2523], "hi there", [34, ["a", "b"]], [1, 2]];
const arr2same = () => [[34, 23, 2523], "hi there", [34, ["a", "b"]], [1, 2]];
const arr2different = () => [[34, 23, 2523], "hi there", [34, ["a", "b"]], [1, 3]];
assertEquals(arr1, arr1same, 'arr1 same');
assertEquals(arr2, arr2same(), 'nested arrays same');
assertNotEquals(arr2, arr2different(), 'nested arrays different'); // with assertNotEquals



// Tests with classes:
class Cube {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get volume() {return this.x * this.y * this.z;}
}

let cube1 = new Cube(3, 5, 3);
let cube1same = new Cube(3, 5, 3);
let cube2 = new Cube(2, 3, 5);

assertEquals(cube1, cube1same, 'two equal cubes');
assertNotEquals(cube1, cube2, 'two different cubes'); // with assertNotEquals


// Test with objects:
let obj1 = {
    a: 2,
    b: 3
};
let obj1same = {
    a: 2,
    b: 3
};
assertEquals(obj1, obj1same, 'obj1');

// Tests with complex objects:
let complexObj1 = {
    a: 'hi',
    b: 42,
    c: {da: 'wow', db: 77},
    d: cube1
};

let sayHi = 'hi';

let complexObj1Same = {
    a: sayHi,
    b: 40 + 2,
    c: {da: 'wow', db: 77},
    d: new Cube(3, 5, 3)
};

assertEquals(complexObj1, complexObj1Same, 'complexObjects');
// changing one value deep down:
complexObj1Same.d.y = 15;
assertNotEquals(complexObj1, complexObj1Same, 'complexObjects'); // with assertNotEquals


// assertNull / assertNotNull
let n1 = 42;
const giveNullOnEquality = (a, b) => a === b ? null : b;

assertNull(giveNullOnEquality(n1, 42), 'assertNull 1');
assertNotNull(giveNullOnEquality(n1, 43), 'assertNotNull 1');

/**
 * Make the functions available for other files:
 */
// TODO: I didn't get that to work for now -> maybe this would help? https://dev.to/exacs/practical-guide-node-js-12-supports-es-modules-are-your-apps-ready-5gi
// export function assert1(expected, actual, testName) {
//     return assertEquals(expected, actual, testName);
// }


// -----------------------------------//
// Opposite testing: all should fail! //
// -----------------------------------//
console.log('\nAll the following tests should fail:');
assertEquals(3, b); // with assertNotEquals
assertNotEquals(2, b, 'numbers2');
assertEquals(undef, nullValue, 'undefined and null');
assertNotEquals(nullArr, nullArr2, 'arrays with null and undefined');
assertNotEquals(arr1, arr1same, 'arr1 same');
assertNotEquals(arr2, arr2same(), 'nested arrays same');
assertEquals(arr2, arr2different(), 'nested arrays different'); // with assertNotEquals
assertNotEquals(cube1, cube1same, 'two equal cubes');
assertEquals(cube1, cube2, 'two different cubes'); // with assertNotEquals
assertNotEquals(obj1, obj1same, 'obj1');
// resetting the value (was changed before!):
complexObj1Same.d.y = 5;
assertNotEquals(complexObj1, complexObj1Same, 'complexObjects');
// changing one value deep down:
complexObj1Same.d.y = 15;
assertEquals(complexObj1, complexObj1Same, 'complexObjects'); // with assertNotEquals
assertNotNull(giveNullOnEquality(n1, 42), 'assertNull 1');
assertNull(giveNullOnEquality(n1, 43), 'assertNotNull 1');

