// Even or Odd Checker
// Write a function that takes one number as input. Inside the function, check whether the
// number divides evenly by 2 using the % (modulo) operator. If there is no remainder, the
// function should return the word "Even"; otherwise, it should return "Odd". Try your function
// with a few different numbers, including 0 and a negative number, to make sure it always
// gives the right answer.
// Concepts: functions, if-else, % (modulo) operator

function evenOddChecker(num) {
    if(num % 2 ===0){
        return "even";
    }else{
        return "odd";
    }
}

let num = 2324314;
let result = evenOddChecker(num)
console.log(result)