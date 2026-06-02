// # 2. `map()`

// ### Intermediate Question

// Convert all names into uppercase.

// ```jsx
// let names = ["anubhav", "rahul", "aman"];
// ```

// Expected Output:

// ```jsx
// ["ANUBHAV", "RAHUL", "AMAN"]
// ```

// ### Hint

// - `map()` creates a new array.
// - Use `.toUpperCase()`.

// ---

// ### Hard Question

// You are given products.

// ```jsx
// let products = [
//   { name: "Laptop", price: 50000 },
//   { name: "Phone", price: 20000 },
// ];
// ```

// Create a new array where:

// - Every product has a new property `discountPrice`
// - Discount is 10%

// Expected:

// ```jsx
// [
//   { name: "Laptop", price: 50000, discountPrice: 45000 }
// ]
// ```

// ### Hint

// - Return a new object from `map()`
// - Formula:

// ```jsx
// price - (price * 10 / 100)
// ```

let products = [
  { name: "Laptop", price: 50000 },
  { name: "Phone", price: 20000 },
];
let discountedProducts = products.map(function(product) {
  return {
    name: product.name,
    price: product.price,
    discountPrice: product.price - (product.price * 10 / 100)
  };
});
console.log(discountedProducts);

let names = ["anubhav", "rahul", "aman"];
let upperCaseNames = names.map(function(name) {
    return name.toUpperCase();
});

console.log(upperCaseNames);

