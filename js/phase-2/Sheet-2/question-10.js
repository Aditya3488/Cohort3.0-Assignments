// # 10. reverse()

// ### Intermediate

// Reverse an array using method.

// **Hint:** Use `reverse()`

// ### Hard

// Reverse only first half of array.

// **Hint:** Manual swapping

var arr1 = [32,56,34,124,65,32,65,78,587,23];

arr1.reverse();
console.log("Full reverse:", arr1);

// Reverse only first half
var mid = Math.floor(arr1.length / 2);

for (var i = 0; i < mid / 2; i++) {
    var temp = arr1[i];
    arr1[i] = arr1[mid - 1 - i];
    arr1[mid - 1 - i] = temp;
}

console.log("First half reverse:", arr1);
