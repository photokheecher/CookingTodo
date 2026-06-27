import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generateCookingPlan } from './googleClient.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/plan', async (req, res) => {
  try {
    const { dayContext, dietPreferences, pantryItems, budget, servings } = req.body;

    if (!dayContext || !dietPreferences || !budget) {
      return res.status(400).json({ error: 'Missing required fields: dayContext, dietPreferences, budget.' });
    }

    const prompt = `You are a practical meal-planning assistant.

TASK:
Create a personalized cooking to-do list for the next day based on the user's schedule, dietary preferences, available pantry items, budget, and serving size.

INPUT:

* Day Context: ${dayContext}
* Diet Preferences: ${dietPreferences}
* Pantry Items: ${pantryItems || 'None'}
* Budget: ${budget}
* Servings: ${servings || 1}

RULES:

1. Prioritize using pantry items before recommending new ingredients.
2. Recommend simple meals that match the user's day context, energy level, and available cooking time.
3. Reuse ingredients across meals where possible to minimize waste and reduce grocery costs.
4. Avoid difficult-to-find ingredients unless essential.
5. Ensure the meal plan is realistic within the provided budget.
6. Balance nutrition across meals.
7. Keep recommendations practical and actionable.
8. Return ONLY valid JSON with no markdown, explanations, or reasoning.

OUTPUT FORMAT (VALID JSON ONLY):

{
  "meal_plan": {
    "breakfast": {
      "dish": "dish name",
      "prep": "detailed preparation steps",
      "time_minutes": 10
    },
    "lunch": {
      "dish": "dish name",
      "prep": "detailed preparation steps",
      "time_minutes": 15
    },
    "dinner": {
      "dish": "dish name",
      "prep": "detailed preparation steps",
      "time_minutes": 20
    }
  },
  "grocery_list": {
    "vegetables": ["item1", "item2"],
    "proteins": ["item1", "item2"],
    "dairy": ["item1"],
    "pantry_staples": ["item1"],
    "spices_condiments": ["item1"]
  },
  "substitutions": [
    {
      "ingredient": "ingredient name",
      "alternatives": ["alternative1", "alternative2"]
    }
  ],
  "budget_assessment": {
    "classification": "Low/Moderate/High",
    "estimated_spend": "$XX-$YY",
    "cost_saving_tips": ["tip1", "tip2", "tip3"]
  }
}

Return ONLY the JSON object, nothing else.`;

    const response = await generateCookingPlan(prompt);
    res.json({ plan: response });
  } catch (error) {
    console.error('Plan generation error:', error);
    res.status(500).json({ error: 'Unable to generate plan. Check server logs and API configuration.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Cooking To-Do micro-app server listening on http://localhost:${port}`);
});
