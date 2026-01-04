// Hugging Face API utility for recipe suggestions
// Free tier available at https://huggingface.co/settings/tokens

const HF_API_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';

export const getApiKey = () => localStorage.getItem('hf_api_key') || '';
export const setApiKey = (key) => localStorage.setItem('hf_api_key', key);

export async function generateRecipeSuggestion(dishName) {
    const apiKey = getApiKey();

    if (!apiKey) {
        throw new Error('API_KEY_MISSING');
    }

    const prompt = `<s>[INST] You are a nutritionist specializing in healthy kids' meals (ages 4-10).

Create a kid-friendly recipe for: "${dishName}"

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "name": "Kid-friendly name",
  "type": "lunch",
  "cuisine": "cuisine type",
  "nutrition": {"calories": 250, "protein": "8g", "fat": "6g", "carbs": "35g"},
  "prepTime": "Prep: 10m | Cook: 15m",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["Step without number", "Another step"],
  "tags": ["healthy", "easy"]
}

Make it healthy, use mild spices, kid-sized portions. Return ONLY the JSON. [/INST]</s>`;

    try {
        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 800,
                    temperature: 0.7,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401 || response.status === 403) {
                throw new Error('INVALID_API_KEY');
            }
            if (errorData.error && errorData.error.includes('loading')) {
                throw new Error('Model is loading. Please wait 20 seconds and try again.');
            }
            throw new Error(errorData.error || 'API request failed');
        }

        const data = await response.json();
        let textContent = data[0]?.generated_text || data.generated_text || '';

        if (!textContent) {
            throw new Error('No response from AI');
        }

        // Extract JSON from response
        const jsonMatch = textContent.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Could not parse recipe. Please try again.');
        }

        const recipe = JSON.parse(jsonMatch[0]);

        // Generate unique ID
        recipe.id = `custom-${Date.now()}`;
        recipe.isCustom = true;
        recipe.videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(dishName)}+recipe+for+kids`;

        return recipe;

    } catch (error) {
        console.error('Hugging Face API Error:', error);
        throw error;
    }
}
