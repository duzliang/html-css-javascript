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
 */

type myBool = true | false;
type lockedStata = 'locked' | 'unloacked';

function getLength(obj: string | string[]) {
    return obj.length;
}

/**
 *
 */
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectArray = Array<{ name: string }>

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
 */
interface PointInterface {
    x: number,
    y: number,
}
