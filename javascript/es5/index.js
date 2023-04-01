/** list all array's methods */
console.log(Object.getOwnPropertyNames(Array.prototype));
/**
 * [
  'length',      'constructor',    'concat',
  'copyWithin',  'fill',           'find',
  'findIndex',   'lastIndexOf',    'pop',
  'push',        'reverse',        'shift',
  'unshift',     'slice',          'sort',
  'splice',      'includes',       'indexOf',
  'join',        'keys',           'entries',
  'values',      'forEach',        'filter',
  'flat',        'flatMap',        'map',
  'every',       'some',           'reduce',
  'reduceRight', 'toLocaleString', 'toString'
]
 */

let arr = [1, 2, 3, 4, 5];
let strs = ['a', 'b', 'c', 'd', 'e'];

// get value bigger than 3
let newArr = arr.filter((item) => item > 3);
console.log(newArr);

// get sum of all values
let sum = arr.reduce((prev, curr) => prev + curr);
console.log(sum);

// connect two arrays
let newStrs = arr.concat(strs);
console.log(newStrs);

// copyWith the arr
let copyArr = arr.copyWithin(0, 1, 3);
console.log(copyArr);
