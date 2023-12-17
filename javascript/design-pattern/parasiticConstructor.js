/**
 * 寄生构造函数模式
 * @constructor
 */
function Person(name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.sayName = function() {
    return this.name;
  };

  return o;
}

var person = new Person('duke', 22);
console.log('say=>', person.sayName());
