// Array Monad
// -----------


// Functor
// <$>, fmap, liftM
// [a] -> (a -> b) -> [b]
// [].map(f)    


// Applicative
// of, return, pure, inject, unit
// a -> [a]
function of(a) { return Array.of(a) }

// Apply (part of Applicative)
// <*>, ap


// >>=, chain, Scala flatMap, 
// 2020_08_20
// flatMap() exists

// bind() exists already in JS, promise with then() differs from a monad
// [b] -> (b->[c]) -> [c]
Array.prototype.chain = function(f) {
    return this.map(f).flatten()
}
// Array.prototype.chain = function (f) {
//     return this.reduce(
//         (acc, x) => acc.concat(f(x)), [])
// }

// 2020_08_20
// flat() exists

// Must use flatten, join() exists already in JS
// [a] -> (a -> [b]) -> [b]
Array.prototype.flatten = function() {
    return this.reduce(
      (acc, x) => acc.concat(x), [] )}


// >>, Scala *> This is a utility function and not part of the monad definition
// [a] -> [b] -> [b]
Array.prototype.skip = function (b) {
    return this.length === 0 ?
        [] :
        this.reduce(
            (acc) => acc.concat(b), [])
}


// >=>
// (a->[b]) -> (b->[c]) -> a -> [c]
function composeK (f, g) {
    return function (x) {
        return f(x).chain(g)
    }
}


console.log([1,2,3,4].map(x => of(x)).flatten())

console.log([1,2,3,4].chain(x => of(x)))

console.log([1,2,3,4].chain(x => of(x*x)))

console.log([1,2,3,4].chain(x => of(n2s(x))))

console.log([ 'b', 'c', 'd', 'e' ].chain(c =>
                        of(s2n(c))).chain(n =>
                        of(isEven(n))))

const composed = composeK(n =>
        n2ns(n), composeK(m =>
        of(n2s(m)), composeK(c =>
        of(isEven(c)), b=>of(b))))

console.log(composed(4))


// Helpers

// String to number
// s2n :: String -> Int
function s2n(s) { return parseInt(s, 36) - 9 }
// number to String
// n2s :: a -> mb
// n2s :: Int -> [Char]
function n2s(n) { return String.fromCharCode(97+n) }
// Number to list of Numbers
// 2 -> [1, 2]
function n2ns (n) { return Array.from({length: n}, (v,i) => i+1 ) }
// isEven :: Int -> Bool
function isEven(x) {return x % 2 === 0}


// Functor
// Transforms objects (sets) and arrows (functions) in the categroy of (sets).
// Sets are transformed with the typeconstructor [a] and [b], parametric polymorphism imposed
// data [a] = Nil | Cons a [a]              the difference to pure: Pure uses it: pure a = [a]
// Functions are transformed with fmap
// fmap _ Nil = Nil
// fmap f Cons h t = Cons (f h) (fmap f t)

// <$>, fmap, liftM
// (a -> b) -> [a] -> [b]    typeconstructor included here
// with switched arguments
// [a] -> (a -> b) -> [b]

// A functor must also preserve identity and composition, the compiler cannot prove this


// >>=, flatmap, bind, chain
// Composition of Kleisli arrows a -> [b]    
           
//      (a->mb) -> (b->mc) -> (a->mc)
//         f          g  

// a, b, c are arbitrary types, m is always the same, here it is []

// We have to produce a function (a->mc)  
// Functions are produced with a lambda, we have one argument a.    

//     f >=> g =  \a -> ..f..g..
//                \a -> let mb = f a;
//                      in mc = mb >>= g
// Above is taken from Bartosz Milewski Category Theory 10.1: Monads

//     mb >>= g producing mc    That looks like a functor

//     mb >>= b->mc     variable substitution: mc -> c'
//     mb >>= b->c'     now this is a functor!
//     fmap b->c' mb     fmap goes under the hood
//     m (b->c' b)      back substitution c' -> mc
//     m (b->mc b)
//     m (mc)    is not mc, so  another try!

//     join fmap g mb
//     join m(mc)     Monoid
//     mc       is mc   OK!

//     mc = mb >>= g
//     mc = join $ fmap g mb
// g is b -> mc, so >>= and join-fmap use it the same way.
// If it's not available, you can build it with return.

//     return
//     If we have b->c instead of b->mc
        
//     (b->c) -> ? -> (b->mc)
//       f   *   ?
//     f * ? = \b -> let c = f b
//                   in mc = ? c
//     ? = c->mc
//     ? = return

//     mc = mb >>= \b -> return $ f b
//     and
//     mc = join $ fmap (\b -> return $ f b) mb
//  f is b -> c, you can use it together with return instead of b -> mc (Your Question).

//https://stackoverflow.com/questions/51376391/bind-can-be-composed-of-fmap-and-join-so-do-we-have-to-use-monadic-functions-a/61450871#61450871
