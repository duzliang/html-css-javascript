/**
 * Object Literal Extensions
 * 对象字面量扩展
 * @note 对于简洁方法，只在不需要 this 绑定，或者递归调用的情况下使用，否则具名函数更方便可靠
 */
(function() {
  // 简洁属性和方法
  let o = {
    name: 'duke',
    sayName() {
      console.log(this.name);
    },
  };

  // 不可省略的方法名称
  function runSomething(o) {
    let x = Math.random();
    let y = Math.random();
    return o.something(x, y);
  }

  /**
   * 具名函数的好处
   */
  let runResult = runSomething({
    something: function something(x, y) {
      if (x > y) {
        // 递归调用, 可以直接使用 something 调用函数，不存在 this 绑定的各种陷进
        return something(y, x);
      }
      return y - x;
    },
  });
  console.log('log=>runResult:', runResult);

  /**
   * 简洁函数实现
   * use concise function
   * something 无法找到，所以简洁函数是匿名的
   */
  let runConcise = runSomething({
    something(x, y) {
      if (x > y) {
        return something(y, x); // occur ReferenceError
      }
      return y - x;
    },
  });
  console.log('log=>runConcise:', runConcise);
})();
