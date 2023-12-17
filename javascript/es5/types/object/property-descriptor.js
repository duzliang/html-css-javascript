/**
 * Object property descriptors
 *
 * value
 * writable
 * enumerable
 * configurable
 */

(function() {
  'use strict';

  var mo = {
    name: 'duke',
  };

  console.log('pdl=>', Object.getOwnPropertyDescriptor(mo, 'name'));
  // {
  //    value: 2,
  //    writable: true,
  //    enumerable: true,
  //    configurable: true
  // }

  // 1. use Object.defineProperty(options) to define or modify a property
  Object.defineProperty(mo, 'age', {
    value: 18,
    /**
     * false
     * 1. can't change it's value
     * 2. default:
     * silently failed;
     * in strict mode: throw error: TypeError: Cannot assign to read only
     */
    writable: false,
    enumerable: false,
    /**
     * false
     * 1. can't use defineProperty to config property descriptor
     * 2. can't use delete to delete property
     * 3. can't change it back
     * 4. can set writable to false, but can't set to true again
     */
    configurable: true,
  });
  console.log('pdl2=>', Object.getOwnPropertyDescriptor(mo, 'age'));
  mo.age = 22;
  console.log('mo=>', mo);
}); // add () if want to test

/**
 * 不可变性
 * writable
 * configurable
 */
(function() {
  var me = {};

  // 1. 对象常量
  Object.defineProperty(me, 'FAVORITE_AGE', {
    value: 18,
    writable: false,
    configurable: false,
  });
  console.log('me', me);

  // 2. 禁止扩展: 保留已有属性，禁止添加新属性
  Object.preventExtensions(me);
  me.name = 'duke';
  console.log('new me', me); // no name

  // 3. 密封：实际调用Object.preventExtensions(),把所有属性configurable:false
  Object.seal(me);
  console.log('seal me', me);

  // 4. 冻结：实际调用Object.seal()，同时把所有属性writable:false
  Object.freeze(me);
  console.log('me dp', Object.getOwnPropertyDescriptors(me));
});

/**
 * 可枚举
 * enumerable
 * in: 对象本身或者原型链中
 * hasOwnProperty: 对象自身，不搜索原型链
 */
(function() {
  var mo = {};

  Object.defineProperty(
    mo,
    'a',
    // 让a像普通属性一样可以枚举
    { enumerable: true, value: 2 },
  );

  Object.defineProperty(
    mo,
    'b',
    // 让b不可枚举
    { enumerable: false, value: 3 },
  );

  console.log(mo.b); // 3
  console.log('b in mo', 'b' in mo); // true
  console.log('mo has b', mo.hasOwnProperty('b')); // true

  // .......

  for (var k in mo) {
    console.log(k, mo[k]);
  }
  // "a" 2

  console.log('aw a', mo.propertyIsEnumerable('a')); // true
  console.log('aw b', mo.propertyIsEnumerable('b')); // false

  console.log('mo keys', Object.keys(mo)); // ['a']
  console.log('mo properties', Object.getOwnPropertyNames(mo)); // ['a', 'b']
});
