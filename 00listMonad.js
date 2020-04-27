// Array Monad
// -----------

// Functor
// Id
function Id (x) { return x }
// map is <$>, fmap, liftM with switched arguments
// [a] -> (a -> b) -> [b]
// [].map(f)


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
        
//     mb >>= (b->c) -> (b->mc)
//              f
//     mb >>= \b -> let c = f b ;
//                  mc = return c
//                  in  mc
//     return :: c -> mc

//     mc = mb >>= \b -> return $ f b
//     and
//     mc = join $ fmap (\b -> return $ f b) mb
//  f is b -> c, you can use it together with return instead of b -> mc (Your Question).

//https://stackoverflow.com/questions/51376391/bind-can-be-composed-of-fmap-and-join-so-do-we-have-to-use-monadic-functions-a/61450871#61450871


// flatten, join() exists already in JS
// [a] -> (a -> [b]) -> [b]
Array.prototype.flatten = function() {
    return this.reduce(
      (acc, x) => acc.concat(x), [] )}

// of, return, pure, inject, unit
// a -> [a]
function of(a) { return Array.of(a) }

// >>=, then, bind() exists already in JS
// mb -> (b->mc) -> mc
Array.prototype.then = function(f) {
    return this.map(f).flatten()
}

// >=>
// (a->[b]) -> (b->[c]) -> a -> [c]
function composeK (f, g) {
    return function (x) {
        return f(x).then(g)
    }
}


console.log([1,2,3,4].map(x => of(x)).flatten())

console.log([1,2,3,4].then(x => of(x)))

console.log([1,2,3,4].then(x => of(x*x)))

console.log([1,2,3,4].then(x => of(n2s(x))))

console.log([ 'b', 'c', 'd', 'e' ].then(x =>
                        of(s2n(x))).then(y =>
                        of(isEven(y))))

const composed = composeK(x =>
        n2ns(x), composeK(y =>
        of(s2n(y)), composeK(z =>
        of(isEven(z)), u=>of(u))))

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
