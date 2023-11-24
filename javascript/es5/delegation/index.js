(function() {
  let Task = {
    setID: function(ID) { this.id = ID; },
    outputID: function() { console.log(this.id); },
  };

  // 让XYZ委托Task
  let XYZ = Object.create(Task);

  XYZ.prepareTask = function(ID, Label) {
    this.setID(ID);
    this.label = Label;
  };

  XYZ.outputTaskDetails = function() {
    this.outputID();
    console.log(this.label);
  };
});

/**
 * Debugged
 * 委托关系: 调试
 */
(function() {
  function Foo() {}

  let a1 = new Foo();
  console.log('log=>a1', a1); // Foo {}
  console.log('log=>a1.constructor', a1.constructor);
  console.log('log=>a1.constructor.name', a1.constructor.name);

  Foo.prototype.constructor = function Gotcha(){};
  console.log('log=>a1.constructor', a1.constructor); // Gotcha() {}
  console.log('log=>a1.constructor.name', a1.constructor.name); // "Gotcha"
  console.log('log=>a1', a1); // Foo {}

  let Bar = {};
  let b1 = Object.create(Bar);
  console.log('log=>b1', b1); // {}

  Object.defineProperty(Bar, 'constructor', {
    enumerable: false,
    value: function Gotcha(){},
  });
  console.log('log=>b1', b1); // Gotcha {}
});

/**
 * 原型面向对象风格
 */
(function() {
  function Foo(who) {
    this.me = who;
  }

  Foo.prototype.identify = function() {
    return `I am ${this.me}`;
  };

  function Bar(who) {
    Foo.call(this, who);
  }

  Bar.prototype = Object.create(Foo.prototype);
  Bar.prototype.speak = function() {
    console.log(`Hello,  ${this.identify()}.`);
  };

  let b1 = new Bar('b1');
  let b2 = new Bar('b2');

  b1.speak();
  b2.speak();
});

/**
 * 对象关联风格
 */
(function() {
  let Foo = {
    init: function(who) {
      this.me = who;
    },
    identify: function() {
      return `I am ${this.me}`;
    },
  };

  let Bar = Object.create(Foo);

  Bar.speak = function() {
    console.log(`Hello,  ${this.identify()}.`);
  };

  let b1 = Object.create(Bar);
  b1.init('b1');
  let b2 = Object.create(Bar);
  b2.init('b2');

  b1.speak();
  b2.speak();
})();
