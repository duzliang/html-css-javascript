let firstName = Symbol('this is my first name');

let person = {};
person[firstName] = 'duke';

console.log(person[firstName]);
console.log(firstName);
