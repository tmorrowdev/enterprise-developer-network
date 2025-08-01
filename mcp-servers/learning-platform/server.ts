#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

interface Course {
  id: string;
  title: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  earned: boolean;
  expiryDate?: string;
}

class LearningPlatformServer {
  private server: Server;
  private courses: Map<string, Course[]> = new Map();
  private certifications: Map<string, Certification[]> = new Map();

  constructor() {
    this.server = new Server(
      { name: 'learning-platform', version: '1.0.0' }
    );
    this.setupToolHandlers();
    this.loadSampleData();
  }

  private loadSampleData() {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(__dirname, '../../data/enterprise-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    this.courses.set('dev_001', [
      { id: '1', title: 'Advanced TypeScript', duration: '4h', level: 'advanced', completed: true },
      { id: '2', title: 'AWS Architecture', duration: '6h', level: 'intermediate', completed: false }
    ]);
    
    this.certifications.set('dev_001', [
      { id: '1', name: 'AWS Solutions Architect', issuer: 'AWS', earned: true, expiryDate: '2025-12-31' }
    ]);
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_learning_progress',
          description: 'Get learning progress for a developer',
          inputSchema: {
            type: 'object',
            properties: {
              developer: { type: 'string' }
            },
            required: ['developer']
          }
        },
        {
          name: 'recommend_courses',
          description: 'Recommend courses based on skill gaps',
          inputSchema: {
            type: 'object',
            properties: {
              skills: { type: 'array', items: { type: 'string' } }
            },
            required: ['skills']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'get_learning_progress':
          return this.getLearningProgress(request.params.arguments);
        case 'recommend_courses':
          return this.recommendCourses(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async getLearningProgress(args: any) {
    const { developer } = args;
    const courses = this.courses.get(developer) || [];
    const certifications = this.certifications.get(developer) || [];
    
    const completedCourses = courses.filter(c => c.completed).length;
    const totalCourses = courses.length;
    const earnedCerts = certifications.filter(c => c.earned).length;
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          coursesCompleted: `${completedCourses}/${totalCourses}`,
          certificationsEarned: earnedCerts,
          courses,
          certifications
        }, null, 2)
      }]
    };
  }

  private async recommendCourses(args: any) {
    const { skills } = args;
    const recommendations = skills.map((skill: string) => ({
      skill,
      course: `Advanced ${skill}`,
      priority: 'high'
    }));
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ recommendations }, null, 2)
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new LearningPlatformServer();
server.run().catch(console.error);