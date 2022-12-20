/**
 * Generic
 */
function identity<Type>(args: Type): Type {
  return args;
}

let myString = identity<String>('hello');
// or
let myString2 = identity('hello'); // common use

function logIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

/**
 * Generic Types
 */
let myIdentity: <Type>(arg: Type) => Type = identity;
let myIdentityObjLietral: { <Type>(arg: Type): Type } = identity;

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
let myInterfaceDentity: GenericIdentityFn = identity;

// to
interface GenericIdentity<Type> {
  (arg: Type): Type;
}
let myInterfaceIdentity: GenericIdentity<number> = identity;

/**
 * Generic Class
 */

class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNum = new GenericNumber<number>();
myGenericNum.zeroValue = 0;
myGenericNum.add = function (x, y) {
  return x + y;
}

/**
 * keyof
 */
type Point = { x: number; y: number };
type p = keyof Point;

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

/**
 * typeof
 */
let s = 'hello';
let n: typeof s;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
  return { x: 10, y: 3};
}
type P = ReturnType<typeof f>;

