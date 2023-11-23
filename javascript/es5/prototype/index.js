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
});

/**
 * 继承
 */
(function() {
  function Foo(a) {
    this.name = a;
  }

  function Bar(b) {
    this.age = b;
  }

  Bar.prototype = Object.create(Foo.prototype);

  // 用来判断o1是否关联到（委托）o2的辅助函数
  function isRelatedTo(o1, o2) {
    function F() {
    }

    F.prototype = o2;
    return o1 instanceof F;
  }

  var a = {};
  var b = Object.create(a);

  console.log(isRelatedTo(a, b)); // true

  let f = new Foo('foo')
  console.log('log=>Foo.isPrototypeOf:', Foo.isPrototypeOf(f)); // false
  console.log('log=>a.isPrototypeOf b:', a.isPrototypeOf(b)); // true
  console.log('log=>getPrototypeOf f:', Object.getPrototypeOf(f) === Foo.prototype); // true
}());

/**
 * prototype extend
 */
(function() {
  function Foo(name) {
    this.name = name;
  }

  Foo.prototype.myName = function() {
    return this.name;
  }

  function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
  }
  console.log('log=>Foo.prototype.constructor:', Foo.prototype.constructor);

  // 创建一个新的Bar.prototype并关联到Foo.prototype
  // todo why ydkjs says: Bar.prototype has no constructor
  Bar.prototype = Object.create(Foo.prototype);
  console.log('log=>Bar constructor:', Bar.prototype.constructor);

  Bar.prototype.myLabel = function () {
    return this.label;
  }

  var a = new Bar('duke', 'coder');
  console.log('log=>name', a.myName());
  console.log('log=>label', a.myLabel());
});
