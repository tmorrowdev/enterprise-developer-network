#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

interface Mentor {
  name: string;
  role: string;
  expertise: string[];
  availability: string;
}

class OnboardingAssistantServer {
  private server: Server;
  private tasks: Map<string, OnboardingTask[]> = new Map();
  private mentors: Mentor[] = [];

  constructor() {
    this.server = new Server(
      { name: 'onboarding-assistant', version: '1.0.0' }
    );
    this.setupToolHandlers();
    this.loadOnboardingData();
  }

  private loadOnboardingData() {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(__dirname, '../../data/enterprise-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    this.tasks.set('new-hire', [
      {
        id: '1',
        title: 'Complete security training',
        description: 'Mandatory security awareness training',
        completed: false,
        priority: 'high',
        estimatedTime: '2h'
      },
      {
        id: '2',
        title: 'Setup development environment',
        description: 'Install required tools and configure workspace',
        completed: false,
        priority: 'high',
        estimatedTime: '4h'
      }
    ]);

    this.mentors = [
      {
        name: 'Sarah Chen',
        role: 'Senior Developer',
        expertise: ['React', 'TypeScript', 'AWS'],
        availability: 'Mon-Fri 9-5 EST'
      }
    ];
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_onboarding_tasks',
          description: 'Get onboarding tasks for a new hire',
          inputSchema: {
            type: 'object',
            properties: {
              employee: { type: 'string' }
            },
            required: ['employee']
          }
        },
        {
          name: 'assign_mentor',
          description: 'Find and assign a mentor based on skills',
          inputSchema: {
            type: 'object',
            properties: {
              skills: { type: 'array', items: { type: 'string' } }
            },
            required: ['skills']
          }
        },
        {
          name: 'get_documentation',
          description: 'Get relevant documentation links',
          inputSchema: {
            type: 'object',
            properties: {
              topic: { type: 'string' }
            },
            required: ['topic']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'get_onboarding_tasks':
          return this.getOnboardingTasks(request.params.arguments);
        case 'assign_mentor':
          return this.assignMentor(request.params.arguments);
        case 'get_documentation':
          return this.getDocumentation(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async getOnboardingTasks(args: any) {
    const { employee } = args;
    const tasks = this.tasks.get('new-hire') || [];
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          employee,
          tasks,
          completionRate: `${tasks.filter(t => t.completed).length}/${tasks.length}`
        }, null, 2)
      }]
    };
  }

  private async assignMentor(args: any) {
    const { skills } = args;
    const matchedMentors = this.mentors.filter(mentor =>
      skills.some((skill: string) => mentor.expertise.includes(skill))
    );
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          recommendedMentors: matchedMentors,
          matchCriteria: skills
        }, null, 2)
      }]
    };
  }

  private async getDocumentation(args: any) {
    const { topic } = args;
    const docs = {
      'setup': ['Development Environment Setup Guide', 'IDE Configuration'],
      'security': ['Security Best Practices', 'Access Control Guide'],
      'architecture': ['System Architecture Overview', 'API Documentation']
    };
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          topic,
          documents: docs[topic as keyof typeof docs] || ['No documentation found']
        }, null, 2)
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new OnboardingAssistantServer();
server.run().catch(console.error);