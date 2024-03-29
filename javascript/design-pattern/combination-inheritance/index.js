function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'green'];
}

SuperType.prototype.sayName = function() {
  return this.name;
};

function SubType(name, age) {
  // extend SuperType
  SuperType.call(this, name); // pass params
  this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  return this.age;
};

var instance1 = new SubType('duke', 22);
instance1.colors.push('black');
console.log('instance1=>', instance1.sayName(), instance1.sayAge(), instance1.colors); // duke 22 ["red", "green", "black"]

var instance2 = new SubType('dome', 18);
console.log('instance2=>', instance2.sayName(), instance2.sayAge(), instance2.colors); // duke 18 ["red", "green"]
