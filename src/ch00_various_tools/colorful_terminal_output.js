/**
 * With the following code, you can create nice colored output in a terminal such as the terminal
 * in the IDE IntelliJ IDEA.
 */

// Helper method to create a line as long as the given string:
const underline = s => '\n' + '-'.repeat(s.length) + (s.charAt(s.length - 1) === ':' ? '' : '-');

// Constants for defining colors:
const FG_CYAN = "\x1b[36m", FG_MAGENTA = "\x1b[35m", COLOR_RESET = "\x1b[0m";

// Method to create a title, with an optional second argument:
// If the optional second argument is provided, then the color changes and it introduces lines below and above the given
// given string s.
// It provides additional space above and below the title and an automatically added colon:
const title = (s, u) => console.log((u ? FG_CYAN + underline(s) : FG_MAGENTA) + '\n' + s
    + (s.charAt(s.length - 1) === ':' ? '' : ':') + (u ? underline(s) : '') + COLOR_RESET);


// Usage examples:
console.log("\nI'm a normal console print");
title('Hello. I\'m a colored console print');
title('Hello. I\'m a differently with additional lines printed', true);
console.log("\nThat's it!");



