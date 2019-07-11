import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';

function App() {
  alert("Instructions \n \
  1. Use W S A D to change the direction of the snake \n \
  2. Use [ for increasing the speed, and ] for decreasing the speed \n \
  3. Use r to reset the game \n \
  4. Use esc to terminate the game \n ")
  return (
    <div className="App">
      <header className="App-header">
        <Board/>
      </header>
    </div>
  );
}

export default App;
