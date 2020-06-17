/**
 * closure with loop
 */
function closureLoop() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log('times:', i);
    }, i * 1000);
  }
}

// closureLoop();

function closureLoop2() {
  for (var i = 1; i <= 5; i++) {
    (function() {
      var j = i;
      setTimeout(function timer() {
        console.log('times:', j);
      }, j * 1000);
    })();
  }
}

closureLoop2();
