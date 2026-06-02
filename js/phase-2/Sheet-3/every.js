// # 8. `every()`

// ### Intermediate Question

// Check if all numbers are positive.

// ```jsx
// let nums = [10, 20, 30, 40];
// ```

// Expected Output:

// ```jsx
// true
// ```

// ### Hint

// - `every()` checks all elements.

// ---

// ### Hard Question

// Check if all students passed.

// ```jsx
// let students = [
//   { name: "A", marks: 80 },
//   { name: "B", marks: 45 },
//   { name: "C", marks: 60 },
// ];
// ```

// Passing marks:

// ```jsx
// 40
// ```

// ### Hint

// - Return condition:

// ```jsx
// marks >= 40
// ```

let nums = [10, 20, 30, 40];
let allPositive = nums.every(function(num) {
    return num > 0;
});
console.log(allPositive);

let students = [
  { name: "A", marks: 80 },
  { name: "B", marks: 45 },
  { name: "C", marks: 60 },
];
let allPassed = students.every(function(student) {
    return student.marks >= 40;
});
console.log(allPassed);