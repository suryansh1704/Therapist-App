
// Gemini API integration
export const generateAIResponse = async (
  message: string, 
  language: string
): Promise<string> => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
  
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing");
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a compassionate and professional AI therapist. Respond in ${language} language. Be empathetic, supportive, and helpful while maintaining professional boundaries. Keep responses concise (around 2-3 sentences) but meaningful. User message: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'Error calling Gemini API');
    }
    
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
};
