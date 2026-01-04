
import React, { useState } from 'react';
import WeeklyPlanner from './components/WeeklyPlanner';
import ChildProfile from './components/ChildProfile';
import GroceryListModal from './components/GroceryListModal';
import { recipes as recipeData } from './data/recipes';

function App() {
  const [currentView, setCurrentView] = useState('planner'); // 'planner', 'profile', 'grocery'
  const [menuOpen, setMenuOpen] = useState(false);

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

  const getSchedule = () => {
    const saved = localStorage.getItem(`schedule_${activeProfileId}`);
    return saved ? JSON.parse(saved) : {};
  };

  const getViewName = () => {
    switch (currentView) {
      case 'planner': return 'Weekly Planner';
      case 'profile': return 'Profile';
      case 'grocery': return 'Grocery List';
      default: return 'Planner';
    }
  };

  const switchView = (view) => {
    setCurrentView(view);
    setMenuOpen(false);
  };

  return (
    <div className="app-container">
      <nav className="navbar glass-panel animate-fade-in">
        <div className="breadcrumb-container">
          <span className="brand-root" onClick={() => switchView('planner')}>LunchBox Love</span>
          <span className="separator">/</span>
          <div className="breadcrumb-item" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="current-page">{getViewName()}</span>
            <span className="chevron">▾</span>

            {menuOpen && (
              <div className="dropdown-menu glass-panel animate-scale-in">
                <div className={`menu-item ${currentView === 'planner' ? 'active' : ''}`} onClick={() => switchView('planner')}>
                  📅 Weekly Planner
                </div>
                <div className={`menu-item ${currentView === 'profile' ? 'active' : ''}`} onClick={() => switchView('profile')}>
                  👤 Profile
                </div>
                <div className={`menu-item ${currentView === 'grocery' ? 'active' : ''}`} onClick={() => switchView('grocery')}>
                  🛒 Grocery List
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-pill">
          <span className="avatar">{activeProfile.avatar}</span>
          <span className="name">{activeProfile.name}</span>
        </div>
      </nav>

      <main className="main-content animate-fade-in">
        {currentView === 'planner' && (
          <WeeklyPlanner
            profile={activeProfile}
            recipes={recipeData}
          />
        )}
        {currentView === 'profile' && (
          <ChildProfile
            profiles={profiles}
            activeProfileId={activeProfileId}
            onSwitchProfile={setActiveProfileId}
            onUpdateProfile={handleUpdateProfile}
            onAddProfile={handleAddProfile}
          />
        )}
        {currentView === 'grocery' && (
          // Render Grocery List inline by mocking modal props or modifying component
          // For now we render it, but we need to strip the modal overlay CSS in context
          <div className="grocery-page-wrapper">
            <GroceryListModal
              schedule={getSchedule()}
              recipes={recipeData}
              onClose={() => switchView('planner')}
            />
          </div>
        )}
      </main>

      {/* Bubbles Background */}
      <div className="bubble b1"></div>
      <div className="bubble b2"></div>
      <div className="bubble b3"></div>

      <style jsx global>{`
        .navbar {
            margin: 1rem 2rem;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 100;
        }
        .breadcrumb-container {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-family: var(--font-main);
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--text-light);
        }
        .brand-root {
            color: var(--text-light);
            cursor: pointer;
            transition: color 0.2s;
        }
        .brand-root:hover { color: var(--primary); }
        .separator { color: #ccc; }
        
        .breadcrumb-item {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            color: var(--text-main);
            font-weight: 700;
            padding: 0.2rem 0.6rem;
            border-radius: 8px;
            transition: background 0.2s;
        }
        .breadcrumb-item:hover {
            background: rgba(0,0,0,0.05);
        }
        .chevron { font-size: 0.8rem; color: #999; }

        .dropdown-menu {
            position: absolute;
            top: 120%;
            left: 0;
            min-width: 200px;
            background: rgba(255, 255, 255, 0.95);
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }
        .menu-item {
            padding: 0.6rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.95rem;
            color: var(--text-main);
            transition: all 0.2s;
        }
        .menu-item:hover {
            background: var(--primary);
            color: white;
        }
        .menu-item.active {
            background: rgba(0, 122, 255, 0.1);
            color: var(--primary);
        }

        .profile-pill {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.8rem;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-main);
        }

        /* Override Grocery Modal to look like a page when likely wrapped */
        .grocery-page-wrapper .modal-overlay {
            position: static !important;
            background: transparent !important;
            backdrop-filter: none !important;
            height: auto !important;
            padding: 0 !important;
        }
        .grocery-page-wrapper .modal-content {
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
        }
        .grocery-page-wrapper .close-btn {
            display: none;
        }

        @media print {
            .navbar, .bubble, .swap-btn, .empty-slot, .app-container > .main-content > .child-profile-container {
                display: none !important;
            }
            body { 
                background: white; 
                color: black;
            }
            .app-container { padding: 0; }
            .timetable { display: block; }
        }
      `}</style>
    </div>
  );
}

export default App;
