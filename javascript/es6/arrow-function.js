/**
 * Arrow function
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
  controllerObjWithArrowFunction.makeRequest();
})();

