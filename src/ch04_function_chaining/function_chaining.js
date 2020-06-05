/**
 * With this file, I would like to show an incremental process to incrementally enhance
 * a function with the goal for providing function chaining.
 *
 * Note: All the steps are executed in an IIFE. And the printed result would always be 10.
 */

// Given the following two functions -> for all the following examples:
const inc = n => n + 1;
const timesTwo = n => n * 2;


console.log("\n-- Function composition in the most easy classical way (procedural):");
(() => {
    let t = inc(4);
    let result = timesTwo(t);
    console.log(result);  // should be 10
})();

console.log("\n-- function composition, first iteration:");
(() => {
    const incAndDouble = n => {
        let t = inc(n);
        return timesTwo(t);
    }
    console.log(incAndDouble(4));  // should be 10
})();

console.log("\n-- The previous iteration had too many variables. Next iteration: all inline:");
(() => {
    const incAndDouble = n => {
        return timesTwo(inc(n));     // ("I first do the *inc*, **then** I do the *timesTwo*")
    }
    console.log(incAndDouble(4));  // should be 10
})();

console.log("\n-- function composition, next iteration:");
(() => {
    const incAndDouble = n => timesTwo(inc(n))
    console.log(incAndDouble(4));  // should be 10
})();


console.log("\n-- curried style taking two functions:");
(() => {
    const firstAndThen = f => g => n => g(f(n));

    const incAndDouble = firstAndThen(inc)(timesTwo)
    console.log(incAndDouble(4));  // should be 10
})();

console.log("\n-- But: if we want to increase the structure, e.g. with 3 functions, it get's very ugly (though it works):");
(() => {
    const firstAndThen = f => g => n => g(f(n));

    const plusThree = firstAndThen(firstAndThen(inc)(inc))(inc)

    console.log(plusThree(7));  // should be 10
})();

console.log("\n-- We can use with the 'Prototype' of the function, where we declare the new function 'then', \n" +
    "which enables effective function chaining:");
(() => {
    Function.prototype.then = function (g) { return arg => g(this(arg)); }

    // New usage with function chaining:
    const plusThree = (inc).then(inc).then(inc);
    console.log(plusThree(7));  // should be 10
})();

console.log("\n-- IMPORTANT: adding an element like a Function.prototype doesn't stay anymore in the closed scope \n" +
    "of an IIFE!! See for yourself: The previously defined prototype is still available:");
(() => {
    const plusThree = (inc)              // if the starting value would be 1, current value = 2
                        .then(timesTwo)  // current value = 4
                        .then(inc)       // current value = 5
                        .then(timesTwo)  // current value = 10

    console.log(plusThree(1));  // should be 10
})();
