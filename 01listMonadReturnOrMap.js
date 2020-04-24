// End of monadic calculation
// --------------------------



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


let res

// Letzte Aktion mit bind und of (return)
res =  [0,1,2,3].bind(x =>
           [0,1].bind(y => 
                 of(String.fromCharCode(65 + x + y)) ))
console.log(res)
// 8 Elemente

// Letzte Aktion map
res =  [0,1,2,3].bind(x =>
           [0,1].map(y => 
         { const z = x+y
           const u = String.fromCharCode(65 + z)
          return u }))
console.log(res)
// 8 Elemente


// Ignorrierend
//    Letzte Aktion map
res =         [0,1,2,3].bind(x =>
  [undefined,undefined].then(
                  [0,1].map(y => 
                { const z = x+y
                  const u = String.fromCharCode(65 + z)
                 return u })))
console.log(res)
// 16 Elemente

//    Letzte ignorierende Aktion map
res =         [0,1,2,3].bind(x =>
  [undefined,undefined].then(
  [undefined,undefined].map(_ => 
                { const z = x+1
                  const u = String.fromCharCode(65 + z)
                 return u })))
console.log(res)
// 16 Elemente
            
