/**
 * Core configuration and magic numbers for the application
 */

export const IMPACT_AREAS = {
  TRANSPORTATION: 'Transportation',
  ELECTRICITY: 'Electricity',
  WASTE: 'Waste',
  NONE: 'None'
};

export const GROWTH_THRESHOLDS = {
  GARDEN: 200,
  TREE: 150,
  PLANT: 100,
  SAPLING: 50,
  SEED: 0
};

export const GROWTH_STAGES = {
  GARDEN: 'Garden',
  TREE: 'Tree',
  PLANT: 'Plant',
  SAPLING: 'Sapling',
  SEED: 'Seed'
};

export const SCORING = {
  TIE_BREAKER_WEIGHT: 0.01
};

export const VIEWS = {
  WELCOME: 'welcome',
  EXPLAINER: 'explainer',
  QUIZ: 'quiz',
  RESULTS: 'results',
  DASHBOARD: 'dashboard'
};
