import axios from 'axios';
import { Todo } from '../types/todo';

const apiUrl = 'http://localhost:3000/todos';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.post(apiUrl, todo);
  return response.data;
};

export const updateTodo = async (id: string, todo: Todo): Promise<Todo> => {
  const response = await axios.put(`${apiUrl}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/${id}`);
};
