// ## Operators

// 1. Add two numbers and print the result.
// 2. Find the remainder when 25 is divided by 4.
// 3. Find the square of a number using exponent operator.
// 4. Increment a variable using `++`.
// 5. Decrement a variable using `-`.
// 6. Use `+=` operator to increase a variable by 20.
// 7. Compare two numbers using `>`, `<`, `>=`, `<=`.
// 8. Check if two values are strictly equal using `===`.
// 9. Compare `"10"` and `10` using both `==` and `===`.
// 10. Create two boolean variables and test `&&`, `||`, and `!`.

var num1 = 10;
var num2 = 20;
var sum = num1 + num2;
console.log("Sum:", sum);

var remainder = 25 % 4;
console.log("Remainder:", remainder);
var number = 5;
var square = number ** 2;
console.log("Square:", square); 
var count = 0;
count++;
console.log("Count after increment:", count);
var count2 = 5;
count2--;
console.log("Count after decrement:", count2);
var score = 50;
score += 20;
console.log("Score after += 20:", score);
var a = 10;
var b = 20;
console.log("a > b:", a > b);
console.log("a < b:", a < b);
console.log("a >= b:", a >= b);
console.log("a <= b:", a <= b);
var x = 10;
var y = 10;
console.log("x === y:", x === y);
console.log('"10" == 10:', "10" == 10);
console.log('"10" === 10:', "10" === 10);
var bool1 = true;
var bool2 = false;
console.log("bool1 && bool2:", bool1 && bool2);
console.log("bool1 || bool2:", bool1 || bool2);
console.log("!bool1:", !bool1);
console.log("!bool2:", !bool2);
