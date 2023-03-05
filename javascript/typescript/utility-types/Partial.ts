/** Partial<Type> */

interface Todo {
  title: string;
  description: string;
}

/** Todo's properties are optional */
function updateTodo(todo: Todo, updateFields: Partial<Todo>) {
  return { ...todo, ...updateFields }
}

// usage
const todo1 = {
  title: 'do practice',
  description: 'learn by doing',
};

updateTodo(todo1, { description: 'The best way to learn is learn by doing!' });
