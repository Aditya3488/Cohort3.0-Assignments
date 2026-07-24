// Private Counter with Closures
// Write an outer function that has one variable inside it to keep track of a count, starting at 0.
// This outer function should return another (inner) function that, every time it is called,
// increases the count by 1 and returns the new value. The important part is that the count
// variable should not be reachable or changeable from outside - the only way to change it
// should be by calling the function that was returned.
// Concepts: closures, private variables 

function privateCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    }
}

let counter = privateCounter();
console.log(counter());
console.log(counter()); 
console.log(counter()); 
