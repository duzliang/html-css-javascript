/**
 * set是一个值的集合，其中的值唯一（重复会被忽略
 */

let set = new Set();
set.add(1);
set.add('1');

console.log(set.size);
console.log('log=>', set.has(1));
set.delete('1');
console.log('log=>', set.has('1'));

/**
 * set forEach与array forEach方法参数不同
 */
set.forEach((value, key, ownerSet) => {
    console.log(key, ':', value);
    console.log(ownerSet === set);
});

/**
 * WeekSet
 * 值必须是对象
 */

let wset = new WeakSet(),
key = {};

wset.add(key);
console.log(wset.has(key));

wset.delete(key);
console.log(wset.has(key));

//

wset.add(2);

/**
 * 验证weak set 弱引用
 *
 */

var weakSet = new WeakSet(),
wObj = {};

weakSet.add(wObj);

wObj = null;

weakSet.has(wObj); // false
