/**
 * for, for in, for of
 * The difference between: for, for in, for of break, continue, return
 */

let arr = [1, 2, 3, 4, 5];
let subArr = ["first", "second", "third"];

// for of
(function () {
  for (let i of arr) {
    console.log("start:", i);
    for (let j of subArr) {
      console.log("in start", j);
      if (j === "second") {
        break;
      }
    }
    console.log("log for of next =>", i);
  }
})();

// for in
(function () {
  for (let i in arr) {
    console.log("log for in:", i);
    if (i === 2) {
      break; // or continue
    }
    console.log("log for in next =>", i);
  }
});

// for
(function () {
  for (let i = 0; i < arr.length; i++) {
    console.log("log for in:", i);
    if (i === 2) {
      break; // or continue
    }
    console.log("log for in next =>", i);
  }
});
