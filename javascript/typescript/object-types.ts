/**
 * object types
 * group and pass around data
 */

// 1 by anonymouse
function greet(person: { name: string, age: number }) {
  return `Hello, ${person.name}`;
}

// 2. by interface
interface Person {
  name: string;
  age: number;
}
function greetByInterface(person: Person) {
  return `Hello, ${person.name}`;
}

// 3. by type
type PersonType = {
  name: string;
  age: number;
}
function greetByType(person: PersonType) {
  return `Hello, ${person.name}`;
}

/**
 * Optional properties
 */
interface Shape {
  kind: 'circle' | 'square';
  radius?: 'number';
  sideLength?: number;
}
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
function paintShape(opts: PaintOptions) {
}

// const shape = new Shape();
// paintShape({ shape });
// paintShape({ shape, xPos: 100 });
// paintShape({ shape, yPos: 100 });
// paintShape({ shape, xPos: 100, yPos: 100 });

/**
 * readonly Properties
 */
interface SomeType {
  readonly prop: string;
  readonly shape: Shape;
}
function doProp(obj: SomeType) {
  // read is ok
  console.log(`obj has the value: ${obj.prop}`);
  // re-assign is not allowed
  // obj.prop = 'new value'; // can't change the value
  obj.shape.kind = 'circle'; // ?
}

/**
 * Index Signatures
 */
declare function getStringArray(): StringArray;

interface StringArray {
  [index: number]: string;
}
const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

/**
 * Extending Types
 */
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postCode: string;
}

// interface BasicAddressWithUnit {
//   name: string;
//   unit: string;
//   street: string;
//   city: string;
//   country: string;
//   postCode: string;
// }

// use extend
interface BasicAddressWithUnit extends BasicAddress {
  unit: string;
}

// extends multi types
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle { }
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
}

/**
 * Intersection Types
 */
type ColorfulCircleType = Colorful & Circle;

/**
 * Generic Objects Types
 */
type Box<Type> = {
  content: Type;
}

/**
 * Array Type
 * string[], number[] are just a shorthand for Array<string>, Array<number>
 */
function doSomething(value: Array<string>) {

}

let someArray: string[] = ['hello', 'world'];
doSomething(someArray);
doSomething(new Array('hello', 'world'));

/**
 * ReadonlyArray
 * a special type array: can't change array value
 */
function doStuff(values: ReadonlyArray<string>) { // shorthand `readonly string[]`
  const copy = values.slice(); // ok
  // values.push('hello'); // opoos
}

/**
 * Tuple Types
 */
type StringNumberPair= [string, number];

function doTuple(pair: [string, number]) {
  const a = pair[0];
  const b = pair[1];

  // also can use destructure
  const [aa, bb] = pair;
}
doTuple(['hello', 42]);
