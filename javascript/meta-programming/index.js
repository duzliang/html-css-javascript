/**
 * 函数名称
 */
(function() {
  function foo(params) {
    // 函数体
    console.log(params);
  }
  console.log('log=>foo func name:', foo.name); // foo

  let bar = function(params) {
    console.log(params);
  };
  console.log('log=>bar func name:', bar.name); // bar

  let baz = new Function('params', 'console.log(params)');
  baz.name = 'Baz'; // name 不可写
  console.log('log=>baz func name:', baz.name);
  // 可以通过 Object.defineProperty 给函数添加 name 属性并设定值
  Object.defineProperty(baz, 'name', {
    value: 'bazFunc',
    writable: false,
    enumerable: false,
    configurable: false
  });
  console.log('log=>custom baz func name:', baz.name);
});

/**
 * 元属性
 * 以属性访问的形式提供特殊的其他方法无法获取的元信息
 * todo 待补充
 */
(function() {

})();
