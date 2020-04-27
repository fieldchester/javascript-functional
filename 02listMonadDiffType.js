Array.prototype.flatten = function() { return this.reduce((acc, x) => acc.concat(x), [] )}
function of(a) { return Array.of(a) }
Array.prototype.then = function(f) { return this.map(f).flatten() }
function composeK (f, g) { return function (x) { return f(x).then(g)  }  }

// Array Monad
// -----------

// Initially I misstook types
// (a->[b]) -> (c->[d]) -> a -> [d]
// instead of
// (a->[b]) -> (b->[c]) -> a -> [c]

// and was surprised to have to do type conversion
const composed = composeK(a => c2cs(a)
                , composeK(b => n2ns(   s2n(b)  )   // s2n the type conversion
                , x => of(x) ))   

console.log(composed("c"))

// with bind
// []a -> (b -> []c) -> []c
const ns = c2cs("c").then( a =>
            n2ns(   s2n(a)  ).then(y =>   // s2n the type conversion
            of(y)))
console.log(ns)

// Finally realised, that (_->[b]) -> (c->_) is not possible with
// polymrophic composeK / then. It would only be possible with e.g.:
// comoposeKChar2Int.
// The "typ conversion" is even reqired in the x->[y] Kleisli arrows.


// Helper

// Character to list of Characters
// 'b' -> ['a', 'b']
// String -> [String]
function c2cs(c) { return Array.from({length: s2n(c)}, (v,i) => n2s(i)) }

// Number to list of Numbers
// 2 -> [1, 2]
// Int -> [Int]
function n2ns(n) { return Array.from({length: n}, (v,i) => i+1 ) }

// "a" -> 1, "b" -> 2...
// String -> Int
function s2n(s) { return parseInt(s, 36) - 9 }

// 1 -> "a", 2 -> "b", ...
// Int -> String
function n2s(n) { return String.fromCharCode(97+n) }
