// LevelProgress.js - Display overall level and progress

import React from 'react';
import { getXPForNextLevel, getLevelProgress } from '../data/levelCalculations';
import './LevelProgress.css';

const LevelProgress = ({ totalXP, overallLevel }) => {
  const xpForNext = getXPForNextLevel(totalXP);
  const progressPercent = getLevelProgress(totalXP);
  const isMaxLevel = xpForNext === 0;

  return (
    <div className="level-progress">
      <div className="level-header">
        <h3>Overall Progress</h3>
        <div className="current-level">
          Level {overallLevel}
        </div>
      </div>

      <div className="xp-display">
        <div className="xp-amount">
          <span className="xp-number">{totalXP.toLocaleString()}</span>
          <span className="xp-label">Total XP</span>
        </div>
      </div>

      {!isMaxLevel ? (
        <>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {progressPercent}% to next level
            </div>
          </div>

          <div className="next-level-info">
            <span className="next-level-text">
              {xpForNext.toLocaleString()} XP to Level {overallLevel + 1}
            </span>
          </div>
        </>
      ) : (
        <div className="max-level-message">
          <span className="max-level-text">🏆 Maximum Level Reached! 🏆</span>
        </div>
      )}

      <div className="level-milestones">
        <div className="milestone">
          <div className="milestone-icon">🥉</div>
          <div className="milestone-text">
            {overallLevel >= 5 ? '✓' : ''} Level 5
          </div>
        </div>
        <div className="milestone">
          <div className="milestone-icon">🥈</div>
          <div className="milestone-text">
            {overallLevel >= 10 ? '✓' : ''} Level 10
          </div>
        </div>
        <div className="milestone">
          <div className="milestone-icon">🥇</div>
          <div className="milestone-text">
            {overallLevel >= 20 ? '✓' : ''} Level 20
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;