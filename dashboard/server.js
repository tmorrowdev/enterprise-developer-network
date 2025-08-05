const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

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
