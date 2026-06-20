export const quizQuestions = [
  {
    id: 'transportation',
    title: 'Transportation Habits',
    question: 'What is your most common way to commute?',
    options: [
      { label: '🚗 Personal Car', impact: 'Transportation', fp: 30, seed: 5 },
      { label: '🚌 Public Transit', impact: 'Transportation', fp: 15, seed: 20 },
      { label: '🚲 Bicycle or Walking', impact: 'Transportation', fp: 0, seed: 40 }
    ]
  },
  {
    id: 'electricity',
    title: 'AC/Electricity Usage',
    question: 'How do you manage your AC and electricity at home?',
    options: [
      { label: '⚡ Heavy AC Usage', impact: 'Electricity', fp: 30, seed: 5 },
      { label: '🌬️ Fans and Open Windows', impact: 'Electricity', fp: 15, seed: 20 },
      { label: '💡 Smart Thermostat/LEDs', impact: 'Electricity', fp: 0, seed: 40 }
    ]
  },
  {
    id: 'reusable',
    title: 'Reusable Item Usage',
    question: 'How often do you use reusable bags and bottles?',
    options: [
      { label: '🛍️ Rarely (Single-use plastics)', impact: 'Waste', fp: 20, seed: 5 },
      { label: '♻️ Sometimes', impact: 'Waste', fp: 10, seed: 15 },
      { label: '🌍 Always', impact: 'Waste', fp: 0, seed: 30 }
    ]
  },
  {
    id: 'energy',
    title: 'Energy-Saving Habits',
    question: 'Do you unplug devices when not in use?',
    options: [
      { label: '🔌 Never think about it', impact: 'Electricity', fp: 10, seed: 5 },
      { label: '🔋 Sometimes', impact: 'Electricity', fp: 5, seed: 15 },
      { label: '🌱 Always', impact: 'Electricity', fp: 0, seed: 30 }
    ]
  },
  {
    id: 'goals',
    title: 'Sustainability Goals',
    question: 'What is your primary green goal this year?',
    options: [
      { label: '🚴 Reduce Commute Emissions', impact: 'Transportation', fp: 0, seed: 20 },
      { label: '🗑️ Minimize Household Waste', impact: 'Waste', fp: 0, seed: 20 },
      { label: '🏡 Lower Energy Bills', impact: 'Electricity', fp: 0, seed: 20 }
    ]
  }
];
