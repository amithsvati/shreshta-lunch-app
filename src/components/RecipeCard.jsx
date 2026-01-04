
import React from 'react';

function RecipeCard({ recipe, onClick, onSwap, isSide }) {
    // Determine color theme based on recipe type
    let themeColor = 'var(--primary)';
    let bgGradient = 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)'; // Default reddish tint

    if (recipe.type === 'lunch') {
        themeColor = 'var(--secondary)';
        bgGradient = 'linear-gradient(135deg, #aaa 0%, #eee 100%)';
        // Wait, secondary is usually green/blue? Let's use nice muted colors.
        bgGradient = 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)';
    } else if (recipe.type === 'lunch_side') {
        themeColor = '#ffa502'; // Orange
        bgGradient = 'linear-gradient(135deg, #fffdf0 0%, #ffffff 100%)';
    }

    return (
        <div className={`recipe-card ${isSide ? 'card-side' : ''}`}>
            <div className="card-content" onClick={onClick}>
                <div className="card-header">
                    <h4>{recipe.name}</h4>
                </div>
                <div className="card-meta">
                    <span className="n-badge">{recipe.nutrition.calories} kcal</span>
                    {!isSide && <span className="n-badge">{recipe.nutrition.protein} P</span>}
                </div>
            </div>

            <button className="swap-btn" onClick={(e) => { e.stopPropagation(); onSwap(); }} title="Change Item">
                🔄
            </button>

            <style jsx>{`
        .recipe-card {
            background: ${bgGradient};
            border-radius: 12px;
            padding: 0;
            position: relative;
            transition: all 0.2s;
            border-left: 5px solid ${themeColor}; /* Restored left border for text-only look */
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            height: 100%;
        }
        
        .recipe-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.08);
        }

        .card-content {
            padding: ${isSide ? '0.5rem 0.7rem' : '0.8rem 1rem'};
            flex: 1;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .card-header h4 {
            margin: 0 0 0.4rem 0;
            font-size: ${isSide ? '0.85rem' : '1rem'};
            color: var(--text-main);
            font-weight: 700;
            line-height: 1.3;
        }

        .card-meta {
            display: flex;
            gap: 0.3rem;
            flex-wrap: wrap;
        }

        .n-badge {
            font-size: 0.7rem;
            background: rgba(0,0,0,0.05);
            padding: 2px 6px;
            border-radius: 4px;
            color: #666;
            font-weight: 600;
        }

        .swap-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.3;
            transition: all 0.2s;
        }

        .recipe-card:hover .swap-btn {
            opacity: 1;
            background: rgba(255,255,255,0.8);
            transform: scale(1.1);
        }
      `}</style>
        </div>
    );
}

export default RecipeCard;
