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

  function * bar() {
    yield 1;
    yield 2;
    yield * foo(); // yield delegation
    yield 5;
  }

  let it = bar();

  console.log('log=>it', it.next().value);
  console.log('log=>it', it.next().value);
  console.log('log=>it', it.next().value);
  console.log('log=>it', it.next().value);
  console.log('log=>it', it.next().value);
})();
