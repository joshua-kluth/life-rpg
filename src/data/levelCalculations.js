// levelCalculations.js - Handle all XP and level calculations

import { XP_TABLE, DECAY_CONFIG } from './gameData.js';

// Calculate level from XP
export const calculateLevel = (xp) => {
  if (xp <= 0) return 1;
  
  for (let level = 1; level < XP_TABLE.length; level++) {
    if (xp < XP_TABLE[level]) {
      return level;
    }
  }
  return XP_TABLE.length; // Max level
};

// Calculate XP needed for next level
export const getXPForNextLevel = (currentXP) => {
  const currentLevel = calculateLevel(currentXP);
  if (currentLevel >= XP_TABLE.length) return 0; // Max level reached
  
  return XP_TABLE[currentLevel] - currentXP;
};

// Calculate progress percentage to next level
export const getLevelProgress = (currentXP) => {
  const currentLevel = calculateLevel(currentXP);
  if (currentLevel >= XP_TABLE.length) return 100; // Max level
  
  const prevLevelXP = currentLevel > 1 ? XP_TABLE[currentLevel - 1] : 0;
  const nextLevelXP = XP_TABLE[currentLevel];
  const progressXP = currentXP - prevLevelXP;
  const levelRangeXP = nextLevelXP - prevLevelXP;
  
  return Math.floor((progressXP / levelRangeXP) * 100);
};

// Calculate overall level from total XP
export const calculateOverallLevel = (totalXP) => {
  return calculateLevel(totalXP);
};

// Apply decay to stats based on last activity time
export const applyDecay = (stats) => {
  const now = Date.now();
  const updatedStats = { ...stats };
  
  Object.keys(updatedStats).forEach(category => {
    const stat = updatedStats[category];
    const daysSinceLastActivity = (now - stat.lastActivity) / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastActivity > DECAY_CONFIG.startDecayAfterDays) {
      const decayDays = daysSinceLastActivity - DECAY_CONFIG.startDecayAfterDays;
      const decayAmount = Math.floor(stat.xp * (DECAY_CONFIG.decayPercentPerDay / 100) * decayDays);
      
      // Apply decay but don't go below minimum level XP
      const minimumXP = XP_TABLE[DECAY_CONFIG.minimumLevel - 1] || 0;
      updatedStats[category] = {
        ...stat,
        xp: Math.max(stat.xp - decayAmount, minimumXP),
        level: calculateLevel(Math.max(stat.xp - decayAmount, minimumXP))
      };
    }
  });
  
  return updatedStats;
};

// Get the category with highest level
export const getHighestStatCategory = (stats) => {
  let highest = { category: 'Exercise', level: 0 };
  
  Object.entries(stats).forEach(([category, stat]) => {
    if (stat.level > highest.level) {
      highest = { category, level: stat.level };
    }
  });
  
  return highest.category;
};