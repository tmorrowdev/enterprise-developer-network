# Project Structure

## Root Level Organization

```
├── mcp-servers/           # Core MCP server implementations
├── dashboard/             # Developer dashboard web interface
├── components/            # Reusable web components
├── ui-builder/           # AI-powered UI generation system
├── demo/                 # Interactive demo scenarios
├── data/                 # Enterprise sample data
├── workflow-triggers/    # Automated workflow hooks
└── temp-exploration/     # Temporary development workspace
```

## MCP Servers (`/mcp-servers/`)

**Primary backend services implementing Model Context Protocol**

```
mcp-servers/
├── code-standards/       # Code validation and style enforcement
├── developer-analytics/  # Productivity metrics and analytics
├── learning-platform/    # Training progress and recommendations
├── design-system/        # Component library integration
├── onboarding-assistant/ # New hire guidance system
├── dist/                # Compiled TypeScript output
└── http-wrapper.js      # Express server for HTTP access
```

### Key Files
- `server.ts` - Individual MCP server implementations
- `http-wrapper.js` - Unified HTTP endpoint wrapper
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Dashboard (`/dashboard/`)

**Real-time developer metrics and analytics interface**

```
dashboard/
├── developer-activity-feed/  # React component for activity tracking
│   ├── components/          # React UI components
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # CSS modules
│   ├── __tests__/          # Comprehensive test suite
│   └── stories/            # Storybook documentation
├── *.html                  # Static dashboard pages
├── *.js                    # Client-side JavaScript
└── server.js              # Express server
```

## Components (`/components/`)

**Reusable web components built with Lit**

```
components/
└── learning-progress-tracker/
    ├── learning-progress-tracker.ts    # Main component implementation
    ├── *.test.ts                      # Test files (unit, integration, e2e)
    ├── example-usage.html             # Usage examples
    ├── dist/                          # Compiled output
    └── node_modules/                  # Component dependencies
```

### Component Structure Conventions
- Main component file: `{component-name}.ts`
- Test files: `{component-name}.{test-type}.test.ts`
- Example usage: `example-usage.html`
- Documentation: `README.md`, `INTEGRATION.md`

## UI Builder (`/ui-builder/`)

**AI-powered interface generation system**

```
ui-builder/
├── src/
│   ├── agents/           # AI agent implementations
│   └── services/         # MCP service integrations
└── .claude/             # Claude AI configuration
```

## Configuration Files

### MCP Client Configurations
- `claude-desktop-config.json` - Claude Desktop MCP setup
- `kiro-mcp-config.json` - Kiro IDE integration
- `vscode-mcp-config.json` - VS Code extension config
- `http-mcp-config.json` - HTTP client configuration

### Deployment & Infrastructure
- `Dockerfile` - Container configuration
- `docker-compose.yml` - Multi-service orchestration
- `vercel.json` - Vercel deployment settings
- `railway.json` - Railway deployment config

## Naming Conventions

### Files & Directories
- **kebab-case** for directories and files
- **PascalCase** for React/TypeScript components
- **camelCase** for JavaScript variables and functions

### Components
- Web components: `{component-name}.ts`
- React components: `{ComponentName}.tsx`
- Test files: `{component-name}.{type}.test.ts`

### MCP Servers
- Directory: `{server-purpose}/`
- Main file: `server.ts`
- Build output: `dist/{server-purpose}/server.js`

## Development Workflow

### Component Development
1. Create component in `/components/{component-name}/`
2. Implement using Lit framework
3. Add comprehensive test suite
4. Document with examples and integration guide
5. Build and distribute

### MCP Server Development
1. Create server in `/mcp-servers/{server-name}/`
2. Implement MCP protocol handlers
3. Add to HTTP wrapper configuration
4. Test with multiple MCP clients
5. Deploy via Docker or cloud platforms

### Dashboard Development
1. Create pages in `/dashboard/`
2. Use cre8-wc components for consistency
3. Integrate with MCP servers via HTTP endpoints
4. Test across browsers and devices