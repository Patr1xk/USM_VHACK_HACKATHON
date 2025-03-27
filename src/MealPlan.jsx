

import { useState } from "react";
import { Link } from "react-router-dom";


export default function MealPlan() {
  const [dietType, setDietType] = useState("");
  const [calories, setCalories] = useState(2000);
  const [allergies, setAllergies] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [snacks, setSnacks] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMealPlan = async () => {
    try {
      console.log("📤 Sending request to API...");
  
      const response = await fetch("http://localhost:5000/generate-mealplan", {  // Make sure the backend URL is correct
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dietType: "vegetarian",
          calories: 2000,
          allergies: "none",
          cuisine: "Italian",
          snacks: false,
        }),
      });
  
      console.log("📥 API Response Status:", response.status);
  
      const data = await response.json();
  
      console.log("🔍 Raw API Response:", data);  // ✅ Check this in the browser console
  
      setMealPlan(data.mealPlan);
  
    } catch (error) {
      console.error("❌ Error fetching meal plan:", error);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("📤 Sending request to API...");
    console.log("Request Data:", { dietType, calories, allergies, cuisine, snacks });
    
    try {
      const response = await fetch('http://localhost:3000/api/generate-mealplan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dietType,
          calories,
          allergies,
          cuisine,
          snacks,
        }),
      });

      console.log("📥 API Response Status:", response.status);

      
      if (!response.ok) {
        throw new Error('Failed to generate meal plan');
      }
      
      const data = await response.json();
      setMealPlan(data.mealPlan);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate meal plan. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 ">
      {/* Left Panel: Form - Now with fixed positioning */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-6 bg-white shadow-md 
        md:fixed md:top-0 md:bottom-0 md:left-0 md:overflow-y-auto md:z-10">
        <h1 className="text-2xl font-bold mb-4" style = {{textAlign: 'center', fontFamily: '"Paytone One", sans-serif',  color: 'black'}}>AI Meal Plan Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rest of the form remains the same */}
          {/* Diet Type */}
          <div className = "transform translate-y-2">
            <label
              htmlFor="dietType"
              className="block text-sm font-medium text-gray-700"
            >
              Diet Type
            </label>
            <input
              type="text"
              id="dietType"
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., Vegetarian, Keto, Mediterranean"
            />
          </div>

          {/* Calories */}
          <div>
            <label
              htmlFor="calories"
              className="block text-sm font-medium text-gray-700"
            >
              Calories
            </label>
            <input
              type="number"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              min={500}
              max={15000}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g. 2000"
            />
          </div>

          {/* Allergies */}
          <div>
            <label
              htmlFor="allergies"
              className="block text-sm font-medium text-gray-700"
            >
              Allergies
            </label>
            <input
              type="text"
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g. Nuts, Dairy, None..."
            />
          </div>

          {/* Cuisine */}
          <div>
            <label
              htmlFor="cuisine"
              className="block text-sm font-medium text-gray-700"
            >
              Cuisine
            </label>
            <input
              type="text"
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g. Italian, Chinese, No Preference..."
            />
          </div>

          {/* Snacks */}
          <div>
            <label htmlFor="snacks" className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="snacks"
                checked={snacks}
                onChange={(e) => setSnacks(e.target.checked)}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Snacks</span>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#007BFF] text-white py-2 px-4 rounded-md hover:bg-[#0056b3] disabled:bg-blue-300 "
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Meal Plan'}
            </button>
          </div>
        </form>

        <div>
          <Link to="/dashboard">
            <button
                type="Main Page"
                className="w-full bg-[#007BFF] text-white py-2 px-4 rounded-md hover:bg-[#0056b3] disabled:bg-blue-300 transform translate-y-10"              >Main page
              </button>
          </Link>
        </div>
      </div>

      {/* Right Panel: Adjust margin to prevent overlap with fixed left panel */}
      <div className="flex-1 p-6 overflow-auto md:ml-[25%] lg:ml-[25%]">
        {/* Rest of the right panel content remains the same */}
        <h2 className="text-2xl font-bold mb-4">Weekly Meal Plan</h2>
        
        {loading && <p className="text-gray-600">Generating your meal plan...</p>}
        
        {error && <p className="text-red-600">{error}</p>}
        
        {!loading && !error && !mealPlan && (
          <p className="text-gray-600">Please generate a meal plan to see it here.</p>
        )}
        
        {mealPlan && (
          <div className="space-y-6">
            {Object.entries(mealPlan).map(([day, meals]) => (
              <div key={day} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{day}</h3>
                <div className="space-y-2">
                  {Object.entries(meals).map(([mealType, description]) => (
                    <div key={mealType} className="border-l-4 border-blue-400 pl-3">
                      <p className="font-medium text-gray-800">{mealType}</p>
                      <p className="text-gray-600">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}