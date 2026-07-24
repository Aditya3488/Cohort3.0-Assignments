// Find the Largest Number
// Write a function that takes an array of numbers and returns the largest number in it. You are
// not allowed to use the built-in Math.max() method - instead, loop through the array yourself,
// compare each number to the others, and keep track of the biggest one you have found so
// far.
// Concepts: arrays, loops, comparison logic


function findLargestNumber(arr){
    let largestNumber=0 ;
    for(let i=0; i<=arr.length;i++){
        if(largestNumber<arr[i]){
            largestNumber = arr[i];
        }
    }
    return largestNumber;
}

let arr1 = [3,5,2,77,65,103,3,5,99]
let arr2 = [10,3,5,6,2,8,12,88,123,100,33,44,111,122,144,155,166,177,188,199]
let res = findLargestNumber(arr2)
console.log(res)