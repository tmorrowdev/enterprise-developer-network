export interface Component {
  name: string;
  tagName: string;
  description: string;
  props?: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
    default?: any;
    options?: string[];
  }>;
  examples?: Array<{
    title: string;
    description: string;
    code: string;
  }>;
  slots?: Array<{
    name: string;
    description: string;
  }>;
}

interface CacheEntry {
  data: any;
  timestamp: number;
}

export class DesignSystemHTTP {
  private mcpServerUrl: string;
  private cache: Map<string, CacheEntry> = new Map();
  private cacheTimeout: number = 5 * 60 * 1000; // 5 minutes

  constructor(mcpServerUrl?: string) {
    this.mcpServerUrl = mcpServerUrl || process.env.MCP_SERVER_URL || 'https://enterprisedsnetwork-production.up.railway.app';
  }

  private async callMCPTool(toolName: string, args: Record<string, any> = {}): Promise<any> {
    const cacheKey = `${toolName}-${JSON.stringify(args)}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      // Use direct HTTP endpoints instead of JSON-RPC
      let url = `${this.mcpServerUrl}/mcp/design-system/${toolName}`;
      
      // Add query parameters for GET requests
      if (Object.keys(args).length > 0) {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          params.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        });
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const data = result;
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error(`Error calling MCP tool ${toolName}:`, error);
      throw error;
    }
  }

  async listComponents(format: 'detailed' | 'names-only' = 'names-only'): Promise<Component[]> {
    try {
      const result = await this.callMCPTool('list_components', { format: 'names-only' });
      
      // Extract text from MCP response format
      const text = result.content?.[0]?.text || result.content || result.text || '';
      
      // Parse the text response to extract component names
      const lines = text.split('\n').filter((line: string) => line.startsWith('cre8-'));
      const components = lines.map((tagName: string) => ({ 
        tagName: tagName.trim(), 
        name: this.tagNameToComponentName(tagName.trim()),
        description: `${this.tagNameToComponentName(tagName.trim())} component for the Cre8 design system.`
      }));
      
      console.log(`Loaded ${components.length} components from MCP server`);
      return components;
    } catch (error) {
      console.error('Error listing components:', error);
      return [];
    }
  }

  async getComponent(name: string): Promise<Component | null> {
    try {
      const result = await this.callMCPTool('get_component', { name });
      const text = result.content?.[0]?.text || result.content || result.text || '';
      return this.parseComponentDocumentation(text);
    } catch (error) {
      console.error(`Error getting component ${name}:`, error);
      return null;
    }
  }

  async getComponentExamples(name: string, exampleType?: string): Promise<Array<{ title: string; description: string; code: string }>> {
    try {
      const params: Record<string, any> = { name };
      if (exampleType) {
        params.example_type = exampleType;
      }
      
      const result = await this.callMCPTool('get_component_examples', params);
      const text = result.content?.[0]?.text || result.content || result.text || '';
      return this.parseExamples(text);
    } catch (error) {
      console.error(`Error getting examples for ${name}:`, error);
      return [];
    }
  }

  async validateComponentUsage(component: string, props: Record<string, any>): Promise<string> {
    try {
      const result = await this.callMCPTool('validate_usage', { component, props: JSON.stringify(props) });
      return result.content?.[0]?.text || result.content || result.text || 'Validation failed';
    } catch (error) {
      console.error(`Error validating ${component}:`, error);
      return 'Validation failed';
    }
  }

  async generateComponentCode(
    component: string, 
    props: Record<string, any> = {}, 
    content: string = '', 
    variant?: string
  ): Promise<string> {
    try {
      const params: Record<string, any> = { 
        component, 
        props: JSON.stringify(props), 
        content 
      };
      if (variant) {
        params.variant = variant;
      }
      
      const result = await this.callMCPTool('generate_component_code', params);
      const text = result.content?.[0]?.text || result.content || result.text || '';
      return this.extractCodeFromMarkdown(text);
    } catch (error) {
      console.error(`Error generating code for ${component}:`, error);
      return `<${component}></${component}>`;
    }
  }

  async getDesignTokens(category?: string): Promise<Record<string, Array<{ name: string; value: string }>>> {
    try {
      const params: Record<string, any> = category ? { category } : {};
      const result = await this.callMCPTool('get_design_tokens', params);
      const text = result.content?.[0]?.text || result.content || result.text || '';
      return this.parseDesignTokens(text);
    } catch (error) {
      console.error('Error getting design tokens:', error);
      return {};
    }
  }

  // Helper methods
  private tagNameToComponentName(tagName: string): string {
    return tagName.replace('cre8-', '').split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
  }

  private parseComponentDocumentation(text: string): Component {
    const component: Component = {
      name: '',
      tagName: '',
      description: '',
      props: [],
      examples: [],
      slots: []
    };

    const lines = text.split('\n');
    let currentSection = '';
    let currentProp: any = null;

    for (const line of lines) {
      if (line.startsWith('# ') && line.includes('Component')) {
        component.name = line.replace('# ', '').replace(' Component', '');
      } else if (line.startsWith('**Tag:**')) {
        const match = line.match(/`(.+?)`/);
        component.tagName = match?.[1] || '';
      } else if (line.startsWith('## Properties')) {
        currentSection = 'props';
      } else if (line.startsWith('## Slots')) {
        currentSection = 'slots';
      } else if (line.startsWith('## Usage Examples')) {
        currentSection = 'examples';
      } else if (line.startsWith('### ') && currentSection === 'props') {
        if (currentProp) {
          component.props!.push(currentProp);
        }
        currentProp = { name: line.replace('### ', ''), type: '', description: '' };
      } else if (line.startsWith('- **Type:**') && currentProp) {
        currentProp.type = line.replace('- **Type:** ', '');
      } else if (line.startsWith('- **Description:**') && currentProp) {
        currentProp.description = line.replace('- **Description:** ', '');
      } else if (!component.description && line.trim() && !line.startsWith('#') && !line.startsWith('**')) {
        component.description = line.trim();
      }
    }

    if (currentProp) {
      component.props!.push(currentProp);
    }

    return component;
  }

  private parseExamples(text: string): Array<{ title: string; description: string; code: string }> {
    const examples: Array<{ title: string; description: string; code: string }> = [];
    const exampleRegex = /## (.+?)\n(.+?)\n\n```html\n([\s\S]*?)\n```/g;
    let match;

    while ((match = exampleRegex.exec(text)) !== null) {
      examples.push({
        title: match[1],
        description: match[2],
        code: match[3]
      });
    }

    return examples;
  }

  private parseDesignTokens(text: string): Record<string, Array<{ name: string; value: string }>> {
    const tokens: Record<string, Array<{ name: string; value: string }>> = {};
    const lines = text.split('\n');
    let currentCategory = '';

    for (const line of lines) {
      if (line.startsWith('## ') && line.includes('Tokens')) {
        currentCategory = line.replace('## ', '').replace(' Tokens', '').toLowerCase();
        tokens[currentCategory] = [];
      } else if (line.startsWith('• **') && currentCategory) {
        const match = line.match(/• \*\*(.+?)\*\*: `(.+?)`/);
        if (match) {
          tokens[currentCategory].push({
            name: match[1],
            value: match[2]
          });
        }
      }
    }

    return tokens;
  }

  private extractCodeFromMarkdown(text: string): string {
    const codeMatch = text.match(/```html\n([\s\S]*?)\n```/);
    return codeMatch ? codeMatch[1] : text;
  }

  clearCache(): void {
    this.cache.clear();
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.mcpServerUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('MCP server health check failed:', error);
      return false;
    }
  }
}