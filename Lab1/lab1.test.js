const lab1 = require('./lab1');

//TODO: Write and call each function in lab1.js 5 times each, passing in different input
console.log(lab1.questionOne([5, 3, 10])); 
console.log(lab1.questionOne([2, 1, 2]));
console.log(lab1.questionOne([512, 1007, 17389]));
console.log(lab1.questionOne([0, 14159, 785]));
console.log(lab1.questionOne([11, 4]));

console.log(lab1.questionTwo(5, 3, 10)); 
console.log(lab1.questionTwo(2, 0, 2));
console.log(lab1.questionTwo(512, 1007, -5));
console.log(lab1.questionTwo(2, 10, 4));
console.log(lab1.questionTwo(175, 3, 5));

console.log(lab1.questionThree("How now brown cow"));
console.log(lab1.questionThree("Welcome to CS-546"));
console.log(lab1.questionThree("JavaScript is fun!"));
console.log(lab1.questionThree(1));
console.log(lab1.questionThree('Arinjay Panwar'));

console.log(lab1.questionFour("hello world", "o"));
console.log(lab1.questionFour("Helllllllo, class!", "ll"));
console.log(lab1.questionFour("Helllllllo, class!", 2));
console.log(lab1.questionFour(1, "ll"));
console.log(lab1.questionFour("Arinjay Jay Panwar ", "jay"));