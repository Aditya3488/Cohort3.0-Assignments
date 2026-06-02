// # 8. shift()

// ### Intermediate

// Remove first element from array.

// **Hint:** Use `shift()`

// ### Hard

// Remove first element repeatedly until only 2 elements remain.

// **Hint:** Loop + length check

var arr1 = [32,56,34,124,65,32,65,78,587,23];
var removedElement = arr1.shift();
console.log(removedElement);

while (arr1.length > 2) {
    removedElement = arr1.shift();
    console.log(removedElement);
}

console.log(arr1);