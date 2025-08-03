#!/bin/bash

echo "🔄 Updating Enterprise Developer Network to use cre8-wc components..."

# Update dashboard dependencies
echo "📦 Installing cre8-wc in dashboard..."
cd dashboard
npm uninstall @shoelace-style/shoelace
npm install @cre8_dev/cre8-wc@latest

# Update MCP servers if needed
echo "🔧 Rebuilding MCP servers..."
cd ../mcp-servers
npm run build

echo "✅ Migration to cre8-wc complete!"
echo ""
echo "🚀 To start the demo:"
echo "   cd dashboard && npm start"
echo ""
echo "📚 Available cre8-wc components in the design system:"
echo "   • cre8-button - Interactive buttons with variants"
echo "   • cre8-card - Container component with slots"
echo "   • cre8-alert - Status messages and notifications"
echo "   • cre8-field - Form input fields with validation"
echo "   • cre8-modal - Dialog overlays"
echo "   • cre8-progress - Progress indicators"
echo "   • cre8-badge - Status and label badges"