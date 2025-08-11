import type { DesignSystemHTTP } from '../services/DesignSystemHTTP.js';

export interface MCPTool {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

export class DesignSystemTools {
  private designSystemHTTP: DesignSystemHTTP;

  constructor(designSystemHTTP: DesignSystemHTTP) {
    this.designSystemHTTP = designSystemHTTP;
  }

  // Define the tools that Claude can use
  getToolDefinitions(): MCPTool[] {
    return [
      {
        name: 'get_component',
        description: 'Get detailed component documentation with usage examples, props, and slots',
        input_schema: {
          type: "object" as const,
          properties: {
            name: { 
              type: 'string', 
              description: 'Component name (e.g., "button", "card", "alert")' 
            }
          },
          required: ['name']
        }
      },
      {
        name: 'list_components',
        description: 'List all available components with brief descriptions and kebab-case tag names',
        input_schema: {
          type: "object" as const,
          properties: {
            format: { 
              type: 'string', 
              enum: ['detailed', 'names-only'], 
              description: 'Output format - detailed list or just component names'
            }
          }
        }
      },
      {
        name: 'get_component_examples',
        description: 'Get usage examples for a specific component',
        input_schema: {
          type: "object" as const,
          properties: {
            name: { 
              type: 'string', 
              description: 'Component name' 
            },
            example_type: { 
              type: 'string', 
              description: 'Specific example type to filter by' 
            }
          },
          required: ['name']
        }
      },
      {
        name: 'validate_usage',
        description: 'Validate component usage and props',
        input_schema: {
          type: "object" as const,
          properties: {
            component: { 
              type: 'string', 
              description: 'Component name' 
            },
            props: { 
              type: 'object', 
              description: 'Props to validate' 
            }
          },
          required: ['component', 'props']
        }
      },
      {
        name: 'generate_component_code',
        description: 'Generate complete component code with specified props and content',
        input_schema: {
          type: "object" as const,
          properties: {
            component: { 
              type: 'string', 
              description: 'Component name' 
            },
            props: { 
              type: 'object', 
              description: 'Component props' 
            },
            content: { 
              type: 'string', 
              description: 'Component content/slots' 
            },
            variant: { 
              type: 'string', 
              description: 'Component variant' 
            }
          },
          required: ['component']
        }
      },
      {
        name: 'get_design_tokens',
        description: 'Get design tokens by category',
        input_schema: {
          type: "object" as const,
          properties: {
            category: { 
              type: 'string', 
              enum: ['color', 'spacing', 'typography', 'shadow'], 
              description: 'Token category to filter by' 
            }
          }
        }
      },
      {
        name: 'get_template',
        description: 'Get the HTML template for building UIs with the design system',
        input_schema: {
          type: "object" as const,
          properties: {}
        }
      }
    ];
  }

  // Handle tool calls from Claude
  async handleToolCall(toolName: string, args: any): Promise<any> {
    switch (toolName) {
      case 'get_component':
        return await this.designSystemHTTP.getComponent(args.name);
        
      case 'list_components':
        return await this.designSystemHTTP.listComponents(args.format || 'detailed');
        
      case 'get_component_examples':
        return await this.designSystemHTTP.getComponentExamples(args.name, args.example_type);
        
      case 'validate_usage':
        return await this.designSystemHTTP.validateComponentUsage(args.component, args.props);
        
      case 'generate_component_code':
        return await this.designSystemHTTP.generateComponentCode(
          args.component, 
          args.props || {}, 
          args.content || '', 
          args.variant
        );
        
      case 'get_design_tokens':
        return await this.designSystemHTTP.getDesignTokens(args.category);
        
      case 'get_template':
        return await this.designSystemHTTP.getTemplate();
        
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  // Format tool results for Claude
  formatToolResult(toolName: string, result: any): string {
    switch (toolName) {
      case 'list_components':
        if (Array.isArray(result)) {
          return result.map(comp => `- ${comp.tagName}: ${comp.description}`).join('\n');
        }
        return JSON.stringify(result);
        
      case 'get_component_examples':
        if (Array.isArray(result)) {
          return result.map(ex => 
            `## ${ex.title}\n${ex.description}\n\n\`\`\`html\n${ex.code}\n\`\`\`\n`
          ).join('\n');
        }
        return JSON.stringify(result);
        
      case 'get_component':
        if (result && typeof result === 'object') {
          let output = `# ${result.name} Component\n\n`;
          output += `**Tag:** \`${result.tagName}\`\n\n`;
          output += `${result.description}\n\n`;
          
          if (result.props && result.props.length > 0) {
            output += `## Properties\n\n`;
            result.props.forEach((prop: any) => {
              output += `### ${prop.name}\n`;
              output += `- **Type:** ${prop.type}\n`;
              output += `- **Description:** ${prop.description}\n`;
              if (prop.required) output += `- **Required:** Yes\n`;
              if (prop.default !== undefined) output += `- **Default:** ${prop.default}\n`;
              output += '\n';
            });
          }
          
          return output;
        }
        return JSON.stringify(result);
        
      case 'get_template':
        if (typeof result === 'string') {
          return `## HTML Template\n\n\`\`\`html\n${result}\n\`\`\`\n`;
        }
        return JSON.stringify(result);
        
      default:
        return typeof result === 'string' ? result : JSON.stringify(result);
    }
  }
}