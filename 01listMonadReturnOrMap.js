// Ende der Bind - Kette
// ---------------------


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
            
