/**
 * 工具网站
 * benchmarking: https://benchmarkjs.com/
 * jsperf.app: https://jsperf.app/
 *
 */

(function() {
  console.log('log=>', console.time('for'));
  for (let i = 0; i < 10000; i++) {
    console.count('in for');
    console.log('log=>', i);
  }
  console.timeEnd('for');
});

(function() {
  function factorial(n) {
    if (n < 2) {
      return 1;
    }
    return n * factorial(n - 1);
  }

  console.log('log=>', factorial(10)); // 可能会被引擎直接优化为常量 120
});

/**
 * 尾调用优化（Tail Call Optimization, TCO）
 */
(function() {
  // 简单例子
  function foo(x) {
    return x;
  }

  function bar(y) {
    return foo(y + 1); // 尾调用
  }

  function baz() {
    return 1 + bar(40); // 非尾调用
  }

  baz();

  // 应用
  function factorial(n) {
    function fact(n, res) {
      if (n < 2) {
        return res;
      }
      return fact(n - 1, n * res);
    }

    return fact(n, 1);
  }

  let result = factorial(10);
  console.log('log=>result', result);
})();
