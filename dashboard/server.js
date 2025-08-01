const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
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

    res.json({
      productivity: dev.productivity_metrics.feature_completion_rate,
      learning: `${dev.learning_recommendations.length}/5`,
      design: 94,
      collaboration: dev.productivity_metrics.code_review_participation,
      struggles: dev.recent_struggles || [],
      recommendations: dev.learning_recommendations
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

app.listen(PORT, () => {
  console.log(`Dashboard server running on http://localhost:${PORT}`);
});