/**
 * Generator 生成器
 * 一种顺序、看似同步的异步流程控制表达风格
 */
(function() {
  let x = 1;

  function* foo() {
    x++;
    bar();

    console.log('log=>x', x);
  }

  function bar() {
    x++;
  }

  foo(); // 3

  // refactor to generator
  /**
   * (1) it = goo()运算并没有执行生成器＊goo()，而只是构造了一个迭代器（iterator），这个迭代器会控制它的执行。后面会介绍迭代器。
   * (3) ＊goo()在yield语句处暂停，在这一点上第一个it.next()调用结束。此时＊goo()仍在运行并且是活跃的，但处于暂停状态。
   * (7) 最后的it.next()调用从暂停处恢复了生成器＊goo()的执行，并运行console.log(..)语句，这条语句使用当前x的值3。
   * @returns {Generator<*, void, *>}
   */
  function* goo() {
    x++;
    yield; // stop

    console.log('log=>gx', x);
  }

  function gar() {
    x++;
  }

  goo();

  // use next()
  let it = goo();
  it.next();
  console.log('log=>gx', x);
  gar();
  console.log('log=>gx', x);
  console.log('log=>it.next:', it.next());
});

/**
 * 1. 迭代消息传递
 * 生成器提供了内建消息输入输出能力，通过 yield和next()实现
 * yield暂停
 */
(function() {
  function* foo(x) {
    return x * (yield);
  }

  let it = foo(6);

  it.next(); // 启动foo()
  let res = it.next(7); // 7作为 yield 表达式的结果
  console.log('log=>val:', res.value); // 42
});

/**
 * 2. 双向消息传递
 */
(function() {
  function* foo(x) {
    let y = x * (yield 'Hello'); // 1. 第一次调用 next() 时，x = 6, 在 yield 处暂停，Hello作为响应值返回
    return y; // 2. 第二次调用 next() 时，x = 7作为 yield 处的参数继续执行，和上一次的 6 相乘，赋值给 y, 之后没有 yield，遇到 return 语句返回
  }

  let it = foo(6);
  let res = it.next(3); // 第一个next()，没传值，因为只有暂停的 yield 才能接受通过 next(x)传递的 x 值，所以启动生成器时，第一个 next()一定要不带参数，根据规范和所有兼容浏览器，都会默认丢弃传递给第一个 next() 的任何东西。
  console.log('log=>first:', res.value); // Hello
  res = it.next(7);
  console.log('log=>second:', res.value); // 42
});

/**
 * 生成器交互
 * 每次构建一个迭代器，实际上就隐式构建了生成器的一个实例，通过这个迭代器来控制的是这个生成器实例
 */
(function() {
  function* foo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log('log=>', x, y, z);
  }

  var z = 1;

  var it1 = foo();
  var it2 = foo();

  var val1 = it1.next().value;
  console.log('log=>val1:', val1); // 2
  var val2 = it2.next().value;
  console.log('log=>val2:', val2); // 2

  val1 = it1.next(val2 * 10).value; // (2*10) * 2(z)
  console.log('log=>val1 new:', val1); // 40
  val2 = it2.next(val1 * 5).value; // (40 * 5) * 3(z)
  console.log('log=>val2 new:', val2); // 600

  var res1 = it1.next(val2 / 2); // (600 / 2)
  var res2 = it2.next(val1 / 4); // (40 / 4)
  console.log('log=>res1:', res1.value);
  console.log('log=>res2:', res2.value);
});

/**
 * 生成器产生值
 *
 * 1. 生产者和迭代器
 */
(function() {
  // 使用函数闭包实现
  var gimmeSomething = (function() {
    var nextVal;

    return function() {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = (nextVal * 3) + 6;
      }
      return nextVal;
    };
  })();

  console.log('log=>', gimmeSomething());
  console.log('log=>', gimmeSomething());
  console.log('log=>', gimmeSomething());
  console.log('log=>', gimmeSomething());

  // 使用迭代器实现
  var iteratorSomething = (function() {
    var nextVal;

    return {
      // for of 循环需要
      [Symbol.iterator]: function() {
        return this;
      },
      // 标准迭代器接口方法
      next: function() {
        if (nextVal === undefined) {
          nextVal = 1;
        } else {
          nextVal = (nextVal * 3) + 6;
        }

        return {
          done: false,
          value: nextVal,
        };
      },
    };
  })();

  console.log('log=>2', iteratorSomething.next());
  console.log('log=>2', iteratorSomething.next());
  console.log('log=>2', iteratorSomething.next());
  console.log('log=>2', iteratorSomething.next());

  for (let val of iteratorSomething) {
    console.log('log=>3', val);
    if (val > 1000) {
      break; // 退出循环，防止死循环
    }
  }
})();
