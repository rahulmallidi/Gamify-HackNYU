import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './DecisionPanel.css';

const PaymentSlider = ({ debt, cash, onPaymentChange }) => {
  const [payment, setPayment] = useState(Math.min(500, debt));
  const maxPayment = Math.min(cash, debt);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setPayment(value);
    onPaymentChange(value);
  };

  return (
    <div className="payment-slider">
      <div className="slider-header">
        <span>Payment Amount: ${payment}</span>
        <span>Available Cash: ${cash}</span>
      </div>
      <input
        type="range"
        min={0}
        max={maxPayment}
        step={100}
        value={payment}
        onChange={handleChange}
        className="range-slider"
      />
      <div className="slider-labels">
        <span>$0</span>
        <span>Minimum: $500</span>
        <span>${maxPayment}</span>
      </div>
    </div>
  );
};

const PaymentImpactPreview = ({ paymentAmount, currentDebt, creditLimit }) => {
  const currentUtilization = (currentDebt / creditLimit) * 100;
  const newDebt = Math.max(0, currentDebt - paymentAmount);
  const newUtilization = (newDebt / creditLimit) * 100;
  
  return (
    <div className="impact-preview">
      <h4>Payment Impact Preview</h4>
      <div className="impact-grid">
        <div className="impact-item">
          <label>Current Utilization</label>
          <div className="utilization-bar">
            <div 
              className="utilization-fill"
              style={{ 
                width: `${currentUtilization}%`,
                backgroundColor: currentUtilization > 30 ? '#f44336' : '#4caf50'
              }}
            />
          </div>
          <span>{currentUtilization.toFixed(1)}%</span>
        </div>
        <div className="impact-item">
          <label>After Payment</label>
          <div className="utilization-bar">
            <div 
              className="utilization-fill"
              style={{ 
                width: `${newUtilization}%`,
                backgroundColor: newUtilization > 30 ? '#f44336' : '#4caf50'
              }}
            />
          </div>
          <span>{newUtilization.toFixed(1)}%</span>
        </div>
      </div>
      {newUtilization < 30 && currentUtilization >= 30 && (
        <div className="bonus-alert">
          Bonus: Lowering utilization below 30% will boost your credit score!
        </div>
      )}
    </div>
  );
};

const DecisionPanel = ({ cash, debt, creditLimit, onDecision }) => {
  const [selectedPayment, setSelectedPayment] = useState(Math.min(500, debt));

  const handlePaymentChange = (amount) => {
    setSelectedPayment(amount);
  };

  const handleMakePayment = () => {
    onDecision({
      type: 'PAYMENT',
      payment: selectedPayment
    });
  };

  return (
    <div className="decision-panel">
      <h3>Financial Decisions</h3>
      
      <div className="current-status">
        <div className="status-item">
          <label>Current Debt</label>
          <span className="value negative">${debt}</span>
        </div>
        <div className="status-item">
          <label>Available Cash</label>
          <span className="value">${cash}</span>
        </div>
      </div>

      <PaymentSlider 
        debt={debt}
        cash={cash}
        onPaymentChange={handlePaymentChange}
      />

      <PaymentImpactPreview 
        paymentAmount={selectedPayment}
        currentDebt={debt}
        creditLimit={creditLimit}
      />

      {selectedPayment < 500 && debt > 500 && (
        <div className="warning-message">
          Warning: Making less than minimum payment ($500) will negatively impact your credit score!
        </div>
      )}

      <button 
        className="make-payment-button"
        onClick={handleMakePayment}
        disabled={selectedPayment === 0}
      >
        Make Payment
      </button>
    </div>
  );
};

export default DecisionPanel;