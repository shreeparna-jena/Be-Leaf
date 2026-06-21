import { describe, it, expect } from 'vitest';
import { calculateQuizScores } from '../utils/scoring';

describe('calculateQuizScores', () => {
  it('walking produces a lower impact than driving', () => {
    const walkingResult = calculateQuizScores([{ impact: 'Transportation', fp: 0, seed: 40 }]);
    const carResult = calculateQuizScores([{ impact: 'Transportation', fp: 30, seed: 5 }]);
    
    expect(walkingResult.footprintScore).toBe(0);
    expect(carResult.footprintScore).toBe(30);
    expect(walkingResult.seedScore).toBeGreaterThan(carResult.seedScore);
  });

  it('calculates the highest impact area dynamically', () => {
    const answers = [
      { impact: 'Transportation', fp: 0, seed: 40 },
      { impact: 'Electricity', fp: 30, seed: 5 },
      { impact: 'Waste', fp: 10, seed: 15 }
    ];
    const result = calculateQuizScores(answers);
    expect(result.footprintScore).toBe(40);
    expect(result.highestImpactArea).toBe('Electricity');
  });

  it('returns None if the user has 0 footprint impact across all categories', () => {
    const answers = [
      { impact: 'Transportation', fp: 0, seed: 40 },
      { impact: 'Electricity', fp: 0, seed: 40 },
      { impact: 'Waste', fp: 0, seed: 30 }
    ];
    const result = calculateQuizScores(answers);
    expect(result.footprintScore).toBe(0);
    expect(result.highestImpactArea).toBe('None');
  });
});
