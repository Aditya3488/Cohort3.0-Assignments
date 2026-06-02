// # 6. `findIndex()`

// ### Intermediate Question

// Find index of number `90`.

// ```jsx
// let nums = [10, 40, 90, 50];
// ```

// ### Hint

// - `findIndex()` returns index number.

// ---

// ### Hard Question

// Find index of first failed student.

// ```jsx
// let students = [
//   { name: "A", marks: 90 },
//   { name: "B", marks: 30 },
//   { name: "C", marks: 70 },
// ];
// ```

// Condition:

// - Failed if marks < 40

// ### Hint

// - Use condition directly inside callback.

let nums = [10, 40, 90, 50];
let indexOf90 = nums.findIndex(function(num) {
    return num === 90;
});
console.log(indexOf90);
let students = [
  { name: "A", marks: 90 },
    { name: "B", marks: 30 },
    { name: "C", marks: 70 },
];
let indexOfFailedStudent = students.findIndex(function(student) {
    return student.marks < 40;
});
console.log(indexOfFailedStudent);
