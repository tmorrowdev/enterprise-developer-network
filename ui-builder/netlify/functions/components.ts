import { Handler } from '@netlify/functions';
import { DesignSystemHTTP } from '../../src/services/DesignSystemHTTP.js';

const handler: Handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Initialize the Design System HTTP client
    const designSystemHTTP = new DesignSystemHTTP();
    
    // Get all components
    const components = await designSystemHTTP.listComponents();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(components),
    };
  } catch (error) {
    console.error('Error fetching components:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch components',
        message: (error as Error).message 
      }),
    };
  }
};

export { handler };