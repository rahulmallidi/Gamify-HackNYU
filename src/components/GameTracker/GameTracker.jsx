import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './GameTracker.css';

const PHASES = {
  INCOME: {
    label: 'Income',
    description: 'Collect your monthly salary'
  },
  EXPENSES: {
    label: 'Expenses',
    description: 'Pay your monthly bills'
  },
  DICE: {
    label: 'Extra Income',
    description: 'Roll for additional income'
  },
  EVENT: {
    label: 'Credit Event',
    description: 'Draw a credit event card'
  },
  PAYMENT: {
    label: 'Payment',
    description: 'Make credit card payment'
  }
};

const PhaseIndicator = ({ phase, isActive }) => {
  return (
    <div className={`phase-indicator ${isActive ? 'active' : ''}`}>
      <div className="phase-dot"></div>
      <div className="phase-label">{PHASES[phase].label}</div>
      {isActive && (
        <div className="phase-description">
          {PHASES[phase].description}
        </div>
      )}
    </div>
  );
};

const GameTracker = ({ turn, phase, creditScore }) => {
  const monthsLeft = 12 - turn;
  
  return (
    <div className="game-tracker">
      <div className="tracker-header">
        <div className="score-display">
          <h2>Credit Score: {creditScore}</h2>
          <div className="score-category">
            {creditScore >= 750 ? 'Excellent!' :
             creditScore >= 700 ? 'Good' :
             creditScore >= 650 ? 'Fair' :
             creditScore >= 600 ? 'Poor' : 'Very Poor'}
          </div>
        </div>

        <div className="turn-display">
          <div className="month-counter">Month {turn} of 12</div>
          {monthsLeft > 0 ? (
            <div className="months-left">{monthsLeft} months remaining</div>
          ) : (
            <div className="game-ending">Final Month!</div>
          )}
        </div>
      </div>

      <div className="phase-tracker">
        {Object.keys(PHASES).map((phaseName) => (
          <PhaseIndicator
            key={phaseName}
            phase={phaseName}
            isActive={phase === phaseName}
          />
        ))}
      </div>

      <div className="tracker-tips">
        {phase === 'PAYMENT' && creditScore < 750 && (
          <div className="tip">
            💡 Tip: Making more than minimum payments can help improve your score faster!
          </div>
        )}
        {phase === 'DICE' && (
          <div className="tip">
            💡 Extra income can help pay down debt and improve credit utilization!
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTracker;