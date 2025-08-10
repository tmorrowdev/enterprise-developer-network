# 🚀 Complete Deployment Guide - Cre8 UI Builder

This guide covers the complete deployment of the Cre8 UI Builder with separated MCP server architecture.

## 📋 Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI Builder    │    │   MCP Server     │    │  External APIs  │
│   (Netlify)     │    │   (Railway)      │    │                 │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ • Static Site   │───▶│ • HTTP Wrapper   │───▶│ • Anthropic API │
│ • Serverless    │    │ • Design System  │    │ • Component DB  │
│ • Functions     │    │ • Component API  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🎯 Two-Step Deployment Process

### Step 1: Deploy MCP Server (Railway)

The MCP server needs to run continuously and handle component data.

#### Option A: Railway Deployment (Recommended)

1. **Navigate to MCP deployment directory**:
   ```bash
   cd mcp-server-deployment
   ```

2. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

3. **Login to Railway**:
   ```bash
   railway login
   ```

4. **Deploy the MCP server**:
   ```bash
   ./deploy-railway.sh
   ```

5. **Note your Railway URL** (e.g., `https://your-app.railway.app`)

#### Option B: Docker Deployment

1. **Build and run locally**:
   ```bash
   cd mcp-server-deployment
   docker-compose up -d
   ```

2. **Deploy to your preferred Docker hosting** (DigitalOcean, AWS, etc.)

### Step 2: Deploy UI Builder (Netlify)

1. **Navigate to UI Builder directory**:
   ```bash
   cd ui-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build for Netlify**:
   ```bash
   npm run build:netlify
   ```

4. **Deploy to Netlify**:
   ```bash
   ./deploy-netlify.sh
   ```

5. **Set environment variables** in Netlify dashboard:
   - `ANTHROPIC_API_KEY` - Your Claude API key
   - `MCP_SERVER_URL` - Your Railway MCP server URL
   - `NODE_VERSION` - `18`

## 🔧 Environment Variables

### MCP Server (Railway)
No environment variables required - uses local component data.

### UI Builder (Netlify)
| Variable | Value | Description |
|----------|-------|-------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Your Claude API key from Anthropic |
| `MCP_SERVER_URL` | `https://your-app.railway.app` | URL of your deployed MCP server |
| `NODE_VERSION` | `18` | Node.js version for builds |

## 🧪 Testing the Deployment

### Test MCP Server
```bash
# Health check
curl https://your-mcp-server.railway.app/health

# List components
curl https://your-mcp-server.railway.app/mcp/design-system/list_components

# Get component examples
curl https://your-mcp-server.railway.app/mcp/design-system/get_component_examples?name=button
```

### Test UI Builder
1. Visit your Netlify URL
2. Enter a UI description (e.g., "Create a login form with email and password fields")
3. Click "Generate UI"
4. Verify the generated code follows the Lit template structure
5. Test the preview and download functionality

## 🚨 Troubleshooting

### MCP Server Issues
- **503 Service Unavailable**: Check Railway logs, server might be starting up
- **404 Not Found**: Verify the MCP server URL is correct
- **CORS Errors**: Check that the HTTP wrapper is running properly

### UI Builder Issues
- **"Failed to fetch components"**: Check MCP_SERVER_URL environment variable
- **"Failed to generate UI"**: Verify ANTHROPIC_API_KEY is set correctly
- **Template validation errors**: Check that the example template is accessible

### Common Solutions
1. **Check all environment variables** are set correctly
2. **Verify MCP server is running** with health check endpoint
3. **Check Netlify function logs** in the dashboard
4. **Test API endpoints directly** using curl or Postman

## 📊 Monitoring

### Railway (MCP Server)
- Monitor CPU and memory usage
- Check response times for API endpoints
- Set up alerts for downtime

### Netlify (UI Builder)
- Monitor function execution times
- Check error rates in function logs
- Monitor bandwidth usage

## 🔄 Updates and Maintenance

### Updating MCP Server
1. Update code in `mcp-servers/` directory
2. Redeploy: `cd mcp-server-deployment && ./deploy-railway.sh`

### Updating UI Builder
1. Update code in `ui-builder/` directory
2. Redeploy: `cd ui-builder && ./deploy-netlify.sh`

## 💰 Cost Estimation

### Railway (MCP Server)
- **Hobby Plan**: $5/month (512MB RAM, 1GB storage)
- **Pro Plan**: $20/month (8GB RAM, 100GB storage)

### Netlify (UI Builder)
- **Free Tier**: 100GB bandwidth, 300 build minutes
- **Pro Plan**: $19/month (unlimited bandwidth)

### Anthropic API
- **Claude 3.5 Sonnet**: ~$3 per million input tokens
- **Estimated cost**: $10-50/month depending on usage

## 🎉 Success Checklist

- [ ] MCP server deployed and accessible
- [ ] MCP server health check returns 200
- [ ] UI Builder deployed to Netlify
- [ ] All environment variables set
- [ ] Component list loads in UI Builder
- [ ] UI generation works with test prompt
- [ ] Template validation passes
- [ ] Preview functionality works
- [ ] Download generates correct HTML files

## 🔗 Useful Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Netlify Dashboard**: https://app.netlify.com
- **Anthropic Console**: https://console.anthropic.com
- **MCP Server Logs**: Check Railway dashboard
- **UI Builder Logs**: Check Netlify function logs

## 📞 Support

For deployment issues:
1. Check the troubleshooting section above
2. Review logs in Railway and Netlify dashboards
3. Test individual components using curl
4. Verify all environment variables are set correctly

**Your Cre8 UI Builder is now ready for production with separated, scalable architecture! 🚀**