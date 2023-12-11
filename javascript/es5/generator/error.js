/**
 * 同步错误处理
 */
(function() {
  // 1. cause an error
  function* main() {
    var x = yield 'Hello world!';
    return yield x.toLowerCase();
  }

  var it = main();
  console.log('log=>1', it.next().value); // Hello world!

  try {
    console.log('log=>2', it.next(42).value); // cause an TypeError, or use throw
  } catch (err) {
    console.error('log=>err:', err); // catch the error,  TypeError: x.toLowerCase is not a function
  }

  // 2. throw an error in generator
  function* mainG() {
    var x = yield 'Hello world!';
    console.log('log=>G x', x); // can't get x here
  }

  var itG = mainG();
  itG.next();

  try {
    itG.throw('Oops!');
  } catch (err) {
    console.error('log=>G err:', err); // catch the error: G Oops!
  }
})();
