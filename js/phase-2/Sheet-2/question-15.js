// # 15. indexOf()

// ### Intermediate

// Find index of `"Rahul"` in array.

// **Hint:** Use `indexOf()`

// ### Hard

// Find all positions of repeated number `5`.

// **Hint:** Loop through entire array

var arr1 = ["Aditya", "Dev", "Shivam", "Rahul"];
console.log(arr1.indexOf("Rahul"));

var arr2 = [1, 5, 3, 5, 7, 5, 9];
var positions = [];
for (var i = 0; i < arr2.length; i++) {
    if (arr2[i] === 5) {
        positions.push(i);
    }
}
console.log("Positions of number 5:", positions);