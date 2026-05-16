import { getActivities, getHistory } from './storage.js';

export const generateActivity = (preferences) => {
  const activities = getActivities();
  const history = getHistory();
  
  // Get the IDs of the last 5 generated activities
  const recentHistoryIds = history.slice(0, 5).map(h => h.activityId);
  
  const filteredActivities = activities.filter(activity => {
    // BR-3 Category Rule: At least one category must be selected
    if (preferences.selectedCategories.length > 0 && !preferences.selectedCategories.includes(activity.category)) {
      return false;
    }
    
    // BR-2 Duration Rule: Max duration
    if (preferences.maxDuration && activity.duration > parseInt(preferences.maxDuration, 10)) {
      return false;
    }
    
    // BR-1 Free Activities Rule / Cost Type
    if (preferences.preferredCostType === 'Free' && activity.costType !== 'Free') {
      return false;
    }
    if (preferences.preferredCostType === 'Paid' && activity.costType !== 'Paid') {
      return false;
    }
    
    // Location Type filter
    if (preferences.preferredLocation && activity.locationType !== preferences.preferredLocation) {
      return false;
    }
    
    // Difficulty filter
    if (preferences.preferredDifficulty && activity.difficulty !== preferences.preferredDifficulty) {
      return false;
    }
    
    // BR-4 Anti-Repetition Rule
    if (recentHistoryIds.includes(activity.id)) {
      return false;
    }
    
    return true;
  });
  
  if (filteredActivities.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * filteredActivities.length);
  return filteredActivities[randomIndex];
};
