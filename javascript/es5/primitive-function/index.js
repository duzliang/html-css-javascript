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
});

/**
 * 强制类型转换
 */
(function() {
  var a = 42;
  var b = a + '';       // 隐式强制类型转换
  var c = String(a);    // 显式强制类型转换
  console.log('log=>a:', a);
  console.log('log=>b:', b);
  console.log('log=>c:', c);

  /**
   * ToString()
   * 特殊值
   * 1. null => 'null'
   * 2. undefined => 'undefined'
   * 3. boolean => 'true' or 'false'
   */

  /**
   * JSON 字符串化
   * JSON-safe JSON 安全字符串
   * 1. 字符串
   * 2. 数字
   * 4. 数组
   * 5. 对象
   */
  console.log('log=>', JSON.stringify(42));   // "42"
  console.log('log=>', JSON.stringify('42')); // ""42""（含有双引号的字符串）
  console.log('log=>', JSON.stringify(null)); // "null"
  console.log('log=>', JSON.stringify(true)); // "true"

  var a = {
    b: 42,
    c: '42',
    d: [1, 2, 3],
  };

  var aJson = JSON.stringify(a, null, 3);
  console.log('log=>aJson', aJson);
  var bJson = JSON.stringify(a, null, '--');
  console.log('log=>bJson', bJson);

  /**
   * ToNumber()
   */
  var n1 = {
    valueOf: function() {
      return '42';
    },
  };
  var n2 = {
    toString: function() {
      return '42';
    },
  };
  var n3 = [4, 2];
  n3.toString = function() {
    return this.join(''); // "42"
  };

  console.log('log=>', Number(n1));                // 42
  console.log('log=>', Number(n2));                // 42
  console.log('log=>', Number(n3));                // 42
  console.log('log=>', Number(''));           // 0
  console.log('log=>', Number([]));           // 0
  console.log('log=>', Number(['abc']));      // NaN

})();
