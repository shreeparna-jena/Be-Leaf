import { describe, it, expect } from 'vitest';
import { getGrowthStage, getImprovementTrend } from '../utils/progress';

describe('getGrowthStage', () => {
  it('maps thresholds correctly', () => {
    expect(getGrowthStage(0)).toBe('Seed');
    expect(getGrowthStage(49)).toBe('Seed');
    expect(getGrowthStage(50)).toBe('Sapling');
    expect(getGrowthStage(99)).toBe('Sapling');
    expect(getGrowthStage(100)).toBe('Plant');
    expect(getGrowthStage(150)).toBe('Tree');
    expect(getGrowthStage(200)).toBe('Garden');
    expect(getGrowthStage(999)).toBe('Garden');
  });
});

describe('getImprovementTrend', () => {
  it('calculates improvement based on the previous assessment', () => {
    const trend = getImprovementTrend(70, 55);
    // 70 (first) - 55 = 15 improvement
    expect(trend.previousScore).toBe(70);
    expect(trend.diff).toBe(15);
    expect(trend.isImprovement).toBe(true);
  });

  it('returns null if previousScore is null', () => {
    expect(getImprovementTrend(null, 50)).toBeNull();
  });
});
