interface User {
    name: string;
    id: number;
}

class UserCount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const user: User = new UserCount('duke', 23);

/**
 * comment args
 */

function getAdminUser(): User {
    return new UserCount('admin', 22);
}

function deleteUser(user: User) {
    // delete user
}

/**
 * Composing Types
 * 联合类型
 */

type myBool = true | false;
type lockedStata = 'locked' | 'unloacked';

function getLength(obj: string | string[]) {
    return obj.length;
}

/**
 * Primitive style
 */
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectArray = Array<{ name: string }>

/** Literal style */
type StringArrayL = string[];
type NumberArrayL = number[];
type ObjectArrayL = object[];

// same as
let strArrs = ['a', 'b'];
let numArrs = [1, 2, 3]

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

declare const backpack: Backpack<string>;
const object = backpack.get();
backpack.add('22');

/**
 * type annotation
 */
function sayHello(word: string) {
    console.log(`hello, ${word}`);
}

function getFavoriteNumber(): number {
    return 12;
}

/**
 * object types
 * @param px
 */
function printCoord(px: { x: number, y: number }) {
    console.log('log=>the coordinate x is:', px.x);
    console.log('log=>the coordinate y is:', px.y);
}

/**
 * optional type
 */
function printName(obj: {
    firstName: string, lastName?: string
}) {
    console.log('log=>', obj.firstName, obj.lastName);
}

printName({firstName: 'duke'});
printName({firstName: 'duke', lastName: 'du'});

/**
 * union types
 */

// 1. Narrowing types
function printId(id: string | number) {
    if (typeof id === 'string') {
        console.log('log=>', id.toUpperCase());
    } else {
        console.log('log=>', id);
    }
}

printId('u123');
printId(1);
// printId({ id: 23});  // error

// 2. if both type have common method, don't need narrowing type
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3)
}

/**
 * type aliases
 * 类型别名
 * @note 更倾向使用类型注解的语义化名称，或简单类型，使用 type
 */
type Point = {
    x: number,
    y: number,
}
function printCoordAliases(px: Point) {
    console.log('log=>the coordinate x is:', px.x);
    console.log('log=>the coordinate y is:', px.y);
}

/**
 * interface
 * 接口
 * @note 更倾向使用类型注解的层次结构，使用 interface
 */
interface PointInterface {
    x: number,
    y: number,
}

/**
 * extend
 * 交叉类型
 */
function extend<T extends object, U extends object>(first: T, second: U): T & U {
    const result = <T & U>{};
    for (let id in first) {
        (<T>result)[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<U>result)[id] = second[id];
        }
    }

    return result;
}

const x = extend({ a: 'hello' }, { b: 42 });

// 现在 x 拥有了 a 属性与 b 属性
const a = x.a;
const b = x.b;

/**
 * tuple
 * 元组
 */
let nameNumber: [string, number];

// ok
nameNumber = ['duke', 22];
// error
// nameNumber = ['duke', '22'];

// use
const [nameStr, ageNum] = nameNumber;

