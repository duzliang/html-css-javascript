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
})();
