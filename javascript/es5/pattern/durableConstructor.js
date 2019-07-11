/**
 * 稳妥构造函数模式
 * @constructor
 */
function Person(name, age) {
  var o = new Object();
  o.sayName = function() {
    return name;
  };

  return o;
}

var person = Person('duke', 22); // 不使用new
console.log('say=>', person.sayName()); // duke
var person2 = Person('duke2', 22);
console.log('say=>', person2.sayName()); // duke2

