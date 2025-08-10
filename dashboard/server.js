const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Claude client
const anthropic = new Anthropic({
  'x-api-key': process.env.ANTHROPIC_API_KEY,
});

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard-redesign.html'));
});

app.get('/classic', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, '../demo/demo-interface.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Claude API endpoints
app.post('/api/claude/chat', async (req, res) => {
  try {
    const { message, model = 'claude-3-sonnet-20240229' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await anthropic.messages.create({
      model: model,
      max_tokens: 4096,
      messages: [{ role: 'user', content: message }],
    });

    res.json({
      response: response.content[0].text,
      usage: response.usage,
      model: response.model
    });
  } catch (error) {
    console.error('Claude API error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/claude/analyze-code', async (req, res) => {
  try {
    const { code, language, task = 'analyze' } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    let prompt;
    switch (task) {
      case 'review':
        prompt = `Please review this ${language || 'code'} and provide feedback:\n\n\`\`\`${language || ''}\n${code}\n\`\`\``;
        break;
      case 'optimize':
        prompt = `Please suggest optimizations for this ${language || 'code'}:\n\n\`\`\`${language || ''}\n${code}\n\`\`\``;
        break;
      case 'explain':
        prompt = `Please explain what this ${language || 'code'} does:\n\n\`\`\`${language || ''}\n${code}\n\`\`\``;
        break;
      default:
        prompt = `Please analyze this ${language || 'code'}:\n\n\`\`\`${language || ''}\n${code}\n\`\`\``;
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({
      analysis: response.content[0].text,
      task: task,
      language: language,
      usage: response.usage
    });
  } catch (error) {
    console.error('Claude code analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/claude/generate', async (req, res) => {
  try {
    const { prompt, model = 'claude-3-sonnet-20240229', maxTokens = 4096 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await anthropic.messages.create({
      model: model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({
      generated: response.content[0].text,
      usage: response.usage,
      model: response.model
    });
  } catch (error) {
    console.error('Claude generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mcp/health', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3202/health');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'MCP servers unavailable' });
  }
});

app.post('/api/mcp/:server/:tool', async (req, res) => {
  const { server, tool } = req.params;
  const args = req.body;
  
  try {
    const mcpRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: tool, arguments: args }
    };
    
    const response = await fetch(`http://localhost:3202/mcp/${server}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mcpRequest)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/metrics/:developer', async (req, res) => {
  const { developer } = req.params;
  
  try {
    const dataPath = path.join(__dirname, '../data/enterprise-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const dev = data.developer_profiles.find(d => d.id === developer);
    if (!dev) {
      return res.status(404).json({ error: 'Developer not found' });
    }

    // Enhanced response with more detailed metrics
    res.json({
      name: dev.name,
      role: dev.role,
      team: dev.team,
      productivity: dev.productivity_metrics.feature_completion_rate,
      learning: `${dev.learning_recommendations.length}/5`,
      design: Math.floor(Math.random() * 10) + 90, // Simulated design system compliance
      collaboration: dev.productivity_metrics.code_review_participation,
      struggles: dev.recent_struggles || [],
      recommendations: dev.learning_recommendations,
      commits_per_week: dev.productivity_metrics.commits_per_week,
      bug_fix_rate: dev.productivity_metrics.bug_fix_rate,
      mentoring_hours: dev.productivity_metrics.mentoring_hours || 0,
      skill_levels: dev.skill_levels,
      hire_date: dev.hire_date,
      status: dev.productivity_metrics.feature_completion_rate > 80 ? 'excellent' : 
              dev.productivity_metrics.feature_completion_rate > 60 ? 'good' : 'needs_improvement'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

app.listen(PORT, () => {
  console.log(`Dashboard server running on http://localhost:${PORT}`);
});
