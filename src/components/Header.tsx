import React from 'react';
import './Header.css'; // Header CSS file for styling

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">My Todo App</h1>
      <p className="header-subtitle">Keep track of your tasks!</p>
    </header>
  );
};

export default Header;
