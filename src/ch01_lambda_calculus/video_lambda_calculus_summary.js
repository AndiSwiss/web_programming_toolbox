/**
 * Summary from both videos:
 * See also https://speakerdeck.com/glebec/lambda-as-js-or-a-flock-of-functions-combinators-lambda-calculus-and-church-encodings-in-javascript?slide=328
 */

/** Combinators: */
const I = a => a;                         // Identity := λa.a                     (use: identity)
const M = f => f(f);                      // Mockingbird := λf.ff                 (use: self-application)
const K = a => b => a;                    // Kestrel := λab.a                     (use: true, fist, const)
const KI = a => b => b;                   // Kite := λab.b  =  KI  = CK           (use: false, second)
const C = f => a => b => f(b)(a);         // Cardinal := λfab.fba                 (use: reverse arguments)
const B = f => g => a => f(g(a));         // Bluebird := λfga.f(ga)               (use: function composition  (1° ⟵ 1° composition))
const TH = C(I);                          // Thrush := λaf.fa  =  CI              (use: hold an argument. Also swap arguments.)
const V = a => b => f => f(a)(b);         // Vireo := λabf.fab  =  BCT            (use: hold a pair of args. The smallest data structure!)
const B1 = B(B)(B);                       // Blackbird := λfgab.f(gab)  =  BBB    (use: function composition  (1° ⟵ 2° composition))

/** Church encodings: booleans: */
const T = K;                              // true                                      (encoding for true)
const F = KI;                             // false                                     (encoding for false)
const NOT = p => p(F)(T);                 // logical NOT := λp.pFT  =  C               (use: negation)
const AND = p => q => p(q)(p);            // logical AND := λpq.pqp                    (use: conjunction)
const OR = M;                             // logical OR  := λpq.ppq  =  M*             (use: disjunction)
const BEQ = p => q => p(q)(NOT(q));       // boolean equality := λpq.pq(NOT q)         (use: boolean equality)

/** Church encodings: numerals: */
const n0 = f => a => a;                   // Zero   (n0) := λfa.a  =  KI  =  F         (use: apply f no times to a)
const n1 = f => a => f(a);                // Once   (n1) := λfa.fa  =  I*              (use: apply f once to a)
const n2 = f => a => f(f(a));             // Twice  (n2) := λfa.f(fa)                  (use: apply f twice to a)
const n3 = f => a => f(f(f(a)));          // Thrice (n3) := λfa.f(f(f(a))              (use: apply f thrice to a)

/** Church arithmetic: */
const succ = n => f => B(f)(n(f));        // Successor := λnfa.f(nfa)  =  λnfa.B f(nf) (use: successor of n)
const add = n => k => n(succ)(k);         // Addition := λnk.n SUCC k                  (use: addition of n and k)
const mult = B;                           // Multiplication := λnkf.n(kf)  =  B        (use: multiplication of n and k)
const pow = TH;                           // Exponentiation := λnk.kn  = TH            (use: raise n to the power of k)
const pred = n => fst(n(phi)(V(n0)(n0))); // Predecessor := λn.FST (n PHI (V n0 n0))   (use: predecessor of n)
const sub = n => k => k(pred)(n);         // Subtraction := λnk.k PRED n               (use: subtract k from n)
const is0 = n => n(K(F))(T);              // IsZero := λn.n(KF)T                       (use: test if n == 0)
const leq = n => k => is0(sub(n)(k));     // LEQ := λnk.Is0 (SUB n k)                  (use: test if n ≤ k)
const geq = n => k => is0(sub(k)(n));     // GEQ := λnk.Is0 (SUB k n)                  (use: test if n ≥ k)
const eq = n => k => AND(leq(n)(k))(leq(k)(n)); // EQ: EQ (equal) := λnk.AND(LEQ n k)(LEQ k n)   (use: test if n == k)
const gt = B1(NOT)(leq);                  // GT := λnk.NOT (LEQ n k)  =  B1 NOT leq    (use: test if n > k)
const lt = B1(NOT)(geq);                  // LT := B1 NOT GEQ                          (use: test if n < k)

/** Church pairs: */
const pair = V;                           // The Vireo is holding a pair               (use: pair two arguments)
const fst = p => p(K);                    // First := λp.pK'                           (use: extract first of pair)
const snd = p => p(KI);                   // Second := λp.p(KI)                        (use: extract second of pair)
const phi = p => V(snd(p))(succ(snd(p))); // PHI := λp.V (SND p) (SUCC(SND p))         (use: copy 2nd to 1st, inc 2nd)
const set1st = c => p => V(c)(snd(p));    // Set1st := λcp.PAIR c (SND p)              (use: set first, immutably)
const set2nd = c => p => V(fst(p))(c);    // Set2nd := λcp.PAIR (FST p) c              (use: set second, immutably)


/** The y or z combinator (The most famous combinator): */
// The y fixed-point combinator := λf.M(λx.f(Mx))
//   -> Allows recursion
//   -> cannot be demonstrated in JavaScript, because it goes on forever
//   -> This only works in a lazy language like Haskell or the λ-calculus itself!!
//
// In JavaScript, we can use:
// The z fixed-point combinator := λf.M(λx.f(λv.Mxv))
//   -> the 'v' in the expression allows the lazy evaluation!!


// The End!
