//basic variable

// temporal distortion zone

function sayHello(name) {
    let message = 'hello';

    if (name) {
        let msg = 'hello ' + name;
        return msg;
    }
    return message;
}

/**
 * const
 * 
 * #Note：不允许修改绑定，但允许修改绑定的值
 */

const name = 'hello';

/**
 * 循环中的函数
 */
var funcs = [];

for (var i = 0; i < 10; i++) {
    funcs.push(function () {
        console.log(i);
    })
}
console.log('after init=>', i);

funcs.forEach(function (func) {
    func();
});

// 输出了10个10

/**
 * 修正后
 * 1. 使用强制函数表达式
 */

var funcs = [];

for (var i = 0; i < 10; i++) {
    funcs.push((function (value) {
        return function () {
            console.log(value);
        }
    })(i))
}
console.log('after init=>', i);

funcs.forEach(function (func) {
    func();
});

/**
 * 2. 
 */
var funcs = [];

for (let i = 0; i < 10; i++) {
    funcs.push(function () {
        console.log(i);
    })
}

funcs.forEach(function (func) {
    func();
});
