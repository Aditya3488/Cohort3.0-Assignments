// ## Conditionals

// 1. Check whether a number is positive or negative.
// 2. Check whether a number is even or odd.
// 3. Check whether a person is eligible to vote.
// 4. Find the largest among two numbers.
// 5. Find the largest among three numbers.
// 6. Check whether a year is a leap year.
// 7. Check whether a number is divisible by both 3 and 5.
// 8. Create a simple grading system:
// - 90+ → A
// - 75+ → B
// - 50+ → C
// - below 50 → Fail
// 1. Check whether a character is a vowel or consonant.
// 2. Create a calculator using `switch` statement.
// 3. Print the day name based on a number (1–7).
// 4. Check whether a username is `"admin"` and password is `"1234"`.

var num = -5;
if (num > 0) {
    console.log("Positive");
} else if (num < 0) {
    console.log("Negative");
}
var num2 = 4;
if (num2 % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}
var age = 18;
if (age >= 18) {
    console.log("Eligible to vote");
} else {
    console.log("Not eligible to vote");
}
var a = 10;
var b = 20;
if (a > b) {
    console.log("Largest:", a);
} else {
    console.log("Largest:", b);
}
var x = 5;
var y = 10;
var z = 3;  
if (x > y && x > z) {
    console.log("Largest:", x);
}
else if (y > x && y > z) {
    console.log("Largest:", y);
}   
else {
    console.log("Largest:", z);
}
var year = 2020;
if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
    console.log(year + " is a leap year");  
} else {
    console.log(year + " is not a leap year");
}
var num3 = 15;
if (num3 % 3 === 0 && num3 % 5 === 0) {
    console.log(num3 + " is divisible by both 3 and 5");
} else {
    console.log(num3 + " is not divisible by both 3 and 5");
}
var score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 75) {
    console.log("Grade: B");
} else if (score >= 50) {
    console.log("Grade: C");
} else {
    console.log("Grade: Fail");
}
var char = 'a';
if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
    console.log(char + " is a vowel");  
} else {
    console.log(char + " is a consonant");
}
var operator = '+';
var num1 = 10;
var num2 = 5;
switch (operator) {
    case '+':
        console.log("Result:", num1 + num2);
        break;
    case '-':
        console.log("Result:", num1 - num2);
        break;
    case '*':
        console.log("Result:", num1 * num2);
        break;
    case '/':
        console.log("Result:", num1 / num2);
        break;
    default:
        console.log("Invalid operator");
}
var dayNum = 3;
switch (dayNum) {
    case 1: 
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    default:
        console.log("Invalid day number");
}
var username = "admin";
var password = "1234";  
if (username === "admin" && password === "1234") {
    console.log("Login successful");
}
else {
    console.log("Invalid username or password");
}