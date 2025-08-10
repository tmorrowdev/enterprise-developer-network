FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code and data
COPY design-system/ ./design-system/
COPY http-wrapper.js ./
COPY cre8-wc-components.md ./
COPY tsconfig.json ./

# Build the MCP servers
RUN npm run build

# Expose the HTTP wrapper port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3002/health || exit 1

# Start the HTTP wrapper
CMD ["node", "http-wrapper.js"]