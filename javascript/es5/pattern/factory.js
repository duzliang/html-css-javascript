var createPerson = function(name, age) {
  var obj = new Object();

  obj.name = name;
  obj.age = age;
  obj.sayName = function() {
    return this.name;
  };

  return obj;
};

var person1 = createPerson('duke', 22);
var person2 = createPerson('dome', 24);
var person3 = new createPerson('dome3', 24);
console.log('person1=>', person1);
console.log('person2=>', person2);
console.log('person3=>', person3);
