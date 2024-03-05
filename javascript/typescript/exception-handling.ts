/**
 * JavaScript Error
 */
try {
  throw new Error("I am an error message");
} catch (error) {
  console.error(error);
}

/**
 * Error Sub Types
 */

/** 
 * 1. RangeError
 * 数字类型的变量或参数超出其有效范围
 */
console.log.apply(console, new Array(1000000000)); // Uncaught RangeError: Invalid array length

/**
 * 2. ReferenceError
 * 无效引用
 */
'use strict';
console.log(abc);

/**
 * 3. SyntaxError
 * 语法错误，解析无效的 JavaScript 代码
 */
*** 3

/**
 * 4. TypeError
 * 类型错误 当变量或参数不是有效类型时
 */
'1.2'.toPrecision(1); // Uncaught TypeError: "1.2".toPrecision is not a function

/**
 * 5. URIError
 * 向 encodeURI(), decodeURI()传入无效参数
 */
decodeURI('%'); // URIError: URI malformed
