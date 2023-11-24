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

  Foo.prototype.constructor = function Gotcha() {};
  console.log('log=>a1.constructor', a1.constructor); // Gotcha() {}
  console.log('log=>a1.constructor.name', a1.constructor.name); // "Gotcha"
  console.log('log=>a1', a1); // Foo {}

  let Bar = {};
  let b1 = Object.create(Bar);
  console.log('log=>b1', b1); // {}

  Object.defineProperty(Bar, 'constructor', {
    enumerable: false,
    value: function Gotcha() {},
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
});

/**
 * 案例1
 * 类风格代码
 */
(function() {
  // 父类
  function Widget(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  }

  Widget.prototype.render = function($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + 'px',
        height: this.height + 'px',
      }).appendTo($where);
    }
  };

  // 子类
  function Button(width, height, label) {
    // 调用“super”构造函数
    Widget.call(this, width, height);
    this.label = label || 'Default';

    this.$elem = $('<button>').text(this.label);
  }

  // 让Button“继承”Widget
  Button.prototype = Object.create(Widget.prototype);

  // 重写render(..)
  Button.prototype.render = function($where) {
    // “super”调用
    Widget.prototype.render.call(this, $where);
    this.$elem.click(this.onClick.bind(this));
  };

  Button.prototype.onClick = function(evt) {
    console.log('Button \'' + this.label + '\' clicked!');
  };

  $(document).ready(function() {
    let $body = $(document.body);
    let btn1 = new Button(125, 30, 'Hello');
    let btn2 = new Button(150, 40, 'World');

    btn1.render($body);
    btn2.render($body);
  });
});

/**
 * 案例2：使用class实现
 */
(function() {
  class Widget {
    constructor(width, height) {
      this.width = width || 50;
      this.height = height || 50;
      this.$elem = null;
    }

    render($where) {
      if (this.$elem) {
        this.$elem.css({
          width: this.width + 'px',
          height: this.height + 'px',
        }).appendTo($where);
      }
    }
  }

  class Button extends Widget {
    constructor(width, height, label) {
      super(width, height);
      this.label = label || 'Default';
      this.$elem = $('<button>').text(this.label);
    }

    render($where) {
      super.render($where);
      this.$elem.click(this.onClick.bind(this));
    }

    onClick(evt) {
      console.log('Button \'' + this.label + '\' clicked!');
    }
  }

  $(document).ready(function() {
    let $body = $(document.body);
    let btn1 = new Button(125, 30, 'Hello');
    let btn2 = new Button(150, 40, 'World');

    btn1.render($body);
    btn2.render($body);
  });
})();
