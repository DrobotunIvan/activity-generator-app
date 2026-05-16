import { getActivities, getHistory } from './storage.js';

export const generateActivity = (preferences) => {
  const activities = getActivities();
  const history = getHistory();
  
  // Get the IDs of the last 5 generated activities
  const recentHistoryIds = history.slice(0, 5).map(h => h.activityId);
  
  let filteredActivities = activities.filter(activity => {
    // BR-3 Category Rule: At least one category must be selected
    if (preferences.selectedCategories.length > 0 && !preferences.selectedCategories.includes(activity.category)) {
      return false;
    }
    
    // BR-2 Duration Rule: Max duration
    if (preferences.maxDuration && activity.duration > parseInt(preferences.maxDuration, 10)) {
      return false;
    }
    
    // BR-1 Free Activities Rule / Cost Type
    if (preferences.preferredCostType === 'Безкоштовно' && activity.costType !== 'Безкоштовно') {
      return false;
    }
    if (preferences.preferredCostType === 'Платно' && activity.costType !== 'Платно') {
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
    
    return true;
  });
  
  // BR-4 Anti-Repetition Rule
  // Filter out recent activities, but if that leaves us with nothing, ignore the rule
  const nonRepeated = filteredActivities.filter(a => !recentHistoryIds.includes(a.id));
  if (nonRepeated.length > 0) {
    filteredActivities = nonRepeated;
  }
  
  if (filteredActivities.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * filteredActivities.length);
  return filteredActivities[randomIndex];
};
