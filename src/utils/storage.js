/**
 * @typedef {Object} HistoryEntry
 * @property {string} date - ISO date string (YYYY-MM-DD)
 * @property {number} score - The footprint score for that date
 */

/**
 * @typedef {Object} DailyTaskState
 * @property {string} lastResetDate - ISO date string (YYYY-MM-DD) indicating when tasks were last generated
 * @property {boolean[]} completed - Array of booleans indicating if tasks are completed
 */

/**
 * @typedef {Object} UserData
 * @property {string} userName - The user's name
 * @property {number} seedPoints - The user's accumulated seed points
 * @property {number} footprintScore - The user's current footprint score
 * @property {number|null} previousScore - The user's footprint score prior to the current one
 * @property {string} highestImpactArea - The area where the user has the highest footprint impact
 * @property {DailyTaskState} dailyTasks - The user's daily task progress
 * @property {HistoryEntry[]} history - History of the user's footprint scores
 */

const STORAGE_KEY = 'beLeafUserData';

/**
 * Saves the user data object to localStorage.
 * Handles quota exceeded errors gracefully.
 * 
 * @param {UserData} data - The user data to persist
 */
export function saveUserData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
      console.warn("Storage quota exceeded. Cannot save user data.");
    } else {
      console.error("Failed to save to localStorage", e);
    }
  }
}

/**
 * Loads the user data from localStorage.
 * 
 * @returns {UserData|null} The parsed user data, or null if empty/invalid
 */
export function loadUserData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Failed to parse data from localStorage. Returning null.", e);
    return null;
  }
}

/**
 * Appends a new footprint score to the history, or overwrites if the date matches today.
 * 
 * @param {HistoryEntry[]} history - The existing history array
 * @param {number} currentScore - The footprint score to record
 * @returns {HistoryEntry[]} A new array containing the updated history
 */
export function addHistoryEntry(history, currentScore) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const newHistory = [...(history || [])];
  
  const existingIndex = newHistory.findIndex(entry => entry.date === today);
  if (existingIndex !== -1) {
    newHistory[existingIndex].score = currentScore;
  } else {
    newHistory.push({ date: today, score: currentScore });
  }
  return newHistory;
}
