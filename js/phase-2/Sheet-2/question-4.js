// # 4. length

// ### Intermediate

// Find total elements in an array without counting manually.

// **Hint:** Use `.length`

// ### Hard

// Create a function that checks whether array length is even or odd.

// **Hint:** Use modulus operator

var arr1 = [32,56,34,124,65,32,65,78,587,23,32,56,34,124,65,32,65];
console.log(arr1.length);

function checkEvenOdd(arr){
    if(arr.length % 2 === 0){
        return "Even";
    }else{
        return "Odd";
    }
}
console.log(checkEvenOdd(arr1));