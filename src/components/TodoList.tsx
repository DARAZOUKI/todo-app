import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem.tsx';

const TodoList = ({ todos, setRefresh }: { todos: Todo[], setRefresh: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' });
      setRefresh((prev) => !prev); 
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdate = async (updatedTodo: Todo) => {
    try {
      await fetch(`http://localhost:3000/todos/${updatedTodo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      setRefresh((prev) => !prev); //  Triggers re-fetch
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
