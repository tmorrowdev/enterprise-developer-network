#!/bin/sh

echo "Starting Enterprise Developer Network..."

# Start MCP HTTP wrapper in background
cd /app/mcp-servers
node http-wrapper.js &
MCP_PID=$!

# Wait a moment for MCP server to start
sleep 2

# Start dashboard server
cd /app/dashboard
node server.js &
DASHBOARD_PID=$!

echo "MCP servers running on port 3002 (PID: $MCP_PID)"
echo "Dashboard running on port 3000 (PID: $DASHBOARD_PID)"

# Keep container running
trap 'kill $MCP_PID $DASHBOARD_PID' TERM INT
wait