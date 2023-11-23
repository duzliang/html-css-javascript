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
})();
