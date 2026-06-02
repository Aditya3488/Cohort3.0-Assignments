// # 4. `reduce()`

// ### Intermediate Question

// Find total sum of array.

// ```jsx
// let nums = [10,20,30,40];
// ```

// Expected Output:

// ```jsx
// 100
// ```

// ### Hint

// - `reduce()` needs:
//     - accumulator
//     - current value

// ---

// ### Hard Question

// Count frequency of elements.

// ```jsx
// let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
// ```

// Expected Output:

// ```jsx
// {
//   apple: 3,
//   banana: 2,
//   orange: 1
// }
// ```

// ### Hint

// - Create an empty object `{}` as initial value.
// - Increase count if already exists.


let nums = [10,20,30,40];
let sum = nums.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);  
console.log(sum);

let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
let frequency = fruits.reduce(function(accumulator, currentValue) {
    if (accumulator[currentValue]) {
        accumulator[currentValue]++;
    } else {
        accumulator[currentValue] = 1;
    }
    return accumulator;
}, {});
console.log(frequency);

