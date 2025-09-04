// StatsDisplay.js - Display all category stats in a grid

import React from 'react';
import ProgressBar from './ProgressBar';
import { getLevelProgress } from '../data/levelCalculations';
import './StatsDisplay.css';

const StatsDisplay = ({ stats }) => {
  // Category icons and colors
  const getCategoryInfo = (category) => {
    const categoryMap = {
      Exercise: { icon: '💪', color: '#e74c3c', bgColor: '#e74c3c15' },
      Sleep: { icon: '😴', color: '#3498db', bgColor: '#3498db15' },
      Exploration: { icon: '🗺️', color: '#f39c12', bgColor: '#f39c1215' },
      Mindfulness: { icon: '🧘', color: '#9b59b6', bgColor: '#9b59b615' },
      Education: { icon: '📚', color: '#2ecc71', bgColor: '#2ecc7115' },
      Social: { icon: '👥', color: '#e67e22', bgColor: '#e67e2215' },
      Creativity: { icon: '🎨', color: '#f1c40f', bgColor: '#f1c40f15' }
    };
    return categoryMap[category] || categoryMap.Exercise;
  };

  // Sort stats by level (highest first)
  const sortedStats = Object.entries(stats).sort((a, b) => b[1].level - a[1].level);

  return (
    <div className="stats-display">
      <div className="stats-grid">
        {sortedStats.map(([category, stat]) => {
          const categoryInfo = getCategoryInfo(category);
          const progressPercent = getLevelProgress(stat.xp);
          const daysSinceActivity = Math.floor((Date.now() - stat.lastActivity) / (1000 * 60 * 60 * 24));

          return (
            <div 
              key={category} 
              className="stat-card"
              style={{ backgroundColor: categoryInfo.bgColor }}
            >
              <div className="stat-header">
                <div className="stat-icon">{categoryInfo.icon}</div>
                <div className="stat-info">
                  <h4 className="stat-name">{category}</h4>
                  <div className="stat-level" style={{ color: categoryInfo.color }}>
                    Level {stat.level}
                  </div>
                </div>
              </div>

              <div className="stat-progress">
                <ProgressBar 
                  progress={progressPercent}
                  color={categoryInfo.color}
                  height="8px"
                />
                <div className="progress-info">
                  <span className="xp-amount">{stat.xp.toLocaleString()} XP</span>
                  <span className="progress-percent">{progressPercent}%</span>
                </div>
              </div>

              <div className="last-activity">
                <span className="activity-label">Last activity:</span>
                <span className="activity-time">
                  {daysSinceActivity === 0 ? 'Today' : 
                   daysSinceActivity === 1 ? '1 day ago' : 
                   `${daysSinceActivity} days ago`}
                </span>
                {daysSinceActivity > 3 && (
                  <span className="decay-warning">⚠️ Decaying</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="stats-summary">
        <div className="summary-item">
          <span className="summary-label">Highest Level:</span>
          <span className="summary-value">
            {sortedStats[0][0]} (Level {sortedStats[0][1].level})
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Categories Above Level 5:</span>
          <span className="summary-value">
            {sortedStats.filter(([, stat]) => stat.level >= 5).length} / {sortedStats.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;