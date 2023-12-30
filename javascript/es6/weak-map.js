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

console.log('log=>', map.get(x));
console.log('log=>has y', map.has(y));
console.log('log=>delete y', map.delete(y));
console.log('log=>', map.get(y)); // undefined
