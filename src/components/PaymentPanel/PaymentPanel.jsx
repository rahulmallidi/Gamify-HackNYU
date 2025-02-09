import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './PaymentPanel.css';

const PaymentPanel = ({ cash, debt, onPayment }) => {
  const [paymentAmount, setPaymentAmount] = useState(500);
  const maxPayment = Math.min(cash, debt);

  const handlePaymentChange = (e) => {
    const value = Math.max(0, Math.min(maxPayment, Number(e.target.value)));
    setPaymentAmount(value);
  };

  const handleSubmit = () => {
    onPayment(paymentAmount);
  };

  return (
    <div className="payment-panel">
      <h3>Make Credit Card Payment</h3>
      
      <div className="payment-info">
        <div className="info-row">
          <span>Available Cash:</span>
          <span className="amount">${cash.toFixed(2)}</span>
        </div>
        <div className="info-row">
          <span>Current Debt:</span>
          <span className="amount">${debt.toFixed(2)}</span>
        </div>
      </div>

      <div className="payment-slider">
        <label>Payment Amount: ${paymentAmount}</label>
        <input
          type="range"
          min="0"
          max={maxPayment}
          step="100"
          value={paymentAmount}
          onChange={handlePaymentChange}
        />
        <div className="slider-marks">
          <span>$0</span>
          <span className="minimum-mark">Min: $500</span>
          <span>${maxPayment}</span>
        </div>
      </div>

      <div className="payment-warning">
        {paymentAmount < 500 && debt >= 500 ? (
          <p className="warning">Warning: Paying less than $500 will hurt your credit score!</p>
        ) : paymentAmount >= 500 ? (
          <p className="positive">Good choice! Making at least the minimum payment helps your credit!</p>
        ) : null}
      </div>

      <button 
        className="make-payment-button"
        onClick={handleSubmit}
        disabled={paymentAmount === 0}
      >
        Make Payment
      </button>
    </div>
  );
};

export default PaymentPanel;