// # 20. Spread Operator

// ### Intermediate

// Copy array into new array.

// **Hint:** Use `...`

// ### Hard

// Merge arrays and add extra values in between.

// **Hint:** Combine spread carefully

var arr1 = [1, 2, 3];
var arr2 = [...arr1];
console.log(arr2);

var arr3 = [4, 5, 6];
var mergedArr = [...arr1, 'a', 'b', 'c', ...arr3];
console.log(mergedArr);