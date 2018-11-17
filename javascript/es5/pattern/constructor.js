var Person = function(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    return this.name;
  };
};

var person1 = new Person('duke', 22);
var person2 = new Person('dome3', 24);
var person3 = Person('no new', 0);
console.log('person1=>', person1);
console.log('person2=>', person2);
console.log('person3=>', person3); // undefined 必须使用new创建对象
console.log('sayName', window.sayName()); // no new
console.log('is method equal=>', person1.sayName === person2.sayName); // false

console.log('instance constructor1=>', person1.constructor === Person);  // true
console.log('instance constructor2=>', person2.constructor === Person);  // true
console.log('instanceof1=>', person1 instanceof Person); // true
console.log('instanceof2=>', person2 instanceof Person); // true
console.log('instanceof2=>', person1 instanceof Object); // true
