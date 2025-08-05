# Enterprise Developer Network - MCP Server Network

A comprehensive Model Context Protocol (MCP) server network designed for enterprise development standards and workflows.

## MCP Servers

### 1. Code Standards Enforcer
- **Purpose**: Enforces company coding standards, style guides, and security policies
- **Tools**: 
  - `validate_code`: Check code against standards
  - `get_style_guide`: Retrieve language-specific style guides

### 2. Developer Analytics
- **Purpose**: Provides productivity metrics, commit patterns, and code review data
- **Tools**:
  - `get_developer_metrics`: Individual developer performance
  - `get_team_analytics`: Team-wide analytics

### 3. Learning Platform
- **Purpose**: Connects to internal training systems and certification tracking
- **Tools**:
  - `get_learning_progress`: Track course completion
  - `recommend_courses`: Suggest skill-based learning paths

### 4. Design System
- **Purpose**: Links to component libraries, design tokens, and UI patterns
- **Tools**:
  - `get_component`: Component documentation
  - `get_design_tokens`: Design system tokens
  - `validate_usage`: Component usage validation

### 5. Onboarding Assistant
- **Purpose**: Guides new hires through documentation, setup, and mentor assignments
- **Tools**:
  - `get_onboarding_tasks`: New hire task lists
  - `assign_mentor`: Match mentors to skills
  - `get_documentation`: Relevant docs by topic

## Setup

```bash
cd mcp-servers
npm install
npm run build
```

## MCP Client Configuration

Multiple configuration files are provided for different MCP clients:

### Claude Desktop
Copy `claude-desktop-config.json` to your Claude Desktop MCP configuration:
```bash
# macOS
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Kiro
Use `kiro-mcp-config.json` for Kiro's MCP integration:
```bash
kiro config add-mcp-servers kiro-mcp-config.json
```

### VS Code
Add `vscode-mcp-config.json` to your VS Code settings:
```json
{
  "mcp.servers": {
    // Copy contents from vscode-mcp-config.json
  }
}
```

### HTTP Clients
For remote access, use `http-mcp-config.json` with the HTTP wrapper at `http://localhost:3002`

## Enterprise Benefits

- **Standardization**: Consistent code quality across teams
- **Productivity**: Data-driven development insights
- **Learning**: Integrated skill development tracking
- **Design Consistency**: Unified component usage with cre8-wc library
- **Efficient Onboarding**: Streamlined new hire experience

## Enterprise Data Integration

The system includes real enterprise data:

### Developer Profiles
- **Sarah Chen** (Senior Frontend) - 92% completion rate, React/TypeScript expert
- **Marcus Rodriguez** (Junior Full Stack) - 67% completion rate, needs React state management
- **Jennifer Kim** (Backend) - 88% completion rate, struggling with Kubernetes
- **Alex Thompson** (DevOps) - 95% completion rate, mentor for infrastructure

### Code Standards
- JavaScript/TypeScript ESLint rules (max 100 chars, no console.log)
- Security rules (no hardcoded secrets, HTTPS only)
- Performance requirements (500kb bundle, 90+ Lighthouse score)

### Design System (cre8-wc Components)
- **cre8-button** component (245 uses) - primary, secondary, tertiary variants
- **cre8-field** component (189 uses) - text, email, password, number types
- **cre8-card** component (156 uses) - bare, horizontal, horizontal-bare variants
- **Design tokens** - Primary #2563eb, Success #10b981, Warning #f59e0b

### Learning Paths
- React Fundamentals (20h, beginner)
- Advanced Testing Patterns (35h, advanced)
- Kubernetes Fundamentals (40h, intermediate)

## cre8-wc Component Library

The dashboard now uses the modern cre8-wc web component library:

### Available Components
- **cre8-button** - Interactive buttons with primary, secondary, tertiary variants
- **cre8-card** - Container component with header, body, footer slots
- **cre8-alert** - Status messages (info, success, warning, error)
- **cre8-field** - Form inputs with validation and accessibility
- **cre8-modal** - Dialog overlays with customizable sizes
- **cre8-progress** - Progress indicators for metrics
- **cre8-badge** - Status and label badges

### Component Usage
```html
<!-- Button with variants -->
<cre8-button text="Primary Action" variant="primary"></cre8-button>
<cre8-button text="Secondary" variant="secondary"></cre8-button>

<!-- Card with slots -->
<cre8-card>
  <div slot="header"><h3>Developer Profile</h3></div>
  <div slot="body"><p>Performance metrics...</p></div>
  <div slot="footer"><cre8-button text="View Details"></cre8-button></div>
</cre8-card>

<!-- Progress indicator -->
<cre8-progress value="85"></cre8-progress>
```

## Demo Scenarios

Run interactive demos showing real enterprise workflows:

```bash
node demo/run-demo.js
```

### Demo 1: New Developer Onboarding (Marcus)
- Shows code with violations (var usage, console.log)
- Suggests design system Button component
- Recommends React State Management course

### Demo 2: Struggling Developer Detection
- Analyzes Marcus's 67% completion rate
- Identifies struggles with async patterns
- Triggers learning recommendations

### Demo 3: Real-time Code Standards
- Detects hardcoded secrets and console.log
- Provides instant fix suggestions
- Suggests proper logging frameworks

## Workflow Triggers

### File Save Trigger
```bash
# Automatically runs on .js/.ts file saves
✅ Standards check
💡 Design system suggestions
📚 Learning recommendations
```

### Weekly Analysis
```bash
# Runs every Monday 9 AM
📊 Productivity metrics
🎯 Skill gap analysis
👥 Team collaboration insights
```

### Component Usage Trigger
```bash
# Runs when components are used
🎨 Design token validation
📋 Usage pattern analysis
💡 Alternative suggestions
```

## Developer Dashboard

Real-time dashboard at `http://localhost:3000`:

```bash
cd dashboard
npm install
npm start
```

### Dashboard Features
- **Productivity Metrics** - Live completion rates, commit frequency
- **Learning Progress** - Course completion, skill levels
- **Design System Usage** - Component adoption, token compliance
- **Team Collaboration** - Code review participation, mentoring hours

## Quick Start

### Option 1: Docker (Recommended)
```bash
./deploy.sh
```

### Option 2: Local Development
```bash
# Install dependencies
cd mcp-servers && npm install && npm run build
cd ../dashboard && npm install

# Start MCP servers
cd ../mcp-servers && npm start &

# Start dashboard
cd ../dashboard && npm start
```

3. **Run demos**:
```bash
node demo/run-demo.js
```

4. **Configure Kiro**:
- Use `mcp-servers/kiro-config.json`
- Connects all 5 MCP servers + enterprise hooks
- Enables automated workflows

## Remote Deployment

Share the demo with colleagues using multiple deployment options:

### Option 1: Docker (Recommended)
```bash
# Build and run with MCP server endpoints
docker build -t enterprise-dev-network .
docker run -d -p 3000:3000 -p 3002:3002 --name enterprise-demo enterprise-dev-network

# Access points:
# Dashboard: http://localhost:3000
# MCP Health: http://localhost:3002/health
# MCP Endpoints: http://localhost:3002/mcp/{server-name}
```

### Option 2: Railway (Cloud)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway up
```

### Option 3: Vercel (Serverless)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 4: Manual Server
```bash
# On your server
git clone <repo>
cd "Enterprise Developer Network"
./deploy.sh
# Choose option 4 for manual setup
```

### Demo URLs
Once deployed, colleagues can access:
- **Dashboard**: `https://your-domain.com`
- **API Health**: `https://your-domain.com/api/health`
- **Developer Metrics**: `https://your-domain.com/api/metrics/dev_001`
- **MCP Server Health**: `https://your-domain.com:3002/health`
- **MCP Code Standards**: `https://your-domain.com:3002/mcp/code-standards`
- **MCP Design System**: `https://your-domain.com:3002/mcp/design-system`

### Sharing Instructions
Send colleagues:
1. Demo URL
2. "Try the interactive dashboard showing real enterprise developer metrics"
3. "View Marcus Rodriguez's onboarding progress and learning recommendations"