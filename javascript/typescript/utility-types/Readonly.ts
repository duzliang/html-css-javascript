/** Readonly<Type> */

interface TodoRead {
  title: string;
}

/** Type's property is readonly and can't be reassigned */
const todoRead: Readonly<TodoRead> = {
  title: 'Learn'
};

todoRead.title = 'Rewrite'; // wrong: Cannot assign to 'title' because it is a read-only 

/** Like Object.freeze */
function freeze<TodoRead>(obj: TodoRead): Readonly<TodoRead> {
  const freezeTodo: Readonly<TodoRead> = {
    title: 'todo1'
  };
  return freezeTodo;
}

/** Generic readonly */
type Foo = {
  bar: number;
  baz: number;
}

type FooReadonly<T> = Readonly<Foo>;

// use
const foo: Foo = { bar: 1, baz: 2 };
const fooReadonly: FooReadonly<Foo> = { bar: 1, baz: 2 };
foo.bar = 3;
fooReadonly.bar = 3; // error bar is readonly

