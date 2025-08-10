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
    const { code, feedback, framework = 'html' } = JSON.parse(event.body || '{}');

    if (!code || !feedback) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Code and feedback are required' }),
      };
    }

    // Initialize the UI Builder Agent
    const designSystemHTTP = new DesignSystemHTTP();
    const uiBuilder = new UIBuilderAgent(designSystemHTTP);

    // Refine UI
    const result = await uiBuilder.refineUI(code, feedback, framework);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error refining UI:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to refine UI',
        message: (error as Error).message 
      }),
    };
  }
};

export { handler };