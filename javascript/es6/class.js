/**
 * es5近类结构
 */

function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function () {
    console.log(this.name);
}

var person = new Person('duke');
console.log(person.sayName());

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true

/**
 * es6
 */

class Person {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }

    // getter
    get getName() {
        return 'this is getter';
    }

    // setter
    set setName(name) {
        this.name = name;
    }
}

var person = new Person('duke');
console.log(person.sayName());

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
console.log(typeof Person); // 'function'

/**
 * 与上面Person类等价实现
 */
let Person = (function () {
    'use strict';

    const Person = function (name) {
        if (typeof new.target === 'undefined') {
            throw new Error('must invoke by new');
        }

        this.name = name;
    }

    // 指定sayName不可枚举
    Object.defineProperty(Person.prototype, 'sayName', {
        value: function () {
            if (typeof new.target === 'undefined') {
                throw new Error('must invoke by new');
            }

            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true,
    });

    return Person;
})


