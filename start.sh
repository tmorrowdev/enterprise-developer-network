#!/bin/sh

echo "Starting Enterprise Developer Network..."

# Start MCP HTTP wrapper
cd /app/mcp-servers
node http-wrapper.js &
MCP_PID=$!

echo "MCP servers running on port 3002 (PID: $MCP_PID)"

# Keep container running
trap 'kill $MCP_PID' TERM INT
wait