/**
 * closure with loop
 * don't work
 */
function closureLoop() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log('times:', i);
    }, i * 1000);
  }
}

closureLoop();

/**
 * fix solution 1
 * use IIFE
 */
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

// closureLoop2();

// pass i directly
function closureLoop21() {
  for (var i = 1; i <= 5; i++) {
    (function(j) {
      setTimeout(function timer() {
        console.log('times:', j);
      }, j * 1000);
    })(i);
  }
}

// closureLoop21();

/**
 * fix solution 2
 * just change var to let
 */
function closureLoop3() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log('times:', i);
    }, i * 1000);
  }
}

// closureLoop3();

/**
 * closure ex2
 */
// function foo() {
//   var myName = "name"
//   let test1 = 1
//   const test2 = 2
//   var innerBar = {
//     getName:function(){
//       console.log(test1)
//       return myName
//     },
//     setName:function(newName){
//       myName = newName
//     }
//   }
//   return innerBar
// }
// var bar = foo()
// bar.setName("name2")
// bar.getName()
// console.log(bar.getName())
