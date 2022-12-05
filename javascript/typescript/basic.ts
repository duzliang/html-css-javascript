// type annotation
function greeter(person: Person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

// interface
interface Person {
    firstName: string;
    lastName: string;
}

const User: Person = {
    firstName: 'duke',
    lastName: 'du',
}

// class
class Student {
    fullName: string;

    constructor(
        public firstName: string,
        public middleInitial: string,
        public lastName: string
    ) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName
    }
}

let user = new Student('Jane', 'M.', 'User');

document.body.innerHTML = greeter(user);
