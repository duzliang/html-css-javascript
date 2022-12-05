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

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

declare const backpack: Backpack<string>;
const object = backpack.get();
backpack.add('22');

