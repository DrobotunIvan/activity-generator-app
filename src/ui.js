import { generateActivity } from './generator.js';
import { getActivities, setActivities, getFavorites, setFavorites, getHistory, addToHistory, getPreferences, setPreferences, resetDemoData } from './storage.js';

let currentActivityId = null;

const categoryIcons = {
  'Спорт': '🏃',
  'Навчання': '📚',
  'Креативність': '🎨',
  'Розваги': '🎮',
  'На вулиці': '🏕️',
  'Відпочинок': '🧘'
};

export const initUI = () => {
  setupNavigation();
  setupPreferences();
  setupGenerator();
  setupCustomForm();
  setupReset();
  
  // Initial renders
  renderFavorites();
  renderCustom();
  renderHistory();
};

const setupNavigation = () => {
  const navBtns = ['generator', 'favorites', 'custom', 'history'];
  navBtns.forEach(btnId => {
    document.getElementById(`nav-${btnId}`).addEventListener('click', (e) => {
      // Update active nav
      document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      // Update active view
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById(`view-${btnId}`).classList.add('active');
      
      // Re-render when switching
      if (btnId === 'favorites') renderFavorites();
      if (btnId === 'custom') renderCustom();
      if (btnId === 'history') renderHistory();
    });
  });
};

const setupPreferences = () => {
  const prefs = getPreferences();
  
  // Set categories
  document.querySelectorAll('#category-filters input').forEach(cb => {
    if (prefs.selectedCategories.includes(cb.value)) cb.checked = true;
    cb.addEventListener('change', savePrefs);
  });
  
  // Set others
  const elDur = document.getElementById('filter-duration');
  const elLoc = document.getElementById('filter-location');
  const elCost = document.getElementById('filter-cost');
  const elDiff = document.getElementById('filter-difficulty');
  
  if (prefs.maxDuration) elDur.value = prefs.maxDuration;
  if (prefs.preferredLocation) elLoc.value = prefs.preferredLocation;
  if (prefs.preferredCostType) elCost.value = prefs.preferredCostType;
  if (prefs.preferredDifficulty) elDiff.value = prefs.preferredDifficulty;
  
  elDur.addEventListener('input', savePrefs);
  elLoc.addEventListener('change', savePrefs);
  elCost.addEventListener('change', savePrefs);
  elDiff.addEventListener('change', savePrefs);
};

const savePrefs = () => {
  const selectedCategories = Array.from(document.querySelectorAll('#category-filters input:checked')).map(cb => cb.value);
  const prefs = {
    selectedCategories,
    maxDuration: document.getElementById('filter-duration').value,
    preferredLocation: document.getElementById('filter-location').value,
    preferredCostType: document.getElementById('filter-cost').value,
    preferredDifficulty: document.getElementById('filter-difficulty').value,
  };
  setPreferences(prefs);
};

const setupGenerator = () => {
  const btn = document.getElementById('btn-generate');
  const err = document.getElementById('generate-error');
  const resCard = document.getElementById('activity-result');
  
  btn.addEventListener('click', () => {
    const prefs = getPreferences();
    if (prefs.selectedCategories.length === 0) {
      err.classList.remove('hidden');
      resCard.classList.add('hidden');
      return;
    }
    err.classList.add('hidden');
    
    const activity = generateActivity(prefs);
    if (!activity) {
      alert('Не знайдено активностей за вашими критеріями. Спробуйте змінити фільтри.');
      resCard.classList.add('hidden');
      return;
    }
    
    // Display result
    document.getElementById('res-title').textContent = activity.title;
    document.getElementById('res-desc').textContent = activity.description;
    const icon = categoryIcons[activity.category] || '✨';
    document.getElementById('res-cat').innerHTML = `<span class="cat-icon animated">${icon}</span> ${activity.category}`;
    document.getElementById('res-dur').textContent = `${activity.duration} хв`;
    document.getElementById('res-loc').textContent = activity.locationType;
    document.getElementById('res-cost').textContent = activity.costType;
    document.getElementById('res-diff').textContent = activity.difficulty;
    
    currentActivityId = activity.id;
    resCard.classList.remove('hidden');
    addToHistory(activity.id);
    
    // Update favorite button state
    updateFavButtonState();
  });
  
  document.getElementById('btn-favorite').addEventListener('click', () => {
    if (!currentActivityId) return;
    const favs = getFavorites();
    if (favs.includes(currentActivityId)) {
      setFavorites(favs.filter(id => id !== currentActivityId));
    } else {
      setFavorites([...favs, currentActivityId]);
    }
    updateFavButtonState();
  });
};

const updateFavButtonState = () => {
  if (!currentActivityId) return;
  const btn = document.getElementById('btn-favorite');
  const isFav = getFavorites().includes(currentActivityId);
  btn.textContent = isFav ? 'Видалити з улюблених' : 'Додати до улюблених';
  btn.className = isFav ? 'danger' : 'secondary';
};

const setupCustomForm = () => {
  document.getElementById('form-custom').addEventListener('submit', (e) => {
    e.preventDefault();
    const newActivity = {
      id: `custom-${Date.now()}`,
      title: document.getElementById('cust-title').value,
      description: document.getElementById('cust-desc').value,
      category: document.getElementById('cust-cat').value,
      duration: parseInt(document.getElementById('cust-dur').value, 10),
      locationType: document.getElementById('cust-loc').value,
      costType: document.getElementById('cust-cost').value,
      difficulty: document.getElementById('cust-diff').value,
      rating: 5,
      isCustom: true
    };
    const activities = getActivities();
    setActivities([...activities, newActivity]);
    e.target.reset();
    renderCustom();
    alert('Власну активність успішно додано!');
  });
};

const setupReset = () => {
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Ви впевнені, що хочете скинути всі дані? Це видалить історію, улюблені та власні активності.')) {
      resetDemoData();
      location.reload();
    }
  });
};

const renderFavorites = () => {
  const list = document.getElementById('favorites-list');
  const favIds = getFavorites();
  const activities = getActivities();
  
  list.innerHTML = '';
  
  // Important: map over favIds to preserve custom sort order
  const favActs = favIds.map(id => activities.find(a => a.id === id)).filter(Boolean);
  
  if (favActs.length === 0) {
    list.innerHTML = '<p>Ще немає улюблених активностей.</p>';
    return;
  }
  
  let draggedCard = null;

  favActs.forEach(a => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-id', a.id);
    card.innerHTML = `
      <div class="card-content">
        <h4>${a.title}</h4>
        <p>${a.description}</p>
        <div class="tags">
          <span class="tag"><span class="cat-icon">${categoryIcons[a.category] || '✨'}</span> ${a.category}</span>
          <span class="tag">${a.duration} хв</span>
          <span class="tag">${a.costType}</span>
        </div>
      </div>
      <button class="danger btn-remove-fav" data-id="${a.id}">Видалити</button>
    `;

    // Drag Events
    card.addEventListener('dragstart', (e) => {
      draggedCard = card;
      setTimeout(() => card.classList.add('dragging'), 0);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      draggedCard = null;
    });

    list.appendChild(card);
  });

  // Container Drop Events
  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (!draggable) return;

    if (afterElement == null) {
      list.appendChild(draggable);
    } else {
      list.insertBefore(draggable, afterElement);
    }
  });

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    const newOrder = Array.from(list.querySelectorAll('.card')).map(c => c.getAttribute('data-id'));
    setFavorites(newOrder);
  });

  document.querySelectorAll('.btn-remove-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      setFavorites(getFavorites().filter(fid => fid !== id));
      if (currentActivityId === id) updateFavButtonState();
      renderFavorites();
    });
  });
};

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
  
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const renderCustom = () => {
  const list = document.getElementById('custom-list');
  const activities = getActivities();
  const customActs = activities.filter(a => a.isCustom);
  
  list.innerHTML = '';
  if (customActs.length === 0) {
    list.innerHTML = '<p>Ще немає створених власних активностей.</p>';
    return;
  }
  
  customActs.forEach(a => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-content">
        <h4>${a.title}</h4>
        <p>${a.description}</p>
      </div>
      <button class="danger btn-remove-custom" data-id="${a.id}">Видалити</button>
    `;
    list.appendChild(card);
  });
  
  document.querySelectorAll('.btn-remove-custom').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      setActivities(getActivities().filter(act => act.id !== id));
      // Remove from favorites and history as well
      setFavorites(getFavorites().filter(fid => fid !== id));
      setHistory(getHistory().filter(h => h.activityId !== id));
      renderCustom();
    });
  });
};

const renderHistory = () => {
  const hist = getHistory();
  const acts = getActivities();
  const favs = getFavorites();
  
  document.getElementById('stat-total').textContent = hist.length;
  document.getElementById('stat-favs').textContent = favs.length;
  
  const list = document.getElementById('history-list');
  list.innerHTML = '';
  
  if (hist.length === 0) {
    list.innerHTML = '<p>Історія поки порожня.</p>';
    return;
  }
  
  hist.slice(0, 10).forEach(entry => {
    const a = acts.find(act => act.id === entry.activityId);
    if (!a) return;
    
    const d = new Date(entry.generatedAt);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-content">
        <h4>${a.title}</h4>
        <p>Згенеровано: ${d.toLocaleString()}</p>
      </div>
    `;
    list.appendChild(card);
  });
};
