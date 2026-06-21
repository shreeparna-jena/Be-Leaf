import { useState, useEffect } from 'react';
import { loadUserData, saveUserData, addHistoryEntry } from '../utils/storage';

/**
 * Custom hook to manage global user data state and synchronization with localStorage.
 * 
 * @returns {Object} User data state and setter functions
 */
export function useUserData() {
  const [userName, setUserName] = useState('');
  const [seedPoints, setSeedPoints] = useState(0);
  const [footprintScore, setFootprintScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(null);
  const [highestImpactArea, setHighestImpactArea] = useState('');
  const [dailyTasks, setDailyTasks] = useState({
    lastResetDate: '',
    completed: [false, false, false]
  });
  const [history, setHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = loadUserData();
    const today = new Date().toISOString().split('T')[0];
    
    if (data) {
      setUserName(data.userName || '');
      setSeedPoints(data.seedPoints || 0);
      setFootprintScore(data.footprintScore || 0);
      setPreviousScore(data.previousScore !== undefined ? data.previousScore : null);
      setHighestImpactArea(data.highestImpactArea || '');
      setHistory(data.history || []);
      
      if (data.dailyTasks && data.dailyTasks.lastResetDate === today) {
        setDailyTasks(data.dailyTasks);
      } else {
        setDailyTasks({ lastResetDate: today, completed: [false, false, false] });
      }
    } else {
      setDailyTasks({ lastResetDate: today, completed: [false, false, false] });
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && userName) {
      saveUserData({
        userName,
        seedPoints,
        footprintScore,
        previousScore,
        highestImpactArea,
        dailyTasks,
        history
      });
    }
  }, [userName, seedPoints, footprintScore, previousScore, highestImpactArea, dailyTasks, history, isLoaded]);

  /**
   * Completes a quiz assessment and updates tracking data
   * 
   * @param {Object} results - The results from the quiz scoring
   */
  const handleQuizComplete = (results) => {
    if (history.length > 0) {
      setPreviousScore(footprintScore);
    }

    setFootprintScore(results.footprintScore);
    setSeedPoints(prev => prev + results.seedScore);
    setHighestImpactArea(results.highestImpactArea);
    
    const newHistory = addHistoryEntry(history, results.footprintScore);
    setHistory(newHistory);
  };

  /**
   * Completes a daily task and awards points
   * 
   * @param {number} index - Index of the task completed
   * @param {number} points - Points awarded
   */
  const handleTaskClick = (index, points) => {
    if (!dailyTasks.completed[index]) {
      const newCompleted = [...dailyTasks.completed];
      newCompleted[index] = true;
      setDailyTasks(prev => ({ ...prev, completed: newCompleted }));
      setSeedPoints(prev => prev + points);
    }
  };

  return {
    userName,
    setUserName,
    seedPoints,
    footprintScore,
    previousScore,
    highestImpactArea,
    dailyTasks,
    history,
    isLoaded,
    handleQuizComplete,
    handleTaskClick
  };
}
