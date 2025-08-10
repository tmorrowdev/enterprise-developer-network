#!/bin/bash

# Cre8 UI Builder Startup Script

echo "🚀 Starting Cre8 UI Builder..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp .env.example .env
    echo "📝 Please edit .env file and add your ANTHROPIC_API_KEY"
    echo "   You can get an API key from: https://console.anthropic.com/"
    read -p "Press Enter to continue after setting up your API key..."
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Test Claude Code SDK integration
echo "🧪 Testing Claude Code SDK..."
node test-claude-code.js

# Build MCP server if needed
if [ ! -f "../mcp-servers/dist/design-system/server.js" ]; then
    echo "🔨 Building MCP design system server..."
    cd ../mcp-servers
    npm install
    npm run build
    cd ../ui-builder
fi

# Build server files
echo "🔨 Building server..."
npm run build:server

# Start the development server
echo "🌟 Starting UI Builder server..."
echo "📱 Open http://localhost:3000 in your browser"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev