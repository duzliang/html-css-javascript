/**
 * Arrow function
 * =>是关于this、arguments和super的词法绑定
 * 1. 箭头函数使用词法 this, 不是动态绑定，也没有自己的 this
 * 2. 箭头函数使用词法 arguments，而不是自己的 arguments
 *
 * 使用规则：
 * 如果你有一个简短单句在线函数表达式，其中唯一的语句是return某个计算出的值，且这个函数内部没有this引用，且没有自身引用（递归、事件绑定/解绑定），且不会要求函数执行这些，那么可以安全地把它重构为=>箭头函数
 * 如果你有一个内层函数表达式，依赖于在包含它的函数中调用var self = thishack或者.bind(this)来确保适当的this绑定，那么这个内层函数表达式应该可以安全地转换为=>箭头函数
 * 如果你的内层函数表达式依赖于封装函数中某种像var args =Array.prototype.slice. call(arguments)来保证arguments的词法复制，那么这个内层函数应该可以安全地转换为=>箭头函数
 * 所有的其他情况——函数声明、较长的多语句函数表达式、需要词法名称标识符（递归等）的函数，以及任何不符合以上几点特征的函数——一般都应该避免=>函数语法
 */

// 常规的使用，简单化, 在简短的语句中，能够让代码更简洁，但是如果是多行代码，有时候使用 function 和具名函数可能是更好的选择
(function(execute) {
  if (!execute) {
    return;
  }

  // v1
  function dollabillsyallV1(strings, ...values) {
    return strings.reduce(function(s, v, idx) {
      if (idx > 0) {
        if (typeof values[idx - 1] == 'number') {
          s += `$${values[idx - 1].toFixed(2)}`;
        } else {
          s += values[idx - 1];
        }
      }

      return s + v;
    }, '');
  }

  // v2, use arrow function
  let dollabillsyallV2 = (strings, ...values) =>
    strings.reduce((s, v, idx) => {
      if (idx > 0) {
        if (typeof values[idx - 1] == 'number') {
          // 看，这里也使用了插入字符串字面量！
          s += `$${values[idx - 1].toFixed(2)}`;
        } else {
          s += values[idx - 1];
        }
      }

      return s + v;
    }, '');

  // conclusion
  // 虽然不是一条严格的规律，但我认为=>
  // 箭头函数转变带来的可读性提升与被转化函数的长度负相关。
  // 这个函数越长，=>带来的好处就越小；函数越短，=>带来的好处就越大。
})(false);

/**
 * 关于箭头函数与 this
 */
(function() {
  // 普通函数
  let controller = {
    showMsg() {
      console.log('log=>', 'hello function');
    },
    makeRequest: function() {
      let self = this;

      setTimeout(function() {
        // this.showMsg(); // TypeError: this.showMsg is not a function
        self.showMsg(); // use self to fix
      }, 1000);
    },
  };
  controller.makeRequest();

  // 使用箭头函数简化
  let controllerWithArrowFunction = {
    showMsg() {
      console.log('log=>', 'hello arrow function');
    },
    makeRequest() {
      setTimeout(() => {
        this.showMsg();
      }, 1000);
    },
  };
  controllerWithArrowFunction.makeRequest();

  // 在一个支持 this 的函数中，使用箭头函数会导致错误
  let controllerObjWithArrowFunction = {
    showMsg: () => {
      console.log('log=>', 'hello object arrow function');
    },
    makeRequest: () => {
      // v1, TypeError: this.showMsg is not a function
      setTimeout(() => {
        this.showMsg();
      }, 1000);
    },
  };
  /**
   * 使用controllerObjWithArrowFunction调用，会报错
   * arrow function 会从背包围的作用域中词法继承 this，所以这里 this 指向全局作用域
   */
  controllerObjWithArrowFunction.makeRequest();

})();

