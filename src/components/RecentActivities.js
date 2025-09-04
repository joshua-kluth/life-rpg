// RecentActivities.js - Display recent activity history

import React, { useState } from 'react';
import './RecentActivities.css';

const RecentActivities = ({ activities }) => {
  const [showAll, setShowAll] = useState(false);
  const displayLimit = 5;

  // Get category info for styling
  const getCategoryInfo = (category) => {
    const categoryMap = {
      Exercise: { icon: '💪', color: '#e74c3c' },
      Sleep: { icon: '😴', color: '#3498db' },
      Exploration: { icon: '🗺️', color: '#f39c12' },
      Mindfulness: { icon: '🧘', color: '#9b59b6' },
      Education: { icon: '📚', color: '#2ecc71' },
      Social: { icon: '👥', color: '#e67e22' },
      Creativity: { icon: '🎨', color: '#f1c40f' }
    };
    return categoryMap[category] || categoryMap.Exercise;
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const activityDate = new Date(timestamp);
    const diffMinutes = Math.floor((now - activityDate) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return activityDate.toLocaleDateString();
  };

  // Calculate total XP from displayed activities
  const displayedActivities = showAll ? activities : activities.slice(0, displayLimit);
  const totalXPShown = displayedActivities.reduce((sum, activity) => sum + activity.xp, 0);

  if (activities.length === 0) {
    return (
      <div className="recent-activities">
        <div className="no-activities">
          <div className="no-activities-icon">📝</div>
          <h3>No activities yet!</h3>
          <p>Start logging activities to see your progress here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-activities">
      <div className="activities-header">
        <div className="activities-stats">
          <span className="stat-item">
            <strong>{activities.length}</strong> total activities
          </span>
          <span className="stat-item">
            <strong>{totalXPShown}</strong> XP shown
          </span>
        </div>
      </div>

      <div className="activities-list">
        {displayedActivities.map((activity) => {
          const categoryInfo = getCategoryInfo(activity.category);
          
          return (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon" style={{ backgroundColor: `${categoryInfo.color}20` }}>
                {categoryInfo.icon}
              </div>
              
              <div className="activity-details">
                <div className="activity-main">
                  <span className="activity-name">{activity.activity}</span>
                  <div className="activity-meta">
                    <span className="activity-category" style={{ color: categoryInfo.color }}>
                      {activity.category}
                    </span>
                    <span className="activity-time">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="activity-xp" style={{ color: categoryInfo.color }}>
                +{activity.xp}
              </div>
            </div>
          );
        })}
      </div>

      {activities.length > displayLimit && (
        <div className="activities-footer">
          <button 
            className="show-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? `Show Less` : `Show All (${activities.length})`}
          </button>
        </div>
      )}

      {activities.length > 0 && (
        <div className="activities-summary">
          <div className="summary-text">
            Keep it up! You've logged <strong>{activities.length}</strong> activities and earned{' '}
            <strong>{activities.reduce((sum, a) => sum + a.xp, 0).toLocaleString()}</strong> total XP!
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;