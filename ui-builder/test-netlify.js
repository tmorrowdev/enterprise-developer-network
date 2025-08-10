#!/usr/bin/env node

/**
 * Test script for Netlify functions
 * Run with: node test-netlify.js
 */

import { handler as generateHandler } from './netlify/functions/generate-ui.js';
import { handler as refineHandler } from './netlify/functions/refine-ui.js';
import { handler as componentsHandler } from './netlify/functions/components.js';

async function testNetlifyFunctions() {
  console.log('🧪 Testing Netlify Functions...\n');

  // Test components endpoint
  console.log('1. Testing components endpoint...');
  try {
    const componentsResult = await componentsHandler({
      httpMethod: 'GET',
      headers: {},
      body: null
    }, {});
    
    if (componentsResult.statusCode === 200) {
      const components = JSON.parse(componentsResult.body);
      console.log(`✅ Components endpoint working - Found ${components.length} components`);
    } else {
      console.log(`❌ Components endpoint failed - Status: ${componentsResult.statusCode}`);
    }
  } catch (error) {
    console.log(`❌ Components endpoint error: ${error.message}`);
  }

  // Test generate-ui endpoint
  console.log('\n2. Testing generate-ui endpoint...');
  try {
    const generateResult = await generateHandler({
      httpMethod: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Create a simple button with the text "Hello World"',
        framework: 'html'
      })
    }, {});
    
    if (generateResult.statusCode === 200) {
      const result = JSON.parse(generateResult.body);
      console.log('✅ Generate-UI endpoint working');
      console.log(`   - Generated ${result.components.length} components`);
      console.log(`   - Code length: ${result.code.length} characters`);
      console.log(`   - Validation passed: ${result.validation.isValid}`);
    } else {
      console.log(`❌ Generate-UI endpoint failed - Status: ${generateResult.statusCode}`);
      console.log(`   Error: ${generateResult.body}`);
    }
  } catch (error) {
    console.log(`❌ Generate-UI endpoint error: ${error.message}`);
  }

  console.log('\n🎉 Netlify function tests completed!');
  console.log('\n📝 Next steps:');
  console.log('   1. Set ANTHROPIC_API_KEY environment variable');
  console.log('   2. Run: npm run build:netlify');
  console.log('   3. Deploy: ./deploy-netlify.sh');
}

// Set up environment for testing
process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || 'test-key';

testNetlifyFunctions().catch(console.error);