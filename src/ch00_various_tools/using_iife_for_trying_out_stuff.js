/**
 * Before knowing about IIFE -- Immediately invoked function expression -- I often struggled
 * when I wanted to quickly try out different variants of a code. I was constantly commenting out
 * code or creating a separate file for each individual variant.
 * Using IIFE however, you can very simply do many variants in one file, as demonstrated here.
 *
 * One big advantage is that each IIFE provides a new scope: so you can redefine your functions,
 * redefine your constants and much more, except of course for global objects.
 *
 *
 * If you want to know, what IIFE is all about, visit the following site, which provides the corresponding
 * explanations:
 * https://developer.mozilla.org/en-US/docs/Glossary/IIFE
 *
 * And for a different perspective of IIFE, consult other sources, such as:
 * https://en.wikipedia.org/wiki/Immediately_invoked_function_expression
 */


// You can specifically provide things which should be available for all the methods, by defining them outside
// of the scope of an IIFE:
const executeAndPrint = f => console.log(f);


console.log("\n-- Variant one");
(() => {
    const a = 42;
    const b = 7;
    const calc = a => b => a + b;
    executeAndPrint(calc(a)(b));
})();


console.log("\n-- Variant two");
(() => {
    const a = 5;
    const b = 4;
    const calc = a => b => a * b;
    executeAndPrint(calc(a)(b));
})();

