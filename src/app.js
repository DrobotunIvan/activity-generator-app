import { initUI } from './ui.js';
import { getActivities } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ensure initial data is populated
  getActivities();
  
  // Initialize UI event listeners and rendering
  initUI();
});
