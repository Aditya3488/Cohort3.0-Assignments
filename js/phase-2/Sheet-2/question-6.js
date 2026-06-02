// # 6. pop()

// ### Intermediate

// Remove last element and print removed value.

// **Hint:** Store `pop()` result

// ### Hard

// Keep removing elements until array becomes empty.

// **Hint:** Use `while` loop

var arr1 = [32,56,34,124,65,32,65,78,587,23];
var removedElement = arr1.pop();
console.log(removedElement);

while (arr1.length > 0) {
    removedElement = arr1.pop();
    console.log(removedElement);
}

console.log(arr1);