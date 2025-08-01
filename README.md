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

## Kiro Integration

The servers are configured for Kiro in `kiro-config.json`. Each server runs independently and can be connected to Kiro's MCP support system.

## Usage with Kiro

1. Build the servers: `npm run build`
2. Configure Kiro to use the MCP servers from `kiro-config.json`
3. Access enterprise tools through Kiro's AI interface

## Enterprise Benefits

- **Standardization**: Consistent code quality across teams
- **Productivity**: Data-driven development insights
- **Learning**: Integrated skill development tracking
- **Design Consistency**: Unified component usage
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

### Design System
- **Button** component (245 uses) - primary, secondary, danger, ghost variants
- **Input** component (189 uses) - text, email, password, search types
- **Design tokens** - Primary #2563eb, Success #10b981, Warning #f59e0b

### Learning Paths
- React Fundamentals (20h, beginner)
- Advanced Testing Patterns (35h, advanced)
- Kubernetes Fundamentals (40h, intermediate)

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

1. **Install dependencies**:
```bash
cd mcp-servers
npm install
npm run build
```

2. **Start dashboard**:
```bash
cd dashboard
npm install
npm start
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
./deploy.sh
# Choose option 1 for Docker
# Demo available at http://localhost:3000
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

### Sharing Instructions
Send colleagues:
1. Demo URL
2. "Try the interactive dashboard showing real enterprise developer metrics"
3. "View Marcus Rodriguez's onboarding progress and learning recommendations"