// ## Truthy & Falsy

// 1. Check whether an empty string is truthy or falsy.
// 2. Check whether `0` is truthy or falsy.
// 3. Check whether `[]` is truthy or falsy.
// 4. Create a variable and print `"Valid"` if it has a value otherwise print `"Invalid"`.

var str = "";
if (str) {
    console.log("Truthy");
} else {
    console.log("Falsy");
}
var num = 0;
if (num) {
    console.log("Truthy");
} else {
    console.log("Falsy");
}
var arr = [];
if (arr) {
    console.log("Truthy");
} else {
    console.log("Falsy");
}
var value = "Hello";
if (value) {
    console.log("Valid");
} else {
    console.log("Invalid");
}
var value2 = "";
if (value2) {
    console.log("Valid");
} else {
    console.log("Invalid");
}

