function Person(name, age) {
  this.name = name;
  this.age = age;
  this.hobby = ['eat', 'sleep'];
}

Person.prototype = {
  constructor: Person,
  sayName() {
    return this.name;
  },
};

var person1 = new Person('duke', 22);
var person2 = new Person('dome', 18);

person1.hobby.push('reading');

console.log('person1.hobby=>', person1.hobby);
console.log('person2.hobby=>', person2.hobby);

console.log('has same hobby=>', person1.hobby === person2.hobby);
console.log('has same express=>', person1.sayName === person2.sayName);
