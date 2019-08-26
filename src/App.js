import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';

function App() {
  document.title = 'Snake Game Designed by Yiran'
  return (
    <div className="App">
      <header className="App-header">
        <Board/>
      </header>
    </div>
  );
}

export default App;
