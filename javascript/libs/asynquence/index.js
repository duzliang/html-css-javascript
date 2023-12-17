/**
 * asynquence library
 */
ASQ(
  // 步骤1
  function(done) {
    setTimeout(function() {
      console.log('log=>', 1);
      done('Hello');
    }, 100);
  },
  // 步骤2
  function(done, greeting) {
    setTimeout(function() {
      console.log('log=>', 2);
      done(greeting + ' World');
    }, 100);
  },
)
  // 步骤3
  .then(function(done, msg) {
    setTimeout(function() {
      console.log('log=>', 3);
      done(msg.toUpperCase());
    }, 100);
  })
  // 步骤4
  .then(function(done, msg) {
    console.log('log=>', 4);
    console.log('log=>msg', msg);
  });

// 步骤1（同步）
ASQ(function(done) {
  done('Hello sync');    // 手工同步
})
  // 步骤2（同步）
  .val(function(greeting) {
    return greeting + ' World';
  })
  // 步骤3（异步）
  .then(function(done, msg) {
    setTimeout(function() {
      done('From async' + msg.toUpperCase());
    }, 100);
  })
  // 步骤4（同步）
  .val(function(msg) {
    console.log('log=>mix msg:', msg);
  });
