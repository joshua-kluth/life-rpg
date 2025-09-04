// ActivityLogger.js - Form for logging activities

import React, { useState } from 'react';
import { CATEGORIES, ACTIVITY_TEMPLATES } from '../data/gameData';
import './ActivityLogger.css';

const ActivityLogger = ({ onAddActivity }) => {
  const [selectedCategory, setSelectedCategory] = useState('Exercise');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customActivity, setCustomActivity] = useState('');
  const [customXP, setCustomXP] = useState('');
  const [useTemplate, setUseTemplate] = useState(true);

  // Get category info for styling
  const getCategoryColor = (category) => {
    const colorMap = {
      Exercise: '#e74c3c',
      Sleep: '#3498db',
      Exploration: '#f39c12',
      Mindfulness: '#9b59b6',
      Education: '#2ecc71',
      Social: '#e67e22',
      Creativity: '#f1c40f'
    };
    return colorMap[category] || '#3498db';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let activityName, xpValue;

    if (useTemplate && selectedTemplate) {
      const template = ACTIVITY_TEMPLATES[selectedCategory].find(t => t.name === selectedTemplate);
      activityName = template.name;
      xpValue = template.xp;
    } else if (!useTemplate && customActivity && customXP) {
      activityName = customActivity.trim();
      xpValue = parseInt(customXP);
    } else {
      alert('Please fill in all required fields');
      return;
    }

    // Validate XP value
    if (xpValue <= 0 || xpValue > 200) {
      alert('XP must be between 1 and 200');
      return;
    }

    // Submit the activity
    onAddActivity(selectedCategory, activityName, xpValue);

    // Reset form
    if (!useTemplate) {
      setCustomActivity('');
      setCustomXP('');
    }
    setSelectedTemplate('');

    // Show success message
    const successMsg = `+${xpValue} XP added to ${selectedCategory}!`;
    const notification = document.createElement('div');
    notification.textContent = successMsg;
    notification.className = 'activity-notification';
    notification.style.backgroundColor = getCategoryColor(selectedCategory);
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  return (
    <div className="activity-logger">
      <form onSubmit={handleSubmit} className="activity-form">
        {/* Category Selection */}
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <div className="category-tabs">
            {CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                style={{
                  backgroundColor: selectedCategory === category ? getCategoryColor(category) : 'transparent',
                  borderColor: getCategoryColor(category),
                  color: selectedCategory === category ? 'white' : getCategoryColor(category)
                }}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedTemplate(''); // Reset template when category changes
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Template vs Custom Toggle */}
        <div className="form-group">
          <div className="toggle-buttons">
            <button
              type="button"
              className={`toggle-btn ${useTemplate ? 'active' : ''}`}
              onClick={() => setUseTemplate(true)}
            >
              Use Template
            </button>
            <button
              type="button"
              className={`toggle-btn ${!useTemplate ? 'active' : ''}`}
              onClick={() => setUseTemplate(false)}
            >
              Custom Activity
            </button>
          </div>
        </div>

        {/* Template Selection */}
        {useTemplate ? (
          <div className="form-group">
            <label htmlFor="template">Activity:</label>
            <select
              id="template"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="activity-select"
              required
            >
              <option value="">Select an activity...</option>
              {ACTIVITY_TEMPLATES[selectedCategory].map(template => (
                <option key={template.name} value={template.name}>
                  {template.name} (+{template.xp} XP)
                </option>
              ))}
            </select>
          </div>
        ) : (
          /* Custom Activity Input */
          <>
            <div className="form-group">
              <label htmlFor="custom-activity">Activity Description:</label>
              <input
                id="custom-activity"
                type="text"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                placeholder="What did you do?"
                className="activity-input"
                required
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <label htmlFor="custom-xp">XP Value:</label>
              <input
                id="custom-xp"
                type="number"
                value={customXP}
                onChange={(e) => setCustomXP(e.target.value)}
                placeholder="1-200"
                className="xp-input"
                min="1"
                max="200"
                required
              />
              <small className="xp-hint">
                Small activities: 5-15 XP | Medium: 20-40 XP | Large: 50+ XP
              </small>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn"
          style={{ backgroundColor: getCategoryColor(selectedCategory) }}
        >
          Log Activity & Gain XP!
        </button>
      </form>

      {/* Quick XP Reference */}
      <div className="xp-reference">
        <h4>XP Guidelines:</h4>
        <div className="xp-examples">
          <span className="xp-example">Small effort: 5-15 XP</span>
          <span className="xp-example">Medium effort: 20-40 XP</span>
          <span className="xp-example">Large effort: 50+ XP</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogger;