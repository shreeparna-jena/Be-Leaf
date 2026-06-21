import { IMPACT_AREAS } from '../constants/config';

/**
 * @typedef {Object} DailyTask
 * @property {string} id - The unique identifier for the task
 * @property {string} text - The actionable text description of the task
 * @property {number} pts - The seed points awarded for completing the task
 */

/**
 * @typedef {Object} Recommendation
 * @property {string} message - A personalized message based on the highest impact area
 * @property {DailyTask[]} tasks - A list of recommended daily tasks
 */

/**
 * Generates personalized recommendations and daily tasks based on the user's highest footprint impact area.
 * 
 * @param {string} highestImpactArea - The category with the highest footprint impact
 * @returns {Recommendation} The generated recommendation message and tasks
 */
export function getRecommendations(highestImpactArea) {
  if (highestImpactArea === IMPACT_AREAS.TRANSPORTATION) {
    return {
      message: "Transportation contributes most to your footprint. Consider replacing one weekly car trip with public transport.",
      tasks: [
        { id: 't0', text: "Walked or cycled for a short trip", pts: 20 },
        { id: 't1', text: "Used public transit today", pts: 25 },
        { id: 't2', text: "Combined multiple errands into one trip", pts: 15 }
      ]
    };
  } else if (highestImpactArea === IMPACT_AREAS.ELECTRICITY) {
    return {
      message: "Reducing AC usage by one hour per day could help lower your footprint and earn more Seed Points.",
      tasks: [
        { id: 'e0', text: "Switched off unused lights", pts: 10 },
        { id: 'e1', text: "Adjusted thermostat by 1 degree", pts: 20 },
        { id: 'e2', text: "Unplugged unused devices", pts: 15 }
      ]
    };
  } else if (highestImpactArea === IMPACT_AREAS.NONE) {
    return {
      message: "Your footprint is incredibly low across the board! Keep up your amazing green habits to maintain your Garden.",
      tasks: [
        { id: 'n0', text: "Shared a green tip with a friend", pts: 15 },
        { id: 'n1', text: "Spent 15 minutes in nature", pts: 15 },
        { id: 'n2', text: "Supported a local sustainable business", pts: 20 }
      ]
    };
  } else { // Waste
    return {
      message: "Single-use plastics add up quickly. Try carrying a reusable bag in your car or backpack.",
      tasks: [
        { id: 'w0', text: "Used a reusable bag today", pts: 15 },
        { id: 'w1', text: "Drank from a reusable water bottle", pts: 10 },
        { id: 'w2', text: "Properly sorted recycling", pts: 15 }
      ]
    };
  }
}
