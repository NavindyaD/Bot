const express = require('express');
const { getClaudeResponse } = require('../services/anthropicService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid request',
      message: 'Prompt must be a non-empty string'
    });
  }

  try {
    const response = await getClaudeResponse(prompt);
    res.json({ response });
  } catch (error) {
    console.error('Route handler error:', error.message);
    
    const statusCode = error.message.includes('API Key') ? 401 : 
                      error.message.includes('rate limit') ? 429 : 500;
    
    res.status(statusCode).json({ 
      error: 'Chat error',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;