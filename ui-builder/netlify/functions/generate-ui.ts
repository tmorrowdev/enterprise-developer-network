import { Handler } from '@netlify/functions';
import { UIBuilderAgent } from '../../src/agents/UIBuilderAgent.js';
import { DesignSystemHTTP } from '../../src/services/DesignSystemHTTP.js';

const handler: Handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { prompt, framework = 'html' } = JSON.parse(event.body || '{}');

    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

    // Initialize the UI Builder Agent
    const designSystemHTTP = new DesignSystemHTTP();
    const uiBuilder = new UIBuilderAgent(designSystemHTTP);

    // Generate UI
    const result = await uiBuilder.generateUI(`/spec_to_dev ${prompt}`, 'html');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error generating UI:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to generate UI',
        message: (error as Error).message 
      }),
    };
  }
};

export { handler };