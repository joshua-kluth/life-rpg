// App.js - Main application component

import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import CharacterDisplay from './components/CharacterDisplay';
import StatsDisplay from './components/StatsDisplay';
import ActivityLogger from './components/ActivityLogger';
import RecentActivities from './components/RecentActivities';
import LevelProgress from './components/LevelProgress';

// Data management
import { loadUserData, addActivity, resetUserData } from './data/userDataManager';
import { getHighestStatCategory } from './data/levelCalculations';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data on component mount
  useEffect(() => {
    const data = loadUserData();
    setUserData(data);
    setLoading(false);
  }, []);

  // Handle adding new activity
  const handleAddActivity = (category, activityName, xpValue) => {
    const updatedData = addActivity(userData, category, activityName, xpValue);
    setUserData(updatedData);
  };

  // Handle data reset (for testing)
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      const newData = resetUserData();
      setUserData(newData);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="app-loading">
        <h2>Loading your character...</h2>
      </div>
    );
  }

  const highestStatCategory = getHighestStatCategory(userData.stats);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Gamify Life</h1>
        <p>Level up your life, one activity at a time!</p>
        <button className="reset-button" onClick={handleReset}>
          Reset Progress
        </button>
      </header>

      <main className="app-main">
        {/* Character and Overall Progress */}
        <section className="character-section">
          <CharacterDisplay 
            highestStat={highestStatCategory}
            overallLevel={userData.overallLevel}
          />
          <LevelProgress 
            totalXP={userData.totalXP}
            overallLevel={userData.overallLevel}
          />
        </section>

        {/* Stats Dashboard */}
        <section className="stats-section">
          <h2>Your Stats</h2>
          <StatsDisplay stats={userData.stats} />
        </section>

        {/* Activity Input */}
        <section className="activity-section">
          <h2>Log Activity</h2>
          <ActivityLogger onAddActivity={handleAddActivity} />
        </section>

        {/* Recent Activities */}
        <section className="recent-section">
          <h2>Recent Activities</h2>
          <RecentActivities activities={userData.activities} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Total XP: {userData.totalXP} | Overall Level: {userData.overallLevel}</p>
      </footer>
    </div>
  );
}

export default App;