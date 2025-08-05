#!/bin/bash

echo "🚀 Enterprise Developer Network Deployment"
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

# Stop and remove existing container
echo "🧹 Cleaning up existing deployment..."
docker rm -f enterprise-demo 2>/dev/null || true

# Build the image
echo "🔨 Building Docker image..."
docker build -t enterprise-dev-network .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

# Run the container
echo "🚀 Starting Enterprise Developer Network..."
docker run -d \
  -p 3000:3000 \
  -p 3002:3002 \
  --name enterprise-demo \
  --restart unless-stopped \
  enterprise-dev-network

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🎨 Creative Dashboard: http://localhost:3000"
    echo "📊 Classic Dashboard: http://localhost:3000/classic"
    echo "🎯 Demo Interface: http://localhost:3000/demo"
    echo "🔧 MCP Health: http://localhost:3002/health"
    echo "🛠️  MCP Endpoints: http://localhost:3002/mcp/{server-name}"
    echo ""
    echo "🌟 New Features:"
    echo "   • Enhanced cre8 component library integration"
    echo "   • Tab-based navigation with 4 dashboard views"
    echo "   • Dark mode with design token overrides"
    echo "   • Interactive components and real-time updates"
    echo ""
    echo "🔍 Check logs: docker logs enterprise-demo"
    echo "🛑 Stop: docker stop enterprise-demo"
else
    echo "❌ Deployment failed"
    exit 1
fi