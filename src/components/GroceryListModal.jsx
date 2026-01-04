
import React, { useMemo } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function GroceryListModal({ schedule, recipes, onClose }) {

    const groceryItems = useMemo(() => {
        const items = {};
        const categories = {
            'Produce': ['onion', 'tomato', 'potato', 'carrot', 'beans', 'capsicum', 'ginger', 'garlic', 'chili', 'lemon', 'coriander', 'curry leaves', 'banana', 'apple', 'grapes', 'beetroot', 'cucumber', 'corn'],
            'Dairy & Refrigerated': ['milk', 'curd', 'yogurt', 'paneer', 'butter', 'cheese', 'ghee'],
            'Grains & Pulses': ['rice', 'dal', 'urad', 'chana', 'wheat', 'flour', 'ragi', 'millet', 'bread', 'poha', 'vermicelli'],
            'Pantry & Spices': ['oil', 'mustard', 'cumin', 'turmeric', 'salt', 'sugar', 'jaggery', 'powder', 'masala', 'cardamom', 'clove', 'cinnamon', 'cashew', 'raisin', 'nut', 'panko', 'sauce', 'ketchup']
        };

        const getCategory = (item) => {
            const lower = item.toLowerCase();
            for (const [cat, keywords] of Object.entries(categories)) {
                if (keywords.some(k => lower.includes(k))) return cat;
            }
            return 'Other';
        };

        Object.values(schedule).forEach(daySlots => {
            Object.values(daySlots).forEach(recipeId => {
                const recipe = recipes.find(r => r.id === recipeId);
                if (recipe) {
                    recipe.ingredients.forEach(ing => {
                        const cat = getCategory(ing);
                        if (!items[cat]) items[cat] = [];
                        items[cat].push(ing);
                    });
                }
            });
        });

        return items;
    }, [schedule, recipes]);

    const downloadGroceryPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(`Weekly Grocery Checklist`, 14, 20);
        doc.setFontSize(10);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 26);

        // Prepare table data
        // We want a list where Category is a header or just a column.
        // Let's make it a simple list: Category | Item (Checklist style)

        // Flatten for table
        const rows = [];
        Object.entries(groceryItems).sort().forEach(([category, ingList]) => {
            // Header row for category
            // We can cheat and just push all items.
            // Or better, use autoTable grouping if supported, but simple is robust.

            // Let's add all unique items
            [...new Set(ingList)].sort().forEach(ing => {
                rows.push([category, ing, '']); // Empty col for checkbox manually if printed
            });
        });

        // Use autoTable
        autoTable(doc, {
            startY: 35,
            head: [['Category', 'Item', 'Check']],
            body: rows,
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 50 },
                2: { cellWidth: 20 }
            },
            headStyles: { fillColor: [75, 192, 192] }, // Teal-ish
            didDrawCell: (data) => {
                // Add a checkbox square in the last column
                if (data.section === 'body' && data.column.index === 2) {
                    // draw rect
                    // doc.rect(data.cell.x + 5, data.cell.y + 2, 4, 4);
                    // autoTable handles text well, drawing shapes is manual. 
                    // Let's just leave it empty for manual check or printing.
                }
            }
        });

        doc.save(`Grocery_List.pdf`);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel animate-scale-in" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>🛒 Weekly Grocery List</h3>
                    <div className="actions">
                        <button className="pdf-btn" onClick={downloadGroceryPDF}>Download PDF 📥</button>
                        <button className="print-btn" onClick={() => window.print()}>🖨️ Print</button>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                </div>

                <div className="grocery-scroll">
                    {Object.entries(groceryItems).sort().map(([category, ingList]) => (
                        <div key={category} className="cat-section">
                            <h4>{category}</h4>
                            <ul className="check-list">
                                {[...new Set(ingList)].sort().map((ing, i) => (
                                    <li key={i}>
                                        <label>
                                            <input type="checkbox" />
                                            <span>{ing}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1100;
            backdrop-filter: blur(4px);
        }
        .modal-content {
            width: 90%;
            max-width: 700px;
            max-height: 85vh;
            background: white;
            padding: 2rem;
            display: flex;
            flex-direction: column;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #eee;
            padding-bottom: 1rem;
        }
        .actions { display: flex; gap: 0.5rem; align-items: center; }
        .print-btn, .pdf-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 0.8rem;
        }
        .pdf-btn {
            background: var(--secondary);
        }
        .grocery-scroll {
            overflow-y: auto;
            flex: 1;
            padding-right: 0.5rem;
        }
        .cat-section { margin-bottom: 2rem; }
        .cat-section h4 {
            color: var(--secondary-dark);
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.9rem;
            background: #f0f0f0;
            padding: 0.4rem 0.8rem;
            border-radius: 4px;
        }
        .check-list {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 0.5rem;
        }
        .check-list label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 0.9rem;
            color: #444;
        }
        .check-list input {
            width: 16px;
            height: 16px;
            accent-color: var(--primary);
        }

        @media print {
            .modal-content {
                position: absolute;
                top: 0; left: 0;
                width: 100%;
                max-width: none;
                height: auto;
                box-shadow: none;
            }
            .modal-overlay {
                background: white;
                position: absolute;
            }
            .close-btn, .print-btn, .pdf-btn { display: none; }
        }
      `}</style>
        </div>
    );
}

export default GroceryListModal;
