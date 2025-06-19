const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ANTHROPIC_API_KEY;
const CLAUDE_URL = 'https://api.anthropic.com/v1/messages';

async function getClaudeResponse(prompt: string) {
  if (!API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  const headers = {
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
    'Content-Type': 'application/json',
  };

  const data = {
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
    system: 'You are a helpful assistant.',
  };

  try {
    const response = await axios.post(CLAUDE_URL, data, { headers });
    return response.data.content[0].text;
  } catch (error) {
    console.error('Claude API Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        headers: {
          'x-api-key': '***'
        },
        data: error.config?.data
      }
    });
    throw new Error(`Claude API Error: ${error.response?.data?.error?.message || error.message}`);
  }
}

module.exports = { getClaudeResponse };