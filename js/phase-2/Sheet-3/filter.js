// # 3. `filter()`

// ### Intermediate Question

// Filter all even numbers.

// ```jsx
// let nums = [1,2,3,4,5,6,7,8];
// ```

// Expected Output:

// ```jsx
// [2,4,6,8]
// ```

// ### Hint

// - `filter()` keeps elements when condition is `true`.

// ---

// ### Hard Question

// You are given users.

// ```jsx
// let users = [
//   { name: "Anubhav", active: true },
//   { name: "Rahul", active: false },
//   { name: "Aman", active: true },
// ];
// ```

// Return only active users.

// ### Hint

// - Check `active === true`
// - Return condition directly.

let nums = [1,2,3,4,5,6,7,8];
let evenNums = nums.filter(function(num) {
    return num % 2 === 0;
});
console.log(evenNums);

let users = [
  { name: "Anubhav", active: true },
  { name: "Rahul", active: false },
    { name: "Aman", active: true },
];
let activeUsers = users.filter(function(user) {
    return user.active === true;
});
console.log(activeUsers);
