import React, { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status);

 const handleUpdate = () => {
  if (!todo._id) {
    console.error("Error: Todo ID is undefined, cannot update.");
    return;
  }

  onUpdate({
    _id: todo._id, // Ensure _id is included
    title: title || "", 
    description: description || "",
    status: status || "Not started",
  });

  setIsEditing(false);
};

  

  return (
    <li>
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Not started">Not started</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button 
  onClick={() => {
    if (!todo._id) {
        console.error("Error: Todo ID is undefined, cannot delete.");
        return;
      }
      onDelete(todo._id);
      
  }}
>
  Delete
</button>

        </>
      )}
    </li>
  );
};

export default TodoItem;
