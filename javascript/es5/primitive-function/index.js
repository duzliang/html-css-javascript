/**
 * Primitive Function / build-in function / native function
 * 1.String()
 * 2.Number()
 * 3.Boolean()
 * 4.Array()
 * 5.Object()
 * 6.Function()
 * 7.RegExp()
 * 8.Date()
 * 9.Error()
 * 10.Symbol()
 * 始终使用基本类型，除非特殊情况，或者Date, Error必须使用构造函数的方式的情况
 */

(function() {
  // String()
  // 封装，或者装箱
  var s = new String('abc');
  console.log('log=>value s:', s.toString());
  console.log('log=>typeof s', typeof s);
  console.log('log=>instance', s instanceof String);
  console.log('log=>', Object.prototype.toString.call(s));

  console.log('log=>array type:', Object.prototype.toString.call([1, 2])); // [object Array]
  console.log('log=>null type', Object.prototype.toString.call(null)); // [object Null]
  console.log('log=>undefined type', Object.prototype.toString.call(undefined)); // [object Undefined]
  console.log('log=>number type', Object.prototype.toString.call(12)); // [object Number]
  console.log('log=>boolean type', Object.prototype.toString.call(true)); // [object Boolean]

  // 拆封，或者拆箱
  console.log('log=>s value:', s.valueOf());
  // 隐式转换
  var p = s + 'p';
  console.log('log=>typeof p', typeof p);
});

/**
 * Array
 */
(function() {
  // 三者创建数组是一样的
  var arr = new Array([1, 2, 3]);
  var arr1 = Array([1, 2, 3]);
  var arr2 = [1, 2, 3];
  console.log('log=>arr', arr);
  console.log('log=>arr1', arr1);
  console.log('log=>arr2', arr2);

  // 空数组
  var eptArr = new Array(3);
  console.log('log=>eptArr:', eptArr); // [empty × 3]
})();
