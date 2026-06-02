// # 18. for...of

// ### Intermediate

// Print all values using `for...of`.

// **Hint:** Direct value iteration

// ### Hard

// Count vowels from array of characters.

// **Hint:** Use conditions inside loop

var arr1 = [1,2,3,4,5,6,7,8,9,10];
for (var value of arr1) {
    console.log(value);
}

var arr2 = ['a', 'e', 'i', 'o', 'u', 'b', 'c'];
var vowelCount = 0; 
for (var char of arr2) {
    if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
        vowelCount++;
    }else{
        console.log(char + " is not a vowel."); 
    }
}
console.log("Total vowels:", vowelCount);