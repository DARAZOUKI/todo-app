import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { createTodo } from '../services/todoService.ts';
import '../App.css';

const TodoForm = ({ onTodoAdded }: { onTodoAdded: (todo: Todo) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not started');
  const [error, setError] = useState<string | null>(null);  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (title.length < 3) {
      setError('Title must be at least 3 characters long'); 
      return;
    }
  
    if (description.length > 200) {
      setError('Description must be at most 200 characters long'); 
      return;
    }
  
    const newTodo: Todo = {
      title, 
      description, 
      status, 
      id: '', 
      _id: undefined
    };
  
    try {
      setError(null); // Reset error
      const createdTodo = await createTodo(newTodo);
      onTodoAdded(createdTodo);
  
      // Reset form fields
      setTitle('');
      setDescription('');
      setStatus('Not started');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create todo'); 
    }
  };
  

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add Todo</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-input"
        >
          <option value="Not started">Not started</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}  {}

      <button type="submit" className="submit-btn">Add Todo</button>
    </form>
  );
};

export default TodoForm;
