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
