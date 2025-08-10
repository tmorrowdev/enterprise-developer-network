#!/bin/bash

echo "🚀 Deploying Cre8 UI Builder to Netlify"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if we're logged in to Netlify
if ! netlify status &> /dev/null; then
    echo "🔐 Please log in to Netlify..."
    netlify login
fi

# Build the project
echo "🔨 Building project for Netlify..."
npm run build:netlify

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=dist/public --functions=netlify/functions

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🎨 Your Cre8 UI Builder is now live!"
    echo ""
    echo "🌟 Features:"
    echo "   • AI-powered UI generation with Claude"
    echo "   • 108+ cre8-wc design system components"
    echo "   • Template validation and auto-correction"
    echo "   • Live preview and download functionality"
    echo "   • Responsive design with accessibility"
    echo ""
    echo "🔧 Environment Variables Required:"
    echo "   • ANTHROPIC_API_KEY - Your Claude API key"
    echo ""
    echo "📝 Set environment variables in Netlify dashboard:"
    echo "   Site settings > Environment variables"
else
    echo "❌ Deployment failed"
    exit 1
fi