import { IMPACT_AREAS, SCORING } from '../constants/config';

/**
 * @typedef {Object} QuizAnswer
 * @property {string} impact - The category of the answer (e.g., 'Transportation')
 * @property {number} fp - The footprint impact value
 * @property {number} seed - The seed points awarded
 */

/**
 * @typedef {Object} QuizScores
 * @property {number} footprintScore - Total footprint score
 * @property {number} seedScore - Total seed points
 * @property {string} highestImpactArea - The area with the most footprint impact
 */

/**
 * Calculates the total scores and highest impact area from quiz answers.
 * 
 * @param {QuizAnswer[]} answers - Array of selected quiz answers
 * @returns {QuizScores} The calculated scores and impact area
 */
export function calculateQuizScores(answers) {
  let fpTotal = 0;
  let seedTotal = 0;
  
  const impactCounts = { 
    [IMPACT_AREAS.TRANSPORTATION]: 0, 
    [IMPACT_AREAS.ELECTRICITY]: 0, 
    [IMPACT_AREAS.WASTE]: 0 
  };
  
  answers.forEach(ans => {
    fpTotal += ans.fp;
    seedTotal += ans.seed;
    if (impactCounts[ans.impact] !== undefined) {
      impactCounts[ans.impact] += ans.fp;
      if (ans.fp > 0) {
        impactCounts[ans.impact] += SCORING.TIE_BREAKER_WEIGHT;
      }
    }
  });

  let highestImpactArea = IMPACT_AREAS.NONE;
  let maxFp = 0; // Require at least >0 impact to be considered highest
  
  for (const [key, value] of Object.entries(impactCounts)) {
    if (value > maxFp) {
      maxFp = value;
      highestImpactArea = key;
    }
  }

  return {
    footprintScore: fpTotal,
    seedScore: seedTotal,
    highestImpactArea
  };
}
