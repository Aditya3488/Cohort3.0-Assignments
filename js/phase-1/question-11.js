// ## Mixed Practice Questions

// 1. Create a mini biodata program using variables and template literals.
// 2. Calculate the area of a rectangle.
// 3. Calculate the simple interest.
// 4. Convert temperature from Celsius to Fahrenheit.
// 5. Convert kilometers into meters.
// 6. Calculate total marks and percentage of 5 subjects.
// 7. Calculate electricity bill based on units consumed.
// 8. Create a username generator using first name and birth year.
// 9. Check whether a string starts with a specific letter.
// 10. Count the total characters in a sentence excluding spaces.

var name = "Aman";
var age = 20;
var city = "New York";
console.log(`My name is ${name}, I am ${age} years old, and I live in ${city}.`);
var length = 5;
var width = 3;
var area = length * width;
console.log("The area of the rectangle is:", area); 
var principal = 1000;
var rate = 5;
var time = 2;
var simpleInterest = (principal * rate * time) / 100;
console.log("Simple Interest:", simpleInterest);
var celsius = 25;
var fahrenheit = (celsius * 9/5) + 32;
console.log("Temperature in Fahrenheit:", fahrenheit);
var kilometers = 5;
var meters = kilometers * 1000;
console.log("Distance in meters:", meters);
var marks = [85, 90, 78, 92, 88];
var totalMarks = marks.reduce((total, mark) => total + mark, 0);
var percentage = (totalMarks / (marks.length * 100)) * 100;
console.log("Total Marks:", totalMarks);
console.log("Percentage:", percentage + "%");
var units = 150;
var electricityBill = units * 10; // Assuming rate per unit is 10
console.log("Electricity Bill:", electricityBill);  
var firstName = "Aman";
var birthYear = 2000;
var username = firstName.toLowerCase() + birthYear;
console.log("Generated username:", username);
var str = "Hello World";
console.log("Starts with 'H':", str.startsWith("H"));
var sentence = "Hello World";
var charCount = sentence.replace(/\s/g, '').length;
console.log("Total characters excluding spaces:", charCount);

