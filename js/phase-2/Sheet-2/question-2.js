// # 2. Indexing in Array

// ### Intermediate

// Print the first and last element of an array.

// **Hint:** Use `0` and `length - 1`

// ### Hard

// Swap the second and second-last element using indexing.

// **Hint:** Use temporary variable

var arr1 = [32,56,34,124,65,32,65,78,587,23];
console.log(arr1[0]);
console.log(arr1[arr1.length - 1]);

var temp = arr1[0];
arr1[0] = arr1[arr1.length - 1];
arr1[arr1.length - 1] = temp;
console.log(arr1);