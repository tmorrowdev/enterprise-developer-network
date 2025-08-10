FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY mcp-server-deployment/package.json ./mcp-server-deployment/
COPY mcp-server-deployment/tsconfig.json ./mcp-server-deployment/

# Install dependencies
RUN cd mcp-server-deployment && npm install

# Copy source code
COPY mcp-server-deployment/ ./mcp-server-deployment/
COPY cre8-wc-components.md ./mcp-server-deployment/

# Build TypeScript files
RUN cd mcp-server-deployment && npm run build

# Make start script executable if it exists
RUN if [ -f mcp-server-deployment/start.sh ]; then chmod +x mcp-server-deployment/start.sh; fi

EXPOSE 3002

CMD ["node", "mcp-server-deployment/http-wrapper.js"]