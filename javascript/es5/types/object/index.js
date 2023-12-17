/**
 * 理解对象
 * @type {Object}
 */

/**
 * 数据属性
 * ***************************************************
 */
(function() {
  // 1.使用对象实例,然后给对象添加属性和方法
  var instanceObject = new Object();
  instanceObject.name = 'Duke1';
  instanceObject.sayHello = function() {
    console.log(this.name);
  };

  instanceObject.sayHello();

  // 2. 使用对象字面量
  var person = {
    name: 'Duke2',
    sayHello: function() {
      console.log(this.name);
    },
  };

  person.sayHello();
});

/**
 * 数据属性
 */
(function() {
  var person = {
    age: 22,
  };
  Object.defineProperty(person, 'name', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: 'duke',
  });

  console.log('log1=>', person.name); // duke

  person.name = 'dome';
  delete person.name; // can't delete
  for (var prop in person) {
    console.log('forin=>', prop);
  }
  // age

  console.log('log2=>', person.name); // duke

  // 再次配置属性：一旦把configurable配置为false,则不能再次配置该对象的其余属性了
  Object.defineProperty(person, 'name', {
    writable: true,
    configurable: true,
    enumerable: true,
    value: 'new duke',
  });

  // Uncaught TypeError: Cannot redefine property: name
});

/**
 * 访问器属性
 * 1. 使用Object.defineProperty()定义
 * 2. 使用object.
 * ***************************************************
 */
(function() {
  // 定义默认属性
  var book = {
    _year: 2014, // _表示只能通过对象方法访问的属性
    edition: 1,
  };

  // 1. 同时定义访问器属性
  Object.defineProperty(book, 'year', {
    configurable: false,
    enumerable: false,
    get: function() {
      return this._year;
    },
    set: function(newValue) {
      if (newValue > 2014) {
        this._year = newValue;
        this.edition += newValue - 2014;
      }
    },
  });

  // 设置一个属性的值会导致其他属性发生变化(这是使用访问器属性最常见的方式)
  book.year = 2015;

  delete book.year; // can't delete

  for (var prop in book) {
    console.log('forin book=>', prop);
  }
  // _year
  // edition

  console.log('book.edition1=>', book.edition); // 2

  // 2. 只定义getter属性：属性不能写
  Object.defineProperty(book, 'author', {
    get: function() {
      return 'Javscript';
    },
  });
  console.log('author1=>', book.author);
  book.author = 'duke';
  console.log('author2=>', book.author);

  // 3. 只定义setter属性：属性不能读
  Object.defineProperty(book, 'reader', {
    set: function(newValue) {
      this.reader = newValue;
    },
  });
  console.log('reader=>', book.reader);
  // book.reader = 'student'; // Uncaught RangeError: Maximum call stack size exceeded
  console.log('reader=>', book.reader);

  // 2. 遗留方法，在不支持Object.defineProperty()可以用此方式
  book.__defineGetter__('year', function() {
    return this._year;
  });

  book.__defineSetter__('year', function(newValue) {
    if (newValue > 2014) {
      this._year = newValue;
      this.edition += newValue - 2014;
    }
  });
  book.year = 2016;
  console.log('book.edition2=>', book.edition); // 3

  // 同时定义多个属性
  Object.defineProperties(book, {
    _year: {
      value: 2014,
    },
    edition: {
      value: 1,
    },
    year: {
      get: function() {
        return this._year;
      },
      set: function(newValue) {
        if (newValue > 2014) {
          this._year = newValue;
          this.edition += newValue - 2014;
        }
      },
    },
  });
});

/**
 * 读取属性的特性
 */
(function() {
  // 1. 读取一个
  var descriptor = Object.getOwnPropertyDescriptor(book, 'year');
  console.log('descriptor book year =>', descriptor);
  descriptor = {
    configurable: false,
    enumerable: false,
    get: ƒ(),
    set: ƒ(newValue),
  };

  // 2. 读取多个
  var descriptors = Object.getOwnPropertyDescriptors(book);
  console.log('descriptors=>', descriptors);
  descriptor = {
    edition: {
      configurable: true,
      enumerable: true,
      value: 1,
      writable: true,
    },
    year: {
      configurable: false,
      enumerable: false,
      get: ƒ(),
      set: ƒ(newValue),
    },
    _year: {
      configurable: true,
      enumerable: true,
      value: 2014,
      writable: true,
    },
  };
});

/**
 * 遍历
 * 1. for in
 * 2. for of
 */
(function() {
  // 1. for..in循环可以用来遍历对象的可枚举属性列表（包括[[Prototype]]链）
  //    同样，数组也是遍历下标来指向值
  var person = {
    hair: 'black',
    skin: 'yellow',
  };
  var mo = {
    name: 'duke',
    age: 18,
  };

  for (var p in mo) {
    console.log('p of mo:', p);
  }

  // 2. for of使用被遍历对象的迭代器遍历它的值
  //    如数组自身的iterator, 或者自定义的

  /**
   * 使用数组的辅助迭代器
   * forEach(..)会遍历数组中的所有值并忽略回调函数的返回值。
   * every(..)会一直运行直到回调函数返回false（或者“假”值），
   * some(..)会一直运行直到回调函数返回true（或者“真”值）。
   */
  var ga = [1, 2, 3];
  var it = ga[Symbol.iterator]();

  console.log(it.next()); // { value:1, done:false }
  console.log(it.next()); // { value:2, done:false }
  console.log(it.next()); // { value:3, done:false }
  console.log(it.next()); // { done:true }

  /**
   * 自定义迭代器
   * Object.defineProperty()
   */
  var iteratorObj = {
    name: 'duke',
    age: 18,
  };

  Object.defineProperty(iteratorObj, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
      var o = this;
      var idx = 0;
      var ks = Object.keys(o);

      return {
        next: function() {
          return {
            value: o[ks[idx++]],
            done: idx > ks.length,
          };
        },
      };
    },
  });
  // 属性
  console.log('keys of iteratorObj:', Object.keys(iteratorObj));

  // 调用迭代器
  const oi = iteratorObj[Symbol.iterator]();
  console.log(oi.next());
  console.log(oi.next());
  console.log(oi.next());

  // 使用for of遍历
  for (var val of iteratorObj) {
    console.log('iov=>', val);
  }
})();
