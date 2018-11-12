/**
 * 原型模式
 * @constructor
 */

function Person() {
}

Person.prototype.name = 'duke';
Person.prototype.age = 22;
Person.prototype.sayName = function() {
  return this.name;
};

var person1 = new Person();
console.log('p1=>', person1.sayName());

var person2 = new Person();
console.log('p2=>', person2.sayName());

console.log('name equal=>', person1.sayName === person2.sayName);
console.log('constructor=>', Person.prototype.constructor === Person);
