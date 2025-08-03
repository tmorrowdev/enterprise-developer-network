#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

interface ComponentProperty {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: any;
  options?: string[];
}

interface ComponentExample {
  title: string;
  description: string;
  code: string;
}

interface Component {
  name: string;
  tagName: string;
  description: string;
  variants?: string[];
  props: ComponentProperty[];
  examples: ComponentExample[];
  slots?: Array<{name: string; description: string}>;
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
    this.loadCre8Components();
    this.loadDesignTokens();
  }

  private loadCre8Components() {
    const buttonComponent: Component = {
      name: 'Button',
      tagName: 'cre8-button',
      description: 'Buttons are used for primary actions where a single click performs an action. They indicate the availability and priority of the action on the page.',
      variants: ['primary', 'secondary', 'tertiary'],
      props: [
        { name: 'text', type: 'string', description: 'Button text. Should be short and simple, max 3 words.' },
        { name: 'variant', type: 'string', description: 'Style variant', options: ['primary', 'secondary', 'tertiary'], default: 'primary' },
        { name: 'size', type: 'string', description: 'Size variants', options: ['sm', 'md', 'lg'], default: 'md' },
        { name: 'disabled', type: 'boolean', description: 'Disabled state', default: false },
        { name: 'loading', type: 'boolean', description: 'Loading state with spinner', default: false },
        { name: 'fullWidth', type: 'boolean', description: 'Full width button', default: false },
        { name: 'type', type: 'string', description: 'Button type', options: ['button', 'submit', 'reset'], default: 'button' },
        { name: 'href', type: 'string', description: 'URL to turn button into a link' },
        { name: 'target', type: 'string', description: 'Link target', options: ['_blank', '_self', '_parent', '_top'] },
        { name: 'svg', type: 'string', description: 'Raw SVG string for icon' },
        { name: 'iconPosition', type: 'string', description: 'Icon position', options: ['before', 'after'] }
      ],
      examples: [
        {
          title: 'Basic Button',
          description: 'Simple primary button with text',
          code: '<cre8-button text="Click Me"></cre8-button>'
        },
        {
          title: 'Button Variants',
          description: 'Different button styles for visual hierarchy',
          code: `<cre8-button text="Primary" variant="primary"></cre8-button>
<cre8-button text="Secondary" variant="secondary"></cre8-button>
<cre8-button text="Tertiary" variant="tertiary"></cre8-button>`
        },
        {
          title: 'Button Sizes',
          description: 'Different sizes for various contexts',
          code: `<cre8-button text="Small" size="sm"></cre8-button>
<cre8-button text="Medium" size="md"></cre8-button>
<cre8-button text="Large" size="lg"></cre8-button>`
        },
        {
          title: 'Loading Button',
          description: 'Button with loading state',
          code: '<cre8-button text="Submitting..." loading="true"></cre8-button>'
        },
        {
          title: 'Full Width Button',
          description: 'Button that spans full container width',
          code: '<cre8-button text="Full Width" fullWidth="true"></cre8-button>'
        },
        {
          title: 'Button as Link',
          description: 'Button styled as link with href',
          code: '<cre8-button text="Go to Page" href="/dashboard" target="_blank"></cre8-button>'
        }
      ],
      usage_frequency: 95
    };

    const cardComponent: Component = {
      name: 'Card',
      tagName: 'cre8-card',
      description: 'The card component acts as a general container element sectioned off by slots: header, body, footer.',
      variants: ['bare', 'horizontal', 'horizontal-bare'],
      props: [
        { name: 'variant', type: 'string', description: 'Card style variant', options: ['bare', 'horizontal', 'horizontal-bare'] },
        { name: 'align', type: 'string', description: 'Content alignment', options: ['center'] }
      ],
      slots: [
        { name: 'header', description: 'Optional content in the card header' },
        { name: 'body', description: 'Main card content' },
        { name: 'footer', description: 'Optional content in the card footer' }
      ],
      examples: [
        {
          title: 'Basic Card',
          description: 'Simple card with header, body, and footer slots',
          code: `<cre8-card>
  <div slot="header">
    <h3>Card Title</h3>
  </div>
  <div slot="body">
    <p>This is the main content of the card.</p>
  </div>
  <div slot="footer">
    <cre8-button text="Action" variant="primary"></cre8-button>
  </div>
</cre8-card>`
        },
        {
          title: 'Horizontal Card',
          description: 'Card with horizontal layout',
          code: `<cre8-card variant="horizontal">
  <div slot="header">
    <img src="image.jpg" alt="Card image">
  </div>
  <div slot="body">
    <h3>Horizontal Card</h3>
    <p>Content flows horizontally in this layout.</p>
  </div>
</cre8-card>`
        },
        {
          title: 'Bare Card',
          description: 'Card without border and padding',
          code: `<cre8-card variant="bare">
  <div slot="body">
    <p>This card has no border or padding.</p>
  </div>
</cre8-card>`
        },
        {
          title: 'Centered Card',
          description: 'Card with center-aligned content',
          code: `<cre8-card align="center">
  <div slot="body">
    <h3>Centered Content</h3>
    <p>All content is center-aligned.</p>
  </div>
</cre8-card>`
        }
      ],
      usage_frequency: 85
    };

    const alertComponent: Component = {
      name: 'Alert',
      tagName: 'cre8-alert',
      description: 'Alert component for displaying important messages to users with different severity levels.',
      variants: ['info', 'success', 'warning', 'error'],
      props: [
        { name: 'variant', type: 'string', description: 'Alert type', options: ['info', 'success', 'warning', 'error'], default: 'info' },
        { name: 'dismissible', type: 'boolean', description: 'Whether alert can be dismissed', default: false },
        { name: 'title', type: 'string', description: 'Alert title' },
        { name: 'message', type: 'string', description: 'Alert message content' }
      ],
      examples: [
        {
          title: 'Info Alert',
          description: 'General information alert',
          code: '<cre8-alert variant="info" title="Information" message="This is an informational message."></cre8-alert>'
        },
        {
          title: 'Success Alert',
          description: 'Success confirmation alert',
          code: '<cre8-alert variant="success" title="Success" message="Your action was completed successfully."></cre8-alert>'
        },
        {
          title: 'Warning Alert',
          description: 'Warning alert for potential issues',
          code: '<cre8-alert variant="warning" title="Warning" message="Please review this information carefully."></cre8-alert>'
        },
        {
          title: 'Error Alert',
          description: 'Error alert for failures',
          code: '<cre8-alert variant="error" title="Error" message="An error occurred. Please try again."></cre8-alert>'
        },
        {
          title: 'Dismissible Alert',
          description: 'Alert that can be closed by user',
          code: '<cre8-alert variant="info" title="Notice" message="This alert can be dismissed." dismissible="true"></cre8-alert>'
        }
      ],
      usage_frequency: 70
    };

    const inputComponent: Component = {
      name: 'Field',
      tagName: 'cre8-field',
      description: 'Input field component for forms with validation and accessibility features.',
      props: [
        { name: 'label', type: 'string', description: 'Field label text', required: true },
        { name: 'type', type: 'string', description: 'Input type', options: ['text', 'email', 'password', 'number', 'tel'], default: 'text' },
        { name: 'placeholder', type: 'string', description: 'Placeholder text' },
        { name: 'required', type: 'boolean', description: 'Required field', default: false },
        { name: 'disabled', type: 'boolean', description: 'Disabled state', default: false },
        { name: 'value', type: 'string', description: 'Field value' },
        { name: 'errorMessage', type: 'string', description: 'Error message to display' },
        { name: 'helpText', type: 'string', description: 'Help text for the field' }
      ],
      examples: [
        {
          title: 'Basic Text Field',
          description: 'Simple text input with label',
          code: '<cre8-field label="First Name" placeholder="Enter your first name"></cre8-field>'
        },
        {
          title: 'Required Email Field',
          description: 'Required email input with validation',
          code: '<cre8-field label="Email Address" type="email" placeholder="you@example.com" required="true"></cre8-field>'
        },
        {
          title: 'Field with Help Text',
          description: 'Input field with additional guidance',
          code: '<cre8-field label="Password" type="password" helpText="Must be at least 8 characters long"></cre8-field>'
        },
        {
          title: 'Field with Error',
          description: 'Input field showing validation error',
          code: '<cre8-field label="Username" value="ab" errorMessage="Username must be at least 3 characters"></cre8-field>'
        },
        {
          title: 'Disabled Field',
          description: 'Disabled input field',
          code: '<cre8-field label="Account ID" value="12345" disabled="true"></cre8-field>'
        }
      ],
      usage_frequency: 90
    };

    const modalComponent: Component = {
      name: 'Modal',
      tagName: 'cre8-modal',
      description: 'Modal dialog component for displaying content in an overlay.',
      props: [
        { name: 'open', type: 'boolean', description: 'Whether modal is open', default: false },
        { name: 'title', type: 'string', description: 'Modal title' },
        { name: 'size', type: 'string', description: 'Modal size', options: ['sm', 'md', 'lg', 'xl'], default: 'md' },
        { name: 'dismissible', type: 'boolean', description: 'Whether modal can be dismissed', default: true }
      ],
      slots: [
        { name: 'body', description: 'Main modal content' },
        { name: 'footer', description: 'Modal footer with actions' }
      ],
      examples: [
        {
          title: 'Basic Modal',
          description: 'Simple modal with title and content',
          code: `<cre8-modal open="true" title="Confirm Action">
  <div slot="body">
    <p>Are you sure you want to proceed with this action?</p>
  </div>
  <div slot="footer">
    <cre8-button text="Cancel" variant="secondary"></cre8-button>
    <cre8-button text="Confirm" variant="primary"></cre8-button>
  </div>
</cre8-modal>`
        },
        {
          title: 'Large Modal',
          description: 'Large modal for more content',
          code: `<cre8-modal open="true" title="Settings" size="lg">
  <div slot="body">
    <p>Modal content goes here...</p>
  </div>
</cre8-modal>`
        }
      ],
      usage_frequency: 60
    };

    [buttonComponent, cardComponent, alertComponent, inputComponent, modalComponent].forEach(component => {
      this.components.set(component.name.toLowerCase(), component);
    });
  }

  private loadDesignTokens() {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const dataPath = path.join(__dirname, '../../data/enterprise-data.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      
      if (data.design_system?.design_tokens?.colors) {
        Object.entries(data.design_system.design_tokens.colors).forEach(([name, value]) => {
          this.tokens.set(name, {
            name,
            value: value as string,
            category: 'color'
          });
        });
      }
    } catch (error) {
      console.warn('Could not load design tokens from enterprise-data.json');
    }

    const defaultTokens = [
      { name: 'primary', value: '#0066cc', category: 'color' as const },
      { name: 'secondary', value: '#6c757d', category: 'color' as const },
      { name: 'success', value: '#28a745', category: 'color' as const },
      { name: 'warning', value: '#ffc107', category: 'color' as const },
      { name: 'danger', value: '#dc3545', category: 'color' as const },
      { name: 'spacing-xs', value: '4px', category: 'spacing' as const },
      { name: 'spacing-sm', value: '8px', category: 'spacing' as const },
      { name: 'spacing-md', value: '16px', category: 'spacing' as const },
      { name: 'spacing-lg', value: '24px', category: 'spacing' as const },
      { name: 'spacing-xl', value: '32px', category: 'spacing' as const }
    ];

    defaultTokens.forEach(token => {
      if (!this.tokens.has(token.name)) {
        this.tokens.set(token.name, token);
      }
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_component',
          description: 'Get detailed component documentation with usage examples, props, and slots',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Component name (e.g., "button", "card", "alert")' }
            },
            required: ['name']
          }
        },
        {
          name: 'list_components',
          description: 'List all available components with brief descriptions',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        {
          name: 'get_component_examples',
          description: 'Get usage examples for a specific component',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Component name' },
              example_type: { type: 'string', description: 'Specific example type to filter by' }
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
              category: { type: 'string', enum: ['color', 'spacing', 'typography', 'shadow'], description: 'Token category to filter by' }
            }
          }
        },
        {
          name: 'validate_usage',
          description: 'Validate component usage and props',
          inputSchema: {
            type: 'object',
            properties: {
              component: { type: 'string', description: 'Component name' },
              props: { type: 'object', description: 'Props to validate' }
            },
            required: ['component', 'props']
          }
        },
        {
          name: 'generate_component_code',
          description: 'Generate complete component code with specified props and content',
          inputSchema: {
            type: 'object',
            properties: {
              component: { type: 'string', description: 'Component name' },
              props: { type: 'object', description: 'Component props' },
              content: { type: 'string', description: 'Component content/slots' },
              variant: { type: 'string', description: 'Component variant' }
            },
            required: ['component']
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'get_component':
          return this.getComponent(request.params.arguments);
        case 'list_components':
          return this.listComponents(request.params.arguments);
        case 'get_component_examples':
          return this.getComponentExamples(request.params.arguments);
        case 'get_design_tokens':
          return this.getDesignTokens(request.params.arguments);
        case 'validate_usage':
          return this.validateUsage(request.params.arguments);
        case 'generate_component_code':
          return this.generateComponentCode(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async getComponent(args: any) {
    const { name } = args;
    const component = this.components.get(name.toLowerCase());
    
    if (!component) {
      return {
        content: [{
          type: 'text',
          text: `Component "${name}" not found. Available components: ${Array.from(this.components.keys()).join(', ')}`
        }]
      };
    }

    const documentation = this.formatComponentDocumentation(component);
    
    return {
      content: [{
        type: 'text',
        text: documentation
      }]
    };
  }

  private async listComponents(args: any) {
    const componentList = Array.from(this.components.values())
      .sort((a, b) => (b.usage_frequency || 0) - (a.usage_frequency || 0))
      .map(comp => `• **${comp.name}** (\`${comp.tagName}\`) - ${comp.description}`)
      .join('\n');
    
    return {
      content: [{
        type: 'text',
        text: `# Available Components\n\n${componentList}\n\nUse \`get_component\` with a component name to see detailed documentation and examples.`
      }]
    };
  }

  private async getComponentExamples(args: any) {
    const { name, example_type } = args;
    const component = this.components.get(name.toLowerCase());
    
    if (!component) {
      return {
        content: [{
          type: 'text',
          text: `Component "${name}" not found.`
        }]
      };
    }

    let examples = component.examples;
    if (example_type) {
      examples = examples.filter(ex => 
        ex.title.toLowerCase().includes(example_type.toLowerCase()) ||
        ex.description.toLowerCase().includes(example_type.toLowerCase())
      );
    }

    const exampleText = examples.map(ex => 
      `## ${ex.title}\n${ex.description}\n\n\`\`\`html\n${ex.code}\n\`\`\`\n`
    ).join('\n');

    return {
      content: [{
        type: 'text',
        text: `# ${component.name} Examples\n\n${exampleText}`
      }]
    };
  }

  private async getDesignTokens(args: any) {
    const { category } = args;
    const tokens = Array.from(this.tokens.values())
      .filter(token => !category || token.category === category);
    
    const tokensByCategory = tokens.reduce((acc, token) => {
      if (!acc[token.category]) acc[token.category] = [];
      acc[token.category].push(token);
      return acc;
    }, {} as Record<string, DesignToken[]>);

    let output = '# Design Tokens\n\n';
    
    Object.entries(tokensByCategory).forEach(([cat, tokenList]) => {
      output += `## ${cat.charAt(0).toUpperCase() + cat.slice(1)} Tokens\n\n`;
      tokenList.forEach(token => {
        output += `• **${token.name}**: \`${token.value}\`\n`;
      });
      output += '\n';
    });

    return {
      content: [{
        type: 'text',
        text: output
      }]
    };
  }

  private async validateUsage(args: any) {
    const { component, props } = args;
    const comp = this.components.get(component.toLowerCase());
    
    if (!comp) {
      return { 
        content: [{ 
          type: 'text', 
          text: `Component "${component}" not found. Available components: ${Array.from(this.components.keys()).join(', ')}` 
        }] 
      };
    }

    const validationResults = [];
    const validPropNames = comp.props.map(p => p.name);
    const providedProps = Object.keys(props);
    
    const invalidProps = providedProps.filter(prop => !validPropNames.includes(prop));
    const requiredProps = comp.props.filter(p => p.required).map(p => p.name);
    const missingRequiredProps = requiredProps.filter(prop => !providedProps.includes(prop));

    if (invalidProps.length > 0) {
      validationResults.push(`❌ Invalid props: ${invalidProps.join(', ')}`);
    }

    if (missingRequiredProps.length > 0) {
      validationResults.push(`❌ Missing required props: ${missingRequiredProps.join(', ')}`);
    }

    Object.entries(props).forEach(([propName, propValue]) => {
      const propDef = comp.props.find(p => p.name === propName);
      if (propDef && propDef.options) {
        if (!propDef.options.includes(propValue as string)) {
          validationResults.push(`❌ Invalid value for "${propName}": "${propValue}". Valid options: ${propDef.options.join(', ')}`);
        }
      }
    });

    if (validationResults.length === 0) {
      validationResults.push('✅ All props are valid');
    }

    return {
      content: [{
        type: 'text',
        text: validationResults.join('\n')
      }]
    };
  }

  private async generateComponentCode(args: any) {
    const { component, props = {}, content = '', variant } = args;
    const comp = this.components.get(component.toLowerCase());
    
    if (!comp) {
      return {
        content: [{
          type: 'text',
          text: `Component "${component}" not found.`
        }]
      };
    }

    if (variant && comp.variants?.includes(variant)) {
      props.variant = variant;
    }

    const propString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        return `${key}="${value}"`;
      })
      .filter(Boolean)
      .join(' ');

    let code: string;
    if (comp.slots && comp.slots.length > 0) {
      code = `<${comp.tagName}${propString ? ' ' + propString : ''}>\n`;
      if (content) {
        code += `  ${content}\n`;
      } else {
        comp.slots.forEach(slot => {
          code += `  <div slot="${slot.name}"><!-- ${slot.description} --></div>\n`;
        });
      }
      code += `</${comp.tagName}>`;
    } else {
      code = `<${comp.tagName}${propString ? ' ' + propString : ''}>${content || ''}</${comp.tagName}>`;
    }

    return {
      content: [{
        type: 'text',
        text: `\`\`\`html\n${code}\n\`\`\``
      }]
    };
  }

  private formatComponentDocumentation(component: Component): string {
    let doc = `# ${component.name} Component\n\n`;
    doc += `**Tag:** \`${component.tagName}\`\n\n`;
    doc += `${component.description}\n\n`;

    if (component.variants && component.variants.length > 0) {
      doc += `## Variants\n${component.variants.map(v => `• ${v}`).join('\n')}\n\n`;
    }

    doc += `## Properties\n\n`;
    component.props.forEach(prop => {
      doc += `### ${prop.name}\n`;
      doc += `- **Type:** ${prop.type}\n`;
      doc += `- **Description:** ${prop.description}\n`;
      if (prop.required) doc += `- **Required:** Yes\n`;
      if (prop.default !== undefined) doc += `- **Default:** ${prop.default}\n`;
      if (prop.options) doc += `- **Options:** ${prop.options.join(', ')}\n`;
      doc += '\n';
    });

    if (component.slots && component.slots.length > 0) {
      doc += `## Slots\n\n`;
      component.slots.forEach(slot => {
        doc += `### ${slot.name}\n${slot.description}\n\n`;
      });
    }

    doc += `## Usage Examples\n\n`;
    component.examples.forEach(example => {
      doc += `### ${example.title}\n${example.description}\n\n\`\`\`html\n${example.code}\n\`\`\`\n\n`;
    });

    return doc;
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new DesignSystemServer();
server.run().catch(console.error);