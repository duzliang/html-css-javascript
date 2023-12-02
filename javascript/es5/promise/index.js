/**
 * 异步控制台
 * 1. 使用断点调试
 * 2. 适用 JSON.stringify 格式化对象获取快照
 */
(function() {
  var a = {
    index: 1,
  };

  console.log('log=>a', a); // log=>a { index: 1 } in Node, a { index: 2 } in Chrome
  a.index++;
});

/**
 * 事件循环
 * 任务调度
 */
(function() {

})();
