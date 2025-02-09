import React, { useState } from 'react';
import './EventCard.css';

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
    title: "Applied for New Credit Card",
    description: "A new credit inquiry has been added to your report.",
    impact: -10,
    type: "negative"
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
    title: "Loan Payment Streak",
    description: "You've made all loan payments on time for 3 months.",
    impact: 50,
    type: "positive"
  },
  {
    title: "Maxed Out Credit Card",
    description: "You've reached your credit limit.",
    impact: -60,
    type: "negative"
  }
];

const EventCard = ({ onComplete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleCardClick = () => {
    if (!isFlipped) {
      const randomEvent = CREDIT_EVENTS[Math.floor(Math.random() * CREDIT_EVENTS.length)];
      setCurrentEvent(randomEvent);
      setIsFlipped(true);
    }
  };

  const handleContinue = () => {
    if (onComplete && currentEvent) {
      onComplete(currentEvent);
    }
  };

  return (
    <div className="event-card-container">
      {!isFlipped ? (
        <div className="card-front" onClick={handleCardClick}>
          <div className="card-content">
            <h3>Credit Event Card</h3>
            <p>Click to Draw</p>
          </div>
        </div>
      ) : (
        <div className="card-back">
          <div className={`card-content ${currentEvent?.type}`}>
            <h3>{currentEvent?.title}</h3>
            <p>{currentEvent?.description}</p>
            <div className="impact">
              Credit Score Impact: 
              <span className={currentEvent?.impact >= 0 ? 'positive' : 'negative'}>
                {currentEvent?.impact >= 0 ? ' +' : ' '}{currentEvent?.impact} points
              </span>
            </div>
            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;