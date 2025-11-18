import API from './apiClient';
import { createTodoSchema, todoSchema, todosSchema, type CreateTodoForm, type Todo } from '../schemas/todo';

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await API.get('/todos');
  return todosSchema.parse(res.data);
};

export const createTodo = async (payload: CreateTodoForm): Promise<Todo> => {
  const body = createTodoSchema.parse(payload);
  const res = await API.post('/todos', body);
  return todoSchema.parse(res.data);
};

export const updateTodo = async (id: string, payload: Partial<Todo>): Promise<Todo> => {
  const res = await API.put(`/todos/${id}`, payload);
  return todoSchema.parse(res.data);
};

export const deleteTodo = async (id: string): Promise<{ message: string }> => {
  const res = await API.delete(`/todos/${id}`);
  return res.data as { message: string };
};


