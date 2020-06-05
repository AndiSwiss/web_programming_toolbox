/**
 * In this file, you can find some helpful or not clearly known facts about bitwise and/or binary operations.
 *
 * Don't forget to consult the nice overview table of JavaScript's bitwise operators and more extensive
 * examples for each of these operations here:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
 */


const binaryNumber = 0b0001;   // is the same as 0b1    (the leading 0's are not relevant)
console.log('binaryNumber 0b0001:', binaryNumber);

// Note: in comparison to Java, e.g. 010 is not a valid octal number. Instead, you prefix an octal number with '0o':
const octalNumber = 0o20;
console.log('   octalNumber 0o20:', octalNumber);
const hexNumber = 0x20;
console.log('     hexNumber 0o20:', hexNumber);

// In IntelliJ IDEA, you can always convert decimal <-> binary <-> hexadecimal
// -> with right click on a number and "Show context actions" or the corresponding key command

console.log("\nSome binary operations:");
// Binary operator: or
console.log('0b00100 | 0b00011 =', 0b00100 | 0b00011);


// You can also do binary operations on 'normal' numbers - or 'normally presented' numbers
console.log('    Math.PI | 0b1 =', Math.PI | 0b1);  // prints 3  -> because like this, it converts the floating point into a decimal number

// e.g. the following operation actually is the same as Math.floor(), because :
console.log('            7 | 0 =', 7 | 0);
console.log('         7.98 | 0 =', 7.98 | 0);


