/**
 * ES6中最完美的世界就是生成器（看似同步的异步代码）和Promise（可信任可组合）的结合
 */
function run(gen) {
  let args = [].slice.call(arguments, 1);

  // 在当前上下文中初始化生成器
  let it = gen.apply(this, args);

  // 返回一个 Promise 用于生成器完成
  return Promise.resolve()
    .then(function handleNext(value) {
      let next = it.next(value);

      return (function handleResult(next) {
        // 生成器是否运行完毕
        if (next.done) {
          return next.value;
        } else {
          // 否则继续进行
          return Promise.resolve(next.value)
            .then(
              // 成功就循环异步循环，把决议的值发回生成器
              handleNext,
              // 如果 value 是被拒绝的 promise, 就把错误传回生成器进行处理
              function handleErr(err) {
                return Promise.resolve(it.throw(err))
                  .then(handleResult);
              },
            );
        }
      })(next);
    });
}

/**
 * ES7 中，我们可以直接使用async/await实现类似run的功能
 */
(function() {
  function getUsers() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve([
          {
            id: 1,
            name: '张三',
            age: 18,
          },
          {
            id: 2,
            name: '李四',
            age: 20,
          },
        ]);
      }, 1000);
    });
  }

  async function main() {
    let users = await getUsers();
    console.log('users=>', users); // users=> [ { id: 1, name: '张三', age: 18 }, { id: 2, name: '李四', age: 20 } ]
  }

  main();

  // just for test [].slice()
  function bar(name, age) {
    let args = [].slice.call(arguments, 1);
    console.log('log=>args', args); // log=>args [ 18 ]
  }

  bar('张三', 18);
})();

/**
 * 4.2 多请求并发
 */
(function() {
  function* foo() {
    // 1. 并发请求
    let p1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('p1');
      }, 1000);
    });
    let p2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('p2');
      }, 2000);
    });

    // 2. 等待两个 promise 完成
    let r1 = yield p1;
    let r2 = yield p2;
    console.log('r1=>', r1);
    console.log('r2=>', r2);

    // 3. 适用前面的请求结果，发出第三个请求
    let r3 = yield new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(r1 + r2);
      }, 3000);
    });
    console.log('r3=>', r3);
  }

  // 使用自定义 run 运行
  run(foo);
})();

/**
 * 隐藏 promise 实现
 */
(function() {
  function bar(url1, url2) {
    return Promise.all([
      fetch(url1),
      fetch(url2),
    ]);
  }

  function* foo() {
    // 用 bar 隐藏基于 Promise 的并发请求细节
    let results = yield bar('/api/user/1', '/api/user/2');

    let r1 = results[0];
    let r2 = results[1];

    let r3 = yield fetch(`/api/user/${r1 + r2}`);
    console.log('log=>r3', r3);
  }

  run(foo);
})();
