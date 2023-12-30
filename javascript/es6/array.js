// Array.of
(function() {
  let pitFallsArr = Array(3); // 传入数字时不是预期行为
  console.log('log=>pitFallsArr', pitFallsArr);

  // 解决数字的空槽行为，符合语意
  let arr = Array.of(3);
  console.log('log=>arr', arr);
});

/**
 * Array.from
 * 从类数组创建数组
 */
(function() {
  let arrLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
  };
  console.log('log=>arrLike', arrLike);

  let arr = Array.from(arrLike);
  console.log('log=>arr', arr);

  // 含有空槽的类似组
  let arrWithSlotLike = {
    0: 'a',
    2: 'c',
    length: 3,
  };
  console.log('log=>arrWithSlotLike', arrWithSlotLike);
  let arrFromSlot = Array.from(arrWithSlotLike);
  console.log('log=>arrFromSlot', arrFromSlot); // [ 'a', undefined, 'c' ]

  // 接受映射回调
  let arrLike2 = {
    length: 4,
    2: 'foo',
  };

  let arrLike2Arr = Array.from(arrLike2, function mapper(val, idx) {
    if (typeof val == 'string') {
      return val.toUpperCase();
    } else {
      return idx;
    }
  });
  console.log('log=>arrLike2Arr', arrLike2Arr);
});

/**
 * Array.copyWithin
 * 从一个数组中复制一部分到同一个数组的另一个位置，覆盖这个位置所有原来的值
 */
(function() {
  let arr = [1, 2, 3, 4, 5];
  console.log('log=>arr', arr);
  arr.copyWithin(3, 0);
  console.log('log=>arr2', arr);

  // 复制一部分到另一个数组的另一个位置，不覆盖原来的值
  arr.copyWithin(0, 3, 4);
  console.log('log=>arr3', arr);
})();

/**
 * Array.some 是否有满足条件的值 return true or false
 * Array.find 找到匹配的值并返回 return value
 * Array.findIndex
 * 找到匹配的值的索引并返回
 * Array.fill
 * 填充数组的元素
 */
(function() {
  let obj = { name: 'foo' };
  let arr = [1, 2, 3, 4, 5, obj];
  console.log('log=>arr', arr);
  console.log('log=>arr values', [...arr.values()]);
  console.log('log=>arr keys', [...arr.keys()]);
  console.log('log=>arr entries', [...arr.entries()]);

  // 找到第一个满足条件的值
  let result = arr.some(function(val) {
    return val > 3;
  });
  console.log('log=>result', result);

  // 找到第一个满足条件的值
  let objVal = arr.find((value) => value.name === 'foo');
  console.log('log=>objVal', objVal);
})();
