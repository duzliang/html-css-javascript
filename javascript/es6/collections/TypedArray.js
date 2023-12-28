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
})();
