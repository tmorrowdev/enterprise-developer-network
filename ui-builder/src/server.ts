import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { UIBuilderAgent } from './agents/UIBuilderAgent.js';
import { DesignSystemHTTP } from './services/DesignSystemHTTP.js';
import { WebContainerService } from './services/WebContainerService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize services
const designSystemHTTP = new DesignSystemHTTP();
const webContainerService = new WebContainerService();
const uiBuilderAgent = new UIBuilderAgent(designSystemHTTP);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/api/generate-ui', async (req, res) => {
  try {
    const { prompt, framework = 'html' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Always use HTML framework
    const result = await uiBuilderAgent.generateUI(prompt, 'html');
    res.json(result);
  } catch (error) {
    console.error('Error generating UI:', error);
    res.status(500).json({ error: 'Failed to generate UI' });
  }
});

app.post('/api/refine-ui', async (req, res) => {
  try {
    const { code, feedback, framework = 'html' } = req.body;
    
    if (!code || !feedback) {
      return res.status(400).json({ error: 'Code and feedback are required' });
    }

    // Always use HTML framework
    const result = await uiBuilderAgent.refineUI(code, feedback, 'html');
    res.json(result);
  } catch (error) {
    console.error('Error refining UI:', error);
    res.status(500).json({ error: 'Failed to refine UI' });
  }
});

app.get('/api/components', async (req, res) => {
  try {
    const components = await designSystemHTTP.listComponents();
    res.json(components);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
});

app.get('/api/components/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const component = await designSystemHTTP.getComponent(name);
    res.json(component);
  } catch (error) {
    console.error('Error fetching component:', error);
    res.status(500).json({ error: 'Failed to fetch component' });
  }
});

app.post('/api/create-preview', async (req, res) => {
  try {
    const { code, framework = 'react' } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Create WebContainer project
    const projectName = `ui-preview-${Date.now()}`;
    await webContainerService.createProject(framework, code, projectName);
    
    // Install dependencies and start dev server
    await webContainerService.installDependencies();
    await webContainerService.startDevServer();
    
    // Get preview URL
    const previewUrl = await webContainerService.getPreviewUrl();
    
    res.json({
      previewUrl,
      projectName,
      framework
    });
  } catch (error) {
    console.error('Error creating preview:', error);
    res.status(500).json({ error: 'Failed to create preview' });
  }
});

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('generate-ui', async (data) => {
    try {
      const { prompt, framework = 'html' } = data;
      
      // Send progress updates
      socket.emit('progress', { stage: 'analyzing', message: 'Analyzing requirements...' });
      
      // Always use HTML framework
      const result = await uiBuilderAgent.generateUI(prompt, 'html', (progress) => {
        socket.emit('progress', progress);
      });
      
      socket.emit('ui-generated', result);
    } catch (error) {
      socket.emit('error', { message: (error as Error).message });
    }
  });

  socket.on('refine-ui', async (data) => {
    try {
      const { code, feedback, framework = 'html' } = data;
      
      socket.emit('progress', { stage: 'refining', message: 'Refining UI based on feedback...' });
      
      // Always use HTML framework
      const result = await uiBuilderAgent.refineUI(code, feedback, 'html', (progress) => {
        socket.emit('progress', progress);
      });
      
      socket.emit('ui-refined', result);
    } catch (error) {
      socket.emit('error', { message: (error as Error).message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 UI Builder server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} to start building UIs`);
});