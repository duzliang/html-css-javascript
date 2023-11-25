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
 * 类风格代码：模拟类继承
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
 * 案例1
 * 使用class实现
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

    // 伪多态，重写父类的方法
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
});

/**
 * 案例2
 * 使用委托设计模式
 * 对象关联可以更好地支持关注分离（separation of concerns）原则
 */
(function() {
  let Widget = {
    init: function(width, height) {
      this.width = width || 50;
      this.height = height || 50;
      this.$elem = null;
    },
    insert: function($where) {
      if (this.$elem) {
        this.$elem.css({
          width: this.width + 'px',
          height: this.height + 'px',
        }).appendTo($where);
      }
    },
  };

  let Button = Object.create(Widget);

  Button.setup = function(width, height, label) {
    // 委托调用
    this.init(width, height);
    this.label = label || 'Default';
    this.$elem = $('<button>').text(this.label);
  };
  Button.build = function($where) {
    // 委托调用
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
  };
  Button.onClick = function(evt) {
    console.log('Button \'' + this.label + '\' clicked!');
  };

  $(document).ready(function() {
    let $body = $(document.body);

    let btn1 = Object.create(Button);
    btn1.setup(125, 30, 'Hello');

    let btn2 = Object.create(Button);
    btn2.setup(150, 40, 'World');

    btn1.build($body);
    btn2.build($body);
  });
});

/**
 * 案例3
 * 多组件情况
 * 类设计模式
 */
(function() {
  // 父类
  function Controller() {
    this.errors = [];
  }

  Controller.prototype.showDialog = function(title, msg) {
    console.log('log=>showDialog:', title, msg);
  };
  Controller.prototype.success = function(msg) {
    this.showDialog('Success', msg);
  };
  Controller.prototype.failure = function(err) {
    this.errors.push(err);
    this.showDialog('Error', err);
  };

  // 子类：登录控件
  function LoginController() {
    Controller.call(this);
  }

  LoginController.prototype = Object.create(Controller.prototype);
  LoginController.prototype.getUser = function() {
    return document.getElementById('login_username').value;
  };
  LoginController.prototype.getPassword = function() {
    return document.getElementById('login_password').value;
  };
  LoginController.prototype.validateEntry = function(user, pwd) {
    user = user || this.getUser();
    pwd = pwd || this.getPassword();

    if (!(user && pwd)) {
      return this.failure('请输入用户名和密码');
    } else if (pwd.length < 3) {
      return this.failure('密码必须大于三位');
    }
    return true;
  };
  // rewrite failure()
  LoginController.prototype.failure = function(err) {
    // call super
    Controller.prototype.failure.call(this, '登录失败' + err);
  };

  /**
   * 子类：验证控件
   */
  function AuthController(login) {
    Controller.call(this);
    // 合成
    // in addition to inheritance, we also need composition
    this.login = login;
  }

  // 把子类关联到父类
  AuthController.prototype = Object.create(Controller.prototype);
  AuthController.prototype.server = function(url, data) {
    return $.ajax({
      url: url,
      data: data,
    });
  };
  AuthController.prototype.checkAuth = function() {
    let user = this.login.getUser();
    let pwd = this.login.getPassword();
    console.log('log=>', user, pwd);

    if (this.login.validateEntry(user, pwd)) {
      // just for test
      this.server('/check-auth', {
        user,
        pwd,
      }).then(this.success.bind(this))
        .fail(this.failure.bind(this));
    }
  };

  // 重写基础的success()
  AuthController.prototype.success = function() {
    // super
    Controller.prototype.success.call(this, '验证通过');
  };
  // 重写基础的failure()
  AuthController.prototype.failure = function(err) {
    // super
    Controller.prototype.failure.call(this, '验证失败' + err);
  };

  let auth = new AuthController(
    // 除了继承，我们还需要合成
    new LoginController(),
  );
  auth.checkAuth();
});

/**
 * 行为委托模式
 */
(function() {
  const LoginController = {
    errors: [],
    getUser: function() {
      return document.getElementById('login_username').value;
    },
    getPassword: function() {
      return document.getElementById('login_password').value;
    },
    validateEntry: function(user, pwd) {
      user = user || this.getUser();
      pwd = pwd || this.getPassword();

      if (!(user && pwd)) {
        return this.failure('Please enter a username & password!');
      } else if (pwd.length < 5) {
        return this.failure('Password must be 5+ characters!');
      }
      return true;
    },
    showDialog: function(title, msg) {
      this.showDialog('Success', 'Login success');
    },
    failure: function(err) {
      this.errors.push(err);
      this.showDialog('Error', 'Login invalid: ' + err);
    },
  };

  // Link `AuthController` to delegate to `LoginController`
  // 让AuthController委托LoginController
  const AuthController = Object.create(LoginController);

  AuthController.errors = [];
  AuthController.checkAuth = function() {
    let user = this.getUser();
    let pwd = this.getPassword();

    if (this.validateEntry(user, pwd)) {
      this.server('/check-auth', {
        user,
        pwd,
      })
        .then(this.accepted.bind(this))
        .fail(this.rejected.bind(this));
    }
  };
  AuthController.server = function(url, data) {
    return $.ajax({
      url: url,
      data: data,
    });
  };
  AuthController.accepted = function() {
    this.showDialog('Success', 'Authenticated!');
  };
  AuthController.rejected = function(err) {
    this.failure('Auth Failed: ' + err);
  };
})();
