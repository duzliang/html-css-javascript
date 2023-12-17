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

// in
console.log('proto=>', 'name' in Person);
console.log('instance=>', 'name' in person1);
person1.hooby = 'reading';
console.log('proto=>', 'hooby' in person1);

// 理解原型对象
console.log('Person.prototype is person1 proto=>', Person.prototype.isPrototypeOf(person1));
console.log('person1 prototype is Person.prototype=>', Object.getPrototypeOf(person1) ===
  Person.prototype);
console.log('invoke by prototype=>', Object.getPrototypeOf(person1).sayName());

// 获取对象属性的描述符
console.log('person1 name descriptor=>', Object.getOwnPropertyDescriptor(person1, 'name'));
console.log('person1 prototype constructor descriptor=>', Object.getOwnPropertyDescriptor(Person.prototype, 'constructor'));

console.log('object keys=>', Object.keys(person1));
console.log('objet getOwnPropertyNames=>', Object.getOwnPropertyNames(person1));

Object.defineProperty(person1, 'job', {
  enumerable: false,
});

console.log('object keys2=>', Object.keys(person1)); // ['hooby']
console.log('objet getOwnPropertyNames2=>', Object.getOwnPropertyNames(person1)); // ['hooby', 'job']

/**
 * 使用对象字面量创建
 * 实际会重写原型，constructor不指向People
 * @type {{name: string, age: number, sayName(): *}}
 */

function People() {
}

People.prototype = {
  constructor: People, // 重设constructor的值，但是enumerable会变为true，默认是false
  name: 'duke',
  age: 22,
  sayName() {
    return this.name;
  },
};

var pep1 = new People();
console.log('pep1=>', pep1.sayName()); // duke
console.log('instance=>', pep1 instanceof People); // true
console.log('constructor=>', pep1.constructor == People); // false
console.log('log=>', pep1.sayName());

/**
 * 原型的动态性
 */
function Man() {
}

var tom = new Man();
console.log('override before=>', tom.constructor === Man);

Man.prototype = {
  constructor: Man,
  name: 'man',
  age: 18,
  hobby: ['eat', 'sleep'],
  sayName() {
    return this.name;
  },
};

console.log('log=>', Man.prototype === tom.prototype);
// console.log('tom man=>', tom.sayName());

var man1 = new Man();
var man2 = new Man();

man1.hobby.push('play');

console.log('man1 hobby=>', man1.hobby); // ["eat", "sleep", "play"]
console.log('man2 hobby=>', man2.hobby); // ["eat", "sleep", "play"]

