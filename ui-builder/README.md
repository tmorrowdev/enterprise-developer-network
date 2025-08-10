# Cre8 UI Builder

A design-system informed no-code UI builder powered by Claude AI and WebContainer API. Generate production-ready, accessible UI components using natural language descriptions.

## Features

🎨 **Design System Integration**: Automatically uses Cre8 design system components and tokens
🤖 **AI-Powered Generation**: Claude AI creates clean, production-ready code
🔄 **Real-time Preview**: Live preview using WebContainer API
📱 **Multi-Framework Support**: React, Vue, Angular, Svelte, and HTML/CSS
♿ **Accessibility First**: Built-in accessibility best practices
🎯 **Iterative Refinement**: Improve generated UIs with natural language feedback

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key
- Claude Code SDK (automatically installed)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ui-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

4. Build the MCP design system server:
```bash
cd ../mcp-servers
npm run build
cd ../ui-builder
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

## Usage

### Web Interface

1. **Describe Your UI**: Enter a natural language description of the UI you want to create
2. **Select Framework**: Choose your target framework (React, Vue, Angular, Svelte, HTML)
3. **Generate**: Click "Generate UI" to create your component
4. **Preview**: View the live preview in different screen sizes
5. **Refine**: Provide feedback to improve the generated code
6. **Export**: Copy or download the generated code

### Example Prompts

```
Create a user profile card with avatar, name, email, and edit button. Make it responsive and accessible.

Build a dashboard with navigation sidebar, main content area, and a stats widget showing key metrics.

Design a contact form with name, email, message fields and a submit button. Include validation states.

Create a responsive product grid with images, titles, prices, and add to cart buttons.
```

### Claude Command Integration

Use the `/ui-builder` command in Claude:

```
/ui-builder react Create a login form with email, password, and remember me checkbox
```

## Architecture

### Core Components

- **UIBuilderAgent**: Main AI agent that generates UI code using Claude
- **DesignSystemMCP**: Interface to the Cre8 design system MCP server
- **WebContainerService**: Manages live preview environments
- **Express Server**: REST API and WebSocket server

### Technology Stack

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: Vanilla JavaScript, CSS with design tokens
- **AI**: Claude 3.5 Sonnet via Claude Code SDK (with Anthropic SDK fallback)
- **Preview**: WebContainer API for live code execution
- **Design System**: Cre8 design tokens and components

### File Structure

```
ui-builder/
├── src/
│   ├── agents/
│   │   └── UIBuilderAgent.js      # Main AI agent
│   ├── services/
│   │   ├── DesignSystemMCP.js     # Design system integration
│   │   └── WebContainerService.js # Live preview service
│   └── server.js                  # Express server
├── public/
│   ├── index.html                 # Web interface
│   ├── app.js                     # Frontend JavaScript
│   └── styles.css                 # UI styles
└── package.json
```

## API Reference

### REST Endpoints

#### Generate UI
```http
POST /api/generate-ui
Content-Type: application/json

{
  "prompt": "Create a user profile card",
  "framework": "react"
}
```

#### Refine UI
```http
POST /api/refine-ui
Content-Type: application/json

{
  "code": "existing code",
  "feedback": "Make the button larger",
  "framework": "react"
}
```

#### List Components
```http
GET /api/components
```

#### Get Component Details
```http
GET /api/components/:name
```

### WebSocket Events

#### Client to Server
- `generate-ui`: Generate new UI code
- `refine-ui`: Refine existing code

#### Server to Client
- `progress`: Generation progress updates
- `ui-generated`: Generated code result
- `ui-refined`: Refined code result
- `error`: Error messages

## Design System Integration

The UI builder automatically integrates with the Cre8 design system:

### Available Components
- 100+ production-ready components
- Consistent styling with design tokens
- Accessibility built-in
- Responsive design patterns

### Design Tokens
- Typography: Font families, sizes, weights, line heights
- Spacing: Consistent spacing scale
- Colors: Semantic color system
- Responsive: Mobile-first breakpoints

### Usage in Generated Code
```css
/* Design tokens are automatically included */
font-family: var(--cre8-body-default-font-family);
font-size: var(--cre8-body-default-font-size);
color: var(--cre8-text-primary);
```

## Framework Support

### React
- Functional components with hooks
- TypeScript support
- Modern JSX patterns
- Proper prop types

### Vue.js
- Composition API
- TypeScript support
- Single File Components
- Reactive patterns

### Angular
- Component-based architecture
- TypeScript by default
- Dependency injection
- RxJS integration

### Svelte
- Reactive components
- TypeScript support
- Minimal boilerplate
- Efficient compilation

### HTML/CSS
- Semantic markup
- CSS custom properties
- Progressive enhancement
- No framework dependencies

## Development

### Running in Development Mode

```bash
npm run dev
```

This starts:
- Express server on port 3000
- File watching for auto-reload
- WebSocket server for real-time updates

### Building for Production

```bash
npm run build
npm start
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Configuration

### Environment Variables

- `ANTHROPIC_API_KEY`: Your Claude API key (required)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode
- `MCP_SERVER_PATH`: Path to design system MCP server
- `WEBCONTAINER_ENABLED`: Enable WebContainer previews

### MCP Server Configuration

The UI builder requires the design system MCP server to be built and available:

```bash
cd ../mcp-servers
npm run build
```

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup

1. Set up environment variables
2. Build MCP server dependencies
3. Configure CORS for your domain
4. Set up SSL certificates for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines

- Follow existing code style
- Add JSDoc comments for new functions
- Update README for new features
- Test with multiple frameworks
- Ensure accessibility compliance

## Troubleshooting

### Common Issues

**MCP Server Not Found**
```bash
# Build the MCP server
cd ../mcp-servers
npm run build
```

**WebContainer Boot Failed**
- Ensure you're running in a supported browser
- Check browser console for errors
- Verify WebContainer API compatibility

**Claude API Errors**
- Verify your API key is correct
- Check API rate limits
- Ensure sufficient credits

**Design System Components Missing**
- Verify MCP server is running
- Check component names match exactly
- Review MCP server logs

### Getting Help

- Check the browser console for errors
- Review server logs for API issues
- Verify environment configuration
- Test with simple prompts first

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Anthropic for Claude AI
- StackBlitz for WebContainer API
- Cre8 design system team
- Open source community