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
 * yield暂停
 */
(function() {
  function* foo(x) {
    let y = x * (yield);
    return y;
  }

  var it = foo(6);

  it.next(); // 启动foo()
  var res = it.next(7);
  console.log('log=>val:', res.value); // 42
})();
