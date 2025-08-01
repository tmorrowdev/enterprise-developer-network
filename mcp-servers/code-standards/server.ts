#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

interface StyleGuide {
  language: string;
  rules: Record<string, any>;
  security?: Record<string, any>;
  severity: 'error' | 'warning' | 'info';
}

class CodeStandardsServer {
  private server: Server;
  private styleGuides: Map<string, StyleGuide> = new Map();

  constructor() {
    this.server = new Server(
      { name: 'code-standards-enforcer', version: '1.0.0' }
    );
    this.setupToolHandlers();
    this.loadDefaultStyleGuides();
  }

  private loadDefaultStyleGuides() {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(__dirname, '../../data/enterprise-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    this.styleGuides.set('javascript', {
      language: 'javascript',
      rules: data.code_standards.javascript.eslint_rules,
      security: data.code_standards.javascript.security_rules,
      severity: 'error'
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'validate_code',
          description: 'Validate code against company standards',
          inputSchema: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              language: { type: 'string' }
            },
            required: ['code', 'language']
          }
        },
        {
          name: 'get_style_guide',
          description: 'Get style guide for a language',
          inputSchema: {
            type: 'object',
            properties: {
              language: { type: 'string' }
            },
            required: ['language']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'validate_code':
          return this.validateCode(request.params.arguments);
        case 'get_style_guide':
          return this.getStyleGuide(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async validateCode(args: any) {
    const { code, language } = args;
    const guide = this.styleGuides.get(language);
    
    if (!guide) {
      return { content: [{ type: 'text', text: `No style guide found for ${language}` }] };
    }

    const violations = [];
    if (code.includes('console.log')) violations.push('Remove console.log statements');
    if (code.includes('var ')) violations.push('Use const/let instead of var');
    if (code.includes('password') && code.includes('=')) violations.push('No hardcoded secrets');
    if (code.length > 100 * code.split('\n').length) violations.push('Lines exceed 100 characters');

    return {
      content: [{
        type: 'text',
        text: violations.length ? `❌ Violations: ${violations.join(', ')}` : '✅ Code passes all checks'
      }]
    };
  }

  private async getStyleGuide(args: any) {
    const { language } = args;
    const guide = this.styleGuides.get(language);
    
    return {
      content: [{
        type: 'text',
        text: guide ? JSON.stringify(guide, null, 2) : `No style guide for ${language}`
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new CodeStandardsServer();
server.run().catch(console.error);