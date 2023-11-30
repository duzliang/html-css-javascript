/**
 * 语法
 * 区别：词法
 */

(function() {
  /**
   * 前自增 ++x
   * 先将变量a的值加1，然后再返回该值
   * ++x，它的副作用（将x递增）产生在表达式返回结果值之前
   */
  var a1 = 42;
  var b1 = ++a1;
  console.log('log=>a1', a1); // 43
  console.log('log=>b1', b1); // 43
  /**
   * 后自增 x++
   * a++首先返回变量a的当前值42（再将该值赋给b），然后将a的值加1
   */
  var a2 = 42;
  var b2 = a2++;

  console.log('log=>a2', a2); // 43
  console.log('log=>b2', b2); // 42

  /**
   * 运算符的优先级比=低。
   * 所以b = a++, a其实可以理解为(b = a++), a。
   * 前面说过a++有后续副作用（after side effect），所以b的值是++对a做递增之前的值42。
   * @type {number}
   */
  var a = 42, b;
  b = (a++, a);
  console.log('log=>a', a); // 43
  console.log('log=>b', b); // 43
});

/**
 * 运算符优先级
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 */
(function() {
  var a = 42;
  var b = 'dd';
  var c;
  console.log('log=>1', a && b || c); // dd
  console.log('log=>2', a || b && c); // 42

  // 这说明&&运算符先于||执行，而且执行顺序并非我们所设想的从左到右。原因就在于运算符优先级。
  var d = a && b || c ? c || b ? a : c && b : a;
  console.log('log=>d', d); // 42
})();
