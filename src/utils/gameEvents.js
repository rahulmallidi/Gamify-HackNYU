const CREDIT_EVENTS = [
    {
      id: 1,
      title: "On-Time Payment Streak!",
      description: "Your consistent payment history has been noticed by credit bureaus.",
      impact: 30,
      type: "PAYMENT_HISTORY",
      probability: 0.15
    },
    {
      id: 2,
      title: "Missed Payment",
      description: "You forgot to pay your credit card bill on time.",
      impact: -50,
      type: "PAYMENT_HISTORY",
      probability: 0.1
    },
    {
      id: 3,
      title: "Credit Limit Increase",
      description: "Your bank has reviewed your account and increased your credit limit!",
      impact: 20,
      type: "CREDIT_LIMIT",
      probability: 0.1
    },
    {
      id: 4,
      title: "High Credit Utilization",
      description: "Your credit usage is above 50% of your limit.",
      impact: -40,
      type: "UTILIZATION",
      probability: 0.12
    },
    {
      id: 5,
      title: "Low Credit Utilization",
      description: "You've kept your credit usage below 30%. Great job!",
      impact: 40,
      type: "UTILIZATION",
      probability: 0.15
    },
    {
      id: 6,
      title: "New Credit Card Application",
      description: "You've applied for a new credit card.",
      impact: -10,
      type: "NEW_CREDIT",
      probability: 0.08
    },
    {
      id: 7,
      title: "Credit Report Check",
      description: "You've reviewed your credit report and disputed errors.",
      impact: 15,
      type: "MAINTENANCE",
      probability: 0.1
    },
    {
      id: 8,
      title: "Emergency Expense",
      description: "An unexpected medical bill requires using your credit card.",
      impact: -25,
      type: "UTILIZATION",
      probability: 0.1
    },
    {
      id: 9,
      title: "Credit Mix Improvement",
      description: "Having different types of credit helps your score.",
      impact: 35,
      type: "CREDIT_MIX",
      probability: 0.05
    },
    {
      id: 10,
      title: "Identity Theft Protection",
      description: "You've invested in protecting your credit identity.",
      impact: 20,
      type: "MAINTENANCE",
      probability: 0.05
    }
  ];
  
  export const drawEvent = () => {
    // Calculate total probability
    const totalProbability = CREDIT_EVENTS.reduce((sum, event) => sum + event.probability, 0);
    
    // Generate random number between 0 and total probability
    let random = Math.random() * totalProbability;
    
    // Find the event based on probability weights
    for (const event of CREDIT_EVENTS) {
      random -= event.probability;
      if (random <= 0) {
        return event;
      }
    }
    
    // Fallback to first event (shouldn't normally happen)
    return CREDIT_EVENTS[0];
  };
  
  export const getEventsByType = (type) => {
    return CREDIT_EVENTS.filter(event => event.type === type);
  };
  
  export const getRandomEventByType = (type) => {
    const events = getEventsByType(type);
    return events[Math.floor(Math.random() * events.length)];
  };