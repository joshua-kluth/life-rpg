// ProgressBar.js - Reusable progress bar component

import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
  progress, 
  color = '#3498db', 
  backgroundColor = '#ecf0f1',
  height = '10px',
  showLabel = false,
  animated = true
}) => {
  return (
    <div className="progress-bar-wrapper">
      <div 
        className="progress-bar-track"
        style={{ 
          backgroundColor,
          height
        }}
      >
        <div 
          className={`progress-bar-fill ${animated ? 'animated' : ''}`}
          style={{ 
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: color,
            height
          }}
        >
          {animated && (
            <div className="progress-shine"></div>
          )}
        </div>
      </div>
      {showLabel && (
        <span className="progress-label" style={{ color }}>
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;