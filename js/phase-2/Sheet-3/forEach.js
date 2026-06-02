// ## 1. `forEach()`

// ### Intermediate Question

// You are given an array of prices.

// Print each price with `"₹"` before it.

// ```jsx
// let prices = [100, 250, 399, 499];
// ```


// ### Hint

// - `forEach()` runs once for every element.
// - You don't return anything here.
// - Use `console.log()` inside it.

// ---

// ### Hard Question

// You are given an array of students.

// ```jsx
// let students = [
//   { name: "Anubhav", marks: 85 },
//   { name: "Rahul", marks: 42 },
//   { name: "Aman", marks: 90 },
// ];
// ```

// Print:

// - `"Pass"` if marks are greater than 50
// - `"Fail"` otherwise

// Output format:

// ```jsx
// Anubhav - Pass
// Rahul - Fail
// ```

// ### Hint

// - Loop through objects using `forEach()`
// - Use condition checking inside loop.


let prices = [100, 250, 399, 499];
prices.forEach(function(price) {
    console.log("₹" + price);
});

let students = [
  { name: "Anubhav", marks: 85 },
  { name: "Rahul", marks: 42 },
  { name: "Aman", marks: 90 },
];
students.forEach(function(student) {
    if (student.marks > 50) {
        console.log(student.name + " - Pass");
    } else {
        console.log(student.name + " - Fail");
    }
});
