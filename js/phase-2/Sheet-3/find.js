// # 5. `find()`

// ### Intermediate Question

// Find first number greater than 50.

// ```jsx
// let nums = [20, 35, 60, 80];
// ```

// Expected Output:

// ```jsx
// 60
// ```

// ### Hint

// - `find()` returns first matching element.

// ---

// ### Hard Question

// Find a user with username `"admin"`.

// ```jsx
// let users = [
//   { username: "rahul" },
//   { username: "admin" },
//   { username: "aman" }
// ];
// ```

// ### Hint

// - Compare inside callback:

// ```jsx
// user.username === "admin"
// ```

let nums = [20, 35, 60, 80];
let firstGreaterThan50 = nums.find(function(num) {
    return num > 50;
});
console.log(firstGreaterThan50);
let users = [
  { username: "rahul" },
  { username: "admin" },
    { username: "aman" }
];
let adminUser = users.find(function(user) {
    return user.username === "admin";
});
console.log(adminUser);