/**
 * [[Prototype]]
 */
(function() {
  var anotherObject = {
    a: 2,
  };

  var myObject = Object.create(anotherObject);

  anotherObject.a; // 2
  myObject.a; // 2

  anotherObject.hasOwnProperty('a'); // true
  myObject.hasOwnProperty('a'); // false

  myObject.a++; // 隐式屏蔽！

  anotherObject.a; // 2
  myObject.a; // 3

  myObject.hasOwnProperty('a'); // true
})();
