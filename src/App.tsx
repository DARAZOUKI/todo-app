import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm.tsx';
import { Todo } from './types/todo';
import './App.css';
import TodoList from './components/TodoList.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos when "refresh" changes
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        const response = await fetch('http://localhost:3000/todos');
        if (!response.ok) throw new Error("Failed to fetch todos");
        
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError("Error fetching todos.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [refresh]);

  // Adding a new todo
  const addTodo = async (todo: Todo) => {
    try {
      await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      setRefresh((prev) => !prev); // Toggle refresh state
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <TodoForm onTodoAdded={addTodo} />

        {/* Show loading state */}
        {loading && <p className="loading-message">Loading todos...</p>}

        {/* Show error message if fetching fails */}
        {error && <p className="error-message">{error}</p>}

        {/* Show the todo list only when not loading */}
        {!loading && <TodoList todos={todos} setRefresh={setRefresh} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
