// ## Challenge Questions for Beginners

// 1. Generate a random OTP of 4 digits.
// 2. Reverse a 3-letter string manually.
// 3. Find the last character of a string.
// 4. Convert a full name into uppercase initials.
// 5. Check whether two strings are equal ignoring case sensitivity.
// 6. Create a simple login validation system.
// 7. Find whether a number is a 2-digit or 3-digit number.
// 8. Create a mini ATM balance checker.
// 9. Simulate a traffic light system using `switch`.
// 10. Build a small marksheet generator using variables and conditionals.


var otp = Math.floor(1000 + Math.random() * 9000);
console.log("Generated OTP:", otp);
var str = "abc";
var reversed = str[2] + str[1] + str[0];
console.log("Reversed string:", reversed);
var str2 = "Hello";
var lastChar = str2[str2.length - 1];
console.log("Last character:", lastChar);
var fullName = "John Doe";
var initials = fullName.split(' ').map(name => name[0].toUpperCase()).join('');
console.log("Uppercase initials:", initials);
var str3 = "Hello";
var str4 = "hello";
var areEqual = str3.toLowerCase() === str4.toLowerCase();
console.log("Are the strings equal ignoring case?", areEqual);
var username = "admin";
var password = "1234";
var inputUsername = "admin";
var inputPassword = "1234";
if (inputUsername === username && inputPassword === password) {
    console.log("Login successful");
} else {
    console.log("Invalid username or password");
}
var num = 45;
if (num >= 10 && num <= 99) {
    console.log(num + " is a 2-digit number");
} else if (num >= 100 && num <= 999) {
    console.log(num + " is a 3-digit number");
} else {
    console.log(num + " is neither a 2-digit nor a 3-digit number");
}
var balance = 5000;
var checkBalance = 3000;
if (checkBalance <= balance) {
    console.log("Sufficient balance. Your current balance is:", balance);
} else {
    console.log("Insufficient balance. Your current balance is:", balance);
}
var trafficLight = "red";
switch (trafficLight) {
    case "red":
        console.log("Stop");
        break;
    case "yellow":
        console.log("Get ready");
        break;
    case "green":
        console.log("Go");
        break;
    default:
        console.log("Invalid traffic light color");
}
var marks = 85;
if (marks >= 90) {
    console.log("Grade: A");
} else if (marks >= 75) {
    console.log("Grade: B");
} else if (marks >= 50) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

