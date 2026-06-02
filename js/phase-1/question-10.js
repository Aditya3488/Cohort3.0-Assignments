// ## Ternary Operator

// 1. Check whether a number is even or odd using ternary operator.
// 2. Check whether age is above 18 using ternary operator.
// 3. Find the greater number between two values using ternary operator.

var num = 4;
var result = (num % 2 === 0) ? "Even" : "Odd";
console.log("The number is:", result);
var age = 20;
var eligibility = (age > 18) ? "Eligible to vote" : "Not eligible to vote";
console.log(eligibility);
var a = 10;
var b = 20;
var greater = (a > b) ? a : b;
console.log("Greater number is:", greater);

