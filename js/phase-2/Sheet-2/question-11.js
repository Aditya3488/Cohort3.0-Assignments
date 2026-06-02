// # 11. sort()

// ### Intermediate

// Sort numbers in ascending order.

// **Hint:** Compare function

// ### Hard

// Sort array so even numbers come first and odd later.

// **Hint:** Custom compare logic

var arr1 = [32,56,34,124,65,32,65,78,587,23];

arr1.sort(function(a, b) {
    return a - b;
}); 
console.log("Sorted in ascending order:", arr1);

// Sort even numbers first
arr1.sort(function(a, b) {
    if (a % 2 === 0 && b % 2 !== 0) {
        return -1;  
    } else if (a % 2 !== 0 && b % 2 === 0) {
        return 1;   
    } else {
        return 0;   
    }   
});
console.log("Even numbers first:", arr1);