// ## Strings

// 1. Create a string and print its length.
// 2. Convert a string into uppercase.
// 3. Convert a string into lowercase.
// 4. Check if a string includes the word `"JavaScript"`.
// 5. Extract the word `"World"` from `"Hello World"`.
// 6. Replace `"apple"` with `"mango"` in a sentence.
// 7. Split `"HTML,CSS,JS"` into an array.
// 8. Remove extra spaces from a string.
// 9. Repeat the word `"Hi"` 5 times.
// 10. Print the first character of a string.
// 11. Use template literals to print:`"My name is Aman and I am 20 years old"`


var str = "Hello World";
console.log("Length:", str.length);
console.log("Uppercase:", str.toUpperCase());
console.log("Lowercase:", str.toLowerCase());
console.log("Includes 'JavaScript':", str.includes("JavaScript"));
console.log("Extracted word:", str.slice(6, 11));
var sentence = "I have an apple.";
var newSentence = sentence.replace("apple", "mango");
console.log(newSentence);
var csv = "HTML,CSS,JS";
var arr = csv.split(",");
console.log(arr);
var spacedStr = "   Hello World   ";
var trimmedStr = spacedStr.trim();
console.log("Trimmed string:", trimmedStr);
console.log("Repeated word:", "Hi".repeat(5));
console.log("First character:", str.charAt(0));
var name = "Aman";
var age = 20;
console.log(`My name is ${name} and I am ${age} years old`);
