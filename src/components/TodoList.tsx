import React, { useState } from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem.tsx';

const TodoList = ({ todos, setRefresh }: { todos: Todo[], setRefresh: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' });
      setRefresh((prev) => !prev); 
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedTodo: Todo) => {
    try {
      setLoading(true);
      setError(null);
      await fetch(`http://localhost:3000/todos/${updatedTodo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      {loading && <p className="loading-message">Loading todos...</p>}
      {error && <p className="error-message">{error}</p>}
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
