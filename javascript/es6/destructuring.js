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

  // 轻松解决交换两个变量的问题
  let my = 'duke', you = 'you';
  [my, you] = [you, my];
  console.log('log=>my,you', my, you);

  // 多次赋值，解构子对象或数组属性
  let { a: X, a: Y } = { a: 1 };
  console.log('log=>multi:', X, Y);

  // 解构嵌套对象，使用多行展示，便于阅读
  let {
    a: {
      b: {
        c: d,
      },
    },
  } = { a: { b: { c: 1 } } };
});

/**
 * 解构赋值表达式
 * @note 对象或者数组解构的赋值表达式的完成值是所有右侧对象/数组的值
 */
(function() {
  let o = { a: 1, b: 2, c: 3 };

  let p = { a, b, c } = o;
  console.log('log=>val:', a, b, c); // 1 2 3
  console.log('log=>p', p); // {a: 1, b: 2, c: 3}
  console.log('log=>p is o:', p === o); // true

  // 解构默认值设置
  let { a: a1 = 1, d: d1 = '-1' } = o;
  console.log('log=>a1 d1', a1, d1); // 1 -1
})();
