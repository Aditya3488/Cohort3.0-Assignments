// # 14. includes()

// ### Intermediate

// Check whether `"apple"` exists in array.

// **Hint:** Use boolean result

// ### Hard

// Check if all elements of one array exist inside another.

// **Hint:** Loop + includes


var arr1 = ["banana", "orange", "apple", "grape"];
var hasApple = arr1.includes("apple");
console.log(hasApple);

var arr2 = ["banana", "grape"];
var allExist = true;

for (var i = 0; i < arr2.length; i++) {
    if (!arr1.includes(arr2[i])) {
        allExist = false;
        break;
    }
}
console.log("All elements of arr2 exist in arr1:", allExist);