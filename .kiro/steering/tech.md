# Technology Stack

## Core Technologies

### Runtime & Language
- **Node.js** with ES2022 modules
- **TypeScript 5.x** with strict mode disabled
- **ES Modules** (type: "module" in package.json)

### MCP Framework
- **@modelcontextprotocol/sdk** ^0.4.0 - Core MCP server implementation
- **Express.js** 4.18+ with CORS for HTTP wrapper functionality

### Frontend Technologies
- **Lit 3.x** - Web components framework for custom components
- **@cre8_dev/cre8-wc** ^1.0.5 - Enterprise design system components
- **Vanilla JavaScript/TypeScript** - Dashboard and client implementations

### Testing & Quality
- **@web/test-runner** - Web component testing
- **@open-wc/testing** - Web component testing utilities
- **ESLint** with TypeScript parser
- **Prettier** for code formatting
- **Playwright** for E2E testing

### Build & Development
- **TypeScript Compiler** (tsc) - Primary build tool
- **Web Test Runner** - Component testing
- **Storybook 8.x** - Component documentation and development

## Common Commands

### Development Setup
```bash
# Install all dependencies
npm install

# Build MCP servers
cd mcp-servers && npm run build

# Start MCP servers (HTTP wrapper)
cd mcp-servers && npm start

# Start dashboard
cd dashboard && npm start
```

### Testing
```bash
# Run component tests
cd components/learning-progress-tracker && npm test

# Run all tests with coverage
npm run test

# Run cross-browser tests
npm run test:cross-browser
```

### Development
```bash
# Watch mode for TypeScript compilation
npm run dev

# Run demos
npm run demo
node demo/run-demo.js

# Lint and format
npm run lint
npm run format
```

### Deployment
```bash
# Docker deployment
./deploy.sh

# Docker Compose
npm run deploy

# Build for production
npm run build
```

## Configuration Files

### TypeScript Configuration
- Target: ES2022
- Module: ES2022
- Strict mode: disabled
- Output directory: `./dist`

### MCP Server Configuration
- Multiple config files for different clients:
  - `claude-desktop-config.json` - Claude Desktop
  - `kiro-mcp-config.json` - Kiro IDE
  - `vscode-mcp-config.json` - VS Code
  - `http-mcp-config.json` - HTTP clients

### Package Management
- Uses `npm` as primary package manager
- Some components use `pnpm` (lock files present)
- Node version specified in `.nvmrc` files