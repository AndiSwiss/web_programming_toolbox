# This -- class -- instanceof in JavaScript
**Be careful**: `this`, `class` and `instanceof` (among others) work quite differently than in some other programming
languages such as Java.

This small document is not here to teach the exact specifics and the exact differences. Instead, this document is
here to remind you to take great care in these regards and to point you to some resources, where you can learn
more about the respective subjects:


## instanceof
`instanceof` works completely different than in Java: `instanceof` basically just looks, whether it appears somewhere in the
prototype-chain.

For some practical examples and more explanations about `instanceof`, see:
-> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof



## class
Because JavaScript is more a functional than an object oriented language, the `class` construction is a relatively
new concept for JavaScript and is in its root not comparable with a class in Java.

As pointed out by the following docs, classes are in fact "special functions".
To further enhance your understanding of `class`, please visit:
-> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes


## this
Be very careful with `this`, because `this` will often not point to the object you think it would.
Hint: get very familiar with the JavaScript way of handling `this`!

For an extensive explanation and a lot of great examples of `this`, consult:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

