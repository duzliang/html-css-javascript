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
 * object key type
 */
type Point = { x: number; y: number };
type p = keyof Point;

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

/**
 * typeof
 * use on identities and their property
 */
let s = 'hello';
let n: typeof s;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;

/**
 * Indexed Access Types
 * 
 * use indexed access type to look up a specific property on another type
 */
type Person = { name: string; age: number; alive: boolean };
type Age = Person['age'];

type I1 = Person['name' | 'age'];
type I2 = Person[keyof Person];

type aliveOrName = 'alive' | 'name';
type I3 = Person[aliveOrName];


const MyArray = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 23 },
  { name: 'Evli', age: 28 },
];

type Person2 = typeof MyArray[number];
type pAge = typeof MyArray[number]['age'];
type pAge2 = Person2['age'];

// const key2 = 'age'; // wrong
type key = 'age';
type page22 = Person2[key];


/**
 * Template Literal Type
 */
type World = 'world';
type Greeting = `hello ${ World }`;

type EmailLocalIDs = 'welcome_email' | 'email_handing';
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocalIDs | FooterLocaleIDs}_id`;

type Lang = "en" | "ja" | "pt";
 
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

