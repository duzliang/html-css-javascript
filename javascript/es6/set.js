let set = new Set();
set.add(1);
set.add('1');

console.log(set.size);

/**
 * set forEach与array forEach方法参数不同
 */
set.forEach((value, key, ownerSet) => {
    console.log(key, ':', value);
    console.log(ownerSet === set);
});

/**
 * WeekSet
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
