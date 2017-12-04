/**
 * 默认参数对arguments对象的影响
 * true
 * true
 * true
 * true
 * 
 * in strict mode
 * true
 * true
 * false
 * false
 */

function mixArgs(first, second) {
    // 'use strict';

    console.log(first === arguments[0]);
    console.log(second === arguments[1]);

    first = 'c';
    second = 'd';

    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

/**
 * 前一个参数可以作为后一个参数的默认值，反之，则异常
 */
function getValue(first, second = first) {
    return first + second;
}

function getValueReverse(first = second, second) {
    return first + second;
}

console.log(getValue(1, 1));
console.log(getValue(1));

console.log(getValueReverse(1, 1)); // 2
console.log(getValueReverse(1));    // NaN
console.log(getValueReverse(undefined, 1));    // error second is undefined

/**
 * 前一个参数可以作为后一个参数默认取值函数的参数
 */
function getParamsValue(value) {
    return value + 1;
}

function getValueWithMethod(first, second = getParamsValue(first)) {
    return first + second;
}

console.log(getValueWithMethod(1, 1)); // 2
console.log(getValueWithMethod(1));    // 3

/**
 * function name
 */

function doSomething() { }

let doAnotherSomething = function () { }

console.log(doSomething.name);
console.log(doAnotherSomething.name);

let doSomethingFunc = function doSomethingElse() { };
console.log(doSomethingFunc.name);

var person = {
    getFirstName() {
        return 'duke';
    },
    sayName: function () {
        console.log(this.name);
    }
};

console.log(person.getFirstName.name);
console.log(person.sayName.name);

/**
 * 特例
 * bound doSomething 通过bind()绑定，有前缀bound
 * anonymous 通过Function构造函数，有前缀anonymous
 */

var doSomething = function () {
}

console.log(doSomething.bind().name);
console.log(new Function().name);

/**
 * 明确函数的多重用途
 */

function Person(name) {
    this.name = name;
}

console.log(new Person('duke')); // object
console.log(Person('duke1'));    // undefined


function Person(name) {
    // but this have a bug when invoke by call
    if (this instanceof Person) {
        this.name = name;
    } else {
        throw new Error('must invoke by new');
    }
}

var person = new Person('duke');
var anotherPerson = Person('dome'); // error
var callPerson = Person.call(person, 'duke');

// after fixed
function Person(name) {
    if (new.target === Person) {
        this.name = name;
    } else {
        throw new Error('must invoke by new');
    }
}

var person = new Person('duke');
var callPerson = Person.call(person, 'duke');

/**
 * 块级作用域，
 * 非严格模式：提升至外围函数或全局作用域的顶部
 * 严格模式：提升至块级作用域顶部
 */

'use strict'

if (true) {
    console.log(typeof doSomething); // function
    // console.log(typeof name); // error

    function doSomething() { }

    // let name = 'duke';

    doSomething();
}

console.log(typeof doSomething); // strict mode: undefined,nonstrict mode: function

var person = function (name) {
    return {
        getName: function () {
            return name;
        }
    }
}('duke');

console.log(person.getName()); // duke

// arrow function 
var person = ((name) => {
    return {
        getName: function () {
            return name;
        }
    }
})('duke');

/**
 * 尾调用优化
 *
 */

function doSomething() {
    // 尾调用优化后
    return doSomethingElse();
}

function doSomething() {
    // 不能优化
    let result = doSomethingElse();
    return result;
}

// 闭包
'use strict';

function doSomething() {
    var num = 1,
        func = () => num;

    // 无法优化，该函数是一个闭包
    return func();
}

// 递归调用
function factorial(n) {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

factorial(1000) // Infinity

// 阶乘函数优化
function factorial(n, p = 1) {
    if (n <= 1) {
        return 1 * p;
    } else {
        let result = n * p;

        // 优化后
        return factorial(n - 1, result);
    }
}
