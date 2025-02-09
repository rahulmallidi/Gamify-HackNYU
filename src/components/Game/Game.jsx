import React, { useState, useEffect } from 'react';
import CreditScore from '../CreditScore/CreditScore';
import Dashboard from '../Dashboard/Dashboard';
import Dice from '../Dice/Dice';
import EventCard from '../EventCard/EventCard';
import PaymentPanel from '../PaymentPanel/PaymentPanel';
import './Game.css';

const INITIAL_STATE = {
  creditScore: 600,
  cash: 2000,
  creditLimit: 5000,
  debt: 2500,
  monthlyIncome: 3000,
  fixedExpenses: 1500,
  turn: 1,
  gameOver: false,
  phase: 'INCOME' // INCOME -> EXPENSES -> DICE -> EVENT -> PAYMENT
};

const CREDIT_EVENTS = [
  {
    title: "Missed Credit Card Payment",
    description: "You forgot to pay your credit card bill on time.",
    impact: -50,
    type: "negative"
  },
  {
    title: "Paid Credit Card on Time",
    description: "Your consistent payment history has been noticed.",
    impact: 30,
    type: "positive"
  },
  {
    title: "Low Credit Utilization",
    description: "You've kept your credit usage below 30%.",
    impact: 40,
    type: "positive"
  },
  {
    title: "High Credit Utilization",
    description: "Your credit usage is above 50% of your limit.",
    impact: -40,
    type: "negative"
  },
  {
    title: "Maxed Out Credit Card",
    description: "You've reached your credit limit.",
    impact: -60,
    type: "negative"
  }
];

const Game = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [showDice, setShowDice] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [message, setMessage] = useState('');
  const [currentEvent, setCurrentEvent] = useState(null);

  // Check for game over conditions
  useEffect(() => {
    if (gameState.creditScore >= 750) {
      setGameState(prev => ({ ...prev, gameOver: true }));
      setMessage("Congratulations! You've achieved an excellent credit score!");
    } else if (gameState.turn > 12) {
      setGameState(prev => ({ ...prev, gameOver: true }));
      setMessage("Game Over! You've reached the end of the year.");
    }
  }, [gameState.creditScore, gameState.turn]);

  // Update credit score based on utilization
  useEffect(() => {
    const utilization = (gameState.debt / gameState.creditLimit) * 100;
    let utilizationImpact = 0;

    if (utilization <= 30) utilizationImpact = 20;
    else if (utilization > 50) utilizationImpact = -20;

    if (utilizationImpact !== 0) {
      setGameState(prev => ({
        ...prev,
        creditScore: Math.min(850, Math.max(300, prev.creditScore + utilizationImpact))
      }));
    }
  }, [gameState.debt]);

  const handleIncome = () => {
    if (gameState.gameOver) return;
    
    setGameState(prev => ({
      ...prev,
      cash: prev.cash + prev.monthlyIncome,
      phase: 'EXPENSES'
    }));
    setMessage(`Received monthly income: +$${gameState.monthlyIncome}`);
  };

  const handleExpenses = () => {
    const expenses = gameState.fixedExpenses;
    setGameState(prev => ({
      ...prev,
      cash: prev.cash - expenses,
      phase: 'DICE'
    }));
    setMessage(`Paid monthly expenses: -$${expenses}`);
    setShowDice(true);
  };

  const handleDiceRoll = (result) => {
    const extraIncome = {
      1: -500,
      2: 0,
      3: 500,
      4: 500,
      5: 1000,
      6: 2000
    }[result];

    setGameState(prev => ({
      ...prev,
      cash: prev.cash + extraIncome,
      phase: 'EVENT'
    }));
    
    const message = extraIncome >= 0 
      ? `Lucky roll! +$${extraIncome}` 
      : `Unexpected expense: -$${Math.abs(extraIncome)}`;
    setMessage(message);
    
    setShowDice(false);
    setShowEvent(true);
  };

  const handleEvent = () => {
    const event = CREDIT_EVENTS[Math.floor(Math.random() * CREDIT_EVENTS.length)];
    setCurrentEvent(event);
    
    setGameState(prev => ({
      ...prev,
      creditScore: Math.min(850, Math.max(300, prev.creditScore + event.impact)),
      phase: 'PAYMENT'
    }));
    
    setMessage(event.description);
    setShowEvent(false);
    setShowPayment(true);
  };

  const handlePayment = (amount) => {
    if (amount > gameState.cash) {
      setMessage("Not enough cash for this payment!");
      return;
    }

    if (amount > gameState.debt) {
      setMessage("Payment cannot exceed current debt!");
      return;
    }

    // Update game state with payment
    setGameState(prev => ({
      ...prev,
      cash: prev.cash - amount,
      debt: Math.max(0, prev.debt - amount),
      turn: prev.turn + 1,
      phase: 'INCOME'
    }));

    setShowPayment(false);
    setMessage(`Made payment: -$${amount}`);

    // Credit score impact based on payment
    if (amount >= 500) {
      setGameState(prev => ({
        ...prev,
        creditScore: Math.min(850, prev.creditScore + 10)
      }));
    } else if (gameState.debt > 0) {
      setGameState(prev => ({
        ...prev,
        creditScore: Math.max(300, prev.creditScore - 30)
      }));
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <CreditScore score={gameState.creditScore} />
        <div className="turn-counter">Month {gameState.turn} of 12</div>
      </div>

      <div className="phase-tracker">
        <div className={`phase ${gameState.phase === 'INCOME' ? 'active' : ''}`}>Income</div>
        <div className={`phase ${gameState.phase === 'EXPENSES' ? 'active' : ''}`}>Expenses</div>
        <div className={`phase ${gameState.phase === 'DICE' ? 'active' : ''}`}>Extra Income</div>
        <div className={`phase ${gameState.phase === 'EVENT' ? 'active' : ''}`}>Credit Event</div>
        <div className={`phase ${gameState.phase === 'PAYMENT' ? 'active' : ''}`}>Payment</div>
      </div>

      {message && <div className="game-message">{message}</div>}

      <Dashboard 
        cash={gameState.cash}
        debt={gameState.debt}
        creditLimit={gameState.creditLimit}
      />

      <div className="game-actions">
        {gameState.phase === 'INCOME' && !gameState.gameOver && (
          <button className="game-button" onClick={handleIncome}>
            Collect Monthly Income (+$3,000)
          </button>
        )}

        {gameState.phase === 'EXPENSES' && (
          <button className="game-button warning" onClick={handleExpenses}>
            Pay Monthly Expenses (-$1,500)
          </button>
        )}

        {showDice && (
          <div className="dice-section">
            <h3>Roll for Extra Income!</h3>
            <Dice onRoll={handleDiceRoll} />
          </div>
        )}

        {showEvent && (
          <div className="event-section">
            <EventCard event={currentEvent} onComplete={handleEvent} />
          </div>
        )}

        {showPayment && (
          <PaymentPanel 
            cash={gameState.cash}
            debt={gameState.debt}
            onPayment={handlePayment}
          />
        )}

        {gameState.gameOver && (
          <div className="game-over">
            <h2>{gameState.creditScore >= 750 ? 'Congratulations!' : 'Game Over'}</h2>
            <p>Final Credit Score: {gameState.creditScore}</p>
            <button 
              className="play-again-button" 
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;