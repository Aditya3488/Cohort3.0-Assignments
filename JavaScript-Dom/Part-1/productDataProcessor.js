// Product Data Processor
// You will work with an array of product objects, where each object has a name, a price, and
// a category. First, use the map() method to make a new array that only contains the product
// names. Second, use the filter() method to make another array that only contains products
// from one specific category. Third, use the reduce() method to add up the prices of every
// product and return the total.
// Concepts: map, filter, reduce

const products = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Book", price: 20, category: "Education" },
    { name: "Phone", price: 500, category: "Electronics" },
    { name: "Desk", price: 300, category: "Furniture" }
];

let productNames = products.map(product => product.name);
let electronicsProducts = products.filter(product => product.category === "Electronics");
let totalPrice = products.reduce((total, product) => total + product.price, 0);

console.log("Product Names:", productNames);
console.log("Electronics Products:", electronicsProducts);
console.log("Total Price:", totalPrice);