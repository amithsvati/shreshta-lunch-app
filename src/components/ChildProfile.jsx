
import React, { useState, useEffect } from 'react';

function ChildProfile({ profiles, activeProfileId, onSwitchProfile, onUpdateProfile, onAddProfile }) {
    const [isAdding, setIsAdding] = useState(false);
    const [editForm, setEditForm] = useState(null);

    // Initialize edit form when active profile changes
    useEffect(() => {
        const active = profiles.find(p => p.id === activeProfileId);
        if (active) {
            setEditForm({ ...active });
        }
    }, [activeProfileId, profiles]);

    const handleSave = (e) => {
        e.preventDefault();
        onUpdateProfile(editForm);
        // Show success feedback (TODO)
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newProfile = {
            id: Date.now().toString(),
            name: formData.get('name'),
            age: parseInt(formData.get('age')),
            height: parseInt(formData.get('height')),
            weight: parseInt(formData.get('weight')),
            avatar: '👶' // Default for now
        };
        onAddProfile(newProfile);
        setIsAdding(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    if (isAdding) {
        return (
            <div className="profile-manager glass-panel">
                <h2>Add New Child</h2>
                <form onSubmit={handleCreate} className="profile-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" required placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" name="age" required />
                    </div>
                    <div className="form-group">
                        <label>Height (cm)</label>
                        <input type="number" name="height" required />
                    </div>
                    <div className="form-group">
                        <label>Weight (kg)</label>
                        <input type="number" name="weight" required />
                    </div>
                    <div className="actions">
                        <button type="button" className="btn" onClick={() => setIsAdding(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Profile</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="profile-dashboard">
            <div className="profile-sidebar glass-panel">
                <h3>Children</h3>
                <div className="profile-list">
                    {profiles.map(p => (
                        <div
                            key={p.id}
                            className={`profile-item ${p.id === activeProfileId ? 'active' : ''}`}
                            onClick={() => onSwitchProfile(p.id)}
                        >
                            <span className="p-avatar">{p.avatar}</span>
                            <span className="p-name">{p.name}</span>
                        </div>
                    ))}
                    <button className="add-btn" onClick={() => setIsAdding(true)}>+ Add Child</button>
                </div>
            </div>

            <div className="profile-details glass-panel">
                <h2>Edit Profile: {editForm?.name}</h2>
                {editForm && (
                    <form onSubmit={handleSave} className="profile-form">
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={editForm.height}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={editForm.weight}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={editForm.age}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="stats-preview">
                            {/* Simple BMI or nutritional calc could go here */}
                            <div className="stat-card">
                                <h4>Estimated Daily Needs</h4>
                                <p>Calories: ~{editForm.age * 90 + 500} kcal</p>
                                <p>Protein: ~{editForm.weight * 0.9}g</p>
                            </div>
                        </div>

                        <div className="actions">
                            <button type="submit" className="btn btn-secondary">Update Details</button>
                        </div>
                    </form>
                )}
            </div>

            <style jsx>{`
        .profile-dashboard {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
        }
        .profile-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .profile-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .profile-item:hover {
          background: rgba(255,255,255,0.3);
        }
        .profile-item.active {
          background: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .p-avatar { font-size: 1.2rem; }
        .p-name { font-weight: 600; }
        .add-btn {
          margin-top: 1rem;
          background: none;
          border: 2px dashed #ccc;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          color: #666;
        }
        .profile-form {
          margin-top: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-light);
        }
        .form-group input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .stats-preview {
            background: rgba(255,217,61,0.2);
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
        }
        .stats-preview h4 { margin-bottom: 0.5rem; color: #d4ac0d; }
      `}</style>
        </div>
    );
}

export default ChildProfile;
