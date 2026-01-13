// components/JugVisualization.jsx
import React from 'react';
import './JugVisualization.css';

const JugVisualization = ({ jug1Capacity, jug2Capacity, steps }) => {
  return (
    <div className="visualization-container">
      <h2>Solution Steps</h2>
      {steps.length === 0 ? (
        <p className="no-steps">Click "Solve with BFS" to see the solution</p>
      ) : steps[0] === 'No solution possible with given capacities' ? (
        <p className="no-solution">No solution exists for these parameters</p>
      ) : (
        <div className="steps-grid">
          {steps.map(([j1, j2, operation], index) => (
            <div key={index} className="step-card animate-step">
              <div className="jugs">
                <div className="jug">
                  <div 
                    className="water"
                    style={{ height: `${(j1 / jug1Capacity) * 100}%` }}
                  />
                  <span>{j1}L / {jug1Capacity}L</span>
                </div>
                <div className="jug">
                  <div 
                    className="water"
                    style={{ height: `${j2 / jug2Capacity) * 100}%` }}
                  />
                  <span>{j2}L / {jug2Capacity}L</span>
                </div>
              </div>
              <div className="step-info">
                <p>Step {index + 1}</p>
                {operation && <p className="operation">{operation}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JugVisualization;