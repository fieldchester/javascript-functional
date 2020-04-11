// End of monadic calculation
// --------------------------


// fish (monadic .)
// (a->[]b) -> (b->[]c) -> a -> []c
const fish = (f, g) => x => f(x).bind(g)

// bind
// []a -> (a -> []b) -> []b
Array.prototype.bind = function(f) {
    return this.reduce(
      (acc, x) => acc.concat(f(x)), [] )}

// of, return
// a -> []a
const of = a => Array.of(a)

// skip, >>
// []a -> []b -> []b
Array.prototype.skip = function(b) {
  return this.length === 0
    ? []
    : this.reduce(
        (acc) => acc.concat(b), [] )}


// fmap mit vertauschten Argumenten
// []a -> (a -> b) -> []b
// [].map(f)


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
  [undefined,undefined].skip(
                  [0,1].map(y => 
                { const z = x+y
                  const u = String.fromCharCode(65 + z)
                 return u })))
console.log(res)
// 16 Elemente

//    Letzte ignorierende Aktion map
res =         [0,1,2,3].bind(x =>
  [undefined,undefined].skip(
  [undefined,undefined].map(_ => 
                { const z = x+1
                  const u = String.fromCharCode(65 + z)
                 return u })))
console.log(res)
// 16 Elemente
            
