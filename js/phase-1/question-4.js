// ## Type Conversion & Coercion

// 1. Convert the string `"50"` into a number.
// 2. Convert the number `100` into a string.
// 3. Convert `"true"` into a boolean.
// 4. Check the output of:
// - `"5" + 2`
// - `"5" - 2`
// - `true + 1`
// 1. Create a variable with value `"123abc"` and convert it into a number.
// 2. Use `parseInt()` on `"500px"`.

var strNum = "50";
var num = Number(strNum);
console.log(num);
var numVal = 100;
var str = String(numVal);
console.log(str);
var strBool = "true";
var bool = (strBool === "true");
console.log(bool);
console.log("5" + 2);
console.log("5" - 2);
console.log(true + 1);
var mixedStr = "123abc";
var mixedNum = Number(mixedStr);
console.log(mixedNum);
var pxStr = "500px";
var pxNum = parseInt(pxStr);
console.log(pxNum);