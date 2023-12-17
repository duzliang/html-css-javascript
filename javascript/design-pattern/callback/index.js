/**
 * 回调问题
 * 信任危机
 * 控制反转
 */

function asyncify(fn) {
  var origfn = fn,
    intv = setTimeout(function() {
      intv = null;
      if (fn) fn();
    }, 0);

  fn = null;

  return function() {
    // 触发太快，在定时器intv触发指示异步转换发生之前？
    if (intv) {
      fn = origfn.bind.apply(
        origfn,
        // 把封装器的this添加到bind(..)调用的参数中，
        // 以及克里化（currying）所有传入参数
        [this].concat([].slice.call(arguments)),
      );
    }
    // 已经是异步
    else {
      // 调用原来的函数
      origfn.apply(this, arguments);
    }
  };
}

function result(data) {
  console.log( a );
}

var a = 0;

ajax( "..pre-cached-url..", asyncify( result ) );
a++;
