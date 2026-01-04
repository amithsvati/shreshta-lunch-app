import React, { useState } from 'react';
import { generateRecipeSuggestion, getApiKey, setApiKey } from '../utils/geminiApi';

function AddRecipeModal({ isOpen, onClose, onAddRecipe, slotType }) {
    const [dishName, setDishName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [suggestedRecipe, setSuggestedRecipe] = useState(null);
    const [showApiKeyInput, setShowApiKeyInput] = useState(!getApiKey());
    const [apiKeyInput, setApiKeyInput] = useState(getApiKey());

    const handleSaveApiKey = () => {
        if (apiKeyInput.trim()) {
            setApiKey(apiKeyInput.trim());
            setShowApiKeyInput(false);
            setError('');
        }
    };

    const handleSuggest = async () => {
        if (!dishName.trim()) {
            setError('Please enter a dish name');
            return;
        }

        if (!getApiKey()) {
            setShowApiKeyInput(true);
            setError('Please enter your Gemini API key first');
            return;
        }

        setLoading(true);
        setError('');
        setSuggestedRecipe(null);

        try {
            const recipe = await generateRecipeSuggestion(dishName);
            // Override type based on slot if provided
            if (slotType) {
                if (slotType === 'Lunch') recipe.type = 'lunch';
                else if (slotType === 'Lunch Side') recipe.type = 'lunch_side';
                else if (slotType.includes('Snack')) recipe.type = 'snack';
            }
            setSuggestedRecipe(recipe);
        } catch (err) {
            if (err.message === 'API_KEY_MISSING') {
                setShowApiKeyInput(true);
                setError('Please enter your Gemini API key');
            } else if (err.message === 'INVALID_API_KEY') {
                setShowApiKeyInput(true);
                setError('Invalid API key. Please check and try again.');
            } else {
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddToRecipes = () => {
        if (suggestedRecipe) {
            onAddRecipe(suggestedRecipe);
            onClose();
            setDishName('');
            setSuggestedRecipe(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel animate-scale-in" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>✨ Create Custom Recipe</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="add-recipe-body">
                    {showApiKeyInput && (
                        <div className="api-key-section">
                            <p className="api-info">
                                🔑 Enter your free <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer">Hugging Face API Token</a>
                            </p>
                            <div className="api-key-input-row">
                                <input
                                    type="password"
                                    value={apiKeyInput}
                                    onChange={(e) => setApiKeyInput(e.target.value)}
                                    placeholder="Paste your API token here..."
                                />
                                <button onClick={handleSaveApiKey}>Save</button>
                            </div>
                        </div>
                    )}

                    {!showApiKeyInput && getApiKey() && (
                        <button className="change-key-btn" onClick={() => setShowApiKeyInput(true)}>
                            🔑 Change API Token
                        </button>
                    )}

                    <div className="input-section">
                        <label>What dish would you like to make?</label>
                        <input
                            type="text"
                            value={dishName}
                            onChange={(e) => setDishName(e.target.value)}
                            placeholder="e.g., Vegetable Biryani, Pasta, Dosa..."
                            onKeyPress={(e) => e.key === 'Enter' && handleSuggest()}
                        />
                        <button
                            className="suggest-btn"
                            onClick={handleSuggest}
                            disabled={loading}
                        >
                            {loading ? '🔄 Thinking...' : '🤖 Suggest Kid-Friendly Recipe'}
                        </button>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    {suggestedRecipe && (
                        <div className="recipe-preview">
                            <h4>{suggestedRecipe.name}</h4>
                            <div className="recipe-meta">
                                <span>🍽️ {suggestedRecipe.type}</span>
                                <span>⏱️ {suggestedRecipe.prepTime}</span>
                                <span>🔥 {suggestedRecipe.nutrition?.calories} cal</span>
                            </div>

                            <div className="recipe-section">
                                <strong>Ingredients:</strong>
                                <ul>
                                    {suggestedRecipe.ingredients?.map((ing, i) => (
                                        <li key={i}>{ing}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="recipe-section">
                                <strong>Instructions:</strong>
                                <ol>
                                    {suggestedRecipe.instructions?.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>

                            <button className="add-btn" onClick={handleAddToRecipes}>
                                ➕ Add to My Recipes
                            </button>
                        </div>
                    )}
                </div>

                <style jsx>{`
                    .modal-overlay {
                        position: fixed;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: rgba(0,0,0,0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1200;
                        backdrop-filter: blur(4px);
                    }
                    .modal-content {
                        width: 95%;
                        max-width: 600px;
                        max-height: 90vh;
                        overflow-y: auto;
                        background: white;
                        padding: 1.5rem;
                    }
                    .modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 1rem;
                        padding-bottom: 0.5rem;
                        border-bottom: 1px solid #eee;
                    }
                    .close-btn {
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #666;
                    }
                    .add-recipe-body {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .api-key-section {
                        background: #f0f7ff;
                        padding: 1rem;
                        border-radius: 12px;
                        border: 1px solid #007AFF33;
                    }
                    .api-info {
                        margin-bottom: 0.5rem;
                        font-size: 0.9rem;
                    }
                    .api-info a {
                        color: var(--primary);
                    }
                    .api-key-input-row {
                        display: flex;
                        gap: 0.5rem;
                    }
                    .api-key-input-row input {
                        flex: 1;
                        padding: 0.5rem;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                    }
                    .api-key-input-row button {
                        background: var(--primary);
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        cursor: pointer;
                    }
                    .input-section {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    .input-section label {
                        font-weight: 600;
                        color: var(--text-main);
                    }
                    .input-section input {
                        padding: 0.8rem;
                        border: 2px solid #e0e0e0;
                        border-radius: 12px;
                        font-size: 1rem;
                    }
                    .input-section input:focus {
                        border-color: var(--primary);
                        outline: none;
                    }
                    .suggest-btn {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 25px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                    }
                    .suggest-btn:hover:not(:disabled) {
                        transform: scale(1.02);
                    }
                    .suggest-btn:disabled {
                        opacity: 0.7;
                        cursor: wait;
                    }
                    .error-message {
                        color: #e53935;
                        background: #ffebee;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        font-size: 0.9rem;
                    }
                    .recipe-preview {
                        background: #f9f9f9;
                        padding: 1rem;
                        border-radius: 12px;
                        border: 1px solid #e0e0e0;
                    }
                    .recipe-preview h4 {
                        color: var(--primary);
                        margin-bottom: 0.5rem;
                    }
                    .recipe-meta {
                        display: flex;
                        gap: 1rem;
                        font-size: 0.85rem;
                        color: #666;
                        margin-bottom: 1rem;
                        flex-wrap: wrap;
                    }
                    .recipe-section {
                        margin-bottom: 1rem;
                    }
                    .recipe-section ul, .recipe-section ol {
                        margin-left: 1.2rem;
                        margin-top: 0.3rem;
                    }
                    .recipe-section li {
                        font-size: 0.9rem;
                        margin-bottom: 0.2rem;
                    }
                    .add-btn {
                        width: 100%;
                        background: var(--primary);
                        color: white;
                        border: none;
                        padding: 0.8rem;
                        border-radius: 12px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                    }
                    .add-btn:hover {
                        background: #0063CC;
                    }
                    .change-key-btn {
                        background: none;
                        border: 1px solid #ccc;
                        padding: 0.4rem 0.8rem;
                        border-radius: 8px;
                        font-size: 0.8rem;
                        color: #666;
                        cursor: pointer;
                        align-self: flex-start;
                    }
                    .change-key-btn:hover {
                        border-color: var(--primary);
                        color: var(--primary);
                    }
                `}</style>
            </div>
        </div>
    );
}

export default AddRecipeModal;
