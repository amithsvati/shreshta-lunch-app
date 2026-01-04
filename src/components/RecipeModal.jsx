
import React from 'react';

function RecipeModal({ recipe, onClose }) {
    if (!recipe) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel animate-scale-in" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="modal-header-text">
                    <h2>{recipe.name}</h2>
                    <div className="badges">
                        <span className="badge type">{recipe.type}</span>
                        <span className="badge time">{recipe.prepTime}</span>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="nutrition-grid">
                        <div className="nut-item">
                            <span className="val">{recipe.nutrition.calories}</span>
                            <span className="lbl">Calories</span>
                        </div>
                        <div className="nut-item">
                            <span className="val">{recipe.nutrition.protein}</span>
                            <span className="lbl">Protein</span>
                        </div>
                        <div className="nut-item">
                            <span className="val">{recipe.nutrition.carbs}</span>
                            <span className="lbl">Carbs</span>
                        </div>
                        <div className="nut-item">
                            <span className="val">{recipe.nutrition.fat}</span>
                            <span className="lbl">Fat</span>
                        </div>
                    </div>

                    {recipe.videoUrl && (
                        <a href={recipe.videoUrl} target="_blank" rel="noopener noreferrer" className="video-link-btn">
                            📺 Watch Preparation Video
                        </a>
                    )}

                    <div className="details-section">
                        <h3>Ingredients</h3>
                        <ul className="ing-list">
                            {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                    </div>

                    <div className="details-section">
                        <h3>Instructions</h3>
                        <ol className="inst-list">
                            {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                        </ol>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        }

        .modal-content {
            background: white;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 20px;
            position: relative;
            padding: 2rem;
            box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }

        .close-btn {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            font-size: 2rem;
            border: none;
            background: none;
            cursor: pointer;
            color: #666;
            z-index: 2;
        }

        .modal-header-text {
            text-align: center;
            margin-bottom: 1.5rem;
        }

        .modal-header-text h2 {
            margin: 0 0 0.5rem 0;
            color: var(--primary-dark);
        }

        .badges {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
        }

        .badge {
            font-size: 0.8rem;
            padding: 2px 8px;
            border-radius: 12px;
            text-transform: uppercase;
            font-weight: 700;
        }
        .badge.type { background: var(--secondary-light); color: var(--secondary-dark); }
        .badge.time { background: #eee; color: #555; }

        .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            background: #f9f9f9;
            padding: 1rem;
            border-radius: 12px;
        }

        .nut-item {
            text-align: center;
            display: flex;
            flex-direction: column;
        }

        .nut-item .val {
            font-weight: 800;
            color: var(--primary);
            font-size: 1.1rem;
        }

        .nut-item .lbl {
            font-size: 0.7rem;
            color: #888;
            text-transform: uppercase;
        }

        .video-link-btn {
            display: block;
            width: 100%;
            background: #ff0000;
            color: white;
            text-align: center;
            padding: 0.8rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-bottom: 1.5rem;
            transition: transform 0.2s;
        }
        .video-link-btn:hover {
            transform: scale(1.02);
            background: #cc0000;
        }

        .details-section {
            margin-bottom: 1.5rem;
        }

        .details-section h3 {
            font-size: 1rem;
            color: #444;
            border-bottom: 2px solid var(--secondary-light);
            padding-bottom: 0.3rem;
            margin-bottom: 0.8rem;
        }

        .ing-list, .inst-list {
            padding-left: 1.2rem;
            color: #555;
            line-height: 1.6;
        }
        
        .inst-list li {
            margin-bottom: 0.5rem;
        }
      `}</style>
        </div>
    );
}

export default RecipeModal;
