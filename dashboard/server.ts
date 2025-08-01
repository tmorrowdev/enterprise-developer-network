import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/metrics/:developer', async (req, res) => {
  const { developer } = req.params;
  const data = require('../data/enterprise-data.json');
  
  try {
    const dev = data.developer_profiles.find((d: any) => d.id === developer);
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

function getMCPData(server: string, params: any): Promise<any> {
  return new Promise((resolve) => {
    exec(`echo '${JSON.stringify(params)}' | node ../mcp-servers/dist/${server}/server.js`,
      (error, stdout) => {
        try {
          resolve(JSON.parse(stdout || '{}'));
        } catch {
          resolve({});
        }
      });
  });
}

app.listen(PORT, () => {
  console.log(`Dashboard server running on http://localhost:${PORT}`);
});