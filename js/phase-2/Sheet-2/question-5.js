// # 5. push()

// ### Intermediate

// Add 3 new elements at the end of array.

// **Hint:** Use `push()`

// ### Hard

// Add elements dynamically inside loop from another array.

// **Hint:** Loop + push

var arr1 = [32,56,34,124,];
arr1.push(22);
arr1.push(45);
arr1.push(67);  
console.log(arr1);

var arr2 = [1, 2, 3, 4, 5];
var arr3 = [];
for (var i = 0; i < arr2.length; i++) {
    arr3.push(arr2[i]);
}
console.log(arr3);