
import React, { useState, useEffect } from 'react';

function SwapModal({ isOpen, onClose, slot, onSave, options = [], currentId, onOpenAddRecipe }) {
    const [selectedId, setSelectedId] = useState(currentId);

    // Sync selectedId when modal opens or currentId changes
    useEffect(() => {
        if (isOpen) {
            setSelectedId(currentId);
        }
    }, [isOpen, currentId]);

    if (!isOpen) return null;

    // Safety check for options
    const safeOptions = Array.isArray(options) ? options : [];

    // Filter options based on the slot type
    let filteredOptions = [];
    if (slot === 'Lunch') {
        filteredOptions = safeOptions.filter(r => r.type === 'lunch');
    } else if (slot === 'Lunch Side') {
        filteredOptions = safeOptions.filter(r => r.type === 'lunch_side');
    } else {
        // Snacks
        filteredOptions = safeOptions.filter(r => r.type === 'snack');
    }

    const handleSave = () => {
        onSave(selectedId);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Change {slot}</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {onOpenAddRecipe && (
                    <button className="create-custom-btn" onClick={() => { onClose(); onOpenAddRecipe(slot); }}>
                        ✨ Create Custom Recipe with AI
                    </button>
                )}

                <div className="options-list">
                    {filteredOptions.length > 0 ? filteredOptions.map(option => (
                        <label
                            key={option.id}
                            className={`option-item ${selectedId === option.id ? 'selected' : ''}`}
                        >
                            <input
                                type="radio"
                                name="recipe"
                                value={option.id}
                                checked={selectedId === option.id}
                                onChange={() => setSelectedId(option.id)}
                            />
                            <div className="option-info">
                                <span className="opt-name">{option.name} {option.isCustom && '⭐'}</span>
                                <span className="opt-cal">{option && option.nutrition && option.nutrition.calories ? option.nutrition.calories + ' kcal' : ''}</span>
                            </div>
                        </label>
                    )) : (
                        <p>No options available.</p>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-save" onClick={handleSave}>Save Change</button>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: flex-end; /* Bottom sheet on mobile */
            justify-content: center;
            z-index: 1050;
        }

        @media (min-width: 768px) {
            .modal-overlay {
                align-items: center;
            }
        }

        .modal-content {
            background: white;
            width: 100%;
            max-width: 500px;
            max-height: 80vh;
            border-radius: 20px 20px 0 0;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
        }

        @media (min-width: 768px) {
            .modal-content {
                border-radius: 12px;
                max-height: 500px;
            }
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .modal-header h3 { margin: 0; color: var(--primary-dark); }

        .create-custom-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 0.7rem 1rem;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 1rem;
            transition: transform 0.2s;
        }
        .create-custom-btn:hover {
            transform: scale(1.02);
        }

        .options-list {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }

        .option-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.8rem;
            border: 2px solid #eee;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .option-item.selected {
            border-color: var(--primary);
            background: #fff5f5;
        }

        .option-item input {
            accent-color: var(--primary);
            transform: scale(1.2);
        }

        .option-info {
            display: flex;
            flex-direction: column;
        }
        
        .opt-name { font-weight: 600; color: #333; }
        .opt-cal { font-size: 0.8rem; color: #888; }

        .modal-footer {
            display: flex;
            gap: 1rem;
        }

        .btn-cancel, .btn-save {
            flex: 1;
            padding: 0.8rem;
            border-radius: 8px;
            border: none;
            font-weight: 700;
            cursor: pointer;
        }

        .btn-cancel { background: #eee; color: #666; }
        .btn-save { background: var(--primary); color: white; }
      `}</style>
        </div>
    );
}

export default SwapModal;

