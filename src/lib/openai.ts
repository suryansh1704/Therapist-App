
// OpenAI API integration

export const generateAIResponse = async (
  message: string, 
  language: string
): Promise<string> => {
  const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
  
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing");
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a compassionate and professional AI therapist. Respond in ${language} language. Be empathetic, supportive, and helpful while maintaining professional boundaries. Keep responses concise (around 2-3 sentences) but meaningful.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'Error calling OpenAI API');
    }
    
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
};
