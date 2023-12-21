/**
 * 解构
 */
(function() {
  // Array 解构
  let arr = [1, 2, 3];

  let [a, b, c, d, e] = arr;
  console.log('d arr=>', a, b, c, d, e); // d arr=> 1 2 3 undefined undefined

  // Object 解构
  let obj = {
    a: 1,
    b: 2,
    c: 3,
  };
  // 解构并分解为独立的变量(省略了`a:`部分)
  let { a: x, b: y, c: z } = obj;
  console.log('d obj=>', x, y, z); // d obj=> 1 2 3

  /**
   * 对象赋值与解构赋值的区别
   * 模式反转
   * target <- source
   * source <- target
   */
    // 对象赋值，target = source (更确切：property-alias: value)
  let people = { name: '张三', age: 18 };

  // 解构赋值, source = target (更确切：value: variable-alias)
  let { name: nm, age: ag } = people;
  console.log('log=>p', nm, ag);
});

/**
 * 解构不只是声明
 * 是一个通用的赋值操作
 */
(function() {
  var arr = [1, 2, 3];
  var bar = { x: 4, y: 5, z: 6 };
  var a, b, c, x, y, z;

  // 先声明，再赋值，但是必须用括号括起来，否则{会识别成块作用域的开始
  [a, b, c] = arr;
  ({ x, y, z } = bar);
  console.log('log=>1:', a, b, c);
  console.log('log=>2:', x, y, z);

  // 使用计算属性
  let o1 = { a: 1, b: 2, c: 3 };
  let a2 = [];

  // 数组解构赋值
  ({ a: a2[0], b: a2[1], c: a2[2] } = o1);
  console.log('log=>a2', a2);
})();
