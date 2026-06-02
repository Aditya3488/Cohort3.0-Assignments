// # 9. splice()

// ### Intermediate

// Remove 2 elements from middle of array.

// **Hint:** `splice(start, deleteCount)`

// ### Hard

// Replace 3 middle elements with 5 new values.

// **Hint:** Use insertion with splice

var arr1 = [32,56,34,124,65,32,65,78,587,23];
arr1.splice(4, 2);
console.log(arr1);

// Replace 3 middle elements with 5 new values
arr1.splice(4, 3, 100, 200, 300, 400, 500);
console.log(arr1);