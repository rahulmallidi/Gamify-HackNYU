export const INITIAL_STATE = {
    creditScore: 600,
    cash: 2000,
    creditLimit: 5000,
    debt: 2500,
    monthlyIncome: 3000,
    fixedExpenses: 1500,
    turn: 1,
    phase: 'income' // phases: income, expenses, dice, event, decision
  };
  
  export const CREDIT_SCORE_RANGES = {
    EXCELLENT: { min: 750, max: 850 },
    GOOD: { min: 700, max: 749 },
    FAIR: { min: 650, max: 699 },
    POOR: { min: 600, max: 649 },
    VERY_POOR: { min: 300, max: 599 }
  };
  
  export const UTILIZATION_THRESHOLDS = {
    EXCELLENT: 10,
    GOOD: 30,
    WARNING: 50,
    DANGER: 75
  };
  
  export const GAME_PHASES = {
    INCOME: 'income',
    EXPENSES: 'expenses',
    DICE: 'dice',
    EVENT: 'event',
    DECISION: 'decision'
  };
  
  export const DIFFICULTY_LEVELS = {
    EASY: {
      startingScore: 600,
      startingCash: 2000,
      creditLimit: 5000
    },
    MEDIUM: {
      startingScore: 550,
      startingCash: 1500,
      creditLimit: 4000
    },
    HARD: {
      startingScore: 500,
      startingCash: 1000,
      creditLimit: 3000
    }
  };