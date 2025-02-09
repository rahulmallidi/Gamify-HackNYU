import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './GamePhase.css';

const PhaseIndicator = ({ phase, turn }) => {
  return (
    <div className="phase-indicator">
      <div className="turn-counter">Month {turn} of 12</div>
      <div className="phase-track">
        <div className={`phase-step ${phase === 'INCOME' ? 'active' : ''}`}>
          Income
        </div>
        <div className={`phase-step ${phase === 'EXPENSES' ? 'active' : ''}`}>
          Expenses
        </div>
        <div className={`phase-step ${phase === 'DICE' ? 'active' : ''}`}>
          Extra Income
        </div>
        <div className={`phase-step ${phase === 'EVENT' ? 'active' : ''}`}>
          Credit Event
        </div>
        <div className={`phase-step ${phase === 'DECISION' ? 'active' : ''}`}>
          Decisions
        </div>
      </div>
      <div className="phase-description">
        {getPhaseDescription(phase)}
      </div>
    </div>
  );
};

const getPhaseDescription = (phase) => {
  const descriptions = {
    INCOME: "Collect your monthly salary of $3,000",
    EXPENSES: "Pay your fixed monthly expenses",
    DICE: "Roll for a chance at extra income",
    EVENT: "Draw a card to see what affects your credit",
    DECISION: "Make payments and manage your credit"
  };
  return descriptions[phase] || "";
};

const GamePhase = ({ phase, turn }) => {
  return (
    <div className="game-phase">
      <PhaseIndicator phase={phase} turn={turn} />
      <div className="phase-tips">
        {phase === 'INCOME' && (
          <div className="tip">
            💡 Regular income is key to maintaining good credit
          </div>
        )}
        {phase === 'EXPENSES' && (
          <div className="tip">
            💡 Always prioritize essential expenses
          </div>
        )}
        {phase === 'DICE' && (
          <div className="tip">
            💡 Extra income can help pay down debt faster
          </div>
        )}
        {phase === 'EVENT' && (
          <div className="tip">
            💡 Your credit score is affected by various events
          </div>
        )}
        {phase === 'DECISION' && (
          <div className="tip">
            💡 Keep utilization below 30% for best credit score
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePhase;