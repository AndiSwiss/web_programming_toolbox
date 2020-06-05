/**
 * Notes which I took during watching the 1h-video
 * "Lambda λ Calculus - Fundamentals of Lambda Calculus & Functional Programming in JavaScript" by Gabriel Lebec
 * Video 1: https://www.youtube.com/watch?v=3VQ382QG-y4
 * Video 2 -> see separate file
 * Repo: https://github.com/glebec/lambda-talk
 * Original Slide-Deck (of both videos):
 *   https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript
 *
 *
 */

/*
 * Summary -> See video_lambda_calculus_summary.js
 */

// Short helper-variables and -methods for console.log

// Small trick to have the same output as described in video 39.26, but I couldn't get it to work!
// const asStr = (s) => JSON.stringify(s);
// const boolStr = (s) => asStr(s).toString().replace('[Function: K] { inspect: [Function (anonymous)] }', 'T / K')
//     .replace('[Function: KI] { inspect: [Function (anonymous)] }', 'F / KI');
// const cl = s => console.log(boolStr(s));

const cl = s => console.log(s);

// Creating a nice title
const underline = s => '\n' + '-'.repeat(s.length) + (s.charAt(s.length - 1) === ':' ? '' : '-');
const FG_CYAN = "\x1b[36m", FG_MAGENTA = "\x1b[35m", COLOR_RESET = "\x1b[0m";
const title = (s, u) => console.log((u ? FG_CYAN + underline(s) : FG_MAGENTA) + '\n' + s
    + (s.charAt(s.length - 1) === ':' ? '' : ':') + (u ? underline(s) : '') + COLOR_RESET);

/** video: 0.52 **/
title('Identity := λa.a  (usage: identity)');
const I = a => a;

cl(I(1));
cl(I(I));


/** video: 3:32 **/
/*
 *  The whole λ syntax is the following:
 *  expression ::= variable                    identifier
 *               | expression expression       application
 *               | λ variable . expression     abstraction
 *               | ( expression )              grouping
 */

/** video: 4:14 **/
title('Applications', 'yes, underline please :-)');
// Currying
const add = a => b => a + b;

cl(add(3)(6));


/** video: 6:47 **/
// Abstractions

/** video: 9:18 **/
// Beta-reduction


/** video: 11:49 **/
title('Mockingbird := λf.ff  (usage: self-application)');
// This is the 'self-application combinator'

const M = f => f(f);
cl(M(I));  // 'the self-application of identity is identity'

// try {
//     cl(M(M))                  // 'the self-application of the self-application'
// } catch (e) {
//     console.log(e.message);   // -> prints 'Maximum call stack size exceeded'
// }


/** video: 17:01 **/
title('Kestrel := λab.a  (usage: true, fist, const)');
const K = a => b => a;

cl(K(I)(M)); // I
cl(K(K)(M)); // K  -> the second element is always irrelevant!

let K5 = K(5);
cl(K5);  // -> without parenthesis, it returns "Function (anonymous)"

cl(K5());
cl(K5(3));
cl(K5(12393829));
// -> no matter, what you feed, it always gives back what is already at K5!
// -> in Haskell, this is also called 'const' function


// Preparation of the Kite:
/** video: 17:34 **/
let x = 7;
cl(K(I)(x)); // I

let y = 42;
cl(K(I)(x)(y)); // 42 !!!

// -> so, as seen above:   K(I)(x)(y) === y   !!!!
// -> That lead to the Kite:
/** video: 19:43 **/
title('Kite := λab.b  =  KI  =  CK  (usage: false, second)');  // you always get the second object:
const KI = a => b => b;
// OR:
// const KI = K(I);

cl(KI(x)(y));

/** video: 21:05 **/
// History

/** video: 29:29 **/
title('Combinators', true);  // Combinators are 'functions with no free variables'

/** video: 31:01 **/
title('Cardinal := λfab.fba  (usage: reverse arguments)');
// Tt takes a function 'f' that takes two parameters, and calls that function, but with swapped arguments a and b
const C = f => a => b => f(b)(a);
cl(C(K)(I)(M)); // === K(M)(I) === M    -> Note: C(K)  is the same as KI !!  because KI(M)(I) === M !!
cl(C(K)(1)(2));


/** video: 33:52 **/
// WHY the whole thing?   -> λ-calculus is equivalent to the turing machine!
// good comparisons between turing-machine and λ-calculus

// -> this is why:
/** video: 36:33 **/
title('EVERYTHING CAN BE FUNCTIONS', true);

// but how would we calculate something like this:    !x == y || (a && z)
// -> we don't have !, ==, ||, &&, we don't have booleans (so no x, y, a, z).
// up to now, we ONLY have parenthesis () !!!!!

/** video: 37:24 **/
title('booleans');

// In JavaScript:  const result = bool ? exp1 : exp2
// If bool==true -> we get exp1    -> so we get the FIRST expression   -> Kestrel!! -> K
// If bool==false -> we get exp2   -> so we get the SECOND expression   -> Kite!!   -> KI
// So:
const T = K;
const F = KI;

// T.inspect = () => 'T / K';
// F.inspect = () => 'F / KI';
/* That doesn't really work here.
 * And it also doesn't work in the OSX-terminal nor in the IntelliJ Terminal when running this file
 *     with 'node video_lambda_calculus1.js'   (SIDE-NOTE: colors do render perfectly in the terminal)
 *
 * Instead: it outputs:
 *      [Function: K] { inspect: [Function (anonymous)] }
 * and  [Function: KI] { inspect: [Function (anonymous)] }
 */

cl(T);
cl(F);
cl(KI(T)(F));

/** video: 40:17 **/
title('logical \'NOT\' := λp.pFT');
const NOT = p => p(F)(T);

// But there is a better way. Remember:
// - K (Kestrel) is λab.a
// - KI (Kit)    is λba.a
// const NOT = C;  // -> But this GENERATES a new function  -> resulting in answers like  [Function (anonymous)]


cl(NOT(T));  // [Function: KI]  -> KI meaning 'False' -> perfect
cl(NOT(F));  // [Function: K]   -> K meaning 'True' -> perfect

/** video: 45:31 **/
title('logical \'AND\' := λpq.pqF  =  λpq.pqp');  // Remember: the 'F' stands for FALSE!
// const AND = p => q => p(q)(F);          // p and q are booleans

// Simplification (video 37:21):
const AND = p => q => p(q)(p);


// truth-table:
cl(AND(T)(T));
cl(AND(T)(F));
cl(AND(F)(T));
cl(AND(F)(F));


/** video: 48.41 **/
title('logical \'OR\' := λpq.pTq  =  λpq.ppq  =  M');
// const OR = p => q => p(T)(q);

// Or simplified:
const OR = p => q => p(p)(q);


// Truth-table:
cl(OR(T)(T));
cl(OR(T)(F));
cl(OR(F)(T));
cl(OR(F)(F));


// More simplified (with beta-reduction):
// (λpq.ppp)xy == ??
//    -> remember: in beta-reduction: every x replaces the first argument, here p
//       and every y replaces the second argument, here q
// -> :
// (λpq.ppp)xy == xxy
// (  ?    )xy == xxy
//  -> Just look at it ignoring the y for a moment:
//     ->   ( ? ) x == xx
//     -> this is the Mocking-Bird, the 'self-application bird')
//     ->     M x == xx
//  -> We can just simply add the y as a second argument (because it's the last argument on both sides of the equation!
//     M xy == xxy
// const OR = M;

title('Truth-table with mockingbird (is the same as with OR !!):');
cl(M(T)(T));
cl(M(T)(F));
cl(M(F)(T));
cl(M(F)(F));
// Note: the second argument provided works perfectly fine in this context, even though the mocking-bird just accepts
// one function and applies that function to itself -> additional parameters are preserved.


/** video: 48.41 **/
title('Boolean equality := λpq.p(qTF)(qFT)  =  λpq.pq(NOT q)');
/*
 * Looking at the lambda:
 * λpq.p(qTF)(qFT)
 * λpq == It's a function, which takes two arguments. Let's assume that p and q are booleans.
 * .p(..)(..) -> p selects between the two possibilities: first (..) and the second (..)
 * If p is true, it will select the first (..), here (qTF)
 * If p is false, it will select the second (..), here (qFT)
 * (qTF) -> same store: p selects between the two possibilities: T and F
 *  -> if q is true, it selects T
 *  -> if q is false, it selects F
 *
 * (qFT) -> same, but different:
 *  -> if q is true, it selects F
 *  -> if q is false, it selects T
 *
 * -> So back to the whole statement:
 * if p and q are the same, they select T
 * if p and q are different, they select F
 *
 * -> SO, THIS TESTS IF p AND p ARE THE SAME, SO WE HAVE  '=='    !!!!
 * -> This is also represented with the XNOR-gate (Exclusive NOR): https://en.wikipedia.org/wiki/XNOR_gate
 *
 *
 * In JavaScript:
 */
// const BEQ = p => q => p(q(T)(F))(q(F)(T));

/*
 * Simplification:
 * (qTF)  -> simplifies to    p
 * (qFT)  -> simplifies to   (NOT q)
 *
 * -> λpq.pq(NOT q)
 */
const BEQ = p => q => p(q)(NOT(q));

// Truth-table:
cl(BEQ(T)(T));
cl(BEQ(T)(F));
cl(BEQ(F)(T));
cl(BEQ(F)(F));




title('(one of) de morgan\'s laws', true);
// From end of video 1 (around min 50)
/*
 * (one of) de morgan's is:
 *      ¬ (P ∧ Q)  ===  (¬ P) ∨ (¬ Q)
 * BEQ(NOT(AND p q)) (OR (NOT p) (NOT q))    // Short-Hand with our already defined Lambda-functions (from video1)
 *        !(p && q === (!p) || (!q)          // In regular JavaScript
 *
 * Now, replace the shorthands (BEQ, NOT,...) with the already known lambda-calculus:
 * xy.x y((λfab.fba) y))  ((λfab.fba) ((λxy.xyx) p q)  ((λf.ff) ((λfab.fba) p) ((λfab.fba) q))
 * EXPLANATION:
 * xy.                    -> variables going in
 * λfab.fba               -> NOT is simplified also the C (Cardinal) -> so λfab.fba
 * So, the first part of the statement:
 * xy.x y((λfab.fba) y))  -> this is BEQ -> λpq.pq(NOT q)
 *
 * The second part of the statement:
 * ((λfab.fba) ((λxy.xyx) p q)
 * λfab.fba                 -> NOT  (like before)
 * λxy.xyx                  -> AND
 *
 * The third part of the statement:
 * ((λf.ff) ((λfab.fba) p) ((λfab.fba) q))
 * (λf.ff)                  -> is the Mockingbird, which is equivalent to the logical OR
 * λfab.fba                 -> NOT (like before)
 */


/** video: 56:34 **/
// More combinators:
title('Bluebird := λfga.f(ga)  (1° ⟵ 1° composition)');  // -> see video 2, 9:40
title('Thrush := λaf.fa  =  CI  (hold an argument)');
title('Vireo := λabf.fab  =  BCT  (hold a pair of args)');  // This is the world smallest data structure!!
title('Blackbird := λfgab.f(gab)  =  BBB  (1° ⟵ 2° composition)');


/** video: 57:12 **/
/* Question: how many combinators are needed to form a basis (to construct all the other combinators)?
 * ANSWER: we just need two:
 * - Starling:  S := λabc.ac(bc)
 * - Kestrel:   K := λab.a
 * -> This is called "The SK combinator calculus".
 * -> Even the identity can be constructed and also everything else. But Starling is a bit weird and it's
 *    less readable.
 *
 * The author of the video prefers the "B C K I" - calculus, where you can construct everything out of these 4 base
 * combinators:
 *
 * KI := K I = C K
 * B1 := B B B
 * Th := C I
 * V  := B C Th = B C (C I)
 * -> is by far easier to use than SK-calculus:
 *
 * E.G. identity-function:
 * - In SK-calculus:   I = S K K
 * - in B C K I: already natively defined
 *
 * E.G. Vireo:
 * - in SK-calculus:   V = (S(K((S((S(K((................................)     -> very long!
 * - in B C K I:       V = B C T
 */


/** video: 59:46 **/
// Real-world practical benefits of the understanding the whole λ-calculus:


/** video: 1:00:40 **/
/*
 * Slide 1: Combinators
 * Slide 2: Church Encodings: Booleans
 * Slide 3: Church Encodings: Numerals
 * Slide 4: Church Arithmetic
 * Slide 5: Church Arithmetic: Boolean Ops
 * Slide 6: Church Pairs   (= Data structures!)
 */

/** video: 1:01:02 **/
/* The most famous combinator: the y fixed-point combinator
 *   -> it allows recursion (in a language that hasn't recursion built-in!)
 *   -> cannot be demonstrated in JavaScript, because it goes on forever
 *  This only works in a lazy language like Haskell or the λ-calculus itself!!
 *
 * In JavaScript, we could use the z fixed-point combinator (slightly more complicated) -> video 1:01:47
 */

// ---- END OF VIDEO 1 ---- //
// Video 2 -> see separate file
// -> see a quick summary of all the functions in the beginning of "video_lambda_calculus2.js"

