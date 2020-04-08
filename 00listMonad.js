// Monad für ein Array
// -------------------


// fmap mit vertauschten Argumenten
// []a -> (a -> b) -> []b
// [].map(f)


// of, return
// a -> []a
const of = a => Array.of(a)


// bind
// []a -> (a -> []b) -> []b
Array.prototype.bind = function(f) {
  return this.reduce(
    (acc, x) => acc.concat(f(x)), [] )}


// >>
// []a -> []b -> []b
Array.prototype.skip = function(b) {
  return this.length === 0
    ? []
    : this.reduce(
        (acc) => acc.concat(b), [] )}
