# Netlify Deployment Guide

This guide explains how to deploy the Cre8 UI Builder to Netlify.

## Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Anthropic API Key**: Get your API key from [console.anthropic.com](https://console.anthropic.com)
3. **Node.js 18+**: Required for building the project

## Quick Deploy

### Option 1: Automated Script

```bash
# Make the script executable (if not already)
chmod +x deploy-netlify.sh

# Run the deployment script
./deploy-netlify.sh
```

### Option 2: Manual Deployment

1. **Install Netlify CLI**:

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:

   ```bash
   netlify login
   ```

3. **Build the project**:

   ```bash
   npm run build:netlify
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist/public --functions=netlify/functions
   ```

## Environment Variables

After deployment, set these environment variables in your Netlify dashboard:

1. Go to **Site settings** > **Environment variables**
2. Add the following variables:

| Variable            | Value               | Description                        |
| ------------------- | ------------------- | ---------------------------------- |
| `ANTHROPIC_API_KEY` | `your-api-key-here` | Your Claude API key from Anthropic |
| `MCP_SERVER_URL`    | `https://your-mcp-server.railway.app` | URL of your deployed MCP server |
| `NODE_VERSION`      | `18`                | Node.js version for builds         |

## Project Structure

```
ui-builder/
├── netlify/
│   └── functions/          # Serverless functions
│       ├── generate-ui.ts  # UI generation endpoint
│       ├── refine-ui.ts    # UI refinement endpoint
│       └── components.ts   # Components list endpoint
├── public/
│   ├── index-netlify.html  # Netlify-specific HTML
│   ├── app-netlify.js      # Netlify-specific JS (no Socket.IO)
│   └── styles.css          # Styles
├── src/                    # Source code
├── netlify.toml           # Netlify configuration
└── deploy-netlify.sh      # Deployment script
```

## Key Differences from Local Version

### Frontend Changes

- **No Socket.IO**: Uses HTTP requests instead of WebSocket connections
- **Progress Simulation**: Simulates progress updates since no real-time connection
- **Error Handling**: Enhanced error handling for HTTP requests

### Backend Changes

- **Serverless Functions**: Express server replaced with Netlify Functions
- **Stateless**: Each request is independent (no persistent connections)
- **CORS Enabled**: Proper CORS headers for cross-origin requests

## API Endpoints

Once deployed, your API endpoints will be:

- `POST /api/generate-ui` - Generate new UI from prompt
- `POST /api/refine-ui` - Refine existing UI with feedback
- `GET /api/components` - Get available design system components

## Features

✅ **AI-Powered UI Generation**: Uses Claude 3.5 Sonnet for intelligent UI creation  
✅ **108+ Design System Components**: Full cre8-wc component library integration  
✅ **Template Validation**: QA agent ensures strict Lit template compliance  
✅ **Live Preview**: Real-time preview with responsive breakpoints  
✅ **Download Functionality**: Export as ready-to-use HTML files  
✅ **Component Discovery**: Dynamic mapping of HTML elements to cre8-wc components  
✅ **Accessibility Compliant**: Generated UIs follow accessibility best practices

## Troubleshooting

### Build Errors

- Ensure Node.js 18+ is installed
- Check that all dependencies are installed: `npm install`
- Verify TypeScript compilation: `npm run build:server`

### Runtime Errors

- Check environment variables are set correctly
- Verify Anthropic API key is valid
- Check Netlify function logs in the dashboard

### API Errors

- Ensure CORS headers are properly set
- Check function timeout limits (default 10s)
- Verify request payload sizes are within limits

## Performance Optimization

- **Function Caching**: Components are cached to reduce API calls
- **Static Assets**: CSS and JS files are served from CDN
- **Compression**: Gzip compression enabled for all assets
- **Lazy Loading**: Components loaded on demand

## Security

- **API Key Protection**: Environment variables are secure
- **CORS Configuration**: Proper cross-origin request handling
- **Input Validation**: All user inputs are validated
- **XSS Protection**: HTML escaping for user-generated content

## Monitoring

Monitor your deployment through:

- **Netlify Dashboard**: Build logs, function logs, analytics
- **Function Metrics**: Execution time, error rates, usage
- **Site Analytics**: Traffic, performance metrics

## Support

For issues specific to Netlify deployment:

1. Check the [Netlify documentation](https://docs.netlify.com)
2. Review function logs in the Netlify dashboard
3. Test API endpoints directly using curl or Postman

For UI Builder specific issues:

1. Check the main README.md
2. Review the ARCHITECTURE.md file
3. Test locally first with `npm run dev`
