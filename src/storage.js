import { DEMO_ACTIVITIES } from './data.js';

const STORAGE_KEYS = {
  ACTIVITIES: 'activity_generator_activities',
  FAVORITES: 'activity_generator_favorites',
  HISTORY: 'activity_generator_history',
  PREFERENCES: 'activity_generator_preferences'
};

export const getActivities = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
  if (stored) {
    let activities = JSON.parse(stored);
    let changed = false;
    DEMO_ACTIVITIES.forEach(demoAct => {
      const existingIndex = activities.findIndex(a => a.id === demoAct.id);
      if (existingIndex === -1) {
        activities.push(demoAct);
        changed = true;
      } else if (activities[existingIndex].title !== demoAct.title) {
        activities[existingIndex] = demoAct;
        changed = true;
      }
    });
    if (changed) setActivities(activities);
    return activities;
  }
  setActivities(DEMO_ACTIVITIES);
  return DEMO_ACTIVITIES;
};

export const setActivities = (activities) => {
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
};

export const getFavorites = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return stored ? JSON.parse(stored) : [];
};

export const setFavorites = (favorites) => {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
};

export const getHistory = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return stored ? JSON.parse(stored) : [];
};

export const setHistory = (history) => {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};

export const addToHistory = (activityId) => {
  const history = getHistory();
  history.unshift({
    activityId,
    generatedAt: new Date().toISOString()
  });
  // Keep only the last 50 items
  if (history.length > 50) {
    history.pop();
  }
  setHistory(history);
};

export const getPreferences = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return stored ? JSON.parse(stored) : {
    selectedCategories: [],
    maxDuration: '',
    preferredLocation: '',
    preferredCostType: '',
    preferredDifficulty: ''
  };
};

export const setPreferences = (preferences) => {
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
};

export const resetDemoData = () => {
  setActivities(DEMO_ACTIVITIES);
  setFavorites([]);
  setHistory([]);
  setPreferences({
    selectedCategories: [],
    maxDuration: '',
    preferredLocation: '',
    preferredCostType: '',
    preferredDifficulty: ''
  });
};

export const exportAllData = () => {
  const data = {};
  Object.values(STORAGE_KEYS).forEach(key => {
    const val = localStorage.getItem(key);
    if (val) data[key] = JSON.parse(val);
  });
  return data;
};

export const importAllData = (data) => {
  Object.entries(data).forEach(([key, val]) => {
    localStorage.setItem(key, JSON.stringify(val));
  });
};
