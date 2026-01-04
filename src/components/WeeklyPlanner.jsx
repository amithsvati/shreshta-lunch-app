
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import SwapModal from './SwapModal';
import RecipeModal from './RecipeModal';
import AddRecipeModal from './AddRecipeModal';

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
    const [showAddRecipe, setShowAddRecipe] = useState(false);
    const [addRecipeSlot, setAddRecipeSlot] = useState(null);

    // Custom recipes from localStorage
    const [customRecipes, setCustomRecipes] = useState(() => {
        const saved = localStorage.getItem('custom_recipes');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist custom recipes
    useEffect(() => {
        localStorage.setItem('custom_recipes', JSON.stringify(customRecipes));
    }, [customRecipes]);

    // Merge built-in recipes with custom recipes
    const allRecipes = [...recipes, ...customRecipes];

    const handleAddCustomRecipe = (recipe) => {
        setCustomRecipes(prev => [...prev, recipe]);
    };

    const handleOpenAddRecipe = (slot) => {
        setAddRecipeSlot(slot);
        setShowAddRecipe(true);
    };

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

        // PAGE 1: Timetable
        doc.setFontSize(22);
        doc.setTextColor(0, 122, 255); // System Blue
        doc.text(`${profile.name}'s Weekly Menu`, 14, 20);

        doc.setTextColor(60, 60, 67); // System Gray
        doc.setFontSize(12);
        doc.text('A balanced plan for energy & happiness.', 14, 28);

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
            headStyles: { fillColor: [0, 122, 255] }, // System Blue
            theme: 'grid',
            styles: { font: "helvetica" }
        });

        // PAGE 2+: Recipe Details
        const usedRecipeIds = new Set();
        DAYS.forEach(day => {
            SLOTS.forEach(slot => {
                if (schedule[day][slot]) usedRecipeIds.add(schedule[day][slot]);
            });
        });

        const uniqueRecipes = Array.from(usedRecipeIds).map(id => getRecipe(id)).filter(r => r);

        if (uniqueRecipes.length > 0) {
            doc.addPage();
            doc.setFontSize(18);
            doc.setTextColor(0, 122, 255);
            doc.text("Recipes & Instructions", 14, 20);

            let yPos = 30;

            uniqueRecipes.forEach((recipe, index) => {
                if (yPos > 240) {
                    doc.addPage();
                    yPos = 20;
                }

                doc.setFontSize(14);
                doc.setTextColor(0);
                doc.setFont(undefined, 'bold');
                doc.text(`${index + 1}. ${recipe.name}`, 14, yPos);
                doc.setFont(undefined, 'normal');
                yPos += 7;

                doc.setFontSize(10);
                doc.setTextColor(100);

                // Meta info
                const nutritionStr = recipe.nutrition ? Object.entries(recipe.nutrition)
                    .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`)
                    .join(' • ') : 'Nutrition info unavailable';

                doc.text(`${recipe.prepTime || '15 mins'}  |  ${recipe.type === 'lunch' ? 'Lunch Main' : recipe.type === 'lunch_side' ? 'Side Dish' : 'Snack'}`, 14, yPos);
                yPos += 5;
                doc.text(nutritionStr, 14, yPos);
                yPos += 5;

                // Video Link removed as per request


                // Ingredients
                doc.setFont(undefined, 'bold');
                doc.text('Ingredients:', 14, yPos);
                doc.setFont(undefined, 'normal');
                yPos += 5;
                const ingText = recipe.ingredients ? recipe.ingredients.join(', ') : 'No ingredients listed';
                const ingLines = doc.splitTextToSize(ingText, 180);
                doc.text(ingLines, 14, yPos);
                yPos += (ingLines.length * 4) + 2;

                // Instructions
                doc.setFont(undefined, 'bold');
                doc.text('Instructions:', 14, yPos);
                doc.setFont(undefined, 'normal');
                yPos += 5;

                if (recipe.instructions && recipe.instructions.length > 0) {
                    recipe.instructions.forEach((inst, i) => {
                        // Strip existing numbering like "1. " to avoid "1. 1. Step" or duplicates
                        const cleanInst = inst.replace(/^\d+[\.\)]\s*/, '');
                        const numberedInst = `${i + 1}. ${cleanInst}`;

                        const instLines = doc.splitTextToSize(numberedInst, 180);
                        if (yPos + (instLines.length * 5) > 280) {
                            doc.addPage();
                            yPos = 20;
                        }
                        doc.text(instLines, 14, yPos);
                        yPos += (instLines.length * 4) + 1;
                    });
                } else {
                    doc.text("No instructions available.", 14, yPos);
                    yPos += 5;
                }

                yPos += 10;
                doc.setDrawColor(200);
                doc.line(14, yPos, 196, yPos);
                yPos += 10;
            });
        }

        doc.save(`${profile.name}_Weekly_Guide.pdf`);
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
                    options={allRecipes}
                    currentId={swapState.currentId}
                    onClose={() => setSwapState(null)}
                    onSave={confirmSwap}
                    onOpenAddRecipe={handleOpenAddRecipe}
                />
            )}

            {viewRecipe && (
                <RecipeModal
                    recipe={viewRecipe}
                    onClose={() => setViewRecipe(null)}
                />
            )}

            <AddRecipeModal
                isOpen={showAddRecipe}
                onClose={() => setShowAddRecipe(false)}
                onAddRecipe={handleAddCustomRecipe}
                slotType={addRecipeSlot}
            />

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
        /* Buttons are now handled globally, but here are local adjustments if needed */
        .pdf-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 0.6rem 1.2rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: transform 0.2s;
            font-weight: 600;
        }
        .pdf-btn:hover {
            transform: scale(1.05);
            background: var(--primary-light);
        }
        .timetable {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .day-column {
          padding: 1rem;
          /* Glass panel style inherited from global */
          min-width: 220px;
        }
        .day-header {
          text-align: center;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1rem;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
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
            color: var(--secondary);
        }
        .slot-label {
          font-size: 0.7rem;
          color: var(--text-light);
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.3rem;
          display: block;
          letter-spacing: 0.5px;
        }
        .empty-slot {
            border: 2px dashed #ccc;
            padding: 1rem;
            text-align: center;
            border-radius: 12px;
            cursor: pointer;
            color: #888;
            font-size: 0.9rem;
        }
        .empty-slot:hover {
            border-color: var(--primary);
            color: var(--primary);
        }
      `}</style>
        </div>
    );
}

export default WeeklyPlanner;
