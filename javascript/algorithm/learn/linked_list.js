// 在数组 a 中，查找 key, 返回 key 所在的位置
// 其中，n 代表数组 a 的长度
function find(a, n, key) {
  if (!a || n === 0) {
    return -1;
  }

  let i = 0;
  while (i < n && a[i] !== key) {
    i++;
  }
  return i === n ? -1 : i;
}

// 加入哨兵模式
function findWithGuard(a, n, key) {
  if (!a || n === 0) {
    return -1;
  }

  if (a[n-1] === key) {
    return n - 1;
  }

  let temp = a[n-1];
  a[n-1] = key;

  let i = 0;
  while (i < n && a[i] !== key) {
    i++;
  }

  a[n-1] = temp;

  if (i === n - 1) {
    return -1;
  } else {
    return i;
  }
}

// 1 万个随机整数
let arr = [];
for (let i = 0; i < 100000000; i++) {
  arr.push(i);
}
// 记录开始执行时间

console.time('find');
console.log(find(arr, 100000000, 99000000));
console.timeEnd('find');
