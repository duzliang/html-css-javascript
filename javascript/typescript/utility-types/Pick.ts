/** Pick<Type, Keys> */

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

/** constructs a new Type by picking the set of proerties Keys of the exist object, like Todo */
type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Read dosc',
  completed: false,
}
