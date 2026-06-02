// ## Numbers & Math

// 1. Round `4.7` using `Math.round()`.
// 2. Find the square root of 81.
// 3. Find the maximum number from `10, 20, 5, 99`.
// 4. Generate a random number between 1 and 10.
// 5. Convert `"99.99"` into an integer.
// 6. Check whether `25` is an integer or not.
// 7. Use `toFixed(2)` on `3.141592`.

var rounded = Math.round(4.7);
console.log("Rounded:", rounded);
var sqrt = Math.sqrt(81);
console.log("Square root of 81:", sqrt);
var max = Math.max(10, 20, 5, 99);
console.log("Maximum number:", max);
var random = Math.floor(Math.random() * 10) + 1;
console.log("Random number between 1 and 10:", random);
var int = parseInt("99.99");
console.log("Integer value of '99.99':", int);
var isInt = Number.isInteger(25);
console.log("Is 25 an integer?", isInt);
var fixed = 3.141592.toFixed(2);
console.log("Fixed to 2 decimal places:", fixed);
