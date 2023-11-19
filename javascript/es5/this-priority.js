/**
 * 优先级：递减
 * 1. new 绑定
 * 2. 显式绑定
 * 3. 隐式绑定
 * 4. 默认绑定
 */
(function () {
  function foo() {
    console.log(this.a);
  }

  var obj1 = {
    a: 2,
    foo: foo,
  };

  var obj2 = {
    a: 3,
    foo: foo,
  };

  obj1.foo(); // 2
  obj2.foo(); // 3

  obj1.foo.call(obj2); // 3
  obj2.foo.call(obj1); // 2
})();
