// Array Monad
// -----------


// []a -> (a -> b) -> []b   fmap whit switched args
// [].map(f)

// Id a -> []a  Natural Transformation
// a -> []a of, return, pure
const of = a => Array.of(a)

// (a->[]b) -> (b->[]c) -> a -> []c     >=>, Compse
const fish = (f, g) => x => f(x).bind(g)

// []a -> (a -> []b) -> []b     >>=   
Array.prototype.bind = function (f) {
    return this.reduce(
        (acc, x) => acc.concat(f(x)), [])
}

// []a -> []b -> []b        >>
Array.prototype.then = function (b) {
    return this.length === 0 ?
        [] :
        this.reduce(
            (acc) => acc.concat(b), [])
}




// Examples
// I use VSCode und Quokka (shows console.log's dirctly in Editor

// Character to list of Characters
// 'b' -> ['a', 'b']
const c2cs = c => Array.from({length: s2n(c)}, (v,i) => n2s(i))

// Number to list of Numbers
// 2 -> [1, 2]
const n2ns = n => Array.from({length: n}, (v,i) => i+1 )



// with fish
// (a->[]b) -> (c->[]d) -> a -> []d
const c2ns = fish(x => c2cs(x),
             fish(y => n2ns(s2n(y)),
             of))
console.log(c2ns("c"))

// with bind
// []a -> (b -> []c) -> []c
const ns = c2cs("c").bind( y =>
           n2ns(s2n(y)).bind(
           of))
console.log(ns)



// "a" -> 1, "b" -> 2...
function s2n(s) { return parseInt(s, 36) - 9 }
// 1 -> "a", 2 -> "b", ...
function n2s(n) { return String.fromCharCode(97+n) }
