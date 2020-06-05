/**
 * Here are some hints about regex and some valuable websites where you can learn more about the never ending topic
 * of regex.
 *
 * Nice resources for further learning about regex:
 * - https://regex101.com/
 * - https://regexone.com/
 * - https://regexr.com/
 */

// Create a new regex with 'new RexExp' or with /..../
let regex1 = new RegExp("abcd", "ig");
// The 'new RegExp(..) is very useful, if you fetch the pattern from somewhere, e.g.
// if a RegExp-Setting is saved in a Database where it would be stored as a string.

console.log("\nExample 1:");
let regex2 = /house/i;  // flag 'i': ignore case
console.log("I'm going to buy a house".match(regex2));
/*
 * DIFFERENCE between console.log(..) and document.writeln(..) and if inside an if-statement:
 *  - console.log(), e.g. in IntelliJ IDEA:
 *      prints and returns 'null', if not found.
 *      if found, then with console.log(), it prints
 *          [
 *             'house',
 *             index: 19,
 *             input: "I'm going to buy a house",
 *             groups: undefined
 *          ]
 *  - document.writeln(..):
 *      writes 'null', if not found.
 *      If found, it only prints 'house"  -> so you can strip down a string with this matching
 *  - inside if-statement:
 *      returns false if not found
 *      returns true if found
*/

/*
 * Some options for characters:
 * - one white space character:  \s
 * - one or more space characters: \s+
 * - 0 or more space characters: \s*
 */

console.log("\nExample 2:");
regex2 = /like\s+FREEDOM/i;  // flag 'i': ignore case
console.log("I like freedom".match(regex2));


console.log("\nExample 3:");
regex2 = /like\s+freedom/i;  // flag 'i': ignore case
console.log("I like      freedom".split(regex2));


console.log("\nExample 4:");
regex2 = /like\s+freedom/i;  // flag 'i': ignore case
console.log("I like  FREEdom and other things".replace(regex2, 'xxx'));

console.log("\nExample 5:");
// only replace one part of the match, create a group with parenthesis:
regex2 = /like\s+(freedom)/i;  // flag 'i': ignore case
// you can reference to the groups with $1 (starting with 1)
console.log("I like  freedom".replace(regex2, 'love lOvE LOVE $1'));




