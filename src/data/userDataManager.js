// userDataManager.js - Handle saving/loading user data and state management

import { CATEGORIES } from './gameData.js';
import { calculateLevel, calculateOverallLevel, applyDecay } from './levelCalculations.js';

const STORAGE_KEY = 'gamify-life-data';

// Default user data structure
const createDefaultUserData = () => {
  const stats = {};
  CATEGORIES.forEach(category => {
    stats[category] = {
      xp: 0,
      level: 1,
      lastActivity: Date.now()
    };
  });

  return {
    totalXP: 0,
    overallLevel: 1,
    stats,
    activities: [],
    createdAt: Date.now(),
    lastUpdated: Date.now()
  };
};

// Load user data from localStorage
export const loadUserData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createDefaultUserData();
    }
    
    const userData = JSON.parse(saved);
    
    // Apply decay when loading (simulates time passing)
    const decayedStats = applyDecay(userData.stats);
    const totalXP = Object.values(decayedStats).reduce((sum, stat) => sum + stat.xp, 0);
    
    return {
      ...userData,
      stats: decayedStats,
      totalXP,
      overallLevel: calculateOverallLevel(totalXP)
    };
  } catch (error) {
    console.error('Error loading user data:', error);
    return createDefaultUserData();
  }
};

// Save user data to localStorage
export const saveUserData = (userData) => {
  try {
    const dataToSave = {
      ...userData,
      lastUpdated: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

// Add a new activity and update stats
export const addActivity = (userData, category, activityName, xpValue) => {
  const timestamp = Date.now();
  
  // Create new activity entry
  const newActivity = {
    id: Date.now(), // Simple ID generation
    category,
    activity: activityName,
    xp: xpValue,
    timestamp
  };

  // Update category stats
  const currentCategoryStats = userData.stats[category];
  const newXP = currentCategoryStats.xp + xpValue;
  const newLevel = calculateLevel(newXP);

  const updatedStats = {
    ...userData.stats,
    [category]: {
      xp: newXP,
      level: newLevel,
      lastActivity: timestamp
    }
  };

  // Calculate new totals
  const totalXP = Object.values(updatedStats).reduce((sum, stat) => sum + stat.xp, 0);
  const overallLevel = calculateOverallLevel(totalXP);

  // Create updated user data
  const updatedUserData = {
    ...userData,
    stats: updatedStats,
    totalXP,
    overallLevel,
    activities: [newActivity, ...userData.activities].slice(0, 50) // Keep last 50 activities
  };

  // Save automatically
  saveUserData(updatedUserData);
  
  return updatedUserData;
};

// Reset all data (useful for testing)
export const resetUserData = () => {
  const newData = createDefaultUserData();
  saveUserData(newData);
  return newData;
};

// Get recent activities (last N activities)
export const getRecentActivities = (userData, limit = 10) => {
  return userData.activities.slice(0, limit);
};