import React from 'react';
import Game from './components/Game/Game';  
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Credit Quest</h1>
        <p>Build Your Credit Score!</p>
      </header>
      <main>
        <Game />
      </main>
      <footer>
        <p>© 2025 Credit Quest - Educational Finance Game</p>
      </footer>
    </div>
  );
}

export default App;