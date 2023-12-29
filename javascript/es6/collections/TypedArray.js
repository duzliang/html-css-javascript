/**
 * TypedArray
 * 类型化数组
 */
(function() {
  var buf = new ArrayBuffer(32);
  console.log('log=>buf', buf);
  console.log('log=>buf Length', buf.byteLength);

  var arr = new Uint16Array(buf);
  console.log('log=>arr', arr);
  console.log('log=>arr Length', arr.length);

  // 大小端 Endianness

  // JavaScript检测大小端方法
  let isLittleEndian = (function() {
    let buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
  })();
  console.log('log=>littleEndian', isLittleEndian);

  // 多视图，单个 buffer 可以关联多个视图
  let buf2 = new ArrayBuffer(2);
  let view8 = new Uint8Array(buf2);

  let view16 = new Uint16Array(buf2);

  view16[0] = 3085;
  console.log('log=>v8 0', view8[0]); // 13
  console.log('log=>v8 1', view8[1]); // 12

  console.log('log=>v8 s', view8[0].toString(16)); // d
  console.log('log=>v8 s', view8[1].toString(16)); // c

  // 交换
  let tmp = view8[0];
  view8[0] = view8[1];
  view8[1] = tmp;
  console.log('log=>v8 0', view8[0]); // 12
  console.log('log=>v8 1', view8[1]); // 13

  console.log('log=>v16 0', view16[0]); // 3340
})();
