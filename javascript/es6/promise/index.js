/**
 * 异步控制台
 * 1. 使用断点调试
 * 2. 适用 JSON.stringify 格式化对象获取快照
 */
(function() {
  var a = {
    index: 1,
  };

  console.log('log=>a', a); // log=>a { index: 1 } in Node, a { index: 2 } in Chrome
  a.index++;
});

/**
 * 回调方式的弊端：
 * 1 调用回调过早
 * 2 调用回调过晚（或不被调用）
 * 3 调用回调次数过少或过多
 * 4 未能传递所需的环境和参数
 * 5 吞掉可能出现的错误和异常
 */
(function() {
  // 1. Promise 可以确保调用的顺序和时机
  let p = new Promise((resolve, reject) => {

  });
  p.then(function() {
    // C无法抢占B，也就是无法在B之前执行，这样确保了Promised的执行顺序
    p.then(function() {
      console.log('C');
    });
    console.log('A');
  });
  p.then(function() {
    console.log('B');
  });
  // A B C

  // 2. 调度技巧
  let p3 = new Promise((resolve, reject) => {
    resolve('B');
  });

  let p1 = new Promise((resolve, reject) => {
    resolve(p3);
  });
  let p2 = new Promise((resolve, reject) => {
    resolve('A');
  });
  p1.then(function(value) {
    console.log('log=>p1', value); // B
  });
  p2.then(function(value) {
    console.log('log=>p2', value); // A
  });
  // 执行顺序： A , B

  // 3. 回调未调用
  function foo() {
    return new Promise((resolve, reject) => {
      resolve('foo');
    });
  }

  function timeoutPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        reject('timeout');
      }, 3000);
    });
  }

  // 竞态调用
  Promise.race([foo(), timeoutPromise()])
    .then(function(value) {
      console.log('log=>success:', value); // foo
    }).catch(err => {
    console.log('log=>fail:', err);
  });

  // 5 错误处理
  let pe = new Promise((resolve, reject) => {
    pe.foo();
    resolve('18');
  });
  pe.then(function fulfilled(val) {
    console.log('log=>success:', val);
  }, function rejected(err) {
    console.log('log=>err occurred:', err);
  });
});

/**
 * 链式调用
 */
(function() {
  // 扁平的链式调用
  let p = new Promise((resolve, reject) => {
    resolve(21);
  });

  p
    .then(value => {
      return value * 2;
    })
    .then(value => {
      console.log('log=>value:', value); // 42
    });

  // 中途还有其他Promise

  let pp = new Promise((resolve, reject) => {
    resolve(p);
  });

  pp
    .then(value => {
      // 嵌套一个异步：正常流工作
      // return new Promise((resolve, reject) => {
      //   console.log('log=>1 value:', value); // 21
      //   resolve(value * 2);
      // });

      // 再嵌套一个异步：不会改变工作流程
      return new Promise((resolve, reject) => {
        console.log('log=>1 value:', value); // 21
        setTimeout(() => {
          resolve(value * 2);
        }, 3000);
      });
    })
    .then(value => {
      console.log('log=>2 value:', value); // 42
    });
  // 仍然是正确的顺序
  // 1 value: 21
  // 2 value: 42
});

/**
 * 错误处理
 * 1. try catch 语句无法处理异步错误
 * 2. 使用Promise分离式的错误处理方式
 *
 * @question
 * 1. promise catch块和 then 中的rejected()有什么区别？
 * then中的rejected()是捕获当前 promise 链中未被捕获到错误，catch是捕获前面所有 promise 未处理的异常，是最终的异常处理函数
 */
(function() {
  // function foo() {
  //   console.log('log=>', 'foo');
  //   setTimeout(function() {
  //     foo.bar();
  //   }, 1000);
  // }
  //
  // try {
  //   foo();
  // } catch (err) {
  //   // never in
  //   console.error('log=>err:', err);
  // }

  let p = Promise.reject('Oops');

  // 分离式处理
  p.then(function fulfilled(value) {
    console.log('log=>p success:', value.bar()); // 无法捕获到错误
  }, function rejected(err) {
    console.log('log=>p err occurred:', err); // log=>err occurred: Oops
  });

  // catch 语句块
  p.catch(function handleErrors(err) {
    console.log('log=>p err catch:', err); // log=>err catch: Oops
  });

  let p2 = Promise.resolve(22);
  p2.then(function fulfilled(value) {
    console.log('log=>p2 success:', value.toLowerCase());
  }, function rejected(err) {
    // 未接收到错误信息？
    console.log('log=>p2 err occurred:', err);
  }).catch(function(err) { // 总是在末尾添加catch来捕获Promise全链未被捕获的异常
    console.log('log=>p2 err catch:', err); // log=>p2 err catch: Oops 接收到错误
    // 若是在这里抛出异常，该如何处理呢？
  });
});

/**
 * Promise 链
 * 1. Promise.all()
 * 2. Promise.race()
 * @notice 当执行中被淘汰的Promise会被忽略，但是有什么副作用呢？
 */
(function() {
  let p1 = Promise.resolve(21);
  let p2 = Promise.resolve(p1);
  let r1 = Promise.reject('r1');
  let r2 = Promise.reject('r2');

  // p1, p2 都完成后，进入下一步 then
  Promise.all([p1, p2])
    .then(function fulfilled(values) {
      console.log('log=>all success:', values); // [21, 21]
    }, function rejected(err) {
      console.log('log=>all err:', err); // r1
    });

  Promise.all([r1, r2])
    .then(function fulfilled(values) {
      console.log('log=>all success:', values);
    }, function rejected(err) {
      console.log('log=>all err:', err); // r1
    });

  let p3 = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(31);
    }, 3000);
  });
  Promise.race([p1, p3])
    .then(function fulfilled(value) {
      console.log('log=>race success:', value); // 21
    }, function rejected(err) {
      console.log('log=>race err:', err); // r1
    });

  // polyfill 安全的 guard 检查
  if (!Promise.observe) {
    Promise.observe = function(pr, cb) {
      pr.then(function fulfilled(msg) {
        // 异步回调
        Promise.resolve(msg).then(cb);
      }, function rejected(err) {
        // 异步回调
        Promise.resolve(err).then(cb);
      });

      // 返回原promise
      return pr;
    };
  }

  Promise.race([
    Promise.observe(
      p1,
      function cleanup(msg) {
        // 在 p1 之后清理
        console.log('log=>cleanup:', msg);
      },
    ),
    p3,
  ]);
});

/**
 * Promise局限性
 * Promise的设计局限性（具体来说，就是它们链接的方式）造成了一个让人很容易中招的陷阱，即Promise链中的错误很容易被无意中默默忽略掉
 */
(function() {
  // v1.0
  function getY(x) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve((3 * x) - 1);
      }, 100);
    });
  }

  function foo(bar, baz) {
    let x = bar * baz;
    return getY(x)
      .then(function(y) {
        // 把两个值封装到容器中
        return [x, y];
      });
  }

  foo(10, 20)
    .then(function(msgs) {
      var x = msgs[0];
      var y = msgs[1];

      console.log('log=>', x, y);    // 200 599
    });

  // v2.0 把每个值封装到自己的 Promise 中
  function foo2(bar, baz) {
    let x = bar * baz;
    // 返回 2 个 Promise
    return [
      Promise.resolve(x),
      getY(x),
    ];
  }

  Promise.all(foo2(10, 20)).then(function(msgs) {
    var x = msgs[0];
    var y = msgs[1];
    console.log('log=>v2:', x, y); // 200 599
  });

  // 展开参数工具函数
  function spread(fn) {
    return Function.apply.bind(fn, null);
  }

  Promise.all(foo2(10, 20))
    .then(spread(function(x, y) {
      console.log('log=>spread:', x, y); // 200 599
    }));

  // 可以使用自带的结构参数方式
  Promise.all(foo2(10, 20)).then(function([x, y]) {
    console.log('log=>destructure:', x, y); // 200 599
  });
});

/**
 * Promisory Promise化
 * 把传统回调模式的代码，重构为Promise方式的代码
 */
(function() {
  // 1. tools
  // polyfill安全的guard检查
  if (!Promise.wrap) {
    Promise.wrap = function(fn) {
      return function() {
        let args = [].slice.call(arguments);

        return new Promise(function(resolve, reject) {
          fn.apply(
            null,
            args.concat(function(err, v) {
              if (err) {
                reject(err);
              } else {
                resolve(v);
              }
            }),
          );
        });
      };
    };
  }

  /**
   * callback style code
   */
  function ajax(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        cb(new Error('Request failed with status' + xhr.status));
      }
    };
    xhr.onerror = function() {
      cb(new Error('Request failed'));
    };
  }

  function foo(x, y, cb) {
    ajax(
      'http://some.url.1/? x=' + x + '&y=' + y,
      cb,
    );
  }

  foo(11, 31, function(err, text) {
    if (err) {
      console.error(err);
    } else {
      console.log(text);
    }
  });

  /**
   * use promise.wrap to refactor
   */

    // 为ajax(..)构造一个promisory
  var request = Promise.wrap(ajax);

  // 重构foo(..)，但使其外部成为基于外部回调的，
  // 与目前代码的其他部分保持通用
  // ——只在内部使用request(..)的promise
  function fooWrap(x, y, cb) {
    request(
      'http://some.url.1/? x=' + x + '&y=' + y,
    )
      .then(
        function fulfilled(text) {
          cb(null, text);
        },
        cb,
      );
  }

  // 现在，为了这段代码的目的，为foo(..)构造一个promisory
  var betterFoo = Promise.wrap(fooWrap);

  // 并使用这个promisory
  betterFoo(11, 31)
    .then(
      function fulfilled(text) {
        console.log(text);
      },
      function rejected(err) {
        console.error(err);
      },
    );
});

/**
 * 无法取消的Promise
 */
(function() {
  let foo = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('foo');
    }, 3000);
  });
  let bar = new Promise(function(resolve, reject) {
    resolve('bar');
  });

  Promise.race([foo, bar])
    .then(function fulfilled(value) {
      // 处理第一个成功的promise
      console.log('log=>race success:', value); // bar
    }, function rejected(err) {
      console.log('log=>race err:', err); // r1
    });

  foo.then(res => {
    // 超时，但是没有取消，仍会执行
    console.log('log=>foo success:', res);
  });
})();
