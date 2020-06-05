/**
 * λ-Calculus
 * Video 2: https://www.youtube.com/watch?v=pAnLQ9jwN-E
 * All slides for both videos: https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript
 */

/*
 * Summary -> See video_lambda_calculus_summary.js
 */

// Console output and colored titles:
const cl = s => console.log(s);
const underline = s => '\n' + '-'.repeat(s.length) + (s.charAt(s.length - 1) === ':' ? '' : '-');
const FG_CYAN = "\x1b[36m", FG_MAGENTA = "\x1b[35m", COLOR_RESET = "\x1b[0m";
const title = (s, u) => console.log((u ? FG_CYAN + underline(s) : FG_MAGENTA) + '\n' + s
    + (s.charAt(s.length - 1) === ':' ? '' : ':') + (u ? underline(s) : '') + COLOR_RESET);



// Functions from the previous file necessary to run the following code:
const I = a => a;                   // Identity := λa.a             (usage: identity)
const M = f => f(f);                // Mockingbird := λf.ff         (usage: self-application)
const K = a => b => a;              // Kestrel := λab.a             (usage: true, fist, const)
const KI = a => b => b;             // Kite := λab.b  =  KI  = CK   (usage: false, second)
const C = f => a => b => f(b)(a);   // Cardinal := λfab.fba         (usage: reverse arguments)
const T = K;                        // true
const F = KI;                       // false
const NOT = p => p(F)(T);           // logical NOT := λp.pFT or simply C (Cardinal), so λfab.fba
const AND = p => q => p(q)(p);      // logical AND := λpq.pqp
const OR = M;                       // logical OR  := λpq.ppq  (or simply M)
const BEQ = p => q => p(q)(NOT(q)); // boolean equality := λpq.pq(NOT q)


// ------- //
// Numbers //
// ------- //
title('Numbers', true);
title('NOTE:\n' +
    '- The terminal-output  [Function: K]  means the Kestrel-function, meaning \'true\'\n' +
    '- The terminal-output  [Function: KI] means the Kite-function, meaning \'false\'');

// Don't think about one, two, three.  Instead think about once, twice, thrice
/** video: 0:35 **/
title('One -> once ->  n1 := λfa.fa  =  I*');  // I* is the Identity once removed -> see video 5:05
const once = f => a => f(a);

cl(once(I)(2)); // -> it applies I once on 2      -> 2
cl(once(NOT)(T));  // -> it applies NOT once on true -> false


/** video: 1:34 **/
title('Two -> twice ->  n2 := λfa.f(fa)');
const twice = f => a => f(f(a));

cl(twice(I)(2)); // -> it applies I twice on 2      -> 2
cl(twice(NOT)(T));  // -> it applies NOT twice on true -> true

/** video: 2:12 **/
title('Three -> thrice ->  n3 := λfa.f(f(f(a))');

const thrice = f => a => f(f(f(a)));

cl(thrice(I)(2)); // -> it applies I thrice on 2      -> 2
cl(thrice(NOT)(T));  // -> it applies NOT thrice on true -> false

/** video: 3:00 **/
title('Zero -> n0 := λfa.a  =  KI  =  F   (false)');
// Note: ALL these always have the same beginning:  λfa.  -> meaning: all take a function f with an argument a

const zero = f => a => a;
// Since Zero returns it's second argument -> its the Kite -> and thus it's also FALSE!

cl(zero(NOT)(T));  //-> it applies NOT zero times on true -> it stays true

/** video: 3:00 **/
// zero, once, twice, thrice, fourfold, fivefold, ...

/** video: 5:25 **/
title('Successor (+ 1) := λnfa.f(nfa)  or   λnfa.B f(nf)', true);   // B is the Bluebird!
/*
 * We want a function, so that:
 *  succ n1 = n2
 *  succ n2 = n3
 *  succ (succ n1) = n3    -> These are the "Peano Numbers" -> from 1889 !!
 *
 *  So:
 *     succ  n1    =    n2
 *  -> succ λfa.fa =  λfa.f(fa)
 *
 *  Meaning:
 * succ n2 = (λnfa.f(nfa)) n2   -> meaning: apply the f once more!
 */
const succ = n => f => a => f(n(f)(a));

cl(succ(zero));  // -> prints [Function (anonymous)]
// To prove it, I would need to apply it to something, e.g.:
cl(succ(zero)(NOT)(T));  // -> is false

// for better output: jsnum-function
const jsnum = n => n(x => x + 1)(0);   // add 1  (with the 'x => x + 1')    and start with 0  (with the '(0)')

cl(jsnum(succ(zero)));
cl(jsnum(succ(succ(zero))));
cl(jsnum(succ(succ(succ(zero)))));
cl(jsnum(succ(succ(succ(succ(zero))))));

/** video: 9:09 **/
title('Store all the numbers');
const n0 = zero;
const n1 = once;
const n2 = twice;
const n3 = succ(n2);
const n4 = succ(n3);
cl(jsnum(n0));
cl(jsnum(n1));
cl(jsnum(n2));
cl(jsnum(n3));
cl(jsnum(n4));
cl(jsnum(succ(n4)));

/** video: 9:40 **/
title('Bluebird := λfga.f(ga)  (1° ⟵ 1° composition)');
// This is THE most important combinator!
// This is function composition
const B = f => g => a => f(g(a));

cl(B(NOT)(NOT)(T));  // -> right to left function composition: apply NOT to T, then apply NOT to that again
                     // (Note: here, the order of the two NOT are note relevant; they could be flipped around)

// helper method to make it visible in JavaScript:
const yell = s => s + '!';
cl(yell('lambda'));

cl(B(jsnum)(succ)(n4));  // -> right to left function composition: I first apply 'succ' on 'n4', THEN I apply the jsnum-function!!


/** video: 14:21 **/
title('Nicer way of successor: Using the Bluebird!  := λnf.Bf(nf)');
// Original successor:
// const succ = n => f => a => f(n(f)(a));
// with blueBird:
const succBluebird = n => f => B(f)(n(f));
cl(jsnum(succ(n4)));
cl(jsnum(succBluebird(n4)));  // works!


title('add / mult / pow', true);
/** video: 15:20 **/
title('ADD (Addition) := λnk.n SUCC k');
/*
 * add n1 n5 = succ n5
 * add n2 n5 = succ (succ n5)
 * add n3 n5 = succ (succ (succ n5))
 * -> this is function composition!! So it's the same as:
 * add n3 n5 = (succ ∘ succ ∘ succ) n5        (  ∘  is a function composition)
 * // We can generate that three-fold composition using a church-number:
 * add n3 n5 = n3 succ n5    -> meaning: adding 3 and 5 is the same as applying the 'succ' thrice on n5 !!!
 * -> ADD := λnk.n succ k
 */
const add = n => k => n(succ)(k);
cl(jsnum(add(n3)(n4)));

const n5 = add(n4)(n1);
const n6 = add(n4)(n2);
const n7 = add(n4)(n3);
const n8 = add(n4)(n4);
const n9 = add(n4)(n5);

let begin = Date.now();
cl(jsnum(add(n9)(n7)));
let end = Date.now();
cl('-> This took ' + (end - begin) + 'ms.');

/** video: 17:40 **/
title('MULT (Multiplication) := B');
/*
 * mult n2 n3 f a = (f ∘ f ∘ f ∘ f ∘ f ∘ f) a
 * -> this is the same as: (because it's associative):
 * mult n2 n3 f a = ((f ∘ f ∘ f) ∘ (f ∘ f ∘ f)) a    -> so it's the twofold composition of the threefold composition of f
 * ->
 * mult n2 n3 f a = ((n3 f) ∘ (n3 f)) a
 * ->
 * mult n2 n3 f a = n2 (n3 f) a
 * -> the 'a' on both sides cancels out (because it's on the right-most position):
 * mult n2 n3 f = n2 (n3 f)
 *
 * But even better: this is just composition  (video 19:15)
 * mult n2 n3 f = (n2 ∘ n3) f
 * -> the 'f' on both sides cancels out:
 * mult n2 n3 = (n2 ∘ n3)   -> so the multiplication of two numbers is JUST THEIR COMPOSITION!!
 * mult n2 n3 = B n2 n3     -> and now n3 cancels out
 * mult n2 = B n2           -> and n2 cancels out as well
 * mult = B                 -> !!!!!!
 */

// const mult = n => k => B(n)(k);     // before cancelling n3 out  -> works as well!!
// const mult = n => B(n);             // before cancelling n2 out  -> works as well!!
const mult = B;                        // final method, sweet!

cl(jsnum(mult(n4)(n5)));
const n30 = mult(mult(n3)(n5))(n2);
cl(jsnum(n30));


/** video: 20:41 **/
title('POW (Exponentiation) := λnk.kn');
/*
 * pow n2 n3 = n2 * n2 * n2
 * -> multiplication is composition:
 * pow n2 n3 = n2 ∘ n2 ∘ n2
 * -> with the church literals:
 * pow n2 n3 = n3 n2            // thrice n2 !!!
 * -> it simply swaps the positions
 */
// const pow = n => k => k(n);

// -> this swapping-functionality is described in the Thrush:
/** video: 20:41 **/
title('Thrush := λaf.fa  =  CI  (hold an argument)');  // also swap arguments.
// Note: The 'Thrush' has some similarities with the Cardinal (λfab.fba)
const TH = n => k => k(n);

// Note: the THRUSH is also the same as CI. So the following works as well (same time to complete the work!):
// const TH = C(I);


const pow = TH;


begin = Date.now();
cl(jsnum(pow(n4)(n3)));  // 4*4*4 = 64
end = Date.now();
cl('-> This took ' + (end - begin) + 'ms.');

begin = Date.now();
cl(jsnum(pow(n6)(n7)));// 6^7 = 279'936
end = Date.now();
cl('-> This took ' + (end - begin) + 'ms.');  // -> -> This took 15ms.

// begin = Date.now();
// cl(jsnum(pow(n9)(n8)));// 9^8 = 43'046'721
// end = Date.now();
// cl('-> This took ' + (end - begin) + 'ms.');  // -> This took 1153ms.


/** video: 22:39 **/
title('IsZero := λn.n(KF)T'); // test if n == 0
/*
 * Is0 n0 = T   // is zero zero ? -> true
 * Is0 n1 = F   // is one zero ? -> false
 * Is0 n2 = F   // is two zero ? -> false
 * ...
 * -> the KF always returns false (the 'kestrel' of 'False')
 * e.g. (is three zero)?
 * Is0 n3 = KF(KF(KF(T))
 * since KF(....)  of any (...) always returns false
 * ->
 * Is0 n3 = F
 *
 * Only when KF doesn't get applied even once, the answer is true:
 * Is0 n0 = T    // KF was not applied a single time!)
 */
const is0 = n => n(K(F))(T);
cl(is0(n7));  // false
cl(is0(n30)); // false
cl(is0(n1));  // false
cl(is0(n0));  // true
// -> it works


/** video: 26:20 **/
// subtraction and Predecessor -> see later in the video after 32:46


/** video: 26:51 **/
title('Data Structures', true);  // Pair, fst, snd, phi

title('Vireo := λabf.fab  =  BCT  (hold a pair of args)');  // This is the world smallest data structure!!
// It takes two arguments and holds on to them. It pairs things together in a box.
// If you want to access the thing in the box, you give the box a function, and that function
// gives you these two arguments!
// It's CLOSURES !!!  Using closures as data structures

const V = a => b => f => f(a)(b);

/** video: 27:40 **/
// The VIM:  λf.f I M  (a box which is holding the Identity and the Mockingbird)
const vim = V(I)(M);

cl(vim(K));   // -> get the first of the two stored values with the K (Kestrel)
cl(vim(KI));  // -> get the second of the two stored values with the KI (Kite)

const twoNumbers = V(n3)(n7);
cl(jsnum(twoNumbers(K)));  // -> get the first of the two stored values with the K (Kestrel)
cl(jsnum(twoNumbers(KI))); // -> get the second of the two stored values with the KI (Kite)

// -> This is 'a purely functional data-structure' !!
// See book-tip in video 29:07

title('We can also implement the Vireo with BCT:   (but this doesn\'t work somehow ???  -> it should also return 3 and 7, but it returns 343 twice ????)');
const Vvar = B(C)(T);
const twoOtherNumbers = Vvar(n3)(n7);
cl(jsnum(twoOtherNumbers(K)));  // -> get the first of the two stored values with the K (Kestrel)
// TODO: check with Mr König, why this gives a wrong result of 343
cl(jsnum(twoOtherNumbers(KI))); // -> get the second of the two stored values with the KI (Kite)
// TODO: check with Mr König, why this gives a wrong result of 343


/** video: 30:00 **/
title('FST (First) := λp.pK');   // we give it a pair 'p' and the Kestrel gives us the first element
const fst = p => p(K);

title('SND (Second) := λp.p(KI)');   // we give it a pair 'p' and the Kite gives us the second element
const snd = p => p(KI);
cl(jsnum(fst(twoNumbers)));
cl(jsnum(snd(twoNumbers)));


// Just from one of the last slides from https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript?slide=334
// (This was not covered in the speech)
title('Set1st := λcp.PAIR c (SND p)');      // (usage: set first, immutably   (with the number c, in the pair p)
// NOTE: V is the function for a pair)
const set1st = c => p => V(c)(snd(p));
const changedNumber = set1st(n9)(twoNumbers);  // two numbers are 3 and 7
cl(jsnum(fst(changedNumber)));  // works -> prints 9
cl(jsnum(snd(changedNumber)));  // works -> still prints 7

title('Set2nd := λcp.PAIR (FST p) c');      // (usage: set second, immutably)
const set2nd = c => p => V(fst(p))(c);
const changedNumber2 = set2nd(n9)(twoNumbers);  // two numbers are 3 and 7
cl(jsnum(fst(changedNumber2)));  // works -> still prints 3
cl(jsnum(snd(changedNumber2)));  // works -> prints 9


/** video: 30:43 **/
title('PHI := λp.V (SND p) (SUCC(SND p))');  // remember: V is a pair. Here the pair of  (SND p)  and  (SUCC(SND p))

const phi = p => V(snd(p))(succ(snd(p)));
/*
 * phi(M, n7) = (n7, n8)  -> it copies the 2nd to the 1st, and increments the 2nd  (so the 1st value disappears, here M)
 * phi(n9, n2) = (n2, n3)
 *
 * phi(n0, n0) = (no, n1)
 * phi(n1, n2) = (n2, n3)
 */
cl(jsnum(fst(phi(V(n0)(n4)))));   // returns the 2nd argument (which was copied to the first!)
cl(jsnum(snd(phi(V(n0)(n4)))));   // returns 5 (the 2nd argument incremented by one!)

/*
 * So, what happens, if we apply phi multiple times on (n0, n0)? E.g. 8 times:
 * n8 phi(n0, n0) = (n7, n8)
 * ====> we have predecessor, because we get n7 out of n8, if we look at the first element on both sides:
 * fst(n8 phi(n0, n0) = fst(n7, n8)    -> this is n7
 */
/** video: 32:46 **/
title('PRED (predecessor) := λn.FST (n PHI (V n0 n0))');  // Necessary for the subtraction!
const pred = n => fst(n(phi)(V(n0)(n0)));

cl(jsnum(pred(n30))); // gives 29, yes!
cl(jsnum(pred(n0))); // but it doesn't give us negative values. 0 stays 0!


/** video: 32:46 **/
title('SUB (subtraction) := λnk.k PRED n');   // now, it looks very similar to ADD := λnk.n SUCC k
const sub = n => k => k(pred)(n);

cl(jsnum(sub(n30)(n9)));  // -> 21
cl(jsnum(sub(n4)(n7)));   // values cannot get negative -> so it returns 0  -> from this follows the  ≤  (LEQ):

// ------------------------------------------------------------ //
title('Comparison operators for numbers', true);

/** video: 36.57 **/
title('LEQ (less than or equal to) := λnk.Is0 (SUB n k)');
const leq = n => k => is0(sub(n)(k));

cl(leq(n4)(n6));
cl(leq(n4)(n4));
cl(leq(n4)(n3));  // works!
// cl(leq(T)(T));    // doesn't really give us something useful (in any TT/TF/FT-combination):  [Function (anonymous)]
// cl(leq(F)(F));    // EXCEPT with FF -> here we get TRUE as an answer! -> not useful!


/** video: 37.03**/
title('EQ (equal) := λnk.AND(LEQ n k)(LEQ k n)');  // A combination of LEQ and inverse LEQ
const eq = n => k => AND(leq(n)(k))(leq(k)(n));
cl(eq(n4)(n6));
cl(eq(n4)(n4));
cl(eq(n4)(n3));  // works!
// cl(eq(T)(T));    // doesn't really give us something useful (in any TT/TF/FT-combination):  [Function (anonymous)]
// cl(eq(F)(F));    // EXCEPT with FF -> here we get TRUE as an answer!  (the same as with LEQ! -> not useful for booleans!)

/** video: 37.27 **/
title('GT (greater than) := λnk.NOT (LEQ n k)    or simpler: with the following Blackbird -> see following');
const gt_v1 = n => k => NOT(leq(n)(k));
cl(gt_v1(n4)(n6));
cl(gt_v1(n4)(n4));
cl(gt_v1(n4)(n3));  // works!


/*
 * This again is function composition, but this time with two elements  -> use the Blackbird:
 */
title('B1 (Blackbird) := λfgab.f(gab)  =  BBB  (1° ⟵ 2° composition)');   // Note: B is the Bluebird := λfga.f(ga)  (1° ⟵ 1° composition)
// Either:
// const B1 = f => g => a => b => f(g(a)(b));
// Or:
const B1 = B(B)(B);

// This leads to:
title('GT (greater than - with the blackbird) := B1 NOT LEQ');    // B1 is the blackbird
const gt = B1(NOT)(leq);   // (1° ⟵ 2° composition with NOT and leq!!)
cl(gt(n4)(n6));
cl(gt(n4)(n4));
cl(gt(n4)(n3));  // works!





// -----------------------------//
// Addendum (created on my own) //
// -----------------------------//
// TODO:
title('GEQ (greater than or equal to) := λnk.Is0 (SUB k n)');  // comparing to LEQ, just switch n and k
const geq = n => k => is0(sub(k)(n));
cl(geq(n4)(n6));
cl(geq(n4)(n4));
cl(geq(n4)(n3));  // works!

title('LT (less than - with the blackbird) := B1 NOT GEQ');    // same as GT, just replace LEQ with GEQ
const lt = B1(NOT)(geq);   // (1° ⟵ 2° composition with NOT and leq!!)
cl(lt(n4)(n6));
cl(lt(n4)(n4));
cl(lt(n4)(n3));  // works!
