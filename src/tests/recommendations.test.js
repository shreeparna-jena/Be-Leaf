import { describe, it, expect } from 'vitest';
import { getRecommendations } from '../utils/recommendations';

describe('getRecommendations', () => {
  it('returns electricity recommendations for an electricity-heavy profile', () => {
    const result = getRecommendations('Electricity');
    expect(result.message).toContain('AC usage');
    expect(result.tasks.some(t => t.text.includes('lights'))).toBe(true);
  });

  it('returns transportation recommendations for a transport-heavy profile', () => {
    const result = getRecommendations('Transportation');
    expect(result.message).toContain('public transport');
  });

  it('returns waste recommendations for a waste-heavy profile', () => {
    const result = getRecommendations('Waste');
    expect(result.message).toContain('plastics');
  });

  it('returns congratulatory message for a perfect profile', () => {
    const result = getRecommendations('None');
    expect(result.message).toContain('incredibly low');
  });
});
