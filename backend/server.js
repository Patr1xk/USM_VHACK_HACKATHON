import dotenv from "dotenv";
dotenv.config();



import express from "express";
import cors from "cors";

import axios from "axios";

// Import the new OpenRouter utility
import generateMealWithOpenRouter from './openRouterConfig.js'; // Create this file with the previous code



console.log("Using OpenRouter API Key:", process.env.OPEN_ROUTER_API_KEY);


const app = express();
app.use(express.json());
app.use(cors());

const generateUniqueMealPlan = async (dietType, calories, allergies, cuisine, snacks) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  const mealPlan = {};

  for (const day of days) {
    const mealPromises = mealTypes.map(async (mealType) => {
      const prompt = `
        Generate a unique ${mealType.toLowerCase()} for ${day} with the following constraints:
        - Diet Type: ${dietType}
        - Calories: Aim for ${Math.floor(calories / 3)} calories
        - Allergies to Avoid: ${allergies || 'None'}
        - Preferred Cuisine: ${cuisine || 'Global'}
        
        Provide a detailed meal description including:
        - Meal name
        - Key ingredients
        - Cooking method
        - Exact calorie count
        
        Ensure ZERO similarity to meals in previous days.
      `;

      try {
        // Use the new generateMealWithOpenRouter function
        const mealContent = await generateMealWithOpenRouter(prompt);
        return { [mealType]: mealContent || `Default ${mealType} - ${Math.floor(calories / 3)} calories` };
      } catch (error) {
        console.error(`Error generating ${mealType} for ${day}:`, error);
        return { [mealType]: `Default ${mealType} - ${Math.floor(calories / 3)} calories` };
      }
    });

    const dayMeals = Object.assign({}, ...(await Promise.all(mealPromises)));

    if (snacks) {
      const snackPrompt = `
        Generate a unique snack for ${day}:
        - Diet Type: ${dietType}
        - Calories: Around 150 calories
        - Allergies to Avoid: ${allergies || 'None'}
      `;

      try {
        // Use the new generateMealWithOpenRouter function for snacks
        dayMeals['Snacks'] = await generateMealWithOpenRouter(snackPrompt, "meta-llama/llama-3.2-3b-instruct:free");
      } catch (error) {
        console.error(`Error generating snack for ${day}:`, error);
        dayMeals['Snacks'] = 'Default Snack - 150 calories';
      }
    }

    mealPlan[day] = dayMeals;
  }

  return mealPlan;
};

app.post("/api/generate-mealplan", async (req, res) => {
  try {
    const { dietType, calories, allergies, cuisine, snacks } = req.body;

    // Validate input
    if (!dietType || !calories) {
      return res.status(400).json({
        error: "Diet type and calories are required"
      });
    }

    const mealPlan = await generateUniqueMealPlan(
      dietType,
      calories,
      allergies,
      cuisine,
      snacks
    );

    res.json({ mealPlan });
  } catch (error) {
    console.error("Meal plan generation error:", error);
    res.status(500).json({
      error: "Failed to generate meal plan",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

export default app;