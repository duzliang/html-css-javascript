/**
 * 迭代器： 消除for循环，尤其是多层嵌套时的复杂性及错误
 */

// es5 iterator

function createIterator(items) {
    var i = 0;

    return {
        next: function () {
            var done = i >= items.length;
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value,
            }
        }
    }
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // {done: false, value: 1}
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // {done: true, value: undefined}

console.log(iterator.next()); 

/**
 * 生成器是一种返回迭代器的函数
 * 1. 通过function后的*表示，*可以紧挨着生成器名称，也可以加一个空格
 * 2. 生成器中使用yield关键字，且只能用在生成器中
 */

fucntion * createIterator() {
    yield 1;
    yield 2;
    yield 3;
}

var iterator = createIterator();

console.log(iterator.next().value); // 1
console.log(iterator.next().value);
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // undefined

/**
 * 生成器中的循环中使用yield
 */

function* createIterator(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // {done: false, value: 1}
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // {done: true, value: undefined}

/**
 * 生成器函数表达式
 */

var createIterator = function* (items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // {done: false, value: 1}
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // {done: true, value: undefined}

/**
 * 箭头函数不能创建生成器
 */
var createIterator = () => { };

/**
 * 可迭代对象和for-of循环
 * 
 * @desc 可迭代对象具有Symbol.iterator属性，是一种与迭代器密切相关的对象
 * es6中，所有的集合对象(Array, Set, Map)和字符串都是可迭代的
 * 
 * 生成器默认为Symbol.iterator属性赋值，所以所有通过生成器创建的迭代器都是可迭代对象
 */

var values = [1, 2, 3];
for (let num of values) {
    console.log(num);
}

/**
 * 访问默认迭代器
 */

var values = [1, 2, 3];
var iterator = values[Symbol.iterator]();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // {value: undefined, done: true}

/**
 * 检测对象是否可迭代
 */

function isIterable(obj) {
    return typeof obj[Symbol.iterator] === 'function';
}

console.log(isIterable([1, 2, 3]));
console.log(isIterable('hello'));
console.log(isIterable(new Map()));
console.log(isIterable(new Set())); // above all true
console.log(isIterable(new WeakMap())); // false
console.log(isIterable(new WeakSet())); // false

/**
 * 创建可迭代对象
 * 
 * 默认情况下，自定义的对象都是不可迭代的，
 * 但是如果给Symbol.iterator属性添加一个生成器，则可将其变为可迭代对象
 */

var collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }
}

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let c of collection) {
    console.log(c);
}

/**
 * 内建迭代器
 * entries()    =>集合所有的键值对
 * values()     =>集合所有的值
 * keys()       =>集合所有的键
 */

var colors = ['red', 'green', 'blue'];
var tracking = new Set([11, 22, 33]);
var data = new Map();

data.set('title', 'es6');
data.set('type', 'js');

// 1.entries()
for (let entry of colors.entries()) {
    console.log('array entries=>', entry);
}
// array entries=> (2) [0, "red"]
// array entries=> (2) [1, "green"]
// array entries=> (2) [2, "blue"]

for (let entry of tracking.entries()) {
    console.log('set entries=>', entry);
}
// set entries=> (2) [11, 11]
// set entries=> (2) [22, 22]
// set entries=> (2) [33, 33]

for (let entry of data.entries()) {
    console.log('map entries=>', entry);
}
// map entries=> (2) ["title", "es6"]
// map entries=> (2) ["type", "js"]

// 2. values() todo Array.values()好像暂时不支持
for (let value of colors.values()) {
    console.log('array values=>', value);
}

for (let value of tracking.values()) {
    console.log('set values=>', value);
}
// set values=> 11
// set values=> 22
// set values=> 33

for (let value of data.values()) {
    console.log('map values=>', value);
}
// map values=> es6
// map values=> js

// 3. keys()
for (let key of colors.keys()) {
    // typeof key => 'number'
    // for-in 迭代数组的属性，而不是数字类型的索引 ？？
    console.log('array keys=>', key);
}
// array keys=> 0
// array keys=> 1
// array keys=> 2

for (let key of tracking.keys()) {
    console.log('set keys=>', key);
}
// set keys=> 11
// set keys=> 22
// set keys=> 33

for (let key of data.keys()) {
    console.log('map keys=>', key);
}
// map keys=> title
// map keys=> type

/**
 * 解构与for-of循环
 */

var data = new Map();

data.set('title', 'es6');
data.set('type', 'js');

for (let [key, value] of data) {
    console.log(key + '=' + value);
}

/**
 * NodeList迭代器
 */

var divs = document.getElementsByTagName('div');
for (let div of divs) {
    console.log(div.id);
}

/**
 * 给迭代器传递参数
 * 如果给迭代器的next()方法传递参数，则该值会替换生成器内部上一条yield的返回值
 */

function* createIterator() {
    let first = yield 1;
    let second = yield first + 2;
    yield second + 3;
}

let iterator = createIterator();
console.log(iterator.next()); // 第一次传值都会被丢弃
console.log(iterator.next(4));
console.log(iterator.next(5));
console.log(iterator.next());

// {value: 1, done: false}
// {value: 6, done: false}
// {value: 8, done: false}
// {value: undefined, done: true}

/**
 * 在迭代器中抛出错误
 * 
 * 模拟函数结束执行的两种方法
 * 1. 返回值
 * 2. 抛出错误
 * 增加生成器内部的编程弹性
 */

function* createIterator() {
    let first = yield 1;
    let second;

    try {
        second = yield first + 2;
    } catch (ex) {
        second = 6;
    }
    yield second + 3;
}

var iterator = createIterator();
console.log(iterator.next());
console.log(iterator.next(4));
console.log(iterator.throw(new Error('boom'))); // {value: 9, done: false}
console.log(iterator.next());

/**
 * 生成器返回语句
 * 
 * 在生成器中，return表示所有操作都已完成，done会被自动设为true
 * return的值也会被赋给value
 * 
 */

function* createIterator() {
    yield 1;
    //  return;
    return 22;
    yield 2;
    yield 3;
}

var iterator = createIterator();
console.log(iterator.next());
console.log(iterator.next()); // {value: undefined, done: true} reutrn 22=>{value: 22, done: true}
console.log(iterator.next()); // {value: undefined, done: true}


/**
 * note：展开运算符和for-of语句会直接忽略通过return语句返回的任何值，
 * 只要done一变为ture就立即停止读取其他值
 */
for (let item of iterator) {
    console.log(item);
}
// 只打印一次 => 1

/**
 * 委托生成器
 */

function* createNumberItetator() {
    yield 1;
    yield 2;
}

function* createColorIterator() {
    yield 'red';
    yield 'green';
}

function* createCombinedIterator() {
    yield* createNumberItetator();
    yield* createColorIterator();
    yield true;
}

var iterator = createCombinedIterator();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: "red", done: false}
console.log(iterator.next()); // {value: "green", done: false}
console.log(iterator.next()); // {value: true, done: false}

/**
 * 有返回值
 */
function* createNumberItetator() {
    yield 1;
    yield 2;
    return 3; // 无论使用何种方式，3都无法被返回，只存在与生成器内部
}

function* createReaptingIterator(count) {
    for (let i = 0; i < count; i++) {
        yield 'repeat';
    }
}

function* createCombinedIterator() {
    let result = yield* createNumberItetator();
    // 若想返回return的值，需要显示调用yield
    // yield result;
    yield* createReaptingIterator(result);
}

var iterator = createCombinedIterator();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: "repeat", done: false}
console.log(iterator.next()); // {value: "repeat", done: false}
console.log(iterator.next()); // {value: repeat, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

/**
 * yield * 应用于字符串，调用字符串默认迭代器
 */
function* createStringIterator() {
    yield* 'hello';
}

var iterator = createStringIterator();
console.log(iterator.next()); // {value: "h", done: false}
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); // {value: undefined, done: true}

/**
 * 异步任务执行
 * 
 * 1. 简单任务执行器
 */
function run(taskDef) {
    // 创建一个无限使用的迭代器
    let task = taskDef();

    // 开始执行任务
    let result = task.next();

    // 如果任务未完成，继续执行
    function step() {
        if (!result.done) {
            result = task.next();
            step();
        }
    }

    // 开始执行
    step();
}

run(function* () {
    console.log(1);
    yield;
    console.log(2);
    yield;
    console.log(3);
    yield;
});

/**
 * 异步任务执行器
 */
function run(taskDef) {
    // 创建一个无限使用的迭代器
    let task = taskDef();

    // 开始执行任务
    let result = task.next();

    // 如果任务未完成，继续执行
    function step() {
        if (!result.done) {
            if (typeof result.value === 'function') {
                result.value(function (err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                })
                result = task.next(data);
                step();
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }

    // 开始执行
    step();
}
 