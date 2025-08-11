import express from 'express';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

async function callMCPServer(serverName, toolName, args = {}) {
  return new Promise((resolve, reject) => {
    const serverProcess = spawn('node', [`dist/${serverName}/server.js`], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const mcpRequest = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    };

    let responseData = '';
    let errorData = '';

    const timeout = setTimeout(() => {
      serverProcess.kill();
      reject(new Error('Request timeout'));
    }, 10000);

    serverProcess.stdout.on('data', (data) => {
      responseData += data.toString();
    });

    serverProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });
    
    serverProcess.on('close', (code) => {
      clearTimeout(timeout);
      
      if (code !== 0) {
        reject(new Error(`Server exited with code ${code}: ${errorData}`));
        return;
      }

      try {
        // Parse the JSON response from stdout
        const lines = responseData.trim().split('\n');
        const jsonLine = lines.find(line => line.startsWith('{"result"'));
        
        if (!jsonLine) {
          reject(new Error('No valid JSON response found'));
          return;
        }

        const response = JSON.parse(jsonLine);
        
        if (response.error) {
          reject(new Error(response.error.message || 'MCP tool error'));
          return;
        }

        resolve(response.result);
      } catch (error) {
        reject(new Error(`Failed to parse MCP response: ${error.message}`));
      }
    });

    serverProcess.on('error', (error) => {
      clearTimeout(timeout);
      reject(new Error(`Failed to spawn MCP server: ${error.message}`));
    });

    // Send the request
    serverProcess.stdin.write(JSON.stringify(mcpRequest) + '\n');
    serverProcess.stdin.end();
  });
}

// Design System endpoints
app.get('/mcp/design-system/list_components', async (req, res) => {
  try {
    const format = req.query.format || 'detailed';
    const result = await callMCPServer('design-system', 'list_components', { format });
    res.json(result);
  } catch (error) {
    console.error('Error calling list_components:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/mcp/design-system/get_component', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Component name is required' });
    }
    const result = await callMCPServer('design-system', 'get_component', { name });
    res.json(result);
  } catch (error) {
    console.error('Error calling get_component:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/mcp/design-system/get_component_examples', async (req, res) => {
  try {
    const { name, example_type } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Component name is required' });
    }
    const args = { name };
    if (example_type) args.example_type = example_type;
    
    const result = await callMCPServer('design-system', 'get_component_examples', args);
    res.json(result);
  } catch (error) {
    console.error('Error calling get_component_examples:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/mcp/design-system/validate_usage', async (req, res) => {
  try {
    const { component, props } = req.query;
    if (!component || !props) {
      return res.status(400).json({ error: 'Component and props are required' });
    }
    const result = await callMCPServer('design-system', 'validate_usage', { 
      component, 
      props: JSON.parse(props) 
    });
    res.json(result);
  } catch (error) {
    console.error('Error calling validate_usage:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/mcp/design-system/generate_component_code', async (req, res) => {
  try {
    const { component, props, content, variant } = req.query;
    if (!component) {
      return res.status(400).json({ error: 'Component is required' });
    }
    const args = { component };
    if (props) args.props = JSON.parse(props);
    if (content) args.content = content;
    if (variant) args.variant = variant;
    
    const result = await callMCPServer('design-system', 'generate_component_code', args);
    res.json(result);
  } catch (error) {
    console.error('Error calling generate_component_code:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/mcp/design-system/get_design_tokens', async (req, res) => {
  try {
    const { category } = req.query;
    const args = category ? { category } : {};
    const result = await callMCPServer('design-system', 'get_design_tokens', args);
    res.json(result);
  } catch (error) {
    console.error('Error calling get_design_tokens:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/mcp/design-system/get_template', async (req, res) => {
  try {
    const result = await callMCPServer('design-system', 'get_template', {});
    res.json(result);
  } catch (error) {
    console.error('Error calling get_template:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generic MCP endpoint for design system tools
app.post('/mcp/design-system/:tool', async (req, res) => {
  try {
    const { tool } = req.params;
    const args = req.body || {};
    const result = await callMCPServer('design-system', tool, args);
    res.json(result);
  } catch (error) {
    console.error(`Error calling design-system/${tool}:`, error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /mcp/design-system/list_components',
      'GET /mcp/design-system/get_component?name=<component>',
      'GET /mcp/design-system/get_component_examples?name=<component>',
      'GET /mcp/design-system/validate_usage?component=<component>&props=<json>',
      'GET /mcp/design-system/generate_component_code?component=<component>',
      'GET /mcp/design-system/get_design_tokens?category=<category>',
      'GET /mcp/design-system/get_template'
    ]
  });
});

const PORT = process.env.PORT || process.env.MCP_PORT || 3002;
app.listen(PORT, () => {
  console.log(`MCP HTTP wrapper running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Design system: http://localhost:${PORT}/mcp/design-system/list_components`);
});