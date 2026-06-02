// # 13. concat()

// ### Intermediate

// Merge two arrays.

// **Hint:** Use `concat()`

// ### Hard

// Merge 3 arrays and remove duplicate values.

// **Hint:** Combine + loop/includes

var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var mergedArr = arr1.concat(arr2);
console.log(mergedArr);

var arr3 = [3, 4, 5];
var mergedArr2 = mergedArr.concat(arr3);
var uniqueArr = [];

for (var i = 0; i < mergedArr2.length; i++) {
    if (uniqueArr.indexOf(mergedArr2[i]) === -1) {
        uniqueArr.push(mergedArr2[i]);
    }
}
console.log("Unique values:", uniqueArr);