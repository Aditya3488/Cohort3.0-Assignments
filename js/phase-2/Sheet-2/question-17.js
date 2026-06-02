// # 17. for loop

// ### Intermediate

// Print all array elements using loop.

// **Hint:** Loop through indexes

// ### Hard

// Print elements at only even indexes.

// **Hint:** Increase loop smartly

var arr1 = [1,2,3,4,5,6,7,8,9,10];
for (var i = 0; i < arr1.length; i++) {
    console.log(arr1[i]);
}

for (var i = 0; i < arr1.length; i += 2) {
    console.log(arr1[i]);
}

