/**
 * js中变量没有类型，值才有类型
 */
(function() {
  /**
   * Array
   */

  /**
   * Array-Likes
   */
  function arrayLike() {
    let arr = Array.prototype.slice.call(arguments);
    arr.push('egg');
    console.log('log=>arr is:', arr);

    let arrFrom = Array.from(arguments);
    console.log('log=>arrFrom:', arrFrom);
  }

  arrayLike('apple', 'pear');

  /**
   * Strings
   */
  var a = 'foo';
  var b = ['f', 'o', 'o'];

  a.length;							// 3
  b.length;							// 3

  console.log('log=>', a.indexOf('o'));					// 1
  console.log('log=>', b.indexOf('o'));					// 1

  var c = a.concat('bar');			// "foobar"
  var d = b.concat(['b', 'a', 'r']);	// ["f","o","o","b","a","r"]

  console.log('log=>a=c', a === c);							// false
  console.log('log=>b=d', b === d);							// false

  console.log('log=>a', a);									// "foo"
  console.log('log=>b', b);									// ["f","o","o"]
});

/**
 * Numbers
 */
(function() {
  // Small Decimal Values
  console.log('log=>', 0.1 + 0.2 === 0.3); // false

  // Number.EPSILON
  // if not, use this polyfill
  if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2,-52);
  }

  function numbersCloseEnoughToEqual(n1,n2) {
    return Math.abs( n1 - n2 ) < Number.EPSILON;
  }

  let a = 0.1 + 0.2;
  let b = 0.3;

  console.log('log=>1', numbersCloseEnoughToEqual( a, b )); // true
  console.log('log=>2', numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ));	// false

  // 整数检测
  console.log('log=>22', Number.isInteger(22));
  console.log('log=>22.2', Number.isInteger(22.2));
  console.log('log=>MAX_SAFE_INTEGER', Number.isInteger(Number.MAX_SAFE_INTEGER));
})();
