// # 12. slice()

// ### Intermediate

// Extract first 4 elements into new array.

// **Hint:** Use `slice()`

// ### Hard

// Create a copy excluding first and last element.

// **Hint:** Use start and end indexes

var arr1 = [32,56,34,124,65,32,65,78,587,23];
var newArr = arr1.slice(0, 4);
console.log(newArr);

// Create a copy excluding first and last element
var newArr2 = arr1.slice(1, arr1.length - 1);
console.log(newArr2);