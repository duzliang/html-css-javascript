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
 */
(function() {
  /**
   * 数字和字符串的隐式强制类型转换
   *
   * @specification
   * 根据ES5规范11.6.1节，如果某个操作数是字符串或者能够通过以下步骤转换为字符串的话，+将进行拼接操作。
   * 如果其中一个操作数是对象（包括数组），则首先对其调用ToPrimitive抽象操作（规范9.1节），
   * 该抽象操作再调用[[DefaultValue]]（规范8.12.8节），以数字作为上下文
   *
   * @note
   * 如果+的其中一个操作数是字符串（或者通过以上步骤可以得到字符串），则执行字符串拼接；否则执行数字加法
   *
   */
  var a = '42';
  var b = '0';

  var c = 42;
  var d = 0;
  console.log('log=>a+b', a + b); // "420"
  console.log('log=>c+d', c + d); // 42

  /**
   * a + ""（隐式）和前面的String(a)（显式）之间有一个细微的差别需要注意。
   * 根据ToPrimitive抽象操作规则，a + ""会对a调用valueOf()方法，
   * 然后通过ToString抽象操作将返回值转换为字符串。而String(a)则是直接调用ToString()
   * @type {number[]}
   */
  var arr1 = [1, 2];
  var arr2 = [3, 4];
  console.log('log=>array plus', arr1 + arr2); // "1,23,4"

  var aObj = {
    valueOf: function() {
      return '42';
    },
    toString: function() {
      return '4';
    },
  };
  console.log('log=>aObj plus:', aObj + ''); // 42
  console.log('log=>aObj toString:', String(aObj)); // 4
});

/**
 * 布尔值强制类型转换
 * || && 叫操作数选择器运算符更贴切
 */
(function() {
  var a = '42';
  var b = 'abc';
  var c = null;

  console.log('log=>1||', a || b);
  console.log('log=>2||', a || c);
  console.log('log=>3||', c || a);
  console.log('log=>1&&', a && b);
  console.log('log=>2&&', a && c);
});

/**
 * 符号强制类型转换
 */
(function() {
  var s1 = Symbol('cool');
  console.log('log=>s1', String(s1));
  var s2 = Symbol('not cool');
  // console.log('log=>s2', s2 + ''); // TypeError: Cannot convert a Symbol value to a string
  console.log('log=>s1 bool:', Boolean(s1)); // true
  var s3 = Symbol('');
  console.log('log=>s3 bool:', Boolean(s3)); // true
});

/**
 * loose equals vs strict equals
 * == vs ===
 * ==允许在相等比较中进行强制类型转换，而===不允许
 *
 * 1. string vs number
 * @specification
 * (1) 如果Type(x)是数字，Type(y)是字符串，则返回x == ToNumber(y)的结果
 * (2) 如果Type(x)是字符串，Type(y)是数字，则返回ToNumber(x) == y的结果
 *
 * @specification
 * 2. otherType vs boolean
 * (1) 如果Type(x)是布尔类型，则返回ToNumber(x) == y的结果
 * (2) 如果Type(y)是布尔类型，则返回x == ToNumber(y)的结果
 */
(function() {
  var x = '1';
  var y = 1;
  console.log('log=>1', x == y); // true 进行了类型转换
  console.log('log=>2', x === y); // false 也会判断类型，但是判断类型不同后的处理方式不同

  var z = true;
  var x1 = '12';
  var y1 = 12;
  console.log('log=>x vs z:', x == z); // true
  console.log('log=>y vs z:', y == z); // true
  console.log('log=>x1 vs z:', x1 == z); // false
  console.log('log=>y1 vs z:', y1 == z); // false
});

/**
 * 假值的相等比较
 * 特殊值
 */
(function() {
  "0" == null;           // false
  "0" == undefined;      // false
  "0" == false;          // true -- 晕！
  "0" == NaN;            // false
  "0" == 0;              // true
  "0" == "";             // false

  false == null;         // false
  false == undefined;    // false
  false == NaN;          // false
  false == 0;            // true -- 晕！
  false == "";           // true -- 晕！
  false == [];           // true -- 晕！
  false == {};           // false

  "" == null;            // false
  "" == undefined;       // false
  "" == NaN;             // false
  "" == 0;               // true -- 晕！
  "" == [];              // true -- 晕！
  "" == {};              // false

  0 == null;             // false
  0 == undefined;        // false
  0 == NaN;              // false
  0 == [];               // true -- 晕！
  0 == {};               // false
});
