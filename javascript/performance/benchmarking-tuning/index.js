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

  console.log('log=>', factorial(5));
})();
