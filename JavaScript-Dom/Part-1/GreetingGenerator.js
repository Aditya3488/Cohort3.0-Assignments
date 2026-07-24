// Greeting Generator
// Write a function that takes two inputs: a person's name and their age. Inside the function,
// use a template literal (a string written with backticks and ${ }) to build and return a sentence
// such as "Hello, Riya! You are 21 years old." Make sure the name and age you pass in always
// show up correctly inside the sentence.
// Concepts: functions, template literals

const greetingGenerator = (name,age) =>{
    return `Hello, ${name}! You are ${age} years old.`;
}

let name  = "Aditya";
let age = 25

let res = greetingGenerator(name,age)
console.log(res)