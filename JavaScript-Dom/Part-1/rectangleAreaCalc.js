// Rectangle Area Calculator
// Write a function that takes the width and height of a rectangle as two separate inputs. Inside
// the function, multiply the two numbers together to get the area, and return that result. Test
// the function with a few different width and height values to confirm the area comes out
// correct.
// Concepts: functions, parameters, return values

const rectangleAreaCalc = (width, height) => {
    return width * height;
}

let width = 5;
let height = 10;

let area = rectangleAreaCalc(width, height);
console.log(area);