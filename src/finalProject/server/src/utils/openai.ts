import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error calling OpenAI API:', error.response?.data || error.message);
    } else {
      console.error('Error calling OpenAI API:', error);
    }
    throw new Error('Failed to generate AI response');
  }
}
