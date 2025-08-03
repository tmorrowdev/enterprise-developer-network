#!/bin/sh

echo "Starting Enterprise Developer Network..."

# Start MCP HTTP wrapper in background
cd /app/mcp-servers
node http-wrapper.js &
MCP_PID=$!

# Start dashboard server
cd /app/dashboard
node server.js &
DASHBOARD_PID=$!

echo "MCP servers running on port 3002"
echo "Dashboard running on port 3000"

# Wait for both processes
wait $MCP_PID $DASHBOARD_PID