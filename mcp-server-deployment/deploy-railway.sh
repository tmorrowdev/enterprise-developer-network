#!/bin/bash

echo "🚀 Deploying Design System MCP Server to Railway"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Check if we're logged in to Railway
if ! railway whoami &> /dev/null; then
    echo "🔐 Please log in to Railway..."
    railway login
fi

# Build the project
echo "🔨 Building Design System MCP server..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Test the server locally first

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Design System MCP Server deployment successful!"
    echo ""
    echo "🔧 Your Design System MCP Server is now running on Railway!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Note your Railway app URL from the deployment output"
    echo "   2. Test your deployed endpoints:"
    echo "      • GET https://your-app.railway.app/health"
    echo "      • GET https://your-app.railway.app/mcp/design-system/list_components"
    echo "   3. Set MCP_SERVER_URL environment variable in Netlify:"
    echo "      MCP_SERVER_URL=https://your-app.railway.app"
    echo ""
   
    echo ""
    echo "🎯 Available MCP Endpoints:"
    echo "   • GET /mcp/design-system/list_components"
    echo "   • GET /mcp/design-system/get_component?name=<component>"
    echo "   • GET /mcp/design-system/get_component_examples?name=<component>"
    echo "   • GET /mcp/design-system/validate_usage?component=<component>&props=<json>"
    echo "   • GET /mcp/design-system/generate_component_code?component=<component>"
    echo "   • GET /mcp/design-system/get_design_tokens?category=<category>"
else
    echo "❌ Deployment failed"
    exit 1
fi