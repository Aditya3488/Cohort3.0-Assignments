// # 3. Multi-Dimensional Arrays

// ### Intermediate

// Create a 2D array and print all first elements of inner arrays.

// **Hint:** Double indexing

// ### Hard

// Find the sum of all diagonal elements in a 3x3 matrix.

// **Hint:** Same row and column index

var arr1 = [[1, 2, 3], [4, 5, 6]];
console.log(arr1[0][0]);
console.log(arr1[0][1]);
console.log(arr1[0][2]);

var arr2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
var sum = 0;
for (var i = 0; i < 3; i++) {
    sum += arr2[i][i];
}
console.log(sum);