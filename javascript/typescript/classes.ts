class Point {
  x = 0;
  y = 0;
  // overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // todo
  }
}

// const pt = new Point();

class BadGreeter {
  name: string; // or name!: string;
}

class GoodGreeter {
  name: string;

  // normal
  constructor(name = 'hello') {
    this.name = name;
  }
}

class Greeter {
  readonly name: string;

  constructor(newName) {
    if (!newName) {
      this.name = newName;
    }
  }

  error() {
    // this.name = 'hello'; // error
  }
}

const greeter = new Greeter('world');
// greeter.name = 'world'; // error

/**
 * Super call, extends
 */
class Base {
  k = 4;

  show(name: string) {
    console.log(`It's ${name}`);
  }
}

class Drived extends Base {
  constructor() {
    super(); // must call super() if has base class
    console.log(this.k);
  }

  // Method: a funciton property
  say(msg: string): void {
    console.log(msg);
  }

  // overriding methods
  show(name: string) {
    console.log(`It's my ${name}`);
  }
 }

/**
 * Getter and Setter
 */
class GS {
  _length = 0;

  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
  }
}

/**
 * Class Heritage
 */
interface Pingable {
  ping(): void;
}

interface Checkable {
  check(name: string): boolean;
}

// can implements multi interface
class Sonar implements Pingable, Checkable {
  ping() {
    console.log('ping!');
  }

  check(s): boolean {
      return s.toLowerCase === 'ok';
  }
}

