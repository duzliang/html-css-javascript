/**
 * 原始实现
 */
var map = Object.create(null);
map.count = 1;

if (map.count) {
    console.log('map has count property');
}

/**
 * ES6
 */

var map = new Map();
map.set('name', 'duzl');
map.set('age', 1);

map.get('name');

map.size;

map.delete('age');

map.has('age');

map.clear();
map.size;

/**
 * 私有属性 es5
 */

var Person = (function () {
    var privateData = [];
    var privateId = 0;

    function Person(name) {
        Object.defineProperty(this, '_id', { value: privateId++ });

        privateData[this._id] = {
            name: name
        }
    }

    Person.prototype.getName = function () {
        return privateData[this._id].name;
    }

    return Person;
})();

/**
 * 私有属性 es6 WeakMap
 */

var Person = (function () {
    var privateData = new WeakMap();

    function Person(name) {
        privateData.set(this, { name: name });
    }

    Person.prototype.getName = function () {
        return privateData.get(this).name;
    }

    return Person;
})();

