import express from 'express';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const servers = {
  'code-standards': null,
  'developer-analytics': null,
  'design-system': null,
  'learning-platform': null,
  'onboarding-assistant': null
};

function startMCPServer(name) {
  if (servers[name]) return servers[name];
  
  const serverProcess = spawn('node', [`dist/${name}/server.js`], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  servers[name] = {
    process: serverProcess,
    ready: false
  };
  
  serverProcess.stdout.on('data', (data) => {
    console.log(`${name}: ${data}`);
  });
  
  serverProcess.stderr.on('data', (data) => {
    console.error(`${name} error: ${data}`);
  });
  
  return servers[name];
}

app.post('/mcp/:server', async (req, res) => {
  const { server } = req.params;
  const mcpRequest = req.body;
  
  if (!servers[server]) {
    startMCPServer(server);
  }
  
  const serverInstance = servers[server];
  if (!serverInstance) {
    return res.status(404).json({ error: 'Server not found' });
  }
  
  try {
    serverInstance.process.stdin.write(JSON.stringify(mcpRequest) + '\n');
    
    let response = '';
    let responseComplete = false;
    const timeout = setTimeout(() => {
      if (!responseComplete) {
        res.status(408).json({ error: 'Request timeout' });
      }
    }, 10000);
    
    const onData = (data) => {
      const chunk = data.toString();
      response += chunk;
      
      // Try to parse the accumulated response
      try {
        const result = JSON.parse(response);
        if (result && (result.result || result.error)) {
          responseComplete = true;
          clearTimeout(timeout);
          serverInstance.process.stdout.removeListener('data', onData);
          res.json(result);
        }
      } catch (e) {
        // Response not complete yet, continue accumulating
      }
    };
    
    serverInstance.process.stdout.on('data', onData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/mcp/:server/tools', async (req, res) => {
  const toolsRequest = {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'tools/list',
    params: {}
  };
  
  req.body = toolsRequest;
  return app._router.handle(req, res);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    servers: Object.keys(servers).map(name => ({
      name,
      running: !!servers[name]
    }))
  });
});

const PORT = process.env.MCP_PORT || 3002;
app.listen(PORT, () => {
  console.log(`MCP HTTP wrapper running on port ${PORT}`);
});