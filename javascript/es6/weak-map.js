/**
 * WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
 * @method
 * get
 * set
 * has
 * delete
 */
let map = new WeakMap();

let x = { id: 1 };
let y = { id: 2 };

map.set(x, 12);
map.set(y, 22);

console.log("log=>", map.get(x));
console.log("log=>has y", map.has(y));
console.log("log=>delete y", map.delete(y));
console.log("log=>", map.get(y)); // undefined

/**
 * WeakMap 定义
 * 1. WeakMap 只接受对象作为键名（null除外），不接受其他类型的值作为键名。
 * 2. WeakMap 的键名所指向的对象，不计入垃圾回收机制。
 */

let wm = new WeakMap();
let obj = {};
wm.set(obj, "123");
console.log("log=>", wm.get(obj));
