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

  // Fetch todos when `refresh` changes
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3000/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [refresh]); // refresh state

  // adding a new todo
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
        <TodoList todos={todos} setRefresh={setRefresh} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
