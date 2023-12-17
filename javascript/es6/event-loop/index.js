/**
 * 微任务队列，事件循环
 * 目前可以使用Promise.then()来实现微任务队列
 */
(function() {
  Promise.resolve()
    .then(() => alert('promise done!'))
    .then(() => alert('code finished'));
})();
