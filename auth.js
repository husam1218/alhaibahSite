// Authentication function
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, password } = JSON.parse(event.body);
    
    // In a real implementation, you would verify credentials against a database
    // For demo purposes, we'll accept any non-empty credentials
    
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password are required' })
      };
    }
    
    // Generate a simple token (in production, use JWT or similar)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token,
        user: {
          email,
          name: email.split('@')[0] // Simple name extraction
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed' })
    };
  }
};