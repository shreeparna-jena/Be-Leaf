import { GROWTH_THRESHOLDS, GROWTH_STAGES } from '../constants/config';

/**
 * @typedef {Object} ImprovementTrend
 * @property {number} previousScore - The previous footprint score
 * @property {number} currentScore - The current footprint score
 * @property {number} diff - The absolute difference in score
 * @property {boolean} isImprovement - True if the footprint score went down
 * @property {boolean} isWorse - True if the footprint score went up
 * @property {boolean} isSame - True if the footprint score is unchanged
 */

/**
 * Returns the growth stage name based on the accumulated seed points.
 * 
 * @param {number} seedPoints - The total seed points earned
 * @returns {string} The name of the growth stage
 */
export function getGrowthStage(seedPoints) {
  if (seedPoints >= GROWTH_THRESHOLDS.GARDEN) return GROWTH_STAGES.GARDEN;
  if (seedPoints >= GROWTH_THRESHOLDS.TREE) return GROWTH_STAGES.TREE;
  if (seedPoints >= GROWTH_THRESHOLDS.PLANT) return GROWTH_STAGES.PLANT;
  if (seedPoints >= GROWTH_THRESHOLDS.SAPLING) return GROWTH_STAGES.SAPLING;
  return GROWTH_STAGES.SEED;
}

/**
 * Calculates the improvement trend between two scores.
 * 
 * @param {number|null|undefined} previousScore - The footprint score from a previous assessment
 * @param {number} currentScore - The newly calculated footprint score
 * @returns {ImprovementTrend|null} The trend data, or null if previousScore is not available
 */
export function getImprovementTrend(previousScore, currentScore) {
  if (previousScore === null || previousScore === undefined) return null;

  const diff = previousScore - currentScore; // lower footprint is better
  
  return {
    previousScore: previousScore,
    currentScore: currentScore,
    diff: Math.abs(diff),
    isImprovement: diff > 0,
    isWorse: diff < 0,
    isSame: diff === 0
  };
}
