/** Omit<Type, Keys> */

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoOmitPreview = Omit<Todo, 'description'>;

const todoOmit: TodoOmitPreview = {
  title: 'Learn Omit',
  completed: true,
  createdAt: Date.now(),
}

type TodoOmitInfo = Omit<Todo, 'completed' | 'createdAt'>;

const todoInfo: TodoOmitInfo = {
  title: 'Learn Omit',
  description: 'Learn by doing',
}
