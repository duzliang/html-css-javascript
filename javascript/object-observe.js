/**
 *
 */
(function() {
  let obj = { a: 1, b: 2 };
  Object.observe(obj, function(changes) {
    console.log('log=>changes:', changes);
  }, ['add', 'update', 'delete']);

  obj.a = 2;
})();
