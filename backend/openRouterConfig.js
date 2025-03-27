import axios from 'axios';


// console.log("Using OpenRouter API Key:", process.env.OPEN_ROUTER_API_KEY); // 🔥 Add this line

const openRouterInstance = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': process.env.SITE_URL || 'https://your-default-site.com',
    'X-Title': 'Meal Plan Generator'
  }
});

export const generateMealWithOpenRouter = async (prompt, model = "meta-llama/llama-3.2-3b-instruct:free") => {
  try {
    const response = await openRouterInstance.post('/chat/completions', {
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    throw error;
  }
};

export default generateMealWithOpenRouter;
