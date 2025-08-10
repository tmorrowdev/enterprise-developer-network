# Design System MCP Server Deployment

This directory contains the deployment configuration for the Design System MCP Server, which provides access to the cre8-wc component library and design tokens.

## What's Included

- **Design System MCP Server**: Provides tools for component documentation, validation, and code generation
- **HTTP Wrapper**: Express.js server that exposes MCP tools as REST endpoints
- **Docker Configuration**: Container setup for cloud deployment
- **Railway Deployment**: Scripts and configuration for Railway platform

## Available Endpoints

Once deployed, the server provides these HTTP endpoints:

- `GET /health` - Health check
- `GET /mcp/design-system/list_components` - List all available components
- `GET /mcp/design-system/get_component?name=<component>` - Get component details
- `GET /mcp/design-system/get_component_examples?name=<component>` - Get usage examples
- `GET /mcp/design-system/validate_usage?component=<component>&props=<json>` - Validate component usage
- `GET /mcp/design-system/generate_component_code?component=<component>` - Generate component code
- `GET /mcp/design-system/get_design_tokens?category=<category>` - Get design tokens

## Deployment Options

### Docker
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t design-system-mcp .
docker run -d -p 3002:3002 design-system-mcp
```

### Railway
```bash
# Deploy to Railway platform
./deploy-railway.sh
```

### Local Development
```bash
# Install dependencies and build
npm install
npm run build

# Start the HTTP wrapper
npm start

# Or start the MCP server directly
npm run start:design-system
```

## Testing the Deployment

Once deployed, test the endpoints:

```bash
# Health check
curl http://localhost:3002/health

# List components
curl "http://localhost:3002/mcp/design-system/list_components"

# Get specific component
curl "http://localhost:3002/mcp/design-system/get_component?name=button"
```

## Configuration

The server can be configured as an MCP client using `kiro-config.json` for Kiro IDE integration.