import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './Dashboard.css';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const UtilizationBar = ({ utilization }) => {
  const barWidth = Math.min(utilization, 100);
  const barColor = utilization <= 30 ? '#4caf50' : 
                   utilization <= 50 ? '#ff9800' : '#f44336';

  return (
    <div className="utilization-container">
      <div className="utilization-bar">
        <div 
          className="utilization-fill"
          style={{ 
            width: `${barWidth}%`,
            backgroundColor: barColor
          }}
        />
      </div>
      <div className="utilization-marks">
        <span className="mark">0%</span>
        <span className="mark">30%</span>
        <span className="mark">50%</span>
        <span className="mark">100%</span>
      </div>
    </div>
  );
};

const Dashboard = ({ cash, debt, creditLimit }) => {
  const utilization = (debt / creditLimit) * 100;

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Available Cash</h3>
          <div className={`amount ${cash >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(cash)}
          </div>
        </div>

        <div className="stat-card">
          <h3>Current Debt</h3>
          <div className="amount negative">
            {formatCurrency(debt)}
          </div>
        </div>

        <div className="stat-card">
          <h3>Credit Limit</h3>
          <div className="amount">
            {formatCurrency(creditLimit)}
          </div>
        </div>
      </div>

      <div className="utilization-section">
        <h3>Credit Utilization</h3>
        <UtilizationBar utilization={utilization} />
        <div className="utilization-info">
          <span className="utilization-percentage">
            Current: {utilization.toFixed(1)}%
          </span>
          {utilization > 30 && (
            <span className="utilization-warning">
              High utilization! Try to keep it below 30%
            </span>
          )}
        </div>
      </div>

      <div className="tips-section">
        <h3>Financial Tips</h3>
        <ul>
          <li>Keep your credit utilization below 30%</li>
          <li>Always make payments on time</li>
          <li>Maintain a healthy emergency fund</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;