// gameData.js - Core game configuration and activity templates

export const CATEGORIES = [
  'Exercise',
  'Sleep', 
  'Exploration',
  'Mindfulness',
  'Education',
  'Social',
  'Creativity'
];

// XP required for each level (exponential growth)
export const XP_TABLE = Array.from({length: 100}, (_, i) => Math.floor(100 * Math.pow(1.2, i)));

// Predefined activities with suggested XP values
export const ACTIVITY_TEMPLATES = {
  Exercise: [
    { name: "Quick walk (15 min)", xp: 10 },
    { name: "Gym workout (1 hour)", xp: 50 },
    { name: "Run (30 min)", xp: 30 },
    { name: "Sports game", xp: 40 },
    { name: "Yoga session", xp: 25 }
  ],
  Sleep: [
    { name: "Good night's sleep (7-8 hours)", xp: 40 },
    { name: "Power nap (20 min)", xp: 10 },
    { name: "Early bedtime", xp: 20 },
    { name: "Consistent sleep schedule", xp: 15 }
  ],
  Exploration: [
    { name: "Visit new place", xp: 30 },
    { name: "Try new restaurant", xp: 15 },
    { name: "Weekend trip", xp: 60 },
    { name: "Walk new route", xp: 20 },
    { name: "Museum/gallery visit", xp: 25 }
  ],
  Mindfulness: [
    { name: "Meditation (10 min)", xp: 20 },
    { name: "Breathing exercise", xp: 10 },
    { name: "Journaling", xp: 15 },
    { name: "Mindful walk", xp: 15 },
    { name: "Gratitude practice", xp: 10 }
  ],
  Education: [
    { name: "Read book chapter", xp: 20 },
    { name: "Online course lesson", xp: 30 },
    { name: "Documentary", xp: 25 },
    { name: "Language practice", xp: 20 },
    { name: "Podcast episode", xp: 15 }
  ],
  Social: [
    { name: "Coffee with friend", xp: 25 },
    { name: "Family dinner", xp: 20 },
    { name: "Call old friend", xp: 20 },
    { name: "Team activity", xp: 30 },
    { name: "Help someone", xp: 25 }
  ],
  Creativity: [
    { name: "Write/journal", xp: 20 },
    { name: "Draw/paint", xp: 25 },
    { name: "Music practice", xp: 30 },
    { name: "Craft project", xp: 35 },
    { name: "Photography", xp: 20 }
  ]
};

// Decay settings
export const DECAY_CONFIG = {
  startDecayAfterDays: 3,
  decayPercentPerDay: 2, // 2% per day after decay starts
  minimumLevel: 1 // Never decay below level 1
};