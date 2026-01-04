// Gemini API utility for recipe suggestions
// User needs to provide their own API key (stored in localStorage)

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const getApiKey = () => localStorage.getItem('gemini_api_key') || '';
export const setApiKey = (key) => localStorage.setItem('gemini_api_key', key);

export async function generateRecipeSuggestion(dishName) {
    const apiKey = getApiKey();

    if (!apiKey) {
        throw new Error('API_KEY_MISSING');
    }

    const prompt = `You are a nutritionist specializing in healthy kids' meals (ages 4-10).

Given the dish name: "${dishName}"

Create a kid-friendly version with the following JSON structure:
{
  "name": "Kid-friendly name for the dish",
  "type": "lunch" or "snack" or "lunch_side",
  "cuisine": "cuisine type",
  "nutrition": {
    "calories": number,
    "protein": "Xg",
    "fat": "Xg", 
    "carbs": "Xg"
  },
  "prepTime": "Prep: Xm | Cook: Xm",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "instructions": ["Step 1 without numbering", "Step 2 without numbering", ...],
  "tags": ["tag1", "tag2"],
  "videoUrl": "https://www.youtube.com/results?search_query=DISH_NAME+recipe+for+kids"
}

Important:
- Make it healthy and appealing for children
- Use mild spices
- Include vegetables where possible
- Keep portions kid-sized
- Instructions should NOT have step numbers (they will be added automatically)

Return ONLY valid JSON, no markdown or explanation.`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401 || response.status === 403) {
                throw new Error('INVALID_API_KEY');
            }
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textContent) {
            throw new Error('No response from AI');
        }

        // Parse JSON from response (handle potential markdown wrapping)
        let jsonStr = textContent.trim();
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        const recipe = JSON.parse(jsonStr);

        // Generate unique ID
        recipe.id = `custom-${Date.now()}`;
        recipe.isCustom = true;

        return recipe;

    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}
