// CharacterDisplay.js - Display character avatar based on highest stat

import React from 'react';
import './CharacterDisplay.css';

const CharacterDisplay = ({ highestStat, overallLevel }) => {
  // Avatar mapping - for now using text descriptions
  const getAvatarInfo = (stat) => {
    const avatarMap = {
      Exercise: {
        emoji: '💪',
        title: 'Athletic Champion',
        description: 'Your dedication to fitness shines through!',
        color: '#e74c3c'
      },
      Sleep: {
        emoji: '😴',
        title: 'Rest Master',
        description: 'Well-rested and ready for anything!',
        color: '#3498db'
      },
      Exploration: {
        emoji: '🗺️',
        title: 'World Explorer',
        description: 'Always seeking new adventures!',
        color: '#f39c12'
      },
      Mindfulness: {
        emoji: '🧘',
        title: 'Zen Master',
        description: 'Calm, centered, and mindful.',
        color: '#9b59b6'
      },
      Education: {
        emoji: '📚',
        title: 'Knowledge Seeker',
        description: 'Always learning and growing!',
        color: '#2ecc71'
      },
      Social: {
        emoji: '👥',
        title: 'Social Butterfly',
        description: 'Connected and loved by many!',
        color: '#e67e22'
      },
      Creativity: {
        emoji: '🎨',
        title: 'Creative Genius',
        description: 'Imagination knows no bounds!',
        color: '#f1c40f'
      }
    };

    return avatarMap[stat] || avatarMap.Exercise;
  };

  const avatarInfo = getAvatarInfo(highestStat);

  return (
    <div className="character-display">
      <div className="avatar-container" style={{borderColor: avatarInfo.color}}>
        <div className="avatar-emoji" style={{background: `linear-gradient(135deg, ${avatarInfo.color}20, ${avatarInfo.color}40)`}}>
          {avatarInfo.emoji}
        </div>
        <div className="level-badge" style={{backgroundColor: avatarInfo.color}}>
          Lvl {overallLevel}
        </div>
      </div>
      
      <div className="character-info">
        <h3 className="character-title" style={{color: avatarInfo.color}}>
          {avatarInfo.title}
        </h3>
        <p className="character-description">
          {avatarInfo.description}
        </p>
        <div className="dominant-stat">
          <span className="stat-label">Dominant Trait:</span>
          <span className="stat-value" style={{color: avatarInfo.color}}>
            {highestStat}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;