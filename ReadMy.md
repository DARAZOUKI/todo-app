# 📝 Todo App - Frontend (React + TypeScript)

This is the **frontend** for the Todo App built using **React (TypeScript)**. It interacts with a **REST API** to manage a list of todos.

## 🚀 Features
- Add, update, and delete todos
- Fetch data from the backend API
- Uses React Hooks (`useState`, `useEffect`)


## 📂 Project Structure
- Components: Todolist.tsx, TodoItem.tsx, TodoForm.tsx, Header.tsx, Footer.tsx
- Services: todoService.ts (API Configuration)
* In todoService.ts, set the backend URL: const apiUrl = "http://localhost:3000/todos";
( Having todoService.ts in My React app keeps the frontend structured, modular, and easy to maintain, especially when using React Hooks.)
- types: todo.d.ts (todo interface)
- App.tsx
- Style: Header.css, Footer.css, App.css
