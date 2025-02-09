import { CREDIT_SCORE_RANGES, UTILIZATION_THRESHOLDS } from './constants';

export const calculateNewScore = (currentScore, impact) => {
  const newScore = currentScore + impact;
  return Math.min(Math.max(newScore, 300), 850); // Keep score within valid range
};

export const calculateUtilization = (debt, creditLimit) => {
  return (debt / creditLimit) * 100;
};

export const calculateUtilizationImpact = (utilization) => {
  if (utilization <= UTILIZATION_THRESHOLDS.EXCELLENT) return 20;
  if (utilization <= UTILIZATION_THRESHOLDS.GOOD) return 10;
  if (utilization <= UTILIZATION_THRESHOLDS.WARNING) return -20;
  if (utilization <= UTILIZATION_THRESHOLDS.DANGER) return -40;
  return -60;
};

export const calculateMonthlyPayment = (debt, interestRate) => {
  const monthlyRate = interestRate / 12 / 100;
  const minimumPayment = Math.max(debt * 0.02, 25); // 2% of balance or $25, whichever is greater
  const interestPayment = debt * monthlyRate;
  return {
    minimum: minimumPayment,
    recommended: Math.ceil(minimumPayment + interestPayment),
    full: debt
  };
};

export const calculateScoreProgress = (currentScore) => {
  const ranges = Object.values(CREDIT_SCORE_RANGES);
  for (const range of ranges) {
    if (currentScore >= range.min && currentScore <= range.max) {
      const progress = ((currentScore - range.min) / (range.max - range.min)) * 100;
      return {
        category: range,
        progress: Math.round(progress)
      };
    }
  }
  return null;
};

export const predictScoreInMonths = (currentScore, monthlyPayments, utilization) => {
  let predictedScore = currentScore;
  
  // Payment history impact
  if (monthlyPayments >= 6) predictedScore += 30;
  else if (monthlyPayments >= 3) predictedScore += 15;
  
  // Utilization impact
  predictedScore += calculateUtilizationImpact(utilization);
  
  return Math.min(Math.max(predictedScore, 300), 850);
};