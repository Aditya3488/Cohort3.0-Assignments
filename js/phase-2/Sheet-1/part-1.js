// ## Beginner Level

// 1. Create a function named `greet` that prints `"Hello World"`.

function greet() {
    console.log("Hello World");
}
greet();
// 2. Create a function `add(a, b)` that returns the sum.
function add(a, b) {
    return a + b;
}
console.log(add(5, 3));
// 3. Write a function to calculate the square of a number.
function square(n) {
    return n * n;
}
console.log(square(5));
// 4. Create a function that checks whether a number is even or odd.
function isEven(n) {
    return n % 2 === 0;
}
console.log(isEven(5));
// 5. Write a function that converts Celsius to Fahrenheit.
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}
console.log(celsiusToFahrenheit(0));
// 6. Create a function with default parameter `"Guest"`.
function welcome(name = "Guest") {
    console.log("Welcome, " + name + "!");
}
welcome();
welcome("Alice");
// 7. Write a function that returns the greater of two numbers.
function greater(a, b) {
    return a > b ? a : b;
}
console.log(greater(5, 3)); 
// 8. Create a function to calculate area of rectangle.
function areaOfRectangle(length, width) {
    return length * width;
}
console.log(areaOfRectangle(5, 3));
// 9. Write a function that returns `"Adult"` if age ≥ 18 else `"Minor"`.
function checkAge(age) {
    return age >= 18 ? "Adult" : "Minor";
}
console.log(checkAge(20));
// 10. Create a function to reverse a string.
function reverseString(str) {
    return str.split('').reverse().join('');
}
console.log(reverseString("hello"));


// ## Intermediate Level

// 1. Write a function expression for multiplication.
var multiply = function(a, b) {
    return a * b;
}
console.log(multiply(5, 3));
// 2. Convert a normal function into an arrow function.
var multiplyArrow = (a, b) => a * b;
console.log(multiplyArrow(5, 3));
// 3. Create a function that accepts unlimited numbers and returns their sum using rest operator.
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4, 5));
// 4. Write a function that counts vowels in a string.
function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    return count;
}
console.log(countVowels("hello"));
// 5. Create a function that checks if a string is palindrome.
function isPalindrome(str) {
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}
console.log(isPalindrome("racecar"));
// 6. Write a callback function example using `setTimeout`.
function callbackExample() {
    console.log("This is a callback function executed after 2 seconds.");
}   
setTimeout(callbackExample, 2000);
// 7. Create a higher-order function that executes another function twice.
function executeTwice(func) {
    func();
    func();
}
executeTwice(() => console.log("Hello! This function is executed twice."));
// 8. Write a function that returns another function.
function outerFunction() {
    return function innerFunction() {
        console.log("This is the inner function.");
    }   
}
const inner = outerFunction();
inner();

// 9. Create a pure function for subtraction.
function pureSubtract(a, b) {
    return a - b;
}
console.log(pureSubtract(10, 5));
// 10. Create an impure function using global variable modification.
var count = 0;
function impureIncrement() {
    count++;
    return count;
}
console.log(impureIncrement());
console.log(impureIncrement());