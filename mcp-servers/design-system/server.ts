#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

interface Component {
  name: string;
  variants?: string[];
  props: string[] | Record<string, any>;
  usage_frequency?: number;
}

interface DesignToken {
  name: string;
  value: string;
  category: 'color' | 'spacing' | 'typography' | 'shadow';
}

class DesignSystemServer {
  private server: Server;
  private components: Map<string, Component> = new Map();
  private tokens: Map<string, DesignToken> = new Map();

  constructor() {
    this.server = new Server(
      { name: 'design-system', version: '1.0.0' }
    );
    this.setupToolHandlers();
    this.loadDesignSystem();
  }

  private loadDesignSystem() {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(__dirname, '../../data/enterprise-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    data.design_system.components.forEach((comp: any) => {
      this.components.set(comp.name.toLowerCase(), {
        name: comp.name,
        variants: comp.variants,
        props: comp.props,
        usage_frequency: comp.usage_frequency
      });
    });

    Object.entries(data.design_system.design_tokens.colors).forEach(([name, value]) => {
      this.tokens.set(name, {
        name,
        value: value as string,
        category: 'color'
      });
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_component',
          description: 'Get component documentation',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string' }
            },
            required: ['name']
          }
        },
        {
          name: 'get_design_tokens',
          description: 'Get design tokens by category',
          inputSchema: {
            type: 'object',
            properties: {
              category: { type: 'string', enum: ['color', 'spacing', 'typography', 'shadow'] }
            }
          }
        },
        {
          name: 'validate_usage',
          description: 'Validate component usage',
          inputSchema: {
            type: 'object',
            properties: {
              component: { type: 'string' },
              props: { type: 'object' }
            },
            required: ['component', 'props']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'get_component':
          return this.getComponent(request.params.arguments);
        case 'get_design_tokens':
          return this.getDesignTokens(request.params.arguments);
        case 'validate_usage':
          return this.validateUsage(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async getComponent(args: any) {
    const { name } = args;
    const component = this.components.get(name.toLowerCase());
    
    return {
      content: [{
        type: 'text',
        text: component ? JSON.stringify(component, null, 2) : `Component ${name} not found`
      }]
    };
  }

  private async getDesignTokens(args: any) {
    const { category } = args;
    const tokens = Array.from(this.tokens.values())
      .filter(token => !category || token.category === category);
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(tokens, null, 2)
      }]
    };
  }

  private async validateUsage(args: any) {
    const { component, props } = args;
    const comp = this.components.get(component.toLowerCase());
    
    if (!comp) {
      return { content: [{ type: 'text', text: `Component ${component} not found` }] };
    }

    const validProps = Object.keys(comp.props);
    const invalidProps = Object.keys(props).filter(prop => !validProps.includes(prop));
    
    return {
      content: [{
        type: 'text',
        text: invalidProps.length 
          ? `Invalid props: ${invalidProps.join(', ')}`
          : 'All props are valid'
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new DesignSystemServer();
server.run().catch(console.error);