// find expensive products

let price = [100,250,500,150,700];

let expensive = price.filter(function(value){
    return value > 300;
});

// console.log(expensive);

// student average

let marks = [80,90,70,85,95];

let average = marks.reduce(function(total, value){
    return total + value;
}, 0) / marks.length;

// console.log(average);


// most frequent number

let numbers = [1,2,3,2,4,2,5,1,1,1];

let frequency = {};
let maxFreq = 0;
let mostFrequent;

for (let num of numbers) {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
        mostFrequent = num;
    }
}

// console.log(mostFrequent);

let maxCount = 0;
let mostFrequentNum;

for(let i=0; i<numbers.length ; i++){
    let count = 0;
    for(let j=0; j<numbers.length; j++){
        if(numbers[i] === numbers[j]){
            count++;
        }
    }
    if(count > maxCount){
        maxCount = count;
        mostFrequentNum = numbers[i];
    }
}
// console.log(mostFrequentNum);


// update user age

let user = {
    name : "ritik",
    age : 28
};

user.age = 21;

// console.log(user);

// print user information

let userinfo = {
    name  : "ritik",
    age : 20,
    city: "Bhopal"
}

for(let key in userinfo){
    // console.log(key + ": " + userinfo[key]);
}

let users = {
name : "Ritik",
age : 20,
city : "Pune"
}
// Object.entries(users).forEach(([a,b] , idx) => console.log(a , b))


// dynamic sum function

function sum(...num){
    return num.reduce((total, value) => total + value, 0);
}

let result = sum(1,2,3,4,5)
// console.log(result);


// find adult users
let userList = [
    {name : "Ritik", age : 20},
    {name : "Rahul", age : 16},
    {name : "Priya", age : 25}
];

let adults = userList.filter(function(user){
    return user.age >= 18;
});

// console.log(adults);



// shopping cat total

let cart = [
    {name : "Mouse", price : 500 , qty : 2},
    {name : "Keyboard", price : 1000, qty : 1},
    {name : "Monitor", price : 10000, qty : 1}
];

getCartTotal = cart.reduce(function(total, item){   
    return total + (item.price * item.qty);
}, 0);

// console.log(getCartTotal);


// student grade report

let student = [
    {name : "Ritik", marks : [80,90,85]},
    {name : "Rahul", marks : [70,75,80]},
    {name : "Priya", marks : [95,90,92]}
]

let gradeReport = student.map(function(student){
    let totalMarks = student.marks.reduce(function(total, mark){
        return total + mark;
    }, 0);
    let averageMarks = totalMarks / student.marks.length;
    let grade;
    if (averageMarks >= 90) {
        grade = "A";
    } else if (averageMarks >= 80) {
        grade = "B";
    } else {
        grade = "C";
    }
    return { name: student.name, average: averageMarks, grade: grade };
});

console.log(gradeReport);