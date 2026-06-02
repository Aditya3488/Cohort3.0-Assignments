// ## Logical Thinking Questions

// 1. Take two numbers and print which one is greater.
// 2. Check whether a number lies between 10 and 50.
// 3. Check whether a password length is greater than 8.
// 4. Check if a person can drive:
// - age > 18
// - has license = true
// 1. Check whether a number is divisible by 2, 3, or both.
// 2. Print `"Good Morning"`, `"Good Afternoon"`, or `"Good Evening"` based on time.
// 3. Find whether a number is a multiple of 10.
// 4. Create a simple discount calculator.
// 5. Check whether a product is in stock.
// 6. Calculate final bill after GST.


var num1 = 10;
var num2 = 20;
if (num1 > num2) {
    console.log("Greater number is:", num1);
} else {
    console.log("Greater number is:", num2);
}
var num = 25;
if (num > 10 && num < 50) {
    console.log(num + " lies between 10 and 50");   
} else {
    console.log(num + " does not lie between 10 and 50");
}
var password = "mysecretpassword";
if (password.length > 8) {
    console.log("Password is strong");
} else {
    console.log("Password is weak");
}
var age = 20;
var hasLicense = true;
if (age > 18 && hasLicense) {
    console.log("Person can drive");
} else {
    console.log("Person cannot drive");
}
var num2 = 15;
if (num2 % 2 === 0 && num2 % 3 === 0) {
    console.log(num2 + " is divisible by both 2 and 3");
} else if (num2 % 2 === 0) {
    console.log(num2 + " is divisible by 2");
} else if (num2 % 3 === 0) {
    console.log(num2 + " is divisible by 3");
} else {
    console.log(num2 + " is not divisible by 2 or 3");
}
var time = 14;
if (time < 12) {
    console.log("Good Morning");
} else if (time < 18) {
    console.log("Good Afternoon");
} else {
    console.log("Good Evening");
}
var num3 = 30;
if (num3 % 10 === 0) {
    console.log(num3 + " is a multiple of 10");
} else {
    console.log(num3 + " is not a multiple of 10");
}
var price = 100;
var discount = 10; 
var finalPrice = price - (price * discount / 100);
console.log("Final price after discount:", finalPrice);
var productInStock = true;
if (productInStock) {
    console.log("Product is in stock");
} else {
    console.log("Product is out of stock");
}
var billAmount = 1000;
var gstRate = 18; 
var finalBill = billAmount + (billAmount * gstRate / 100);
console.log("Final bill after GST:", finalBill);


