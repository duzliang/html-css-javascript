/**
 * function type expressions
 */
function greeter(fn: (a: string) => void) {
  fn('Hello World!');
}

function printConsole(s: string) {
  console.log(s);
}
greeter(printConsole);

// also can use type alias
type GreetFunction = (a: string) => void;
function greeterTypeAlias(fn: GreetFunction) {
  // ...
}

/**
 * Call Singnatures
 */
type DescribleableFunction = {
  description: string;
  (someArgs: number): boolean; // use : between the parameter list and the return type rather than =>
}
function doSomething(fn: DescribleableFunction) {
  console.log(fn.description + ' returned' + fn(8));
}

/**
 * Construct Singnature
 */

interface SomeObject {
  id: string;
  name: string;
}
type SomeConstructor = {
  new(s: string): SomeObject;
}
function fn(ctor: SomeConstructor) {
  return new ctor('hello construct');
}

// called with or without new
interface CallOrConstruct {
  new(s: string): Date;
  (n?: number): number;
}

/**
 * Generic Functions
 */
// the types of the input relate to the type of the output
function firstElement(arr: any[]) {
  return arr[0];
}
function fistElementWithType<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// use
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

/**
 * Interface
 */
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output) {
  return arr.map(func);
}
// use
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(['1', '2', '3'], n => parseInt(n));

/**
 * Constraints
 */
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// use
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);

/**
 * Working with Constrained Values
 */
function minimumLength<Type extends { length: number }>(obj: Type, minimum: number) {
  if (obj.length > minimum) {
    return obj;
  } else {
    return { length: minimum };
  }
}

// use
// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
// console.log(arr.slice(0));

/**
 * Specify Type Arguments
 * type parameters are for relating the types of multiple values.
 */
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// const arrCombine = combine([1, 2, 3], ["hello"]); // error
const arrCombine = combine<string | number>([1, 2, 3], ["hello"]); // manually specify

/**
 * Guidelines for writing good Generic Functions
 */

// 1.Push Type Parameters Down
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
// => Rule: When possible, use the type parameter itself rather than constraining it

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);

// 2.Use Fewer Type Parameters
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
  return arr.filter(func);
}
// => Rule: Always use as few type parameters as possible

// 3. Type parameters should appear twice
function greet<Str extends string>(s: Str) {
  console.log(s);
}
// same as:
function greetGood(s: string) {
  console.log(s);
}
// => Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it

/**
 * Optional parameters
 */
function f(x?: number) { }
f();
f(1);

declare function fd(x?: number): void;
fd();
fd(1);
fd(undefined);

/**
 * Functioin Overload
 */
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

// use
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); // error

function fno(x: number): void;
function fno() {
  // ...
}
// fno(); // Errors: Expected 1 arguments, but got 0.
// The signature of the implementation is not visible from the outside.
// When writing an overloaded function, you should always have two or more signatures above the implementation of the function.

/**
 * Writting Good Overlaods
 */
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len(""); // OK
len([0]); // OK
// len(Math.random() > 0.5 ? "hello" : [0]); // can’t invoke it with a value that might be a string or an array

function lenGood(s: any[] | string) {
  return s.length;
}
// => Always prefer parameters with union types instead of overloads when possible

/**
 * Declaring `this` in a function
 */
type User = {
  id: number;
  admin: boolean;
  becomeAdmin: Function;
}

const user = {
  id: 1,
  admin: false,
  becomeAdmin() {
    this.admin = true;
  }
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
// const db = getDB();
// const admins = db.filterUsers(function(this: User){
//   return this.admin;
// })
