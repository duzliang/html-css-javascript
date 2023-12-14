var a = 42;
var b = a | 0; // asm 标识

function fooASM(stdlib, foreign, heap) {
  'use asm';

  var arr = new stdlib.Int32Array(heap);

  function foo(x, y) {
    x = x | 0;
    y = y | 0;

    var i = 0;
    var p = 0;
    var sum = 0;
    var count = ((y | 0) - (x | 0)) | 0;

    // 计算所有的内部相邻数乘积
    for (i = x | 0; (i | 0) < (y | 0); p = (p + 8) | 0, i = (i + 1) | 0) {
      // 存储结果
      arr[p >> 3] = i * (i + 1) | 0;
    }

    // 计算所有中间值的平均数
    for (i = 0, p = 0; (i | 0) < (count | 0); p = (p + 8) | 0, i = (i + 1) | 0) {
      sum = (sum + arr[p >> 3]) | 0;
    }

    return +(sum / count);
  }

  return {
    foo: foo,
  };
}

var heap = new ArrayBuffer(0x1000);
var foo = fooASM(window, null, heap).foo;

console.log('log=>foo:', foo(10, 20)); // 233
