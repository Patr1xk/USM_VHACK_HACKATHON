import React, { useState } from 'react';
import { NextResponse } from "next/server";

export default function MealPlanGenerator() {
  const [dietType, setDietType] = useState('');
  const [calories, setCalories] = useState('');
  const [allergies, setAllergies] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [snacks, setSnacks] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation Function
  const validateMealPlan = (mealPlan) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const usedMeals = new Set();

    // Check if all days are present
    if (!days.every(day => mealPlan[day])) {
      throw new Error('Missing days in meal plan');
    }

    days.forEach(day => {
      const { Breakfast, Lunch, Dinner, Snacks } = mealPlan[day];

      // Validate each meal is unique
      const mealKey = `${Breakfast}-${Lunch}-${Dinner}${Snacks ? `-${Snacks}` : ''}`;
      
      if (usedMeals.has(mealKey)) {
        throw new Error(`Duplicate meal found on ${day}`);
      }
      usedMeals.add(mealKey);

      // Additional checks
      if (!Breakfast || !Lunch || !Dinner) {
        throw new Error(`Missing meals for ${day}`);
      }

      // Check for calorie information
      const calorieRegex = /\d+\s*calories/i;
      if (!calorieRegex.test(Breakfast) || 
          !calorieRegex.test(Lunch) || 
          !calorieRegex.test(Dinner) || 
          (Snacks && !calorieRegex.test(Snacks))) {
        throw new Error(`Missing calorie information for ${day}`);
      }
    });

    return true;
  };

  const generateMealPlan = async () => {
    setIsLoading(true);
    setError(null);
    setMealPlan(null);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          "HTTP-Referer": "https://your-site-url.com",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          "model": "meta-llama/llama-3.2-3b-instruct:free",
          "messages": [{ 
            "role": "user", 
            "content": `
            ULTIMATE MEAL PLAN CHALLENGE:

            CRITICAL REQUIREMENTS:
            - 7-day meal plan with ZERO repetition
            - ${dietType} diet
            - ${calories} daily calories
            - Avoid: ${allergies || 'No allergies'}
            - Cuisine: ${cuisine || 'Global Variety'}

            ABSOLUTE RULES:
            1. NO REPEATED MEALS ACROSS ANY DAY
            2. Include unique ingredients daily
            3. Vary cooking methods
            4. Represent different global cuisines
            5. Precise calorie tracking

            GENERATE A FULLY UNIQUE MEAL PLAN IN JSON:
            \`\`\`json
            {
              "Monday": {
                "Breakfast": "Completely unique Monday breakfast - exact calories",
                "Lunch": "Distinctly different Monday lunch - exact calories",
                "Dinner": "Totally original Monday dinner - exact calories",
                ${snacks ? `"Snacks": "Innovative Monday snack - exact calories"` : ""}
              },
              "Tuesday": {
                "Breakfast": "Radically different Tuesday breakfast - zero Monday similarity",
                "Lunch": "Completely new Tuesday lunch concept",
                "Dinner": "Unique Tuesday dinner approach",
                ${snacks ? `"Snacks": "Tuesday-specific snack option"` : ""}
              },
              ... (continue with MAXIMUM diversity)
            }
            \`\`\`

            NO EXTRA TEXT. PURE JSON. ABSOLUTE UNIQUENESS.
            `
          }],
          "temperature": 1.0,
          "max_tokens": 10000
        })
      });

      const data = await response.json();
      console.log(data)
      if (data.error) {
        throw new Error(data.error);
      }

      // Extract the AI-generated content
      const aiContent = data.choices[0].message.content.trim();
      
      try {
        // Parse and validate the meal plan
        const parsedMealPlan = JSON.parse(aiContent);
        validateMealPlan(parsedMealPlan);
        
        setMealPlan(parsedMealPlan);
      } catch (validationError) {
        setError(`Validation failed: ${validationError.message}`);
      }
    } catch (err) {
      setError(`Failed to generate meal plan: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMealPlan = () => {
    if (!mealPlan) return null;

    return (
      <div className="meal-plan">
        <h2>Your Personalized Meal Plan</h2>
        {Object.entries(mealPlan).map(([day, meals]) => (
          <div key={day} className="day">
            <h3>{day}</h3>
            <p>Breakfast: {meals.Breakfast}</p>
            <p>Lunch: {meals.Lunch}</p>
            <p>Dinner: {meals.Dinner}</p>
            {meals.Snacks && <p>Snacks: {meals.Snacks}</p>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="meal-plan-generator">
      <h1>Personalized Meal Plan Generator</h1>
      
      <div className="input-group">
        <label>
          Diet Type:
          <input 
            type="text" 
            value={dietType} 
            onChange={(e) => setDietType(e.target.value)} 
            placeholder="e.g., Vegetarian, Keto"
          />
        </label>
        
        <label>
          Daily Calories:
          <input 
            type="number" 
            value={calories} 
            onChange={(e) => setCalories(e.target.value)} 
            placeholder="e.g., 2000"
          />
        </label>
        
        <label>
          Allergies:
          <input 
            type="text" 
            value={allergies} 
            onChange={(e) => setAllergies(e.target.value)} 
            placeholder="e.g., Nuts, Dairy"
          />
        </label>
        
        <label>
          Cuisine:
          <input 
            type="text" 
            value={cuisine} 
            onChange={(e) => setCuisine(e.target.value)} 
            placeholder="e.g., Mediterranean, Asian"
          />
        </label>
        
        <label>
          Include Snacks:
          <input 
            type="checkbox" 
            checked={snacks} 
            onChange={(e) => setSnacks(e.target.checked)} 
          />
        </label>
        
        <button 
          onClick={generateMealPlan} 
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Meal Plan'}
        </button>
      </div>

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {renderMealPlan()}
    </div>
  );
}