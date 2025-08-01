#!/bin/bash

echo "🚀 Enterprise MCP Demo Deployment"

# Build the project
echo "📦 Building MCP servers..."
cd mcp-servers && npm install && npm run build && cd ..

echo "📦 Installing dashboard dependencies..."
cd dashboard && npm install && cd ..

# Choose deployment method
echo "Choose deployment method:"
echo "1) Docker (local/server)"
echo "2) Railway (cloud)"
echo "3) Vercel (serverless)"
echo "4) Manual setup"

read -p "Enter choice (1-4): " choice

case $choice in
  1)
    echo "🐳 Building Docker image..."
    docker build -t enterprise-mcp-demo .
    echo "🚀 Starting containers..."
    docker-compose up -d
    echo "✅ Demo available at http://localhost:3000"
    echo "📊 Dashboard: http://localhost:3000"
    echo "🔍 Health check: http://localhost:3000/api/health"
    ;;
  2)
    echo "🚂 Deploying to Railway..."
    echo "Run: railway login && railway up"
    ;;
  3)
    echo "▲ Deploying to Vercel..."
    echo "Run: vercel --prod"
    ;;
  4)
    echo "📋 Manual setup:"
    echo "1. cd dashboard && npm start"
    echo "2. Open http://localhost:3000"
    echo "3. Run demos: node demo/run-demo.js"
    ;;
esac