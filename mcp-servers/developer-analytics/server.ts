#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

interface DeveloperMetrics {
  commits: number;
  reviewsCompleted: number;
  productivity: number;
  struggles?: string[];
  recommendations?: string[];
}

class DeveloperAnalyticsServer {
  private server: Server;
  private metrics: Map<string, DeveloperMetrics> = new Map();

  constructor() {
    this.server = new Server(
      { name: 'developer-analytics', version: '1.0.0' }
    );
    this.setupToolHandlers();
    this.loadSampleData();
  }

  private loadSampleData() {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(__dirname, '../../data/enterprise-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    data.developer_profiles.forEach((dev: any) => {
      this.metrics.set(dev.id, {
        commits: dev.productivity_metrics.commits_per_week,
        reviewsCompleted: dev.productivity_metrics.code_review_participation,
        productivity: dev.productivity_metrics.feature_completion_rate,
        struggles: dev.recent_struggles || [],
        recommendations: dev.learning_recommendations
      });
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_developer_metrics',
          description: 'Get productivity metrics for a developer',
          inputSchema: {
            type: 'object',
            properties: {
              developer: { type: 'string' }
            },
            required: ['developer']
          }
        },
        {
          name: 'get_team_analytics',
          description: 'Get team-wide analytics',
          inputSchema: {
            type: 'object',
            properties: {
              team: { type: 'string' }
            }
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'get_developer_metrics':
          return this.getDeveloperMetrics(request.params.arguments);
        case 'get_team_analytics':
          return this.getTeamAnalytics(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async getDeveloperMetrics(args: any) {
    const { developer } = args;
    const metrics = this.metrics.get(developer);
    
    return {
      content: [{
        type: 'text',
        text: metrics ? JSON.stringify(metrics, null, 2) : `No metrics found for ${developer}`
      }]
    };
  }

  private async getTeamAnalytics(args: any) {
    const totalCommits = Array.from(this.metrics.values()).reduce((sum, m) => sum + m.commits, 0);
    const avgProductivity = Array.from(this.metrics.values()).reduce((sum, m) => sum + m.productivity, 0) / this.metrics.size;
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          totalCommits,
          avgProductivity: Math.round(avgProductivity),
          teamSize: this.metrics.size
        }, null, 2)
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new DeveloperAnalyticsServer();
server.run().catch(console.error);