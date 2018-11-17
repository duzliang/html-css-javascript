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

var person = Person('duke', 22);
console.log('say=>', person.sayName());
