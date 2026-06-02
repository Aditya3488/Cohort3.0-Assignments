// # 7. `some()`

// ### Intermediate Question

// Check if any number is negative.

// ```jsx
// let nums = [10, 20, -5, 40];
// ```

// Expected Output:

// ```jsx
// true
// ```

// ### Hint

// - `some()` returns true if at least one condition matches.

// ---

// ### Hard Question

// Check if any product is out of stock.

// ```jsx
// let products = [
//   { name: "Laptop", stock: 5 },
//   { name: "Phone", stock: 0 },
// ];
// ```

// ### Hint

// - Check:

// ```jsx
// stock === 0
// ```

let nums = [10, 20, -5, 40];
let hasNegative = nums.some(function(num) {
    return num < 0;
}); 
console.log(hasNegative);

let products = [
  { name: "Laptop", stock: 5 },
  { name: "Phone", stock: 0 },
];
let hasOutOfStock = products.some(function(product) {
    return product.stock === 0;
});
console.log(hasOutOfStock);