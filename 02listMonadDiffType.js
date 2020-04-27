Array.prototype.flatten = function() { return this.reduce((acc, x) => acc.concat(x), [] )}
function of(a) { return Array.of(a) }
Array.prototype.then = function(f) { return this.map(f).flatten() }
function composeK (f, g) { return function (x) { return f(x).then(g)  }  }

// Array Monad
// -----------

// Misstook types:
// (a->[]b) -> (c->[]d) -> a -> []d
// instead of
// (a->[b]) -> (b->[c]) -> a -> [c]
// but it works



// I use VSCode und Quokka (shows console.logs directly in Editor)

const composed = composeK(a =>
    c2cs(a), composeK(b =>
    n2ns(   s2n(b)  ), x => of(x) ))    // s2n the type conversion

console.log(composed("c"))

// with bind
// []a -> (b -> []c) -> []c
const ns = c2cs("c").then( a =>
            n2ns(   s2n(a)  ).then(y =>   // s2n the type conversion
            of(y)))
console.log(ns)



// Helper

// Character to list of Characters
// 'b' -> ['a', 'b']
function c2cs(c) { return Array.from({length: s2n(c)}, (v,i) => n2s(i)) }

// Number to list of Numbers
// 2 -> [1, 2]
function n2ns(n) { return Array.from({length: n}, (v,i) => i+1 ) }

// "a" -> 1, "b" -> 2...
function s2n(s) { return parseInt(s, 36) - 9 }

// 1 -> "a", 2 -> "b", ...
function n2s(n) { return String.fromCharCode(97+n) }
