#!/usr/bin/env tsx

import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

async function testUIBuilder(): Promise<void> {
  console.log('🧪 Testing UI Builder setup...');
  
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY not found in environment variables');
    process.exit(1);
  }

  try {
    console.log('📡 Testing Anthropic SDK connection...');
    
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 100,
      system: 'You are a UI generation agent.',
      messages: [
        {
          role: 'user',
          content: 'Create a simple React button component that says "Hello World"'
        }
      ]
    });

    console.log('✅ Anthropic SDK connection successful');
    console.log('📄 Response preview:', response.content[0].text.substring(0, 200) + '...');
    
    // Test Claude Code SDK if available
    try {
      const claudeCodeModule = await import('@anthropic-ai/claude-code');
      if (claudeCodeModule.query) {
        console.log('✅ Claude Code SDK is available');
      } else {
        console.log('⚠️  Claude Code SDK query function not found');
      }
    } catch (error) {
      console.log('⚠️  Claude Code SDK not available - will use direct Anthropic SDK');
    }

    console.log('🎉 UI Builder test completed successfully!');
    
  } catch (error) {
    const err = error as Error;
    if (err.message.includes('credit balance')) {
      console.log('⚠️  API key is valid but has insufficient credits');
      console.log('💡 Please add credits to your Anthropic account to use the UI Builder');
      console.log('✅ Build and setup are working correctly');
    } else {
      console.error('❌ UI Builder test failed:', err.message);
      process.exit(1);
    }
  }
}

testUIBuilder();