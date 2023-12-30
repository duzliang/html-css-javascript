/**
 * 原始实现
 */
(function(isRun) {
  if (!isRun) return;

  // 1, 使用对象，但是只能设置字符串作为键
  var mapObj = Object.create(null);
  mapObj.count = 1;

  if (mapObj.count) {
    console.log('map has count property');
  }

  var keyObj = {};
  var id1 = { id: 1 };
  var id2 = { id: 2 };
  keyObj[id1] = 'name';
  keyObj[id2] = 'age';
  console.log('log=>keyObj', keyObj); // 被转化成字符串，覆盖了，所以只有一个建，age

  // 2，使用平行数组模拟实现 Map 功能
  let MapLike = function() {
    let keys = [];
    let values = [];

    function set(key, value) {
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        values.push(value);
      } else {
        values[keys.indexOf(key)] = value;
      }
    }

    function get(key) {
      return values[keys.indexOf(key)];
    }

    return {
      set,
      get,
    };
  };

  let mapLike = new MapLike();
  mapLike.set('name', 'duzl');
  mapLike.set('age', 1);
  mapLike.set(id1, 'id1'); // 可以使用任意类型作为键
  mapLike.set(id2, 'id2');
  console.log('log=>name', mapLike.get('name'));
  console.log('log=>age', mapLike.get('age'));
  console.log('log=>id1', mapLike.get(id1));
  console.log('log=>id2', mapLike.get(id2));
})(false);

/**
 * ES6
 */
(function(isRun) {
  if (!isRun) return;

  var map = new Map();
  var id1 = { id: 1 };
  var id2 = { id: 2 };

  map.set('name', 'duzl');
  map.set('age', 1);
  map.set(id1, 'id1');
  map.set(id2, 'id2');

  console.log('log=>name', map.get('name'));
  console.log('log=>age', map.get('age'));
  console.log('log=>id1', map.get(id1));
  console.log('log=>id2', map.get(id2));
  console.log('log=>m size', map.size);

  // map.delete('age');
  // map.has('age');

  // map.clear();
  // console.log('log=>m size', map.size);

  // Map 接受 iterable 作为参数 使用 entries 创建副本
  let map2 = new Map(map.entries());
  console.log('log=>map2', map2.get('name'), map2.size);

  // 等价于
  let map3 = new Map(map);
  console.log('log=>map3', map3.get('name'), map3.size);

  /**
   * 私有属性 es5
   */

  var Person = (function() {
    var privateData = [];
    var privateId = 0;

    function Person(name) {
      Object.defineProperty(this, '_id', { value: privateId++ });

      privateData[this._id] = {
        name: name,
      };
    }

    Person.prototype.getName = function() {
      return privateData[this._id].name;
    };

    return Person;
  })();

  /**
   * 私有属性 es6 WeakMap
   */

  var Person = (function() {
    var privateData = new WeakMap();

    function Person(name) {
      privateData.set(this, { name: name });
    }

    Person.prototype.getName = function() {
      return privateData.get(this).name;
    };

    return Person;
  })();
})(true);
