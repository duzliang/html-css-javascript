(function() {
  /**
   * 1. this
   * @returns {string}
   */
  function identify() {
    return this.name.toUpperCase();
  }

  function speak() {
    var greeting = 'Hello, I\'m ' + identify.call(this);
    console.log('log=>', greeting);
  }

  var me = {
    name: 'Duke',
  };
  var you = {
    name: 'Dome',
  };

  identify.call(me); // DUKE
  identify.call(you); // DOME

  speak.call(me);
  speak.call(you);
})();

/**
 *  use this in function
 * @param num
 */
// (function() {
//   function foo(num) {
//     console.log('log=>foo:', num);
//     this.count++;
//   }
//
//   foo.count = 0;
//
//   // version 1
//   // for (var i = 0; i < 10; i++) {
//   //   if (i > 5) {
//   //     foo(i);
//   //   }
//   // }
//   // console.log('log=>foo.count:', foo.count); // 0
//
//   // version 2
//   for (var i = 0; i < 10; i++) {
//     if (i > 5) {
//       foo.call(foo, i);
//     }
//   }
//   console.log('log=>foo.count:', foo.count); // 4
// })();
//
// function foo() {
//   var a = 2;
//   this.bar();
// }
//
// function bar() {
//   console.log('log=>bar:', a);
// }
//
// foo();

/**
 * func invoke stack
 */
(function() {
  function baz() {
    console.log('log=>', 'baz');

    bar();
  }

  function bar() {
    console.log('log=>', 'bar');

    foo();
  }

  function foo() {
    console.log('log=>', 'foo');
  }

  baz();
})();

(function(){
/**
 * this bind rules
 */
function foo() {
  console.log('log=>bind a:', this.a); // 2
}

var a = 2;

// 1. 默认绑定：调用时的上下文决定this
foo(); // 2

// 严格模式不影响函数调用
(function() {
  'use strict';

  foo(); // 2

  // console.log('log=>strict a:', this.a) // this is undefined
})();

// 2. 隐式绑定：调用位置有上下文对象，或者被对象拥有或包含
var objFunc = {
  a: 'obj',
  foo: foo,
}

objFunc.foo(); // obj
  
}());

(function(){
  console.log('latest------------------------->');
  
  function foo() {
    console.log('foo=>', this.a);
  }

  var obj = {
    a: 32,
    foo: foo,
  };

  var a = 'this is global a';
  foo();

  var bar = obj.foo;
  var a = 'oops! this is global';
  bar(); // 'oops! this is global'
})();

/**
 * 显示绑定
 * call(context, arg, arg2, ...)
 * apply(context, arguments[])
 */
(function(){
  function foo() {
    console.log('foo=>d', this.a);
  }

  var obj = {
    a: 'd-2',
  };

  foo.call(obj);
})();
