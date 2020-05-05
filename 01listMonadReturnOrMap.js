function Id (x) { return x }
Array.prototype.flatten = function() { return this.reduce( (acc, x) => acc.concat(x), [] ) }
function of(a) { return Array.of(a) }
Array.prototype.chain = function(f) { return this.map(f).flatten() }
// Array.prototype.chain = function (f) { return this.reduce( (acc, x) => acc.concat(f(x)), []) }
Array.prototype.skip = function (b) { return this.length === 0 ? [] : this.reduce( (acc) => acc.concat(b), []) }
function composeK (f, g) { return function (x) { return f(x).chain(g) } }



// End of Bind Chain
// -----------------
let res

// Letzte Aktion mit chain und of (return)
res = [0, 1, 2, 3].chain(x => [0, 1].chain(y =>
    of (String.fromCharCode(65 + x + y))))
console.log(res)
// 8 Elemente

// Letzte Aktion map
res = [0, 1, 2, 3].chain(x => [0, 1].map(y => {
    const z = x + y
    const u = String.fromCharCode(65 + z)
    return u
}))
console.log(res)
// 8 Elemente


// Ignorrierend
//    Letzte Aktion map
res = [0, 1, 2, 3].chain(x => [undefined, undefined].skip(
    [0, 1].map(y => {
        const z = x + y
        const u = String.fromCharCode(65 + z)
        return u
    })))
console.log(res)
// 16 Elemente

//    Letzte ignorierende Aktion map
res = [0, 1, 2, 3].chain(x => [undefined, undefined].skip(
    [undefined, undefined].map(_ => {
        const z = x + 1
        const u = String.fromCharCode(65 + z)
        return u
    })))
console.log(res)
// 16 Elemente

// map führt die monadische Berechnung durch, kann aber keine weitere anhängen
