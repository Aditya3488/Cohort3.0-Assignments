// # 19. Reference Behaviour of Array

// ### Intermediate

// Assign one array to another variable and modify second one.

// **Hint:** Observe original array

// ### Hard

// Create true copy so original array does not change.

// **Hint:** Use spread operator

var arr1 = [32,56,34,124,65,32,65,78,587,23];
var arr2 = arr1;
arr2[0] = 999;
console.log(arr1); // [999, 56, 34, 124, 65, 32, 65, 78, 587, 23]
console.log(arr2); // [999, 56, 34, 124, 65, 32, 65, 78, 587, 23]

// True copy
var arr3 = [...arr1];
arr3[0] = 888;
console.log(arr1); // [999, 56, 34, 124, 65, 32, 65, 78, 587, 23]
console.log(arr3); // [888, 56, 34, 124, 65, 32, 65, 78, 587, 23]



