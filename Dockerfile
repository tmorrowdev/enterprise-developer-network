FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY mcp-servers/package.json ./mcp-servers/
COPY dashboard/package.json ./dashboard/

# Install dependencies
RUN cd mcp-servers && npm install
RUN cd dashboard && npm install

# Copy source code
COPY mcp-servers/ ./mcp-servers/
COPY dashboard/ ./dashboard/
COPY data/ ./data/
COPY start.sh ./

# Build MCP servers
RUN cd mcp-servers && npm run build

# Make start script executable
RUN chmod +x start.sh

EXPOSE 3000 3002

CMD ["./start.sh"]