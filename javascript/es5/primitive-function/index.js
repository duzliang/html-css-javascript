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
  console.log('log=>bool true', Number(true)); // 1
  console.log('log=>bool false', Number(false)); // 0
});

/**
 * ToBoolean()
 * 假值列表
 * falsy value
 * 1. null
 * 2. undefined
 * 3. 0
 * 4. -0
 * 5. '' 字符串中唯一的假值
 * 6. NaN
 */
(function() {
  console.log('log=>', Boolean(null)); // false
  console.log('log=>', Boolean(undefined)); // false
  console.log('log=>', Boolean(0)); // false
  console.log('log=>', Boolean(-0)); // false
  console.log('log=>', Boolean('')); // false
  console.log('log=>', Boolean(NaN)); // false

  // falsy object 假值对象
  var a = new Boolean(false);
  var b = new Number(0);
  var c = new String('');

  console.log('log=>a', a);
  console.log('log=>b', b);
  console.log('log=>c', c);
  var union = a && b && c;
  console.log('log=>before:', union, typeof union); // [String: ''] object
  var result = Boolean(a && b && c);
  console.log('log=>result', result); // true

  // truthy value 真值列表
  console.log('log=>truthy1', Boolean(1)); // true
  console.log('log=>truthy2', Boolean(-1)); // true
  console.log('log=>truthy3', Boolean('\'\'')); // true
  console.log('log=>truthy4', Boolean({})); // true
  console.log('log=>truthy5', Boolean([])); // true
  console.log('log=>truthy6', Boolean(true)); // true
  console.log('log=>truthy7', Boolean(new Boolean(true))); // true
  console.log('log=>truthy8', Boolean(function() {
  })); // true
});

/**
 * 显式强制类型转换
 */
(function() {

  // 特殊字符 ~  字位截除
  console.log('log=>', String(~42)); // "-42"
  console.log('log=>', String(~~42)); // "42"

  // 显式解析数字字符串
  var a = '42';
  var b = '42px';
  console.log('log=>a', Number(a), parseInt(a)); // 42 42
  console.log('log=>b', Number(b), parseInt(b)); // NaN 42

  var bf = '42.32px';
  console.log('log=>bf', Number(bf), parseFloat(bf)); // NaN 42.32

  // parseInt(string) 接收字符串，非字符串会隐式转换为字符串
  console.log('log=>', parseInt(42));

  // 解析时间字符串
  var date = new Date('2023-11-28 09:02:25');
  console.log('log=>date', date.toString());
  console.log('log=>', Date.parse(date.toString()));
  console.log('log=>hour', parseInt(date.getHours())); // 9
  console.log('log=>minute', parseInt(date.getMinutes())); // 2

  // 解析特殊字符串
  let strObj = new String('42');
  console.log('log=>strObj', parseInt(strObj));

  let strObj2 = {
    num: 21,
    toString: function() {
      return String(this.num * 2);
    },
  };
  console.log('log=>strObj2', parseInt(strObj2)); // 42

  /**
   * JavaScript代码中不会用到基数19。它的有效数字字符范围是0-9和a-i（区分大小写）
   * @type {number}
   */
  console.log('log=>', parseInt(1 / 0, 19)); // 18

  let n1 = parseInt(0.000008);       // 0   ("0" 来自于 "0.000008")
  let n2 = parseInt(0.0000008);      // 8   ("8" 来自于 "8e-7")
  let n3 = parseInt(false, 16); // 250 ("fa" 来自于 "false")
  let n4 = parseInt(parseInt, 16);    // 15  ("f" 来自于 "function..")
  let n5 = parseInt('0x10');         // 16
  let n6 = parseInt('103', 2);  // 2
  console.log('log=>n1', n1);
  console.log('log=>n2', n2);
  console.log('log=>n3', n3);
  console.log('log=>n4', n4);
  console.log('log=>n5', n5);
  console.log('log=>n6', n6);
});

/**
 * 显式转换为布尔值
 */
(function() {
  var a = '0';
  var b = [];
  var c = {};

  var d = '';
  var e = 0;
  var f = null;
  var g;

  // Boolean()不常用
  console.log('log=>a', Boolean(a)); // true
  console.log('log=>b', Boolean(b)); // true
  console.log('log=>c', Boolean(c)); // true

  console.log('log=>d', Boolean(d)); // false
  console.log('log=>e', Boolean(e)); // false
  console.log('log=>f', Boolean(f)); // false
  console.log('log=>g', Boolean(g)); // false

  // 更常用的是一元操作符!和!!
  console.log('log=>!!a', !!a); // true
  console.log('log=>!!b', !!b); // true
  console.log('log=>!!c', !!c); // true

  console.log('log=>!!d', !!d); // false
  console.log('log=>!!e', !!e); // false
  console.log('log=>!!f', !!f); // false
  console.log('log=>!!g', !!g); // false
});

/**
 * 隐式强制类型转换
 * todo
 */
(function() {

})();
