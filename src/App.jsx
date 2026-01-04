
import React, { useState } from 'react';
import WeeklyPlanner from './components/WeeklyPlanner';
import ChildProfile from './components/ChildProfile';
import GroceryListModal from './components/GroceryListModal';
import { recipes as recipeData } from './data/recipes';

function App() {
  const [currentView, setCurrentView] = useState('planner'); // 'planner' or 'profile'
  const [showGrocery, setShowGrocery] = useState(false);

  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('profiles');
    return saved ? JSON.parse(saved) : [{
      id: 'default',
      name: 'Shreshta',
      age: 6,
      height: 120, // cm
      weight: 25,  // kg
      avatar: '👧'
    }];
  });
  const [activeProfileId, setActiveProfileId] = useState('default');

  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  const handleUpdateProfile = (updatedData) => {
    const updatedProfiles = profiles.map(p =>
      p.id === activeProfileId ? { ...p, ...updatedData } : p
    );
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  const handleAddProfile = (newProfile) => {
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    localStorage.setItem('profiles', JSON.stringify(updated));
    setActiveProfileId(newProfile.id); // Switch to new profile
  };

  // Schedule for Grocery List (Need to access it from WeeklyPlanner? 
  // Ideally State should be lifted, but for now we read from localStorage for the active profile to generate list)
  const getSchedule = () => {
    const saved = localStorage.getItem(`schedule_${activeProfileId}`);
    return saved ? JSON.parse(saved) : {};
  };

  return (
    <div className="app-container">
      <nav className="navbar glass-panel">
        <div className="nav-brand">
          <h1>🍱 LunchBox Love</h1>
        </div>

        <div className="nav-controls">
          <button
            className={`nav-btn ${currentView === 'planner' ? 'active' : ''}`}
            onClick={() => setCurrentView('planner')}
          >
            📅 Weekly Planner
          </button>
          <button
            className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentView('profile')}
          >
            👤 {activeProfile.name}'s Profile
          </button>
          <button
            className="nav-btn grocery-btn"
            onClick={() => setShowGrocery(true)}
          >
            🛒 Grocery List
          </button>
        </div>
      </nav>

      <main className="main-content">
        {currentView === 'planner' ? (
          <WeeklyPlanner
            profile={activeProfile}
            recipes={recipeData}
          />
        ) : (
          <ChildProfile
            profiles={profiles}
            activeProfileId={activeProfileId}
            onSwitchProfile={setActiveProfileId}
            onUpdateProfile={handleUpdateProfile}
            onAddProfile={handleAddProfile}
          />
        )}
      </main>

      {showGrocery && (
        <GroceryListModal
          schedule={getSchedule()}
          recipes={recipeData}
          onClose={() => setShowGrocery(false)}
        />
      )}

      {/* Bubbles Background */}
      <div className="bubble b1"></div>
      <div className="bubble b2"></div>
      <div className="bubble b3"></div>

      <style jsx global>{`
        @media print {
            .navbar, .bubble, .swap-btn, .empty-slot, .app-container > .main-content > .child-profile-container {
                display: none !important;
            }
            body { 
                background: white; 
                color: black;
            }
            .app-container {
                padding: 0;
            }
            .planner-container {
                width: 100%;
            }
            .timetable {
                display: block; /* Stack or Grid depending on paper size, block works for list view */
            }
            .day-column {
                break-inside: avoid;
                border: 1px solid #ccc;
                margin-bottom: 1rem;
                background: none !important;
            }
            /* Force landscape-like grid if possible or vertical list */
            .timetable {
                grid-template-columns: repeat(2, 1fr) !important; /* 2 cols per row for print */
            }
        }
      `}</style>
    </div>
  );
}

export default App;
