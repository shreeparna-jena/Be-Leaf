const STORAGE_KEY = 'beLeafUserData';

export function saveUserData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

export function loadUserData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Failed to load from localStorage", e);
    return null;
  }
}

export function addHistoryEntry(history, currentScore) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const newHistory = [...(history || [])];
  
  // Find if today already exists
  const existingIndex = newHistory.findIndex(entry => entry.date === today);
  if (existingIndex !== -1) {
    newHistory[existingIndex].score = currentScore;
  } else {
    newHistory.push({ date: today, score: currentScore });
  }
  return newHistory;
}
