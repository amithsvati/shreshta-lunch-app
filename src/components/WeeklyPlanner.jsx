
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import SwapModal from './SwapModal';
import RecipeModal from './RecipeModal';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SLOTS = ['Snack 1', 'Lunch', 'Lunch Side', 'Snack 2'];

const INITIAL_SCHEDULE = {
    Monday: { 'Snack 1': 'snack-millet-cookies', 'Lunch': 'lunch-curd-rice', 'Lunch Side': 'side-potato-fry', 'Snack 2': 'snack-fruit-salad' },
    Tuesday: { 'Snack 1': 'snack-makhana', 'Lunch': 'lunch-chapati-paneer', 'Lunch Side': 'side-egg-curry', 'Snack 2': 'snack-carrot-sticks' },
    Wednesday: { 'Snack 1': 'snack-poha', 'Lunch': 'lunch-mini-idli', 'Lunch Side': 'side-cauliflower-fry', 'Snack 2': 'snack-dry-fruits' },
    Thursday: { 'Snack 1': 'snack-chana', 'Lunch': 'lunch-lemon-rice', 'Lunch Side': 'side-prawns-fry', 'Snack 2': 'snack-butter-corn' },
    Friday: { 'Snack 1': 'snack-carrot-sticks', 'Lunch': 'lunch-chapati-roll', 'Lunch Side': 'side-chicken-fry', 'Snack 2': 'snack-corn-chat' },
};

function WeeklyPlanner({ profile, recipes }) {
    const [schedule, setSchedule] = useState(() => {
        // Check if we have a saved schedule, but migration might be needed if structure changed
        const saved = localStorage.getItem(`schedule_${profile.id}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Simple check if 'Lunch Side' exists in Monday, if not, merge with INITIAL
            if (!parsed.Monday['Lunch Side']) {
                return INITIAL_SCHEDULE; // Reset to get new slots, or could merge intelligently
            }
            return parsed;
        }
        return INITIAL_SCHEDULE;
    });

    const [swapState, setSwapState] = useState(null); // { day, slot, currentId }
    const [viewRecipe, setViewRecipe] = useState(null); // recipe object

    // Reset or load schedule when profile changes
    useEffect(() => {
        const saved = localStorage.getItem(`schedule_${profile.id}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (!parsed.Monday['Lunch Side']) {
                setSchedule(INITIAL_SCHEDULE);
            } else {
                setSchedule(parsed);
            }
        } else {
            setSchedule(INITIAL_SCHEDULE);
        }
    }, [profile.id]);

    // Persist schedule
    useEffect(() => {
        localStorage.setItem(`schedule_${profile.id}`, JSON.stringify(schedule));
    }, [schedule, profile.id]);

    const handleSwap = (day, slot) => {
        setSwapState({ day, slot, currentId: schedule[day][slot] });
    };

    const confirmSwap = (newRecipeId) => {
        setSchedule(prev => ({
            ...prev,
            [swapState.day]: {
                ...prev[swapState.day],
                [swapState.slot]: newRecipeId
            }
        }));
        setSwapState(null);
    };

    const getRecipe = (id) => recipes.find(r => r.id === id);

    const downloadMenuPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(`${profile.name}'s Weekly Menu`, 14, 20);

        doc.setFontSize(12);
        doc.text('A healthy and balanced plan for school & home.', 14, 28);

        const tableBody = DAYS.map(day => {
            const row = [day];
            SLOTS.forEach(slot => {
                const recipeId = schedule[day][slot];
                const recipe = getRecipe(recipeId);
                row.push(recipe ? recipe.name : '-');
            });
            return row;
        });

        autoTable(doc, {
            startY: 35,
            head: [['Day', ...SLOTS]],
            body: tableBody,
            headStyles: { fillColor: [255, 107, 107] }, // Primary color roughly
            theme: 'grid'
        });

        doc.save(`${profile.name}_Weekly_Menu.pdf`);
    };

    return (
        <div className="planner-container">
            <header className="planner-header">
                <h2>🗓️ {profile.name}'s Timetable</h2>
                <div className="header-actions">
                    <button className="pdf-btn" onClick={downloadMenuPDF}>Download PDF 📥</button>
                    <p>A balanced weekly menu for school & home.</p>
                </div>
            </header>

            <div className="timetable">
                {DAYS.map(day => (
                    <div key={day} className="day-column glass-panel">
                        <div className="day-header">{day}</div>
                        <div className="slots">
                            {SLOTS.map(slot => {
                                const recipeId = schedule[day][slot];
                                const recipe = getRecipe(recipeId);

                                return (
                                    <div key={slot} className={`slot-item ${slot === 'Lunch Side' ? 'slot-side' : ''}`}>
                                        <span className="slot-label">{slot}</span>
                                        {recipe ? (
                                            <RecipeCard
                                                recipe={recipe}
                                                onClick={() => setViewRecipe(recipe)}
                                                onSwap={() => handleSwap(day, slot)}
                                                isSide={slot === 'Lunch Side'}
                                            />
                                        ) : (
                                            <div className="empty-slot" onClick={() => handleSwap(day, slot)}>
                                                + Add Item
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {swapState && (
                <SwapModal
                    isOpen={!!swapState}
                    slot={swapState.slot}
                    options={recipes}
                    currentId={swapState.currentId}
                    onClose={() => setSwapState(null)}
                    onSave={confirmSwap}
                />
            )}

            {viewRecipe && (
                <RecipeModal
                    recipe={viewRecipe}
                    onClose={() => setViewRecipe(null)}
                />
            )}

            <style jsx>{`
        .planner-header {
          text-align: center;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .header-actions {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        .pdf-btn {
            background: var(--secondary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: transform 0.2s;
        }
        .pdf-btn:hover {
            transform: scale(1.05);
            background: var(--secondary-dark);
        }
        .timetable {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .day-column {
          padding: 1rem;
          background: rgba(255,255,255,0.6);
          min-width: 220px;
        }
        .day-header {
          text-align: center;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 1rem;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .slots {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .slot-item {
            position: relative;
        }
        .slot-side {
            transform: scale(0.95);
            opacity: 0.9;
        }
        .slot-side .slot-label {
            color: var(--secondary-dark);
        }
        .slot-label {
          font-size: 0.75rem;
          color: var(--text-light);
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.2rem;
          display: block;
        }
        .empty-slot {
            border: 2px dashed #ccc;
            padding: 1rem;
            text-align: center;
            border-radius: 12px;
            cursor: pointer;
            color: #888;
        }
        .empty-slot:hover {
            border-color: var(--secondary);
            color: var(--secondary);
        }
      `}</style>
        </div>
    );
}

export default WeeklyPlanner;
