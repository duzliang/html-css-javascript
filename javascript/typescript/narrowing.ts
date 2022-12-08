// Equality narrowing
function example(x: string | number, y: string | boolean) {
    if (x === y) {
        x.toUpperCase();
        y.toUpperCase();
    } else {
        console.log('log=>', x);
        console.log('log=>', y);
    }
}

// in operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ('swim' in animal) {
        return animal.swim();
    }
    return animal.fly();
}

type Human = { swim?: () => void, fly?: () => void };

function moveMore(animal: Fish | Bird | Human) {
    if ('swim' in animal) {
        animal; // type: Fish | Human
    } else {
        animal; // type: Bird | Human
    }
}

// instanceof
function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log('log=>', x.toUTCString()); // Date
    } else {
        console.log('log=>', x.toUpperCase()); // string
    }
}

// type predicates
function isFish(pet: Fish | Bird): pet is Fish{
    return (pet as Fish).swim !== undefined;
}

// function getSmallPet(): Fish | Bird;
// if (isFish(getSmallPet())) {
//     pet.swim();
// } else {
//     pet.fly();
// }

// discriminated union
interface Shape {
    kind: 'circle' | 'square';
    radius?: 'number';
    sideLength?: number;
}

// function handleShape(shape: Shape) {
//     if (shape.kind === 'react') {
//
//     }
// }
//
// function getArea(shape: Shape) {
//     if (shape.kind === 'circle') {
//         return Math.PI * shape.radius ** 2;
//     }
// }
