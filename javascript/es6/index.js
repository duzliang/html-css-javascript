/**
 * 1. let,const and block scope
 * @note use const to declare a constant variable
 * @note use let to declare a variable
 */

{
  var a = 2;

  console.log('log=>c', typeof c);

  // block scope
  {
    // console.log(a); // ReferenceError
    let a = 3;
    // console.log('log=>', a); // 3
  }

  // console.log('log=>out a:', a);
}

/**
 * good
 */
{
  // 在块的开始位置，声明这个块需要的变量，防止 TDZ 的出现
  let a = 2;
  let b = 3;
  let c = 4;

  // console.log('log=>a:', a);
  // console.log('log=>b:', b);
  // console.log('log=>c:', c);
}

/**
 * let const can use in loop
 */
(function() {
  // for
  for (let i = 0; i < 3; i++) {
    console.log('log=>i:', i);
  }
  // for (const i = 0; i < 3; i++) { // i occur error
  //   console.log('log=>i:', i);
  // }

  // for of
  for (let i of [1, 2, 3]) {
    console.log('log=>for-of l:', i);
  }
  for (const i of [1, 2, 3]) {
    console.log('log=>for-of c:', i);
  }

  // for in
  for (let i in { a: 1, b: 2, c: 3 }) {
    console.log('log=>for-in l:', i);
  }
  for (const i in { a: 1, b: 2, c: 3 }) {
    console.log('log=>for-in c:', i);
  }
});

/**
 * block scope function
 * @note variable hoisting, but let can not hoist
 */
(function() {
  foo(); // work

  function foo() {
    console.log('log=>in foo');
  }

  // console.log('log=>', a); // ReferenceError Cannot access 'a' before initialization
  let a = 2;
});

/**
 * spread and rest params
 * 1. spread: used before any iterable object, eg: ...arr, ...obj etc.
 * 2. rest: used to collect all the rest params, eg: function foo(...args) {}
 */
(function() {
  const arr = [1, 2, 3];

  // spread
  const newArr = [...arr];

  // rest
  const [a, b, ...rest] = arr;

  // collect the rest params in a function
  // args is an array, not like the old arguments is an array like in ES5
  function foo(...args) {
    console.log('log=>args:', args);
    console.log('log=>type', Array.isArray(args)); // true
  }

  // foo();

  // implement the same way before ES6
  function oldFoo() {
    var args = Array.prototype.slice.call(arguments);

    args.push(2, 3);
    console.log('log=>args:', args); // [ 'a', 'b', 1, 2, 3 ]
    console.log('log=>type', Array.isArray(args)); // true
    console.log('log=>spread:', ...args); // a, b, 1, 2, 3
  }

  oldFoo('a', 'b', 1);
});

/**
 * default params
 * 函数默认参数
 * @note 可以是值，也可以是任意合法的表达式
 */
(function() {
  function foo(a = 'a', b = 'b', c = 'c') {
    console.log('log=>a:', a);
    console.log('log=>b:', b);
    console.log('log=>c:', c);
  }

  // foo('duke');

  function oldFoo(a, b, c) {
    a = a || 'a';
    b = b || 'b';
    c = c || 'c';
    console.log('old=>a:', a);
    console.log('old=>b:', b);
    console.log('old=>c:', c);
  }

  // if a is a falsy value, the default value will be used
  let a = 0;

  // oldFoo(a);

  function oldFooImproved(a, b, c) {
    a = a !== undefined ? a : 'a';
    b = b !== undefined ? b : 'b';
    c = c !== undefined ? c : 'c';

    console.log('improved=>a:', a);
    console.log('improved=>b:', b);
    console.log('improved=>c:', c);
  }

  // oldFooImproved(a);

  // es6处理缺失和 undefined
  function fooLack(x = 11, y = 31) {
    console.log(x + y);
  }

  fooLack();                   // 42
  fooLack(5, 6);          // 11
  fooLack(0, 42);         // 42

  fooLack(5);                // 36
  fooLack(5, undefined);  // 36 <-- 丢了undefined
  fooLack(5, null);       // 5  <-- null被强制转换为0

  fooLack(undefined, 6);  // 17 <-- 丢了undefined
  fooLack(null, 6);       // 6  <-- null被强制转换为0

  /**
   * z 会引发 es6 TDZ Error
   */
  var w = 1, z = 2; // ReferenceError: Cannot access 'z' before initialization
  var u = 3;
  function fooComplex( x = w + 1, y = x + 1, z = u + 1 ) {
    console.log( x, y, z );
  }

  fooComplex();

  // 使用 IIFE 作为默认参数
  function fooIIFE(x = (function(v) { return v + 11; })(31)) {
    console.log('log=>x', x);
  }
  fooIIFE(); // 42
  fooIIFE(18); // 18
})();

