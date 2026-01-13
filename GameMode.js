// components/GameMode.jsx
import React, { useState, useEffect } from 'react';
import './GameMode.css';

const GameMode = ({ jug1Capacity, jug2Capacity, target }) => {
  const [jug1, setJug1] = useState(0);
  const [jug2, setJug2] = useState(0);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    resetGame();
  }, [jug1Capacity, jug2Capacity, target]);

  const checkWin = () => {
    if (jug1 === target || jug2 === target) {
      setWon(true);
      return true;
    }
    return false;
  };

  const addToHistory = (operation) => {
    setHistory([...history, { jug1, jug2, operation, move: moves + 1 }]);
  };

  const resetGame = () => {
    setJug1(0);
    setJug2(0);
    setMoves(0);
    setWon(false);
    setHistory([]);
  };

  const operations = {
    fillJug1: () => {
      setJug1(jug1Capacity);
      addToHistory('Filled Jug 1');
      setMoves(moves + 1);
      checkWin();
    },
    fillJug2: () => {
      setJug2(jug2Capacity);
      addToHistory('Filled Jug 2');
      setMoves(moves + 1);
      checkWin();
    },
    emptyJug1: () => {
      setJug1(0);
      addToHistory('Emptied Jug 1');
      setMoves(moves + 1);
    },
    emptyJug2: () => {
      setJug2(0);
      addToHistory('Emptied Jug 2');
      setMoves(moves + 1);
    },
    pourJug1toJug2: () => {
      const amount = Math.min(jug1, jug2Capacity - jug2);
      setJug1(jug1 - amount);
      setJug2(jug2 + amount);
      addToHistory('Poured Jug 1 to Jug 2');
      setMoves(moves + 1);
      checkWin();
    },
    pourJug2toJug1: () => {
      const amount = Math.min(jug2, jug1Capacity - jug1);
      setJug1(jug1 + amount);
      setJug2(jug2 - amount);
      addToHistory('Poured Jug 2 to Jug 1');
      setMoves(moves + 1);
      checkWin();
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Reach {target}L in Either Jug</h2>
        <p>Moves: {moves}</p>
      </div>

      {won && (
        <div className="win-message animate-win">
          <h3>Victory! Solved talking achieved in {moves} moves!</h3>
        </div>
      )}

      <div className="game-display">
        <div className="jug-container">
          <div className="jug">
            <div 
              className="water animate-water"
              style={{ height: `${(jug1 / jug1Capacity) * 100}%` }}
            />
            <span>{jug1}L / {jug1Capacity}L</span>
          </div>
          <div className="jug">
            <div 
              className="water animate-water"
              style={{ height: `${(jug2 / jug2Capacity) * 100}%` }}
            />
            <span>{jug2}L / {jug2Capacity}L</span>
          </div>
        </div>

        <div className="game-controls">
          <button onClick={operations.fillJug1} disabled={won || jug1 === jug1Capacity}>
            Fill Jug 1
          </button>
          <button onClick={operations.fillJug2} disabled={won || jug2 === jug2Capacity}>
            Fill Jug 2
          </button>
          <button onClick={operations.emptyJug1} disabled={won || jug1 === 0}>
            Empty Jug 1
          </button>
          <button onClick={operations.emptyJug2} disabled={won || jug2 === 0}>
            Empty Jug 2
          </button>
          <button 
            onClick={operations.pourJug1toJug2} 
            disabled={won || jug1 === 0 || jug2 === jug2Capacity}
          >
            J1 → J2
          </button>
          <button 
            onClick={operations.pourJug2toJug1} 
            disabled={won || jug2 === 0 || jug1 === jug1Capacity}
          >
            J2 → J1
          </button>
          <button onClick={resetGame} className="reset">
            Restart
          </button>
        </div>

        {history.length > 0 && (
          <div className="history">
            <h3>Move History</h3>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>
                  Move {entry.move}: {entry.operation} 
                  ({entry.jug1}L, {entry.jug2}L)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameMode;