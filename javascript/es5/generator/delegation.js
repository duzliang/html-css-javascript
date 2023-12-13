/**
 * 生成器委托
 */
(function() {
  // eg 1
  function* foo() {
    console.log('log=>foo start');
    yield 3;
    yield 4;
    console.log('log=>foo finished');
  }

  function* bar() {
    yield 1;
    yield 2;
    yield* foo(); // yield delegation
    yield 5;
  }

  let it = bar();

  console.log('log=>it', it.next().value);
  console.log('log=>it', it.next().value);
  console.log('log=>it', it.next().value);
  console.log('log=>it', it.next().value);
  console.log('log=>it', it.next().value);
});

/**
 * 消息委托
 * 1. 生成器
 */
(function() {
  function* foo() {
    console.log('log=>inside *foo():', yield 'B');
    console.log('log=>inside *foo():', yield 'C');
    return 'D';
  }

  function* bar() {
    console.log('log=>inside *bar():', yield 'A');
    console.log('log=>inside *bar():', yield* foo());
    console.log('log=>inside *bar():', yield 'E');
    return 'F';
  }

  let it = bar();
  console.log('log=>outside0:', it.next().value); // A
  console.log('log=>outside1:', it.next(1).value); // 1 B
  console.log('log=>outside2:', it.next(2).value);
  console.log('log=>outside3:', it.next(3).value);
  console.log('log=>outside4:', it.next(4).value);
});

/**
 * 消息委托
 * 2. 迭代器
 */
(function() {
  function* bar() {
    console.log('log=>inside *bar():', yield 'A');
    console.log('log=>inside *bar():', yield* ['B', 'C', 'D']);
    console.log('log=>inside *bar():', yield 'E');
    return 'F';
  }

  let it = bar();
  console.log('log=>outside0:', it.next().value); // A
  console.log('log=>outside1:', it.next(1).value); // 1 B
  console.log('log=>outside2:', it.next(2).value);
  console.log('log=>outside3:', it.next(3).value);
  console.log('log=>outside4:', it.next(4).value);
});

/**
 * 异常委托
 * 错误和异常也是双向传递
 */
(function() {
  function* foo() {
    try {
      yield 'B';
    } catch (err) {
      console.log('log=>catch error in *foo():', err); // 2
    }

    yield 'C';
    throw 'D';
  }

  function* bar() {
    yield 'A';

    try {
      yield* foo();
    } catch (err) {
      console.log('log=>catch error in *bar():', err); // D
    }

    yield 'E';
    yield* baz(); // 没有捕获 baz 中抛出的异常

    // never reach here
    yield 'G';
  }

  function* baz() {
    throw 'F';
  }

  let it = bar();
  console.log('log=>outside0:', it.next().value); // A
  console.log('log=>outside1:', it.next(1).value); // B
  console.log('log=>outside2:', it.throw(2).value); // C
  console.log('log=>outside3:', it.next(3).value); // E

  try {
    console.log('log=>', it.next(4).value);
  } catch (err) {
    console.log('log=>catch error in outside:', err); // F
  }
});

/**
 * 异步委托
 */
(function () {
  function* foo() {
    let r2 = fetch('url2');
    let r3 = fetch('url3?q=' + r2);
  }

  function* bar() {
    let r1 = fetch('url1');
    let r3 = yield* foo();
    console.log('log=>', r3);
  }

  // use the run function to run
  // run(bar)
})();

