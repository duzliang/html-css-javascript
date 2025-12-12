// 1. 延时执行
function bar() {
    console.log('bar')
}
function foo() {
    setTimeout(bar, 0);
    // foo执行完成后，才会执行setTimeout
    console.time('foo')
    for (let i = 0; i < 5000; i++) {
        let i = 5+8+8+8
        console.log(i)
    }
    console.timeEnd('foo')
}
foo()

// 2. 前5次调用cb，每次调用间隔小于4ms, 大于5次后，每次调用间隔大于等于4ms
function cb() { setTimeout(cb, 0); }
setTimeout(cb, 0);

// 3. 最大延时时长为2147483648ms， 超过这个值，延时时长会设为0
function showName(){
  console.log("极客时间")
}
const timerID = setTimeout(showName,2147483648); //会被理解调用执行
